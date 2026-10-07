# Telegram tick 2026-10-08c (02:59 IST)

I read the sidebar for all groups in `data/tg-groups.json` with one `browser_evaluate`.

Skipped without a PDP read:
- **Multi-product / category:** Dealdost (Orient geysers, several links), NonStopDeals (Caprese handbags category), SB Loots (shampoo list, "buy max qty").
- **Card-only:** iPhone Rates (Samsung Fold 7 with SBI no-cost EMI).
- **Location-locked:** IndiaFreeStuff Tips (Swiggy Instamart).
- **Not deals:** Hidden Loot (sale teaser), own RichDeals channel, Online Shopping Deals (NIVEA deo, already handled in 08a).

3 shortlinks resolved: `amzn.to/4jtDmQb` → B08RXCM58Q, `amzn.to/4ATts09` → B08M4QF7V9, `fkrt.co/SJGgpk` → Flipkart WATEUV6EAQH3RV3S.

## Pushed: 1 (`/admin/deals/bulk` count 1, created:true, status live, id 12742, prod 200)

| Deal | Price | MRP | Rating |
|---|---|---|---|
| Vaseline Deep Moisture body lotion 400ml (B08M4QF7V9) | ₹169 | ₹580 | 4.4 (72,838), in stock, add-to-cart |

Copy uses only PDP facts. Affiliate: Amazon `tag=ashoksachdev-21`. Image from m.media-amazon.com.

## Rejected (2)

| Candidate | Reason |
|---|---|
| S2M herbal hair regrowth combo, pack of 6 (B08RXCM58Q), ₹238 | Health / ayurvedic claims; no rating shown |
| MAXIMA women's analog watch, Flipkart (WATEUV6EAQH3RV3S) | Drift: PDP ₹549 (₹521 with bank offer) vs post ₹478 |

Seen list is now 2,875 entries.

## Freshness

- IndexNow: **HTTP 200**, 4 URLs (1 deal slug plus 3 hubs).
- Sitemap: refreshes within 30 minutes (ISR).
- llms.txt: rebuilt on every request.

## CEO audit (02:59 IST)

| Check | Result |
|---|---|
| Posts today (IST) | **1** (IST day is 3 h old; later blog ticks cover the 2–3 target) |
| Coverless / SEO-less posts | 0 / 0 |
| LIVE deals with null price / image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,226 |
| Broadcast cursor | 12741 vs DB max 12742: the new Vaseline row, external cron picks it up |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | all 200 |
| Unpushed commits | 0 before this commit |
