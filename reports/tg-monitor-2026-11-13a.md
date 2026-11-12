# TELEGRAM-DEAL-MONITOR tick — 2026-11-13a

Read the 13 groups in `data/tg-groups.json` from the sidebar of the logged-in Playwright Telegram tab. Single-product Amazon `/dp/ASIN` posts were taken, shortlinks were resolved, and each item was deduped against `data/tg-multi-seen.json`. Every price was verified on the PDP in the logged-in Amazon tab (`.a-price-whole` in `#corePriceDisplay`, `#availability` + add-to-cart, M.R.P. from `#centerCol`). Run at about 04:43 IST.

**Result: 1 pushed** (`/admin/deals/bulk` returned `count:1`, `created:true`, id 16466). 1 dup LIVE row confirmed at the same price, 1 drift rejected.

## Pushed

| ASIN | Product | Price | MRP | Off |
|---|---|---|---|---|
| B0F6VGT4W7 | Milton Wondermeal insulated steel tiffin, 680 ml | ₹399 | 1,250 | 68% |

Slug: `milton-wondermeal-big-insulated-steel-tiffin-box-680-ml-blue-b0f6vgt4w7`.

## Dup LIVE row: PDP re-verify

| ID | Item | DB ₹ | PDP ₹ | MRP | Off | Note |
|---|---|---|---|---|---|---|
| 16243 | Milton Steely Prime 400 ml (B09YDC1NXV) | 299 | 299 | 1,250 | 76% | in stock, priceHistory written by hand |

## Rejected / skipped

| Item | Reason |
|---|---|
| Candy Tiffin B0FKMKKD9T | drift: post ₹99, PDP ₹199 |
| Dealzone amzn.to/48fVBBK | resolves to `/s?` search page |
| Dealdost amzn.to/4jaO6SG | resolves to `/s/` search page |
| LG B0DPHTSTYJ | already seen |
| link.amazon codes | already seen |
| Promo, Swiggy, Myntra hub, Caprese category posts | not single-product |

Seen list: +8 entries, now 5,105.

The affiliate matrix is unchanged: Amazon `tag=…-21`, Flipkart affid, Myntra → InRDeals, all other stores → Cuelinks.

## Freshness

- `indexnow-ping.mjs` for the pushed + confirmed slugs returned **HTTP 200** (5 URLs: 2 slugs + 3 hubs).
- `sitemap.xml` is ISR 1800s and `llms.txt` is force-dynamic. No new static route was added.

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints | 7/7 200 | OK |
| DB LIVE vs API total | 15,891 = 15,891 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Posts | 482, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,466 = 16,466 | OK |
| Crons | 8/9 → SCHEMA-AUDIT missing, recreated (job 8aaee1e6) → 9/9 | FIXED |
| Unpushed commits | 0 (before this report) | OK |

## Still open

- The same-price confirm paths in the desidime and TG scripts still write no priceHistory row (#16243 was done by hand this tick).
- #11896: Flipkart shows ₹664 vs ₹899 in the DB. There are also 16 bare Flipkart links and 96 drift rows.
- #3498 (GSC top deal, boAt soundbar) is EXPIRED because it is out of stock on Amazon.
- The DO API token still needs rotating (owner action).
- Amazon reuses ASINs (#2351). Older rows are unchecked.
- The price-sync helper does not fix "below/under ₹X" or "saves ₹X" copy, and cannot add a missing "% Off" token (#16173).
- Low-stock rows to re-check: Lavie B0CDL5B7VJ, Cerrito B0GC5J6BSR, Skechers B0F3X6R9RL, STANPHORD B0DH2F88XW, Giordano B0CFVWWJ4L, bean bag cover B0H9PM7Z4W, #5480 ASUS NUC.
- #14635 (Mivi, Flipkart): PDP unchecked.
- #7751 Nivia football is only 8% off; expire it if it has not dropped.

Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
