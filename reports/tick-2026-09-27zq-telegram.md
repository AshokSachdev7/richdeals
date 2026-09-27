# TELEGRAM-DEAL-MONITOR tick 2026-09-27zq (~14:06 IST)

**Result:** 1 new deal live (EVM EnTurbo 20000mAh power bank, ₹1,099) and 1 stale live deal price-fixed (boAt Aavante 2.0 150, ₹1,199 → ₹1,499). The audit found no rot.

## Sweep
I read the chat list for all 13 source groups in one `browser_evaluate`. Five posts were new:

| Post | Resolved | Outcome |
|---|---|---|
| EVM EnTurbo 20000mAh power bank (Dealzone) | `link.amazon/B09g2lRNH` → B0H8NQDC6N | **Pushed.** PDP shows ₹1,099 against an M.R.P. of ₹2,999 (63% off), in stock, add-to-cart present, 4.2★ from 36 ratings. |
| boAt Aavante 2.0 150 soundbar @1499 (SB Loots) | `amzn.lt/BckhjTb1` (amzn.lt DNS dead) → found by exact-title search → B0F5BC2161 | **Price-fixed in place.** Already LIVE as id 2503 at a stale ₹1,199. The PDP shows ₹1,499 / M.R.P. ₹3,990, 4.0★ (661). I updated price, discount, title, copy and howTo via Prisma. It was not re-pushed, because a bulk upsert rewrites the slug. |
| Coaster set (CoolzTricks) | `amzn.to/4rHsznu` → B0GSFK1WF1 | Rejected: channel ₹100 vs PDP ₹448. |
| KILLER deo, pack of 5 (Dealdost) | `fkrt.co/vqyPAY` → DEOGVZZSRFRYKZMP | Rejected: channel ₹399 vs ld+json ₹598. |
| Jam & Honey Panda tent ₹397 (Online Shopping Deals) | link truncated in the sidebar | Skipped: not found in Amazon search. |

The other posts were already in the seen list (handbag, Syska) or were not single-product deals (Skybags sale, Swiggy search, Supercoins, BBD pass, spam).

All 9 keys were added to `data/tg-multi-seen.json`, which now holds 2,149 entries.

## Push
- **`/admin/deals/bulk`:** HTTP 201, count 1, `created:true`.
- **Slug:** `evm-enturbo-20000mah-power-bank-22-5w-fast-charging-usb-a-and-type-c-blue-b0h8nqdc6n`.
- **Details:** original copy, m.media-amazon.com image, `tag=ashoksachdev-21`.
- **Script:** `apps/api/scripts/push-tg-0927zq.mjs`.

## Freshness
- **IndexNow:** HTTP 200 for 5 URLs (the EVM and boAt slugs plus the 3 standard paths).
- **Deal pages:** both return 200 on prod.
- **Sitemap and llms.txt:** sitemap is ISR 1800 and llms.txt is force-dynamic, so both pick up the batch.

## CEO audit (DB-verified)
| Check | Result |
|---|---|
| Live deals | 11,241 |
| Pending review | 0 |
| Live deals with null price or image | 0 |
| Posts missing cover or SEO fields | 0 of 338 |
| Posts today (IST) | 3 (meets the 2–3 rule). Last 9 days: 3/2/1/3/2/3/4/4/3, never 0. |
| Broadcast cursor | 11587 vs DB max 11588. The new deal is next in line for the external cron; not rot. |
| Prod endpoints (7) | all 200 |
| Unpushed commits before this commit | 0 |
