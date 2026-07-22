import { readFileSync } from 'node:fs';

const raw = readFileSync(new URL('./inrdeals-campaigns.csv', import.meta.url), 'utf8');

// Fields are quoted and can contain embedded newlines. Match every "..." then chunk by 6.
const fields = [...raw.matchAll(/"((?:[^"]|"")*)"/g)].map((m) => m[1].replace(/""/g, '"'));
const cols = 6;
const rows = [];
for (let i = cols; i + cols <= fields.length; i += cols) {
  const [merchant, category, type, payout, status, link] = fields.slice(i, i + cols);
  rows.push({ merchant, category, type, payoutRaw: payout, status, link });
}

const clean = (s) => s.replace(/\s+/g, ' ').replace(/Visit Store.*/i, '').trim();
const payout = (r) => clean(r.payoutRaw).replace(/\/ ?Sale.*|\/ ?Action.*/i, '').trim();

// Only ACTIVE CPA/CPL/CPS money-signup offers we want on /offers.
const active = rows.filter((r) => /ACTIVE/i.test(r.status));
console.log('total rows:', rows.length, 'active:', active.length);

const pick = (re) => active.filter((r) => re.test(r.merchant) || re.test(r.category));

const buckets = {
  'credit-card': pick(/credit ?card| CC$|RuPay|Visa|amex|axis|hdfc|icici|sbi card|indusind/i).filter((r) => /card|cc/i.test(r.merchant)),
  demat: pick(/demat|broking|trading|zerodha|upstox|angel|groww|dhan|5paisa|paytm money/i),
  insurance: pick(/insuranc|acko|policybazaar|digit|term|health cover/i),
  loan: pick(/loan|credit line|cashe|kreditbee|moneyview|paysense/i),
  savings: pick(/savings|bank account|neo ?bank|fi money|jupiter|niyo/i),
};

for (const [k, list] of Object.entries(buckets)) {
  console.log(`\n=== ${k} (${list.length}) ===`);
  for (const r of list.slice(0, 12)) {
    console.log(`- ${r.merchant} | ${payout(r)} | ${r.link}`);
  }
}
