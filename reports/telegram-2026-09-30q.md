# Telegram deal monitor — 2026-09-30q

I read all 13 source groups in one sidebar pass.

## Candidates
| Group | Post | Result |
|---|---|---|
| Dealzone | link.amazon/B0g1yHhx7, which resolves to FYLTR men's cotton tee, pack of 2, B0FHVNSVJP | **Pushed.** Amazon PDP shows ₹199 against ₹1,299 M.R.P. (85% off), in stock |
| SB Loots | CADLEC GrindGenie 750 W mixer grinder (amzn.lt shortlink, which does not resolve over DNS) | Already live as deal 6335 (B0FLWR2TT6). The repost meant the price had moved, so I re-read the PDP: **₹999**, down from ₹1,200. I updated the row's price, discount (71%), title and how-to with Prisma |
| ONLINE SHOPPING DEALS | Presto Colobleach | Already seen, skipped |
| INDIAN CHEAP DEALS | Ladies handbag | Already seen, skipped |
| Loot Deals 24x7 | Syska 10000 mAh power bank (Flipkart) | Already seen, skipped |
| Dealdost | Multi-product keyboard/mouse list | Skipped (not a single product) |
| Hidden Loot / IFS Tips / Coolz / Rogerkart / OMG | Supercoins, app promos, photo-only posts | Skipped |

- **Bulk push (localhost:4000, same DB):** `count:1`, created:true.
  - The prod key returned 401. The local key is correct for the local API.
- **IndexNow:** HTTP 200 for 5 URLs (the 2 slugs plus 3 hub pages).
- **New deal page:** returns 200 on prod.
- **Seen list:** `tg-multi-seen.json` now has 2,407 entries.

## CEO audit (checked against the DB)
- **Prod endpoints:** 7/7 return 200.
- **Deals:** LIVE 11,665 · null price 0 · null image 0 · PENDING_REVIEW 0.
- **Posts:** 3 today (IST) · coverless 0 · seo-less 0.
- **Broadcast cursor:** 12037 against a DB max of 12038. The one-deal lag is the new FYLTR deal; the external cron drains it.
- **Unpushed commits:** 0.
- **Carried forward:** the DataForSEO account is paused, and the owner has to email their support.
