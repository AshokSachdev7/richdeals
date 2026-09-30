# AI-Overview weekly probe — 2026-09-30

## Method
- **DataForSEO is PAUSED on their side.** Every SERP task returned "We noticed some unusual activity in your DataForSEO account, so we've temporarily paused access as a precaution". Cost was $0 and the balance stays $0.63. Reinstating it means emailing support@dataforseo.com as the account owner, so the **owner has to do it**; I did not contact them.
- **Fallback (free):** a live Google SERP read (`gl=in&hl=en`) in the Playwright richDeals profile, with no captcha across 9 queries. Caveat: this is one logged-in browser, so results may be lightly personalised; DFS is the neutral probe.
- GSC 28-day pull (09-01 → 09-28): **283 clicks / 5,208 impressions by page** (161 / 2,262 by query; the rest is anonymised queries).

## Per-query results
| Query | AI Overview | AIO cites | richdeals in page-1 organic | GSC pos (ours) |
|---|---|---|---|---|
| free samples india | yes | smytten.com (+1) | no — samplr, indiafreestuff, smytten, desidime, mysamplehub, tryandreview | — |
| flipkart offers today | yes | flipkart.com | no — flipkart, pricehistory.app, dealsmagnet, grabon | — |
| amazon coupons today | yes | amazon.in | no — grabon, amazon, coupondunia, desidime | — |
| mixer grinder under 1500 | yes | YouTube (+1) | no — amazon, flipkart, smartprix, meesho | — |
| vivo phone under 10000 | yes | reliancedigital.in | no — flipkart, reliancedigital, gadgets360, 91mobiles | **1.1** (6 clicks) |
| vivo mobile price 10000 to 15000 | yes | reliancedigital.in (+1) | no — flipkart, 91mobiles, smartprix, shop.vivo | **1.1** (103 impr) |
| vivo y05 price | yes | shop.vivo.com | no — flipkart, shop.vivo, amazon, 91mobiles | **1.0** (269 impr) |
| vivo x300 fe price | yes | cashify.in | no — shop.vivo, flipkart, amazon, gsmarena | top page: **146 clicks** |
| vivo 5g mobile | yes | shop.vivo / vivo.com | no | **1.0** (5 clicks) |

**Citations found: 0 of 9. Citations missing: 9 of 9.** AI Overviews now fire on every money query, including all the product/price queries. Last week (09-17) it was 4 of 5 probes.

## The real finding: we rank on the product surface, not organic
- GSC reports position ~1.0 for the vivo cluster, but richdeals.in is **not** in page-1 blue links for any of those queries.
- The clicks come from Google's product/merchant surfaces, fed by our Product + Offer JSON-LD. The AIO for those queries is built from the same product grid ("₹9,999 · Reliance Digital", "SuryaStores & more").
- Top page by clicks: **vivo X300 FE deal page, 146 clicks at pos 1.7 (17.4% CTR)**. Then vivo Y05 (21 clicks / 761 impressions), a Powermax treadmill (12) and realme Narzo 100x (8). **Deal pages ARE the traffic** (confirms memory `gsc-winner-page`).
- ⇒ **Price accuracy on high-impression deal pages is the #1 GEO lever**: a stale Offer price gets the listing dropped or demoted from merchant surfaces.

## Fixed this tick
- **vivo Y05 (id 979, B0H2Z7X8XK):** the DB price was ₹12,999 (set in July) and the Amazon PDP now shows **₹15,999** (M.R.P. ₹34,999, In stock, add-to-cart present, 3.8★ from 61 ratings). This is our #2 page by impressions, and it was serving a Product schema price ₹3,000 wrong.
  - Updated price, discountPct 63 → 54, and the title.
  - Rewrote the one-line description as an answer-first spec block (display, RAM/storage, 6500 mAh, cameras, OS, rating, who it suits, dated price note). Every fact comes from the Amazon listing.
  - IndexNow **HTTP 200** (4 URLs).
  - The web fetch revalidates in 300s.
- **vivo X300 FE (id 1016):** PDP ₹94,999 = DB ₹94,999, In stock. It was already refreshed today (04:37 UTC). No change.

## 09-17 recommendations — applied?
- Free-samples hub title is now "Free Samples in India (2026): Real Sites + Scam Check", with Smytten (32 mentions), TryKiya and FAQPage. **Done.** It still does not rank on page 1 (see the authority ceiling in memory `traffic-ceiling`).
- `/freebies`, `/coupons` and the free-samples hub are in `/llms.txt`. **Done.**
- `/coupons` title is "Amazon Coupons Today – Clip Coupon Deals in India", with a clip-coupon explainer and FAQPage. **Done.** It still does not rank.
- robots.txt allows GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot and Google-Extended. **OK.**

## Recommended white-hat GEO fixes (ranked)
1. **Weekly price re-verify of the top-20 GSC deal pages** (by impressions) on the PDP, and fix drift via `prisma.update`. Y05 was 10 weeks stale on a pos-1 page. Cheap, and it protects the only surface that earns clicks. Fold it into the SEO-AUDIT-FIX daily tick.
2. **Answer-first spec descriptions on the top-20 deal pages.** Most are one-liners. The AIO for phone queries answers with a "model — price — key specs" list; give the page the same shape (price sentence first, spec bullets, dated price note). Use real PDP facts only, per `.claude/geo-rewrite-playbook.md`.
3. **A vivo-under-price hub** (`/best/vivo-phones-under-15000`, using the existing `lib/best.ts` pattern). It would list our live vivo deal pages with a price + specs table and PAA FAQs taken straight from the SERP:
   - "Which Vivo 5G mobiles under 10,000 to 15000 rupees have fast charging?"
   - "Which 5G phone under ₹15,000 has 8GB RAM and 256GB ROM?"
   - "Is there a Vivo T4x 5G phone under ₹15,000 in India?"

   It gives the cluster an internal-link hub instead of lone deal pages. Build it only once there are 4+ live vivo phone deals; there are 2 today, and a thinner hub would be doorway content.
4. **Head terms (free samples / flipkart offers / amazon coupons):** leave them. The AIO cites the brands' own sites (smytten, flipkart, amazon), and the organic results are held by high-authority coupon sites. There is no on-page fix; it needs authority (backlinks). Don't burn content on it.
5. **DFS reinstatement:** the owner should email DataForSEO support about the pause. Until then this probe runs in the browser (free).

## CEO audit (checked against the DB)
- **Deals:** LIVE 11,615 · PENDING 0 · LIVE with null price 0 · LIVE with null image 0.
  - The 226 null rows are all EXPIRED delisted junk, by design (memory `null-deal-cleanup`).
- **Posts:** 349 · coverless 0 · seo-less 0.
- **Posts per day (IST):** 09-26 = 2, 09-27 = 4, 09-28 = 4, 09-29 = 4, 09-30 = 2.
- **Broadcast cursor:** 11986 = DB max 11986.
- **Prod endpoints:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` all return 200.
- **Unpushed commits:** 0 before this report.
- **Rot fixed:** 1 (Y05 stale price). **New external blocker:** DFS paused.
