# Telegram tick 2026-10-08j (10:00 IST)

I read the sidebar for all groups in `data/tg-groups.json` with one `browser_evaluate`.

Skipped without a PDP read:
- **Card-only price:** SB Loots (realme washer, ICICI card price), Dealdost (Boltt ACE, "starting at" plus card offers).
- **Food:** Rogerkart (dry fruits).
- **Link cut off in the preview:** Online Shopping Deals (SOLARA air fryer).
- **Other groups:** old posts or not deals.

3 shortlinks resolved: `amzn.to/47Gd062` → B0DV43D663, `amzn.to/4jJWEka` → B0GMHBQ22V, `fkrt.pe/er4ee` → Motorola Pad 60 Neo (TABHETUGU6T947RJ).

## Pushed: 2 (`/admin/deals/bulk` count 2, both created:true, status live)

| Deal | Price | MRP | Rating | Check |
|---|---|---|---|---|
| VW Visio World 7.5 kg semi-auto washing machine, Black (B0DV43D663) | ₹6,999 | ₹18,999 (63% off) | 4.0 (2,920) | `#centerCol` price matches the channel; in stock, add-to-cart |
| MILTON Micronova Jr. casserole set of 3, Dark Brown (B0GMHBQ22V) | ₹799 | ₹2,995 (73% off) | 4.0 (722) | Price matches the channel; in stock, add-to-cart |

Copy uses only PDP facts. Affiliate: `tag=ashoksachdev-21`. Images from m.media-amazon.com.

## Rejected (1)

| Candidate | Reason |
|---|---|
| Motorola Pad 60 Neo 8/128 5G (TABHETUGU6T947RJ), Flipkart | The post gave no price. The PDP shows ₹25,999 against an MRP of ₹60,000, which looks inflated, so the "deal" can't be verified. |

Seen list is now 2,887 entries.

## Freshness

- IndexNow: **HTTP 200**, 5 URLs (2 deal slugs plus 3 hubs).
- Sitemap: refreshes within 30 minutes (ISR).
- llms.txt: rebuilt on every request.

## CEO audit (10:00 IST)

| Check | Result |
|---|---|
| Posts today (IST) | 2 |
| Coverless / SEO-less posts | 0 / 0 |
| LIVE deals with null price / image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,242 |
| Broadcast cursor | 12759 vs DB max 12761: the 2 new rows, which the external cron picks up |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | all 200 |
| Unpushed commits | 0 before this commit |
