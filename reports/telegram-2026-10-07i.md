# Telegram tick 2026-10-07i (19:59 IST)

I read the sidebar for all 13 groups in `data/tg-groups.json` with one `browser_evaluate`.

Skipped without a PDP read:
- **Loot or category posts:** SB Loots (Calvin Klein), Dealzone (Myntra footwear), Dealdost (SPARX).
- **Location-locked:** Swiggy Instamart posts.
- **FMCG:** hand washes.
- **Already seen:** posts in the other groups.

That left 5 resolved Amazon links. None were in the seen list or the DB.

## Pushed: 2 (`/admin/deals/bulk` count 2, both created:true, status live, prod 200)

| Deal | Price | MRP | Rating |
|---|---|---|---|
| THE Indian Garage Co men cotton trucker jacket, Steel Grey (B0BNLLBR3V), id 12702 | ₹585 | ₹3,249 | 3.7 (31) |
| Faber Artemis 60cm 1200m³/hr filterless chimney (B0DBLBJTYK), id 12703 | ₹7,990 | ₹30,990 | 4.4 (235) |

Every price was read from the Amazon PDP (`#centerCol`) with a same-origin fetch in the logged-in tab. Both match the channel price, both are in stock, and both have add-to-cart. Images are `#landingImage[data-old-hires]`. The copy uses only PDP bullets.

## Rejected (3)

| Candidate | Reason |
|---|---|
| Glen 60cm 1250 m³/h split chimney (B09717SPPF) | Only 1 left; 6 ratings |
| Allen Solly kids jeans (B0B59KX2T3) | Currently unavailable, no add-to-cart |
| Allen Solly kids jeans (B0F8HQSWBS) | Currently unavailable, no add-to-cart |

The seen list is now 2,849 entries.

## Freshness

- IndexNow: **HTTP 200**, 5 URLs (2 deal slugs plus 3 hubs).
- Sitemap: refreshes within 30 minutes (ISR).
- llms.txt: rebuilt on every request.

## CEO audit (19:59 IST)

| Check | Result |
|---|---|
| Posts today (IST) | **2.** The rule (2–3 per day) is met. |
| Coverless / SEO-less posts | 0 / 0 |
| LIVE deals with null price / image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,190 (12,188 + 2) |
| Broadcast cursor | 12671 vs DB max 12703. Only rows 12702 and 12703 exist above the cursor; ids 12672–12701 were used up by upserts and never became rows. The external cron picks up the 2 new rows. |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | all 200 |
| Unpushed commits | 0 before this commit |
