# AI-OVERVIEW weekly tick — 2026-11-18

## Method

Eight money queries were probed on google.com (`gl=in`, `hl=en`) in the Playwright `richDeals` profile at about 11:40 IST. For each query the tick recorded whether an AI Overview appeared, which domains it cited, and the top organic domains. DataForSEO stays paused, so no paid data was used. Google Search Console was pulled for the last 28 days (10-20 → 11-16) with `scripts/gsc-pull.mjs`, by query and by page.

**Result: an AI Overview appeared on 7 of 8 queries. richdeals.in was cited 0 times and is not in the organic top 10 for any of them. GSC is down to 3 clicks and 222 impressions over 28 days. One GEO fix shipped: the free-samples guide now covers Samplr and Try and Review India, the two platforms the free-samples AI Overview cites most that the post did not mention. IndexNow returned HTTP 200. No code changed, so nothing was deployed.**

## Per-query results

| Query | AIO | AIO cites | Top organic | richdeals |
|---|---|---|---|---|
| amazon coupons | Yes | amazon.in, grabon.in | coupondunia, groupon, amazon.in, grabon, koupon.ai, amazon.com, theshoppingfriendly | not cited, not top 10 |
| flipkart offers | Yes | flipkart.com, cashify.in | flipkart, pricehistory.app, instagram, bajajfinserv, cashify | not cited, not top 10 |
| free samples india | Yes | samplr.in, smytten, tryandreview, indiafreestuff, instagram, earticleblog, desidime | indiafreestuff, samplr, smytten, instagram, tryandreview, earticleblog, wraply, twasa | not cited, not top 10 |
| how to get free samples in india | Yes | smytten, samplr, tryandreview, instagram, indiafreestuff, youtube, desidime, earticleblog | samplr, smytten, indiafreestuff, tryandreview, instagram, twasa, desidime, earticleblog | not cited, not top 10 |
| hot deals india | Yes | desidime, dealsmagnet, indiafreestuff, freekaamaal, amazon.in, flipkart | dealofthedayindia, flipkart, dealsmagnet, desidime, x.com, thuttu, amazon.in, realcash, indiafreestuff | not cited, not top 10 |
| best deals india | **No** | — | x.com, flipkart, amazon.in, dealsmagnet, dealofthedayindia, market99, buyhatke, instagram, reddit | not top 10 |
| flipkart deals | Yes | flipkart, pricehistory.app, dealsmagnet, grabon | flipkart, offertag, pricehistory.app, thuttu, instagram, reddit, dealsmagnet, youtube | not cited, not top 10 |
| best running shoes under 1500 | Yes | amazon.in, reddit | amazon.in, reebok.abfrl, myntra, youtube, puma, flipkart, instagram | not cited, not top 10 |

**How the free-samples AI Overview is built:** an answer-first sentence, then numbered groups: (1) sampling platforms (Smytten, Samplr, Fabpiks), (2) e-commerce trial sizes, (3) testing communities (Try and Review, brand campaigns such as P&G/Gillette, and aggregators such as India Free Stuff). Our post covered Smytten, PgTry and Amazon, but not Samplr or Try and Review.

## Most-cited domains across the 7 AI Overviews

| Domain | AIO citations |
|---|---|
| amazon.in / flipkart.com (merchants) | 5 |
| desidime.com | 3 |
| indiafreestuff.in | 3 |
| samplr.in, smytten.com, tryandreview.com, instagram.com, earticleblog | 2 each |
| grabon.in, dealsmagnet.com, pricehistory.app | 2 each |
| cashify.in, freekaamaal, youtube, reddit | 1 each |

The AI Overviews cite merchants, big communities (DesiDime, Reddit), social posts (Instagram, YouTube) and the platforms themselves. Every cited deal aggregator ranks in the organic top 10 for the same query. Citation follows ranking, and we do not rank.

## Search Console, 28 days (10-20 → 11-16)

| Cut | Clicks | Impressions | Notes |
|---|---|---|---|
| By query | 1 | 85 | The only click is the brand query "richdeals" (pos 7) |
| By page | 3 | 222 | `/` 2 clicks / 90 impr (pos 63.6); `/about` 1 click (pos 2.4) |

Money-query positions: flipkart offers 51, best deals india 68.7, flipkart deals 71, hot deals 74, free samples 85, "online discount shopping site in india" 35. The free-samples post had 7 impressions at pos 36.6. A few deal pages sit at pos 4–6 with 1 impression each.

The 10-28 run saw 11 clicks / 395 impressions. Traffic fell by about 70% in three weeks. This is consistent with the earlier findings that the ceiling is domain authority and that Google pulled merchant listings site-wide on 09-28; on-page work alone has not moved it.

## Delta since 10-28

- AI Overview coverage: 8/8 → 7/8 ("best deals india" no longer shows one).
- richdeals citations: 0 → 0.
- The 11-04 and 11-11 weekly runs did not happen; this run covers three weeks.
- Samplr and Try and Review India are new heavy hitters in the free-samples AI Overview.

## Fixed this tick

**`/blog/how-to-get-free-samples-freebies-india` (post 38), DB body update via Prisma:**

- Date line changed to "Updated November 2026".
- Answer-first paragraph now names Samplr and Try and Review India alongside Smytten and PgTry.
- Smytten brand count updated from "1,000+" to "1,200+" (both places), per smytten.com's own copy ("Trial Packs from 1200+ top brands", "250+ lifestyle categories").
- Two new rows in the sources table:
  - **Samplr**: food, personal care, wellness, pet and home samples matched to a lifestyle profile; free, delivered free; flow is profile → first set → review → next set. All taken from samplr.in.
  - **Try and Review India**: full-size products for home testing; sign up, apply per product test, selected testers get it shipped home, review expected. Taken from tryandreview.com/in.
- A "Quick difference between the three apps" paragraph, which also notes that Fabpiks, still listed by older guides, now describes itself as a vending-machine, micro-store and sampling business. Fabpiks was not added as a source, because its consumer flow could not be verified.
- A new FAQ entry, "Smytten vs Samplr vs Try and Review: which should I use?".
- seoDesc rewritten to name Smytten, Samplr, Try and Review, PgTry and Nykaa (157 chars).

Body went from 13,076 to 14,443 characters. Prod returned 200 and already serves the new copy ("Samplr" appears 20 times in the HTML). No fact was invented: every platform claim was read from the platform's own site on 11-18.

**Freshness:** `indexnow-ping.mjs --paths /blog/how-to-get-free-samples-freebies-india /blog /freebies /sitemap.xml` → **HTTP 200 for 4 URLs**. The sitemap blog child is ISR 1800s and `llms.txt` is force-dynamic, so both pick up the change without action.

**Not done this tick:** re-verifying prices on the three deal pages that got impressions (Alienware B0G1TN6T5T, Amazon Basics phone stand B0H2W6PNB2, boAt Aavante on Flipkart). The hourly price-sync and Telegram ticks cover those rows; worth a PDP read on the next SEO-AUDIT-FIX run.

## Recommended fixes, ranked

1. **Be present where the AI Overviews already look.** Instagram, YouTube, Reddit and DesiDime-style community threads are cited on 5 of 7 queries. A RichDeals Instagram/YouTube presence that posts the same verified deals, and genuine community participation, is the realistic path to a citation. Posting as the owner to outside platforms needs the owner's go-ahead, so this stays a recommendation.
2. **Domain authority is the ceiling.** Every cited aggregator also ranks top 10 organically. Until richdeals.in earns real backlinks (see `.claude/backlink-campaign.md`), on-page GEO edits raise readiness but not citations.
3. **Price-history angle for the Flipkart queries.** pricehistory.app is cited for both "flipkart offers" and "flipkart deals". Our deal pages already store PriceHistory rows; surfacing a visible "price over time" block on deal pages would give the same signal with real data.
4. **Answer-first block on `/freebies`.** The hub has no short "where to get free stuff in India" answer at the top. A 2–3 sentence answer plus a link to the free-samples guide would match the shape the AI Overview uses.

## Prod endpoints

| Endpoint | Status |
|---|---|
| / | 200 (0.44s) |
| /offers | 200 (0.12s) |
| /blog | 200 (0.71s) |
| /sitemap.xml | 200 (0.12s) |
| /feed.xml | 200 (0.13s) |
| /api/deals | 200 (0.19s) |
| /llms.txt | 200 (0.66s) |
| /blog/how-to-get-free-samples-freebies-india | 200 (0.72s) |

All probes used `curl -m 30`.

## CEO audit

Run at about 11:50 IST.

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,212 = 16,212 | OK |
| PENDING_REVIEW | 2 (16261, 16262), member queue | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 16,792 | OK |
| Posts | 496, 0 coverless, 0 seo-less | OK |
| Broadcast cursor vs max | 16,792 vs 16,792 | OK, fully drained |
| Unpushed commits | 0 (after `git fetch`, before this report) | OK |
| Session crons vs roster | 9 of 9 present (CronList) | OK |

Posts per day (IST): 11-09 3, 11-10 3, 11-11 3, 11-12 3, 11-13 2, 11-14 2, 11-15 2, 11-16 3, 11-17 3, **11-18 2**. No day is 0 and none is over the cap of 4. The CONTENT-SEO run at about 12:39 IST can take 11-18 to 3.

## Still open

- **GSC traffic down ~70% since 10-28** (3 clicks / 222 impressions in 28 days). Brand and `/about` are the only clicks.
- **RR Raptor fan MRP:** #16784 carries ₹11,990, while the same fan under B0FC2NLJTF shows ₹6,499. The 77% discount may rest on an inflated MRP.
- **Old rows with contradictory copy:** title ₹ or howTo ₹ that differs from `price` on rows created before the check.
- **IFS redirector:** dead at g through r (12 ticks). Probe-only until the end of 11-18 IST, then repoint.
- **Same-price confirms:** write no priceHistory row, so 95.0% of LIVE deals carry no priceValidUntil.
- **#11896:** Flipkart drift; the Offer lapses tonight (11-18).
- **#14635 Mivi:** Flipkart, no priceValidUntil.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756.
- **DesiDime stage 1 skips Flipkart `/a/p/b?pid=` links.**
- **ASIN reuse:** #2351, #15344 and #6989. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **DO API token:** still needs rotating (owner action).

The next AI-OVERVIEW run is 11-25 at about 11:39 IST, per CronList. Session crons auto-expire around 11-19. To re-arm them, the owner says "restore all crons".
