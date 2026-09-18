# AI-OVERVIEW probe — richdeals.in — 2026-09-17

Method: DataForSEO `serp/google/organic/live/advanced` (India, en, depth 20) for 5
queries — 5 HTTP calls, 5 billed tasks, $0.020 total (balance $0.652 → $0.636).
Note: the live endpoint now takes **one task per call** (a 5-keyword array billed 1
and rejected 4 with "You can set only one task at a time"). The other 5 queries went
through WebSearch (US-located, organic list only — **cannot see AI Overviews**, marked "n/a").
GSC pull: `gsc-pull.mjs 90 query` (2026-06-17 → 09-14). The 28d window is dead again:
1 click / 67 impressions.

## Per-query results

| # | Query | Source | AI Overview? | richdeals.in | Cited in AIO / top organic instead | Winning format |
|---|---|---|---|---|---|---|
| 1 | free samples india (GSC #1, 88 impr, pos 8.8 @90d) | DFS | **YES** | not cited, not in top 19 | AIO: samplr.in, smytten.com (x2), mysamplehub.in, tryandreview.com, meesho.com. Org: samplr, indiafreestuff, instagram, smytten, tryandreview, desidime, mysamplehub, wraply | AIO = **named-platform bullet list** ("Platform : one-line what/how/fee") + a caveat bullet on shipping fees. PAA: how to really get free samples / free beauty samples India / what companies give free samples |
| 2 | freebies india (GSC #2, pos 5.5 @90d) | DFS | **YES** | not cited, not in top 19 | AIO: instagram, drishtiias (x2), youtube (x2), desidime, earticleblog. Org: indiafreestuff #1, coolztricks, clearias, desidime, samplr | Mixed intent: AIO splits "product freebies" vs "govt freebies/welfare". Short definition + category bullets |
| 3 | amazon coupons today | DFS | **YES** | not cited, not in top 19 | AIO: groupon.com, amazon.com, zoutons.com. Org: grabon, amazon.in, groupon, couponfollow, coupondunia, cashkaro, desidime #15 | "How it works" bullets (Clip Coupon, category deals, Lightning Deals) — explainer, not a code list. PAA: how to get a coupon / 50% off / promo code today |
| 4 | flipkart offers today | DFS | **no** (popular_products instead) | not in top 20 | Org: flipkart.com x10, pricehistory.app, coupondunia, dealsmagnet, grabon, offermachi, zoutons, offertag, cashkaro, gadgets360, indiafreestuff #19 | Brand owns SERP; aggregators rank with dated daily offer lists. PAA: upcoming offers today / 50% off / Big Billion Days date / 90% off |
| 5 | best deals india today | DFS | **YES** | not in top 19 | AIO: amazon.in only (product carousel w/ ₹ prices). Org: dealofthedayindia, amazon, flipkart, dealsmagnet, desidime, indiadesire, offertag, indiafreestuff, xerve, dealsheaven | Product cards with **price + one spec** ("₹499, 60h playtime"). Merchant Product/Offer data wins, not publishers |
| 6 | free samples in India (task + GSC #5) | WebSearch | n/a | not in results | desidime (news "50+ free samples 2026"), samplr, grabon ("Sep 2026" in title), indiafreestuff, freekaamaal, freestuff.world | **Month-year in title** (grabon "Sep 2026"), numbered counts ("50+", "42 giveaways") |
| 7 | free samples online India 2026 | WebSearch | n/a | not in results | desidime, grabon, indiafreestuff, maalfreekaa, womensbeautyoffers, coolztricks (/2026/06/ URL) | Year in title/URL; named brands (Dabur, Nestle, Huggies, Sugar, Pedigree) |
| 8 | free sample india (GSC #3, pos 7.2 @90d) | WebSearch | n/a | not in results | desidime, samplr, grabon, indiafreestuff, maalfreekaa, freestuff.world, freekaamaal | Same set as #6; concrete fee facts ("Yoto ₹199 delivery") get quoted |
| 9 | free samples (GSC #4, pos 10.7 @90d) | WebSearch (US) | n/a | not in results | US results are music/audio samples + SampleSource/UNiDAYS | Ambiguous head term — not worth chasing |
| 10 | great indian festival 2026 (GSC, 37 impr, pos 10.0 @90d) | WebSearch | n/a | not in results | amazon.in, businesstoday, desidime, sportskeeda, sundayguardianlive | News format: expected **dates** + discount tiers + bank offers, updated this week (09-15) |

**Bottom line:** 4 of 5 DFS-probed queries show an AI Overview. richdeals.in is cited in
**0** and ranks in the top 20 for **0**. On `free samples india` DataForSEO saw 19 organic
results and we were not among them. GSC still gives us a 90d average of pos 8.8, but that
average comes from before the collapse. It is not where we rank today.

## Crawler access check

- `robots.txt` explicitly lets GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-Web,
  anthropic-ai, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended,
  Bingbot, CCBot, cohere-ai, Amazonbot, Meta-ExternalAgent and `*` crawl the site (only
  /search, /api/, /admin are blocked). Sitemap is declared. **OK.**
- `/llms.txt` returns 200 (15.2 KB): Key pages, Stores, Categories, Guides (30 blog links),
  Data, About. `/llms-full.txt` returns 200. A request with a GPTBot UA gets 200.
- **Gap:** the free-samples hub `/blog/how-to-get-free-samples-freebies-india` is in
  **neither** llms.txt nor llms-full.txt, even though it is our only page that ever ranked.
- Hub page: 200, `index, follow`, FAQPage JSON-LD, 1 table, 13 H2s, dateModified 09-13.
  It names Smytten 32 times and TryKiya twice. It **never mentions Samplr, MySampleHub or
  Try and Review**, three of the four platforms Google's AIO cites for this query.

## 3 white-hat GEO actions, ranked by expected impact

1. **Rebuild the free-samples hub around the entities the AI Overview cites.**
   This is the only query cluster where we have history (90d: free samples india,
   freebies india and free sample india together = 23 clicks) and where an AI Overview
   is live.
   - Add an answer-first "Platform : what you get / how / fee" bullet block near the top
     that covers Samplr, Smytten, MySampleHub, Try and Review and TryKiya. Verify each
     one's current terms before publishing. No invented fees.
   - Add a short "Are free samples really free? Shipping fees" section. The AI Overview
     quotes this caveat.
   - Add H2s that match the People Also Ask questions word for word: "How to really get
     free samples?", "Where can I get free beauty samples in India?", "What companies
     give free samples?"
   - Put "(Sep 2026)" in the seoTitle, and give the table a visible "last verified" date.
     Grabon's "Sep 2026" title and DesiDime's "50+ … 2026" are what win this SERP.
   - Ping IndexNow when done.
2. **Add the hub (and /freebies) to `/llms.txt` + `/llms-full.txt`** under Key pages, with
   one factual line each. This is a one-line change in `apps/web/src/app/llms.txt/route.ts`.
   Google ignores llms.txt, but ChatGPT, Perplexity and Claude crawlers read it. Right now
   our best asset is invisible to them. Cheap, and no downside.
3. **Make /coupons answer "amazon coupons today" the way the AI Overview does**, and stop
   pitching "flipkart offers today" as a publisher target.
   - Amazon: add a visible, dated block explaining how Amazon coupons work (clip-coupon vs
     code, Today's Deals, Lightning Deals, bank offers). Add FAQ entries that match the
     People Also Ask questions ("What is the promo code for Amazon today?", "How to get 50%
     off on Amazon?"), and list only codes/coupons we have actually checked.
   - Flipkart: flipkart.com holds 10 of the top 20 results and there is no AI Overview.
   - Great Indian Festival 2026: a news-style page with expected dates and bank-offer
     tiers, refreshed weekly, is the matching seasonal format. It is a sale phrase,
     though, so only do this if the owner lifts the "no seasonal sale phrases" rule.

Caveat: none of these fix the underlying ceiling (domain authority / 28d impressions near
zero). AI Overview citations mostly come from pages already in the top ~10. So #1 only pays
off if the hub gets back into the top 10.
