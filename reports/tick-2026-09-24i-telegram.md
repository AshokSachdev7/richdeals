# TELEGRAM-DEAL-MONITOR tick — 2026-09-24i (~16:35 UTC / 22:05 IST)

**Published: 2 deals LIVE** through `/admin/deals/bulk`. The response was `count:2` with both rows `created:true`, and each read back as LIVE (ids 11053–11054).
IndexNow: **HTTP 200 for 5 URLs** (2 slugs + 3 hub paths).

## Funnel
- **Sidebar read of all groups:** 4 fresh posts since tick 0924h: CoolzTricks (Nike range), SB Loots (Aroma earbuds), Dealzone (`link.amazon/B0fqDKQZ1`) and Dealdost ("FAST ₹2091"). The other rows were old, non-deal, or our own channel.
- **Resolved:**
  - `fktr.in/WCCUkWa` goes through a linkredirect `dl=` to Flipkart `/p/itm07f71fd662016`, pid ACCHP5YXXSMJCJSS.
  - `fkrt.cc/hjCpiIt` goes to Flipkart `/p/itm42f39a57c87ae`, pid CMDHGKABGCHCFAGZ. Their `affid`/`ENKR` params were stripped.
  - `link.amazon/B0fqDKQZ1` goes to B09T2WJWZL. Their `glitzdeal05-21` tag was stripped.
- **Dedup:** all three IDs were new against both the seen list and the DB.

## Published
| Product | Store | ID | Price | MRP | Off |
|---|---|---|---|---|---|
| Aroma NB121 Pro Pods2 earbuds (ENC, dual pairing) | Flipkart | ACCHP5YXXSMJCJSS | 300 | 1499 | 80% |
| JABON BAGNO wall-hung western commode, soft-close seat, P-trap | Flipkart | CMDHGKABGCHCFAGZ | 2091 | 4999 | 58% |

- **Aroma:** ld+json shows 300 and InStock. The page says "Lowest Price since Launch" and rates it 3.7 across 21k ratings.
  - The first MRP regex matched an ad card, which read 599 against 2699. I re-read the block next to `₹300` and got MRP 1,499.
  - The copy says ENC is not ANC, so it doesn't overclaim.
- **Commode:** ld+json shows 2091 and InStock, which matches the post's "₹2091". The page shows MRP 4,999.
  - The copy tells buyers to confirm with a plumber whether the cistern and frame are included. It does not claim either way.

## Rejected
| Product | Reason |
|---|---|
| Feather's 2-ply tissue napkins B09T2WJWZL (Dealzone) | Drift: the post said "78" but the live `#centerCol` shows ₹299 (MRP 560). It is also low-ticket FMCG. |
| CoolzTricks "Upto 50% off Nike shoes" | Multi-product range (two category links) |

## Gates
- Title ₹ equals price, and price is below MRP.
- Images come from `rukmini1.flixcart.com` at 1500px.
- Descriptions are original and ≥900 chars, and each deal has 4 howTo steps.
- Affiliate: `/p/itm…?pid=…&affid=djhackraj`.
- `tg-multi-seen.json` now holds 1921 entries. Script: `apps/api/scripts/push-tg-0924i.mjs`.

## CEO audit (checked against the DB)
- **Deals:** LIVE 10707, max id 11054, PENDING_REVIEW 0. 0 LIVE rows have a null price or image.
- **Posts:** 327 total, 0 without a cover, 0 without SEO fields.
- **Posts per day (IST):** 09-20=2, 09-21=1, 09-22=3, 09-23=2, 09-24=3. None are 0, and none are above the cap.
- **Broadcast cursor:** re-read the file. lastId is 11052 against a max of 11054, a gap of 2: this batch. The external cron drains it, so it self-heals.
- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` all return 200.
- **Git:** 0 unpushed commits before this tick.

Verdict: green.
