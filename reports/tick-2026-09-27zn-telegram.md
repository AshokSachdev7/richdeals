# TELEGRAM-DEAL-MONITOR tick 2026-09-27zn (~13:05 IST)

**Result:** 1 new deal live (Tata Coffee Gold 50 g, ₹225). The audit found no rot.

## Sweep
I read the chat list for all 13 source groups in one `browser_evaluate`. Three posts were new single-product Amazon deals:

| Post | Resolved | Outcome |
|---|---|---|
| Tata Coffee Gold 50 g @225 (SB Loots) | `amazn.lt/v1xE7D5b` → B09P8VB1QC | **Pushed.** PDP shows ₹225 against an M.R.P. of ₹425, in stock, add-to-cart present, 4.2★ from 2,099 ratings. |
| Swiss Beauty Glow Fusion serum ₹249 (Online Shopping Deals) | `link.amazon/B0ctgp2YM` → B0FLXKG1QV | Skipped: already LIVE (id 11527) at the same ₹249. |
| Hitachi 1.5 ton 3-star AC @32,500 (CoolzTricks) | `amzn.to/4yV9Qab` → B0GP6BGW24 | Rejected: ₹32,500 is only reached with a ₹500 coupon plus an SBI card offer. The PDP price is ₹37,500. |

The other posts were already in the seen list (handbag, Syska, Boldfit) or were not single-product deals:
- category, sale or search links (Skybags, Swiggy);
- Supercoins;
- join-channel spam.

All 5 keys were added to `data/tg-multi-seen.json`, which now holds 2,140 entries.

## Push
- **`/admin/deals/bulk`:** HTTP 201, count 1, `created:true`.
- **Slug:** `tata-coffee-gold-original-freeze-dried-instant-coffee-jar-50-g-b09p8vb1qc`.
- **Details:** original copy, m.media-amazon.com image, `tag=ashoksachdev-21`.
- **Script:** `apps/api/scripts/push-tg-0927zn.mjs`.

## Freshness
- **IndexNow:** HTTP 200 for 4 URLs (1 slug plus the 3 standard paths).
- **Deal page:** returns 200 on prod.
- **Sitemap and llms.txt:** sitemap is ISR 1800 and llms.txt is force-dynamic, so both pick up the batch.

## CEO audit (DB-verified)
| Check | Result |
|---|---|
| Live deals | 11,240 |
| Pending review | 0 |
| Live deals with null price or image | 0 |
| Posts missing cover or SEO fields | 0 of 338 |
| Posts today (IST) | 3 (meets the 2–3 rule) |
| Broadcast cursor | 11586 vs DB max 11587. I re-read the file: the 27zl batch is fully broadcast, and the new deal is next in line. |
| Prod endpoints (7) | all 200 |
| Unpushed commits before this commit | 0 |
