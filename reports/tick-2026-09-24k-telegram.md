# TELEGRAM-DEAL-MONITOR tick — 2026-09-24k

**Published: 4 deals LIVE** through `/admin/deals/bulk`. The response was `count:4` with every row `created:true`, and each read back as LIVE (ids 11077–11080).
IndexNow: **HTTP 200 for 7 URLs** (4 slugs + 3 hub paths).

## Funnel
- **Discovery:** one sidebar `browser_evaluate` covered all 13 groups, plus a read of the open ONLINE SHOPPING DEALS chat to get the links cut off in the preview.
- **Shortlinks:** 11 resolved (`link.amazon`, `amzn.to`, `fktr.in`, `fkrt.cc`, `fkrt.co`).
- **Duplicates, already LIVE (5):**
  - B0G38DGNKM, a handbag (7110)
  - PERGVYSZHSZFCRGB, a Man Company gift set (6409)
  - PWBGGD4THDQZYAY6, a Syska power bank
  - B0DCBBMSNS, an ONCH frock (11027)
  - B0DSLC124L, a CADLEC fan (4291)
- **Skipped as noise:**
  - Deal Dibba join-bait, Hidden Loot "midnight loot", IFS Tips Instamart search, OMG video spam.
  - The Rogerkart frock is the same ONCH item and is already LIVE.

## Published
| Product | Store | ID | Price | MRP | Off |
|---|---|---|---|---|---|
| Amazon Basics triply cookware set, 7 pcs | Amazon | B0GTN4ZKXZ | 2888 | 9990 | 71% |
| Himalaya Total Care baby pants XXL, 88 count | Amazon | B0H6BHJHCB | 1150 | 2398 | 52% |
| XONCO solar firefly garden light | Amazon | B0HKRC8ZX2 | 499 | 1199 | 58% (+35% coupon, about ₹325) |
| Lotus Botanicals Vitamin C 5-step facial kit | Flipkart | FCKGT7FFFSRAYVM7 | 153 | 499 | 69% |

- The channel posted the solar light at ₹325. That figure is after the coupon, so we list the live price of ₹499 and name the 35% coupon in the how-to steps.
- Amazon prices were checked in the logged-in tab (`#centerCol`). Flipkart was checked in a Playwright tab: ld+json gave price 153 and InStock, and the MRP of 499 was read beside the price.

## Gates
- **Pricing:** the price in each title matches the deal price, and every price is below its MRP.
- **Images:** all from the marketplace image servers (`m.media-amazon.com` at `_SL1500_`, and `rukmini1.flixcart.com` at 1500px).
- **Content:** every description is original, at least 900 characters, and uses only facts verified on the product page. Each deal has 4 how-to steps.
- **Affiliate links:** Amazon links use `?tag=ashoksachdev-21`. Flipkart links use the `/p/itm…?pid=…&affid=djhackraj` format.
- **Records:** `tg-multi-seen.json` grew from 1943 to 1947 entries. Script: `apps/api/scripts/push-tg-0924k.mjs`.

## CEO audit (checked against the DB)
- **Deals:** 10733 LIVE, max id 11080, 0 PENDING_REVIEW. No LIVE deal has a null price or a null image.
- **Posts:** 327 in total. None is missing a cover or its SEO fields.
- **Posts per day (IST):** 09-20=2, 09-21=1, 09-22=3, 09-23=2, 09-24=3. No day at 0, none over the cap.
- **Broadcast cursor:** at 11074, while the highest deal id is 11080. The gap is this batch, which the external cron is working through.
- **Production endpoints:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt` and `/api/deals` all return 200.
- **Git:** no commits were waiting to be pushed before this tick.

Verdict: green.
