# TELEGRAM-DEAL-MONITOR tick 2026-09-26bd (22:11 IST)

**3 deals pushed LIVE (all Amazon, ids 11520–11522). `/admin/deals/bulk` returned 201 with count 3, all created. IndexNow returned HTTP 200 for 6 URLs (3 slugs + 3).**

## Pushed
| Group | Product | Price / M.R.P. | PDP check |
|---|---|---|---|
| CoolzTricks (amzn.to) | THE SACK CO. canvas tote bag, B0GYYHHJ3J | 249 / 899 | #centerCol ₹249, cart, no clip, 3.9★ (52) |
| Dealzone (link.amazon) | Preethi Eco Fresh MG-291 750 W mixer grinder, B08N6FVGW3 | 5,817 / 15,935 | #centerCol ₹5,817, cart, no clip, 5.0★ (1) |
| ONLINE SHOPPING DEALS (link.amazon) | Pidilite Roff Cera Clean 1 L ×4, B0CRNSVFX7 | 279 / 999 | #centerCol ₹279, cart, no clip, 4.0★ (43,152) |

- The copy is original. The only ₹ figures are the live price and one "about ₹70 a litre".
- Images come from `m.media-amazon.com` `data-old-hires`.
- Checked `/out/11521`: 302 to `amazon.in/dp/B08N6FVGW3?tag=ashoksachdev-21`.
- Dedup was checked against the live DB by `productId`/slug through Prisma, and against `tg-multi-seen.json`. Neither had any of these.

## Skipped
- SB Loots `amazn.lt/Ju36rEOE`: a `/s?` multi-ASIN search.
- Dealdost `fkrt.to/bh9DFznp`: a Flipkart search page.
- Handbag and Syska: already seen last tick.
- Rogerkart cashew: grocery.
- Hidden Loot Supercoins: a promo.
- iPhone "151", Deal Dibba and IFS Tips (Instamart): junk or non-deal.

All 5 shortlink codes and 3 ASINs were appended to `data/tg-multi-seen.json`, which now has 2,102 entries.

## Freshness
- **IndexNow:** HTTP 200, 6 URLs.
- **Sitemap:** 10,493 `<loc>`. It is ISR 1800 s, so the batch lands within 30 minutes.
- **llms.txt:** 200. It is dynamic.

## CEO audit
- **Prod:** all 7 endpoints return 200, all ≤0.45 s.
- **Deals:** 11,175 live, 0 pending review, 0 with a null price, 0 with a null image. DB max is 11522.
- **Posts:** 335, with 0 missing a cover and 0 missing SEO fields. Posts per IST day, 09-18 → 09-26: 3/3/2/1/3/2/3/4/4. No day is 0, and today is at the cap.
- **Broadcast cursor:** `lastId` is 11519, against a DB max of 11522. The gap is this batch, which the external cron drains.
- **Git:** 0 unpushed commits before this commit.

## Index coverage sample (India SEO follow-up)
Ran GSC URL Inspection on 60 random sitemap URLs:

| State | URLs |
|---|---|
| Submitted and indexed | 7 (12%) |
| Discovered – currently not indexed | 40 (67%) |
| URL is unknown to Google | 13 (22%) |

The bottleneck is **indexing, not ranking**. Google knows about the deal pages but will not spend crawl budget on them, which is a domain-authority and thin-page signal. The pages that are indexed are older (crawled 07-28 → 09-24). Next lever:
1. Prune the sitemap to high-value deals: drop expired and low-ticket rows so the crawl budget goes to pages that can rank.
2. Link fresh deals from the indexed hubs and blog posts.
3. Backlinks.

Verdict: green. 3 deals shipped and pinged.
