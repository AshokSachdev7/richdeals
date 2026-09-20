// GSC Search Analytics puller. Zero deps — signs a service-account JWT with
// node crypto, gets an OAuth token, queries searchAnalytics.
// Setup: drop the service-account JSON at apps/api/gsc-key.json (gitignored),
// add that SA email as a user on the GSC property, then:
//   node scripts/gsc-pull.mjs [days] [query|page]
// Defaults: 28 days, dimension=query. Site from GSC_SITE env or the default below.
import { readFileSync } from 'node:fs';
import { createSign } from 'node:crypto';

const SITE = process.env.GSC_SITE || 'sc-domain:richdeals.in'; // or 'https://richdeals.in/'
const DAYS = Number(process.argv[2] || 28);
const DIM = process.argv[3] || 'query';
const ROWS = Number(process.argv[4] || 1000);
const KEY = JSON.parse(readFileSync(process.env.GSC_KEY || 'C:/Users/djhac/Downloads/richautomate-seo-b6fd3a72295e.json'));

const b64 = o => Buffer.from(JSON.stringify(o)).toString('base64url');
async function token() {
  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: KEY.client_email,
    scope: 'https://www.googleapis.com/auth/webmasters.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now, exp: now + 3600,
  };
  const unsigned = `${b64({ alg: 'RS256', typ: 'JWT' })}.${b64(claim)}`;
  const sig = createSign('RSA-SHA256').update(unsigned).sign(KEY.private_key, 'base64url');
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${unsigned}.${sig}`,
    }),
  });
  const j = await res.json();
  if (!j.access_token) throw new Error('token failed: ' + JSON.stringify(j));
  return j.access_token;
}

const iso = d => d.toISOString().slice(0, 10);
const end = new Date(Date.now() - 2 * 864e5);        // GSC data lags ~2 days
const start = new Date(end - (DAYS - 1) * 864e5);

const tok = await token();
const res = await fetch(
  `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`,
  {
    method: 'POST',
    headers: { authorization: `Bearer ${tok}`, 'content-type': 'application/json' },
    body: JSON.stringify({ startDate: iso(start), endDate: iso(end), dimensions: [DIM], rowLimit: ROWS }),
  },
);
const j = await res.json();
if (j.error) throw new Error(JSON.stringify(j.error));
const rows = j.rows || [];
const tot = rows.reduce((a, r) => ({ c: a.c + r.clicks, i: a.i + r.impressions }), { c: 0, i: 0 });
console.log(`GSC ${SITE}  ${iso(start)}→${iso(end)}  by ${DIM}`);
console.log(`TOTAL  clicks=${tot.c}  impressions=${tot.i}  (top ${rows.length} rows)\n`);
console.log('clicks  impr   pos   ctr%   ' + DIM);
for (const r of rows) {
  console.log(
    `${String(r.clicks).padStart(5)}  ${String(r.impressions).padStart(5)}  ${r.position.toFixed(1).padStart(5)}  ${(r.ctr * 100).toFixed(1).padStart(5)}   ${r.keys[0]}`,
  );
}
