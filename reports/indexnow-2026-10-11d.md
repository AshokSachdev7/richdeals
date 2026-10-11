# INDEXNOW tick 2026-10-11d (18:53 IST)

IndexNow returned **HTTP 200 for 14 URLs**. They were sent in `--paths` mode with `MSYS_NO_PATHCONV=1`.

## URLs submitted

**8 LIVE deals** created in the last 6 hours:
- `/spacewood-winner-study-table-with-book-shelf-3-cabinets-walnut-rigato-b015inj9t6`
- `/vector-x-blaze-2-0-men-s-football-shoes-black-gold-b0948nwgc6`
- `/panasonic-5w-round-led-junction-downlighter-warm-white-b0f3xjnbzk`
- `/longway-super-pro-750w-juicer-mixer-grinder-with-4-jars-b0gwcrpgdb`
- `/mia-fashion-full-sleeve-solid-men-jacket-grey-jckh8ynhu5kpxgt7`
- `/highlander-full-sleeve-solid-men-puffer-jacket-jckgtmrmywzagrhc`
- `/axe-gold-temptation-long-lasting-deodorant-bodyspray-for-men-215-ml-b09264zy38`
- `/orient-electric-ujala-prime-1200mm-bee-1-star-ceiling-fan-smoke-brown-fangjwnbdewgsdhy`

**1 post** published in the last 6 hours:
- `/blog/football-shoes-fg-vs-tf-vs-ag-studs-which-to-buy-india`

**5 hub pages:** `/sitemap.xml`, `/offers`, `/blog`, `/feed.xml`, `/llms.txt`

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST) | 3 |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,405 |
| Broadcast cursor | 12922, equal to DB max 12922 |
| Prod endpoints | **Brief outage.** The first sweep (18:53 IST) got 504 on every web route: `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`. `/api/deals` stayed 200. A re-check under a minute later returned 200 on all 7 routes in 0.1–1.6s. The active deployment is still `bd0ee8f1`, the 10-02 build, so no deploy happened in between. The cause was outside our code, likely a DO edge or web container blip, and nothing needed fixing. SITEMON at :47 will catch it if it recurs. |
| Unpushed commits | 0 before this report |
| Session crons | 6 of 9 running. telegram-deal-monitor, deal-ingest (indiafreestuff) and AI-OVERVIEW are missing. Say "restore all crons" to recreate them. |
