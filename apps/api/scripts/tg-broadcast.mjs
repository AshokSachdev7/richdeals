// Auto-post NEW live deals to the RichDeals Telegram channel via bot.
// Forward-only: tracks the last-broadcast deal id in a cursor file so it never
// re-posts and never dumps the whole backlog. Run on a cron (~5 min).
// ponytail: cursor file, not a DB column — no migration, one small state file.
import { PrismaClient } from '@prisma/client';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const BOT = process.env.TG_BOT || '8677395510:AAFV59MGu5fEiU65zAouKSqs_92mP2yxnSI';
const CHAT = process.env.TG_CHANNEL || '-1004416895404';
const SITE = 'https://richdeals.in';
const JOIN = 'https://t.me/+aYRmCknf4_w0MGVl';
const MAX_PER_RUN = 5;          // avoid channel flood + telegram rate limits
const __dir = path.dirname(fileURLToPath(import.meta.url));
const CURSOR = path.join(__dir, '.tg-broadcast-cursor.json');

const api = (m, body) =>
  fetch(`https://api.telegram.org/bot${BOT}/${m}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then(r => r.json());

const inr = n => '₹' + Number(n).toLocaleString('en-IN');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const caption = (d) => {
  const off = d.mrp && d.price && d.mrp > d.price ? Math.round((1 - d.price / d.mrp) * 100) : null;
  const lines = [];
  lines.push(`🔥 <b>${esc(d.title)}</b>`);
  let price = d.price != null ? `💰 <b>${inr(d.price)}</b>` : '';
  if (d.mrp && d.price && d.mrp > d.price) price += `  <s>${inr(d.mrp)}</s>`;
  if (off != null) price += `  (${off}% OFF)`;
  if (price) lines.push(price);
  lines.push('');
  lines.push(`🛒 <a href="${SITE}/${d.slug}">Grab this deal →</a>`);
  lines.push(`📲 <a href="${JOIN}">Join RichDeals for more</a>`);
  return lines.join('\n');
};

const p = new PrismaClient();
try {
  const maxRow = await p.deal.findFirst({ where: { status: 'LIVE' }, orderBy: { id: 'desc' }, select: { id: true } });
  const maxId = maxRow?.id ?? 0;

  let cursor;
  if (fs.existsSync(CURSOR)) {
    cursor = JSON.parse(fs.readFileSync(CURSOR, 'utf8')).lastId ?? 0;
  } else {
    // First run: start a few deals back so the channel gets a kickoff, not a dump.
    cursor = Math.max(0, maxId - 3);
    console.log(`first run — cursor init to ${cursor}`);
  }

  const deals = await p.deal.findMany({
    where: { status: 'LIVE', id: { gt: cursor }, image: { startsWith: 'http' } },
    orderBy: { id: 'asc' },
    take: MAX_PER_RUN,
    select: { id: true, slug: true, title: true, price: true, mrp: true, image: true },
  });

  if (!deals.length) {
    console.log(`no new deals to broadcast (cursor ${cursor}, max ${maxId})`);
    process.exit(0);
  }

  let posted = 0, last = cursor;
  for (const d of deals) {
    try {
      const res = await api('sendPhoto', {
        chat_id: CHAT, photo: d.image, caption: caption(d), parse_mode: 'HTML',
      });
      if (res.ok) { posted++; console.log(`posted #${d.id} ${d.title.slice(0, 40)}`); }
      else {
        // photo failed (bad image URL) → fall back to text
        const t = await api('sendMessage', { chat_id: CHAT, text: caption(d), parse_mode: 'HTML', disable_web_page_preview: false });
        if (t.ok) { posted++; console.log(`posted(text) #${d.id}`); }
        else console.log(`FAIL #${d.id}: ${JSON.stringify(res).slice(0, 120)}`);
      }
      last = d.id;
      await new Promise(r => setTimeout(r, 1500)); // telegram channel rate limit
    } catch (e) { console.log(`ERR #${d.id}: ${e.message}`); }
  }

  fs.writeFileSync(CURSOR, JSON.stringify({ lastId: last, ts: Date.now() }));
  console.log(`DONE: broadcast ${posted} deal(s), cursor → ${last}`);
} finally {
  await p.$disconnect();
}
