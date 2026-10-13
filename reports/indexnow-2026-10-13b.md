# INDEXNOW tick 2026-10-13b (07:23 IST)

**Result:** IndexNow returned HTTP 200 for 10 URLs.

## Submitted

The last 6 hours of new pages come from the DB: 3 LIVE deals and 1 post. The hub pages are listed by hand, because `--paths` mode adds none of them.

| Type | Path |
|---|---|
| Deal | `/bestwomen-flip-flop-slipper-for-women-b0db631jb5` |
| Deal | `/luvlap-pant-style-baby-diapers-newborn-120-b09q3cjmr9` |
| Deal | `/havells-trusteam-1600w-steam-iron-self-cleaning-b0fvdz73r4` |
| Post | `/blog/baby-diaper-price-per-piece-how-to-compare-packs-india` |
| Hubs | `/`, `/sitemap.xml`, `/offers`, `/blog`, `/feed.xml`, `/llms.txt` |

The script was run with `MSYS_NO_PATHCONV=1`, so Git Bash did not rewrite the leading `/` of each path.

## CEO audit

| Check | Result |
|---|---|
| Posts today (IST, 10-13) | 2 |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,445 |
| Broadcast cursor | 12962, equal to DB max 12962 |
| Prod endpoints (7) | all 200 in 0.11–1.38s (`/llms.txt` was the slowest at 1.38s) |
| Unpushed commits | 0 before this report |
| Session crons | 6 of 9 running. telegram-deal-monitor, deal-ingest (indiafreestuff) and AI-OVERVIEW are missing. Say "restore all crons" to recreate them. |
