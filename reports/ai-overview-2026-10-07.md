# AI-Overview weekly probe — 2026-10-07 (11:43 IST)

## Method
- **DataForSEO is still PAUSED.** A batch of 10 SERP tasks came back with "unusual activity … temporarily paused access" for every task. Cost was $0 and the balance is still $0.63. Only the owner can email support@dataforseo.com to lift it, and I did not contact them.
- **Fallback (free):** a live Google SERP read (`gl=in&hl=en`) in the Playwright richDeals profile, 10 queries spaced ~4s apart, with no captcha. One logged-in browser may see lightly personalised results.
- **GSC 28-day totals:** **363 clicks / 6,328 impressions, avg pos 2.4.** Last week's figure was 283 clicks over a different window, so this is roughly +28%.

## Per-query results
| Query | AIO | AIO cites | richdeals anywhere on SERP |
|---|---|---|---|
| free samples india | yes | smytten, indiafreestuff, samplr, tryandreview | no |
| flipkart offers today | yes | flipkart, pricehistory.app | no |
| amazon coupons today | yes | amazon.in, coupondunia, desidime | no |
| mixer grinder under 1500 | yes | amazon.in, reliancedigital | no |
| best mixer grinder under 3000 | yes | bajajelectricals, instamart, crompton, amazon, youtube, quora | no |
| vivo mobile price 10000 to 15000 | yes | reliancedigital, bajajfinserv, flipkart, amazon, 91mobiles, gadgets360 | **yes, as a product-surface link (not blue links, not AIO)** |
| vivo phone under 10000 | yes | bajajfinserv, flipkart, 91mobiles, amazon, gadgetsnow | no |
| vivo 5g phone list | yes | (no refs parsed) | no |
| vivo x300 fe | yes | shop.vivo, vivo.com, gsmarena, croma, youtube, amazon, flipkart | no |
| new phone 5g under 10000 | yes | reliancedigital, youtube, flipkart, amazon | no |

- **AIO citations found: 0 of 10. Missing: 10 of 10.** An AI Overview fires on all 10 probes, the same pattern as 09-30.
- **Notable change:** indiafreestuff (the source we clone) is now cited in the free-samples AIO, and desidime in amazon-coupons. Coupon and aggregator sites with authority get cited; we don't.
- GSC still has our vivo queries at pos ~1.0–1.1, which comes from the product/merchant surface fed by Product + Offer JSON-LD. Confirmed live: we appear on the `vivo mobile price 10000 to 15000` SERP outside the organic results.

## Fixed this tick: top-GSC deal-page price re-verify (last week's rec #1)
Checked the top 9 deal pages by GSC clicks against their PDPs. **7 of the 9 had drifted.**

| Page (GSC 28d) | DB | PDP now | Action |
|---|---|---|---|
| vivo X300 FE (200 clicks) | ₹94,999 | ₹94,999, In stock | OK |
| vivo Y05 (24 clicks / 928 impressions) | ₹15,999 | ₹15,999, In stock | OK |
| Powermax TDM-96B treadmill (14) | ₹14,499 | **₹15,999** (MRP ₹45,980) | re-priced to 65% off; title fixed |
| realme Narzo 100x (8) | ₹18,499 (42%) | **₹22,999** (28%) | re-priced; title and description fixed |
| Wild Stone Edge 50ml, Flipkart (7) | ₹310 | **₹351**, InStock | re-priced to 30% off; title and description fixed |
| Wolpin door wallpaper (5) | ₹188 | **₹323** (MRP ₹1,499) | re-priced to 78% off; title fixed |
| AI+ Nova 2 Pro, Flipkart (5) | ₹15,999 | ₹17,999, **OutOfStock** | → EXPIRED |
| Samsung S25 Ultra (5) | ₹90,999 | **₹1,29,999 = full MRP**, no discount | → EXPIRED |
| Frontech Rift cabinet (5) | ₹759 | **no buy box** | → EXPIRED |

- EXPIRED pages stay live with the expired banner and Discontinued availability.
- **IndexNow: HTTP 200 (10 URLs).** Prod spot check on the Narzo page: 200.

**Lesson:** a 78% drift rate on our only click-earning surface. A stale Offer price is the fastest way to lose the merchant listing that GSC reads as pos 1.

## Recommended white-hat GEO fixes (ranked)
1. **Automate the top-N price re-verify.** Do it daily inside the SEO-AUDIT-FIX tick, covering the top 20 GSC pages by impressions:
   - read each PDP;
   - `prisma.update` price/discount/title on drift;
   - set EXPIRED when the item is out of stock or the price equals MRP.

   This tick proved weekly is too slow (7 of 9 stale).
2. **Answer-first spec descriptions on the top-20 deal pages.** Narzo and Powermax still carry the raw "<listing title> available on amazon at ₹X" boilerplate. The phone AIOs answer as a list of "model — price — key specs"; match that shape using real PDP facts only (`.claude/geo-rewrite-playbook.md`).
3. **Vivo hub (`/best/vivo-phones-under-15000`).** It still needs 4 or more live vivo phone deals, and we have 2 (X300 FE, Y05). Don't build a thin hub.
4. **Head terms** (free samples, flipkart offers, amazon coupons, mixer under X): no on-page fix. The AIO and organic results are held by brand sites and high-authority aggregators (now including indiafreestuff and desidime). The lever is authority/backlinks (memory `traffic-ceiling`).
5. **DFS reinstatement is an owner action** (email support). Until then this probe stays browser-based and free.

## CEO audit (checked against the DB, 11:43 IST)
| Check | Result |
|---|---|
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | all 200 |
| LIVE deals | 12,160 (12,163 minus the 3 expired here) |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| Coverless posts | 0 |
| Broadcast cursor | 12643 = DB max 12643 |
| Unpushed commits | 0 before this report |
| **Posts today (IST)** | **0 at 11:43.** The blog cron (`97ccd52a`, every 6h at :09, 1 post per run) is alive. The 12:09 and 18:09 runs would make 2 and meet the rule. If 0 persists after 12:09, the 12:47 SITEMON tick publishes inline. |
