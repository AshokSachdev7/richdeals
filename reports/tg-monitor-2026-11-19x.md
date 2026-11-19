# TELEGRAM-DEAL-MONITOR tick — 2026-11-19x

The 13 groups in `data/tg-groups.json` were read with one `browser_evaluate` over the Telegram Web sidebar (`.chat-list .ListItem.Chat`) in the Playwright richDeals profile, then deduped against `data/tg-multi-seen.json`. Run at about 23:10–23:20 IST (17:40–17:50 UTC).

**Result: 0 new deals pushed. The only single-product post was already seen; the rest were sale hubs or non-deal posts. No IndexNow ping, because nothing was pushed or repriced. Prod returned 200 on 7 of 7 endpoints.**

## Candidates

| Group | Link | Post | Outcome |
|---|---|---|---|
| Rogerkart | myntr.in/J0jKwh | Dr. Batra's Pro+ Colour Nourish hair colour cream, 60g + 60ml, at ₹233 | Already in the seen array (handled by an earlier tick) |
| 3 groups | various | Dove "Upto 60% Off" | Rejected: category sale hub, not a single product |
| Hidden Loot / IndiaFreeStuff Tips | — | Swiggy Dineout | Rejected: not a product deal |
| — | — | LG washing machine sale | Rejected: sale hub |
| — | — | Caprese | Rejected: sale hub |

New link codes `Jzz7AN`, `sqjaVgy` and `EmlW4pK` were added to the seen array (now 5,658 entries) so later ticks skip them.

## Pushed

None.

## Freshness

| Check | Result |
|---|---|
| IndexNow | No ping. Nothing was pushed or repriced. |
| `sitemap.xml` | 200 (ISR 1800s) |
| `llms.txt` | 200, `force-dynamic` |

## CEO audit

Same run as SITEMON 19w: LIVE 16,361 = API total, PENDING_REVIEW 0, null price/image 0/0, cursor 16,968 = DB max, 500 posts with 0 coverless, 11-19 has 3 posts (IST), 9 of 9 session crons, 0 unpushed commits before this report.

## Still open

See SITEMON 19w. Headline items: `/posts` 5.8MB over the 2MB Next data-cache limit, IFS redirector dead (probe at 11-20 00:53), GSC traffic down about 70% since 10-28, DO API token rotation (owner).
