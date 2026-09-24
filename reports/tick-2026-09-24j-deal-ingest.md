# DEAL-INGEST indiafreestuff tick — 2026-09-24j

**Published: 22 deals LIVE** through `/admin/deals/bulk`. The response was `count:22` with every row `created:true`, and each read back as LIVE (ids 11055–11076).
IndexNow: **HTTP 200 for 25 URLs** (22 slugs + 3 hub paths).

## Funnel
- **Discovery:** 65 slugs, fetched ≥2.5s apart.
  - 45 were new.
  - 41 were candidates, and all of their base64 `?rto=` Buy Now links resolved.
- **Skipped before verification (8):**
  - 7 were already LIVE in the DB: B0H2CZMRPP, B0DSF4F5HZ, B0FZH52RFN, B0DGLN88Q1, B00RZBA4BC, CMDHGKABGCHCFAGZ, B0CCNNPJMY.
  - 1 was grocery (Gits Soan Papdi).
- **Verification:** 33 checked, and 22 publish.
  - Amazon: the logged-in tab (`#centerCol`).
  - Flipkart and Myntra: the ld+json price plus stock in a Playwright tab.

## Published
| Product | Store | ID | Price | MRP | Off |
|---|---|---|---|---|---|
| B7000 precision-tip glue, 50 ml | Amazon | B0HCPHZWVL | 249 | 799 | 69% (+50% coupon) |
| BonKaso courier bags 6x8, pack of 500 | Amazon | B0H37BS2PH | 679 | 4799 | 86% |
| Crompton Galaxy leaf string light, 4 m | Amazon | B0HD7F1F46 | 359 | 1999 | 82% |
| Hosley lavender pillar candles, 2 | Amazon | B0773H53QS | 399 | 900 | 56% |
| Lavie Zarya tote | Amazon | B08KFYHZ79 | 1149 | 4499 | 74% |
| Maybelline Hypercurl mascara | Amazon | B008KH5258 | 235 | 429 | 45% |
| Maybelline Matte Ink Exhilarator | Amazon | B08H4FSGDX | 259 | 749 | 65% |
| MIKANIX ring tally counter | Amazon | B0GVFL11FC | 99 | 199 | 50% |
| Moon & Mount hand wash, 5 L | Amazon | B0DQCFMLRS | 381 | 1199 | 68% |
| Panasonic 18W B22 LED | Amazon | B086XSXPQY | 156 | 350 | 55% |
| Philips 0.5W night lamp, pack of 24 | Amazon | B0FH22RSJ8 | 996 | 2760 | 64% |
| Plantex Iris one-piece commode, S-trap | Amazon | B0GZGLLW14 | 3999 | 22400 | 82% |
| SIMPARTE 250 ml containers, set of 6 | Amazon | B0CR4B8W67 | 272 | 2999 | 91% |
| SYSKA 9W B22 LED, pack of 6 | Amazon | B0774LDZ2V | 284 | 894 | 68% |
| Unicorn eraser set | Amazon | B0F2GH2XDL | 169 | 399 | 58% |
| EAST COAST Carnage 20T kids fat bike | Flipkart | CCEH3ENXZBYFRZWK | 3671 | 18599 | 80% |
| Froh Feet women bellies, silver | Flipkart | SNDHFXHFSYUZCWNN | 534 | 1995 | 73% |
| Mamma Love baby wipes, 2 x 72 | Flipkart | WIPHFBZHZTSKVQZZ | 199 | 796 | 75% |
| Motorola AmphisoundX Vibe 220W soundbar | Flipkart | ACCHHJTD2DHHGNSU | 4799 | 17999 | 73% |
| Nike W Downshifter 13 | Flipkart | SHOHD2VWHGGF97G6 | 2491 | 4295 | 42% |
| Nike W Legend Essential 3 NN | Flipkart | SHOHCTZTUWGNT99W | 2747 | 4995 | 45% |
| French Connection gold-toned wall clock | Myntra | 29834766 | 1224 | 3499 | 65% |

Notes:
- **Low stock:** Crompton had 1 left, Plantex 2 left, and the Unicorn set 1 left. The copy says so.
- **Myntra:** the clock goes through InRDeals (`inr.deals/track?id=inr678975705`), not Cuelinks, per the affiliate matrix.

## Rejected
| Product | Reason |
|---|---|
| Kitchen scale B0CQ8JVK2D | Out of stock |
| Detangling brush B0HCVJ5PX3 | Drift: live 199 vs IFS 94 |
| OOMPH hoodie B0FTG3BQDS | Drift: 749 vs 236, and no image |
| SIMPARTE set of 4 B0CR48SGRK | Drift: 500 vs 189 |
| Vector X balls B096KKY8VL | Drift: 879 vs 498 |
| Kapiva DAJHZ4ZQKJQ9UYSU | Drift: 664 vs 650 |
| Stelite shoe rack SHKHERUNFGSTMEEV | Drift: 236 vs 322 |
| Motorola 550W soundbar | Drift: 8499 vs 7651 (IFS price was card-only) |
| Lotus WhiteGlow MSCH3G5ZRY7MSZGH | No canonical `/p/itm` path |
| Mahallya TV mount TVMGHKQDTHZREBFA | No canonical `/p/itm` path |
| Stuffiva pet bed PEBHEYK2Z3JMTADH | No canonical `/p/itm` path |

## Gates
- **Pricing:** the title ₹ equals the price, and the price is below the MRP.
- **Images:** all from the marketplace CDN (`m.media-amazon.com` `_SL`, `rukmini1.flixcart.com` at 1500px, `assets.myntassets.com`). No thumbnails.
- **Content:** descriptions are original and ≥900 chars, and each deal has 4 howTo steps.
  - Only verified facts are included. The BonKaso micron claim was left out because the page listed two conflicting figures.
- **Affiliate links:**
  - Amazon: `?tag=ashoksachdev-21`
  - Flipkart: `/p/itm…?pid=…&affid=djhackraj`
  - Myntra: InRDeals
- `tg-multi-seen.json` went from 1921 to 1943 entries. Script: `apps/api/scripts/push-ifs-0924j.mjs`.

## CEO audit (checked against the DB)
- **Deals:** LIVE 10729, max id 11076, PENDING_REVIEW 0. 0 LIVE rows have a null price or image.
- **Posts:** 327 total, 0 without a cover, 0 without SEO fields.
- **Posts per day (IST):** 09-20=2, 09-21=1, 09-22=3, 09-23=2, 09-24=3. None are 0, and none are above the cap.
- **Broadcast cursor:** lastId is 11059 against a max of 11076. The external cron is already draining this batch, so it self-heals.
- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` all return 200.
- **Git:** 0 unpushed commits before this tick.

Verdict: green.
