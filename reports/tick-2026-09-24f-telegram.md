# TELEGRAM-DEAL-MONITOR tick — 2026-09-24f (13:35 UTC / 19:05 IST)

**Published: 2 deals LIVE** through `/admin/deals/bulk`. The response was `count:2` with both rows `created:true`, and each read back as LIVE (ids 11024–11025).
IndexNow: **HTTP 200 for 5 URLs** (2 slugs + 3 hub paths).

## Funnel
- The sidebar read of all 13 groups found 4 fresh single-product posts: SB Loots (`fktr.in`), Dealdost (`amzn.to`), Rogerkart (`fkrt.co`) and CoolzTricks (`fkrt.cc`).
  - ONLINE SHOPPING DEALS: its last visible `link.amazon` posts were all already seen, and the Sluban post was not loaded.
  - The rest were stale, t.me, photo-only or location-check posts.
- I resolved the 4 links and deduped them: none were in `tg-multi-seen` or the DB.
- I read the product pages: Amazon in the logged-in tab (`#centerCol`), Flipkart in a Playwright tab (ld+json).

## Published
| Product | Store | ID | Price | MRP | Off |
|---|---|---|---|---|---|
| Onida 55" Nexg 4K QLED Mini LED Google TV MZ55MIN | Amazon | B0FJ8FW86L | 43499 | 69990 | 38% |
| Adrenex Stryker 24T mountain cycle, 16" frame | Flipkart | CCEHMZBVQHXGK4M3 | 3095 | 10499 | 71% |

- **Onida:** the post quoted ₹39,749, which is ₹43,499 minus a ₹3,750 bank offer. The deal is listed at the pre-bank live price, and the bank offer is named in howTo step 4. Only 1 unit was left in stock.
- **Adrenex:** the ld+json shows ₹3,095 and InStock, which matches the post. The "Buy at ₹2,793" figure needs a bank offer, so it is not used.

## Rejected
| Product | Reason |
|---|---|
| Zebronics Zeb-Jet headphone ACCH6DM8XY2BFRHH | Drift: ₹799 posted, ₹1,699 live. Added to the seen list. |
| CoolzTricks cabin suitcase (`fkrt.cc/hKJJueE`) | Resolves to a Flipkart category/search page, not a product |

## Gates
- Title ₹ equals price, and price is below MRP.
- Images come from the marketplace CDN only (`m.media-amazon.com`, `rukmini1.flixcart.com`), with no thumbnails.
- Descriptions are original and ≥900 chars, and each deal has 4 howTo steps.
- Affiliate:
  - Amazon: `/dp/ASIN?tag=ashoksachdev-21`
  - Flipkart: `/p/itm…?pid=…&affid=djhackraj`
- `tg-multi-seen.json` now holds 1867 entries. Script: `apps/api/scripts/push-tg-0924f.mjs`.

## CEO audit (checked against the DB)
- **Deals:** LIVE 10678, EXPIRED 259, max id 11025, PENDING_REVIEW 0. 0 LIVE rows have a null price or image.
- **Posts:** 327 total, 0 without a cover, 0 without SEO fields.
- **Posts per day (IST):** 09-20=2, 09-21=1, 09-22=3, 09-23=2, 09-24=3. None are 0, and none are above the cap.
- **Broadcast cursor:** re-read the file. lastId is 11022 against a max of 11025, a gap of 3: the last IFS row plus this batch. The external cron drains it, so it self-heals.
- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` all return 200.
- **Git:** 0 unpushed commits before this tick.
