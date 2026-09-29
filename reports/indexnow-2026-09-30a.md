# IndexNow tick — 2026-09-30a (01:10 IST)

## What was resubmitted (last 6 h)
| Set | URLs |
|---|---|
| Live deals created in the last 6 h | 20 (16 from the IFS batch, JBL from DesiDime, and the rest from Telegram ticks) |
| Posts created in the last 6 h | 1: `/blog/how-to-season-iron-tawa-first-time-rust-fix` |
| Hub pages + sitemap | `/`, `/offers`, `/blog`, `/sitemap.xml` |
| **Total** | **25** |

- `api.indexnow.org` returned **HTTP 200** for all 25 URLs. There was no 422, so the Bing GET fallback was not needed.
- Key: `33f3a9d63ca15676bbd90586ea80e65f`.

## CEO audit (checked in the DB)
- Prod endpoints: all 7 return 200.
- Live deals: 11573, same as the API total.
- Pending review 0, null price 0, null image 0.
- Posts: 348 total, 0 without a cover, 0 without SEO fields.
- Posts on 09-30 (IST): 1. The IST day is only about 1 hour old.
- Broadcast cursor 11942 = max deal id 11942 (caught up).
- Unpushed commits: 0.

Also fixed the time in `sitemon-2026-09-30a.md`. It said 06:21 IST, but the tick ran at 00:51 IST: the node output already includes the IST offset, and it was added a second time.
