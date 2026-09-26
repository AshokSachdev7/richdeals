# Traffic truth audit — 2026-09-27

**Bottom line:** real human traffic is about 20 Google clicks a month plus a Telegram channel with 27 subscribers. The ~19.7k "clicks" in the DB were bots. The blocker is Google's index gate (domain authority), not on-page SEO.

## 1. Clicks were bots
- 30 days: 19,702 clicks over 8,771 distinct deals (about 2.2 each, flat spread).
- Bursts reached 86 clicks per minute (2026-09-21 14:16 UTC).
- Referers:

  | Referer | Clicks |
  |---|---|
  | none | 11,280 |
  | richdeals.in (crawlers walking `?cursor=` pagination hubs) | 8,407 |
  | google | 12 |

- 62% of the no-referer clicks hit deals older than 7 days.
- **Fix shipped (a910c36, deployed 62880d25):**
  - `/api/out/:id` now checks the UA. Bots get a 302 to the deal page, are not logged and never touch the affiliate URL.
  - Humans are logged with their UA, in the new `Click.ua` column.
  - `X-Robots-Tag: noindex, nofollow` is now set.
- Verified on prod:
  - Googlebot → `/amazon-brand-symbol-…-b097mrp5v7`
  - Chrome → `amazon.in/dp/B097MRP5V7?tag=ashoksachdev-21`
- From now on the click count means humans only.

## 2. Google Search Console
- Last 28 days: 19 clicks / 622 impressions.
- Last 90 days: 118 clicks / 17,049 impressions.
- **88 of 118 clicks come from one post:** `/blog/how-to-get-free-samples-freebies-india` (11.9k impressions, position 6.9). The freebies cluster is the only query set that converts (“free samples india” and similar).
- Freebies traffic earns no affiliate commission. Commercial deal pages get only a handful of clicks.

## 3. Index coverage (URL Inspection, random sample of 45)

| Status | URLs |
|---|---|
| Submitted and indexed | 7 |
| Discovered – currently not indexed | 21 |
| URL is unknown to Google | 17 |

- Deals: about 1 of 30 indexed. Blogs: 6 of 15 indexed.
- The sitemap has 10,514 URLs, but Google crawls only a fraction of them. This is a quality/authority gate.

## 4. Pruning the index to fresh deals was rejected (data-checked)
- All 174 live deal pages with GSC impressions are **31–120 days old; none is ≤30 days**. Google takes more than a month to surface a deal page.
- Tightening `dealIndexable` to 30 days would noindex every deal page that earns impressions today.
- The 120-day window stays.

## 5. What actually moves money in 15 days
1. **Real earnings number:** read Amazon Associates (and Cuelinks/EarnKaro) for the last 30 days. That is the only true revenue figure; the DB click count was fiction until today.
2. **Backlinks** (the authority ceiling, per `.claude/backlink-campaign.md`): free directory and profile listings need the owner's email and captcha steps. One batched Playwright session with the owner on standby.
3. **Telegram channel growth:** 27 subscribers. The site CTA already exists sitewide; growth has to come from off-site.
4. **Blog-first:** blogs index at about 40% vs about 3% for deals. Keep 2–3 posts a day on long-tail buyer queries plus the freebies cluster, which is where the clicks are.
