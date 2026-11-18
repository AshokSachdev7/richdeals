# TELEGRAM-DEAL-MONITOR tick — 2026-11-18j

The tick read the Telegram Web sidebar in the Playwright `richDeals` profile with one `browser_evaluate` over `.chat-list .ListItem.Chat`, covering all 13 groups in `data/tg-groups.json`. It resolved the two new shortlinks, deduplicated against `data/tg-multi-seen.json` and the live DB, and verified the one product on the Amazon PDP in the logged-in tab. Run at about 08:56–09:06 IST.

**Result: 0 new deals pushed, 1 LIVE deal repriced. The Telegram overnight lull ended: SB Loots (08:45) and Dealzone (08:15) posted. The SB Loots product was already LIVE as #13311 with a stale price and contradictory copy, so it was fixed in place. The Dealzone post is a category search. Every CEO-audit check is green and all 9 session crons are armed.**

## Candidates

| Group | Newest post | Outcome |
|---|---|---|
| SB Loots | 08:45 AM, `amazn.lt/djfLPOzi` → `/dp/B082GB1N7K` (Margo neem soap, 8 × 125 g) | Dedup hit on LIVE #13311. **Repriced from ₹284 to ₹252** (see below) |
| Dealzone | 08:15 AM, "Puma Women's Winter Wear upto 70% off", `link.amazon/B0dOQKn9P` | Resolves to `/s?k=puma+clothing`, a search page. Rejected |
| CoolzTricks | 12:53 AM, `amzn.to/3UXi57w` (Athom towels) | Already seen; LIVE as #16773 |
| Rogerkart | 11:18 PM, Lavie handbags master link | Category post |
| ONLINE SHOPPING DEALS | 10:05 PM, Outsup juice | Seen in an earlier tick |
| Dealdost | Tue, EUCOS tripods | Seen; rejected in 11-18c for a code-only price |
| Hidden Loot, IFS Tips & Tricks | Wed, Swiggy | Not product deals |
| INDIAN CHEAP DEALS | Oct 29 | Old |
| NonStopDeals | Oct 5 | Old |

The RichDeals channel row (08:54 AM, Parachute serum) is our own and was skipped. The remaining rows are personal chats and bots. A second sidebar read at 09:05 IST showed no further posts.

### #13311 repricing

The ASIN was already in the seen list, but a repost means the price usually moved, so the PDP was read again (`/dp/B082GB1N7K?th=1&psc=1`, same-origin fetch in the logged-in tab).

| Field | Before | PDP / after |
|---|---|---|
| Price | ₹284 | **₹252** (`.a-price-whole`) |
| MRP | ₹448 | ₹448 (M.R.P. on the page) |
| Discount | 5% | 44% |
| Title | "… at ₹300 (5% Off)" | "Margo Original Neem Soap 125 g, Pack of 8 at ₹252 (44% Off)" |
| howTo step 2 | "confirm the price shows ₹199" | "confirm the price shows ₹252" |
| Stock | — | In stock, add-to-cart present, no MOQ |

The row carried three different prices (₹284 numeric, ₹300 in the title, ₹199 in howTo), so the visible copy and the Offer schema disagreed. The fix used `prisma.deal.update` with the slug unchanged, and a `priceHistory` row (₹252) was written. The prod page served `"price":"252"` straight afterwards. The `.a-text-price` value on the PDP (₹25.20) is the per-100 g rate, not the MRP, and was ignored.

`data/tg-multi-seen.json` grew from 5,339 to 5,341 entries (`amazn.lt/djfLPOzi`, `link.amazon/B0dOQKn9P`).

## Freshness

- **IndexNow:** `indexnow-ping.mjs margo-original-neem-soap-125-g-pack-of-8-b082gb1n7k` → **HTTP 200** for 4 URLs.
- **`sitemap.xml`:** ISR 1800s. The deals child lists the top 100 only, by design.
- **`llms.txt`:** force-dynamic, so it is always current.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.46s) |
| /offers | 200 (0.12s) |
| /blog | 200 (0.91s) |
| /sitemap.xml | 200 (0.09s) |
| /feed.xml | 200 (0.13s) |
| /api/deals | 200 (0.13s) |
| /llms.txt | 200 (0.85s) |

All probes used `curl -m 30`. The local API answers 200 on :4000.

## CEO audit

Run at 09:05 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,203 = 16,203 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,783 | OK |
| Posts | 496, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,783 vs 16,783 | OK. No gap. |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList at 09:06 IST) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, **11-18 2**. No day is 0 and none is over the cap of 4. The CONTENT-SEO run at about 12:39 IST can take 11-18 to 3.

## Still open

- **Old rows with contradictory copy:** #13311 had a title price, a howTo price and a numeric price that all differed. Rows created before the title-vs-price check may carry the same rot. A sweep that diffs the `₹` in title and howTo against `price` would find them.
- **IFS redirector:** dead at g through q (11 ticks). Probe-only until the end of 11-18 IST, then repoint.
- **Same-price confirms:** these write no priceHistory row, so 95.0% of LIVE deals carry no priceValidUntil (SCHEMA-AUDIT 11-18).
- **#11896:** Flipkart drift; the Offer lapses tonight (11-18).
- **#14635 Mivi:** Flipkart, no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **DesiDime stage 1 skips Flipkart `/a/p/b?pid=` links.**
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next TELEGRAM-DEAL-MONITOR run is at about 10:03 IST, per CronList. Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
