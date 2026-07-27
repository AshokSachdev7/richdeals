// Review member-submitted deals sitting in PENDING_REVIEW.
//
//   node scripts/review-submissions.mjs            # list + auto-verify non-Amazon
//   node scripts/review-submissions.mjs --approve 123
//   node scripts/review-submissions.mjs --reject 123 "price wrong"
//
// Approving goes through the admin HTTP endpoint, not Prisma, so the deal page gets
// ISR revalidation + an IndexNow ping. The ₹1 payout is credited by the sweep already
// in tg-broadcast.mjs (any LIVE deal with submittedById, deduped) — nothing to do here.
// ponytail: no new review table, no new endpoint. Status + the existing sweep cover it.
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { verifyFromHtml } from './lib/ingest-common.mjs';

const API = process.env.API_URL || 'http://localhost:4000';
const KEY = process.env.ADMIN_KEY || 'dev-admin-key-change-me';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';

const p = new PrismaClient();

/** The store URL we should price-check: unwrap Cuelinks, drop our own affiliate params. */
function storeUrl(affiliateUrl) {
  const u = new URL(affiliateUrl);
  if (u.hostname.includes('linksredirect.com')) return u.searchParams.get('url') ?? affiliateUrl;
  u.searchParams.delete('tag');
  u.searchParams.delete('affid');
  return u.toString();
}

async function setStatus(id, status) {
  const r = await fetch(`${API}/admin/deals/${id}/status`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-admin-key': KEY },
    body: JSON.stringify({ status }),
  });
  if (!r.ok) throw new Error(`${r.status} ${await r.text()}`);
}

async function main() {
  const [flag, idArg, ...rest] = process.argv.slice(2);

  if (flag === '--approve' || flag === '--reject') {
    const id = Number(idArg);
    await setStatus(id, flag === '--approve' ? 'live' : 'expired');
    console.log(`${flag === '--approve' ? 'APPROVED' : 'REJECTED'} deal ${id}${rest.length ? ` — ${rest.join(' ')}` : ''}`);
    return;
  }

  const pending = await p.deal.findMany({
    where: { status: 'PENDING_REVIEW', submittedById: { not: null } },
    orderBy: { id: 'asc' },
    select: { id: true, slug: true, title: true, price: true, mrp: true, image: true, affiliateUrl: true, submittedById: true },
  });
  if (!pending.length) return console.log('nothing pending');

  for (const d of pending) {
    const url = storeUrl(d.affiliateUrl);
    const amazon = /amazon\./i.test(url);
    const flag = [!d.image && 'no-image', !d.price && 'no-price'].filter(Boolean).join(',');

    if (amazon) {
      // curl is bot-blocked on PDPs — a human/agent checks these in the logged-in tab.
      console.log(`MANUAL  #${d.id} user${d.submittedById} ₹${d.price ?? '?'} ${flag ? `[${flag}] ` : ''}${url}`);
      continue;
    }

    let html = '';
    try {
      html = await fetch(url, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(15000) }).then((r) => r.text());
    } catch (e) {
      console.log(`SKIP    #${d.id} fetch failed: ${e.message} — ${url}`);
      continue;
    }
    const v = verifyFromHtml({}, html);
    if (v.verify !== 'ok') {
      const verdict = v.verify === 'out-of-stock' ? 'REJECT ' : 'MANUAL ';
      console.log(`${verdict} #${d.id} user${d.submittedById} ${v.verify} — ${url}`);
      continue;
    }
    if (d.price && Math.abs(v.livePrice - d.price) > 1) {
      console.log(`REJECT  #${d.id} price drift: claimed ₹${d.price} vs live ₹${v.livePrice} — ${url}`);
      continue;
    }
    if (flag) {
      console.log(`MANUAL  #${d.id} user${d.submittedById} [${flag}] live ₹${v.livePrice} — ${url}`);
      continue;
    }
    await setStatus(d.id, 'live');
    console.log(`APPROVE #${d.id} user${d.submittedById} ₹${v.livePrice} — /${d.slug}`);
  }
}

main()
  .catch((e) => { console.error(e.message); process.exitCode = 1; })
  .finally(() => p.$disconnect());
