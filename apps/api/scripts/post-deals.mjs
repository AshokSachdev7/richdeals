// Publish deals to the running API (no rebuild). Reads data/deals/*.json and
// POSTs them to /admin/deals/bulk. The API inserts + revalidates ISR pages.
// Env: API_URL (default http://localhost:4000), ADMIN_KEY.
import fs from 'node:fs';

const API = process.env.API_URL || 'http://localhost:4000';
const KEY = process.env.ADMIN_KEY;
const DIR = 'F:/new_projects/deals/data/deals/';
if (!KEY) { console.error('Missing ADMIN_KEY'); process.exit(1); }

const deals = [];
for (const f of fs.readdirSync(DIR)) {
  if (!f.endsWith('.json') || f === 'index.json') continue;
  try { deals.push(JSON.parse(fs.readFileSync(DIR + f, 'utf8'))); } catch { console.warn('skip bad json', f); }
}
console.log(`posting ${deals.length} deals -> ${API}/admin/deals/bulk`);

// chunk to stay under the API body-size limit
const SIZE = 20;
let total = 0;
for (let i = 0; i < deals.length; i += SIZE) {
  const chunk = deals.slice(i, i + SIZE);
  const res = await fetch(`${API}/admin/deals/bulk`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-admin-key': KEY },
    body: JSON.stringify({ deals: chunk }),
  });
  const out = await res.json().catch(() => ({}));
  total += out.count || 0;
  console.log(`  batch ${i / SIZE + 1}: HTTP ${res.status} +${out.count || 0}`);
}
console.log(`created/updated ${total} of ${deals.length}`);
