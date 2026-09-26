# TELEGRAM-DEAL-MONITOR tick 2026-09-26af

**2 deals pushed LIVE, ids 11414 and 11415. `/admin/deals/bulk` returned count 2. IndexNow returned HTTP 200 for 5 URLs (2 slugs + 3 hub paths).**

## Sweep
- One `browser_evaluate` read the sidebar for all 13 groups.
- **Already seen:** INDIAN CHEAP DEALS handbag (`link.amazon/B05yvriRF`), Loot Deals Syska power bank (`fkrt.co/l5KOxl`), Dealzone Samsung fridge, the iPhone, Rogerkart cashew and Hidden Loot Supercoins.
- **Not deals:** Dealdost Croma open-box sale (`bitli.in/5ca6O65`, a sale hub; added to seen), IFS Tips (a CRED post), Deal Dibba (spam) and RichDeals (our own channel).

## New links
| Group | Link | Resolved to | Verdict |
|---|---|---|---|
| SB Loots | `amazn.lt/HQ9KiMbG` | B097G96VT8, Safari Pentagon Pro set of 3 | **Pushed, id 11414** |
| CoolzTricks | `amzn.to/3TNgz7g` | B097G96VT8, the same set | Duplicate of the row above |
| ONLINE SHOPPING DEALS | `link.amazon/B0itwoBHb` | B097MRKJDX, Symbol jogger jeans | **Pushed, id 11415** |

## Verification (`#centerCol` in the logged-in tab)
| ASIN | Price | M.R.P. | Off | Coupon | Low-stock warning |
|---|---|---|---|---|---|
| B097G96VT8 | ₹4,499 | ₹33,997 | 87% | none | none |
| B097MRKJDX | ₹499 | ₹2,199 | 77% | none | none |

- **Prices:** both match the channel's price.
- **Images:** from `m.media-amazon.com` (`_SL1500_`).
- **Duplicate check:** neither ASIN was already in the DB.
- **Affiliate check:** `/out/11414` and `/out/11415` both return 302 to `amazon.in/dp/<ASIN>?tag=ashoksachdev-21`.
- **Symbol jeans:** the copy notes that the price was read on the light grey, waist 32 variant.
- **Files:** the script is `apps/api/scripts/push-tg-0926af.mjs`. `data/tg-multi-seen.json` now has 2,078 entries.

## Freshness
- **IndexNow:** HTTP 200.
- **Sitemap:** ISR with a 1800 s window.
- **llms.txt:** `force-dynamic`.
