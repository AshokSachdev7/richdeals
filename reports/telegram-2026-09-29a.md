# Telegram tick 2026-09-29a (00:05 IST)

## Scan
- Read the sidebar in one `browser_evaluate` over `.chat-list .ListItem.Chat`, covering all groups.
- Found 8 candidate posts. 3 were new; the other 5 were skipped:
  - Rogerkart Solimo table: already pushed at 28bn.
  - Dealdost face wash: multi-quantity loot post plus coupon.
  - ToyAffair ludo B0DQQ586YL, Lavie handbag B0G38DGNKM and Syska power bank PWBGGD4THDQZYAY6: already in `tg-multi-seen.json`, and the Lavie handbag is already LIVE.
  - Skipped as non-product posts: IFS tips (ConfirmTkt), BBD passes, supercoins, and join spam.
- Resolved shortlinks (`link.amazon`, `amzn.to`, `amazn.lt`) to `/dp/ASIN`, then stripped their tags (`glitzdeal05-21`, `collab-amafhh-21`, `bhavesh015-21`).

## Verification (logged-in Amazon tab: #centerCol, #availability, add-to-cart)
| ASIN | Item | Price | M.R.P. | Off | Rating | Stock |
|---|---|---|---|---|---|---|
| B0FKGKMZPT | Lifelong 2-tier plant stand | ₹353 | ₹5,999 | 94% | 3.2★ | In stock |
| B0G5PM4CBZ | Bata Gant Oxford uniform shoe | ₹891 | ₹2,299 | 61% | 3.9★ | In stock |
| B07SRM58TP | AGARO Regal 800 W handheld vacuum | ₹1,457 | ₹2,099 | 31% | 4.0★ | In stock |

- For each item, the price on the product page matches the channel's "at ₹X".
- The AGARO post showed only the M.R.P., so its price was read from the product page.
- The plant stand's copy states its 3.2★ rating and inflated M.R.P. honestly.

## Push
- Pushed via the local API, which uses the same prod DB. `/admin/deals/bulk` returned **count 3, created 3**, all `status:live`.
- All links use `tag=ashoksachdev-21`.
- Images are from `m.media-amazon.com`. All 3 return 200; the `+` in one image id is encoded as `%2B`.
- All 3 prod pages return 200.
- Note: posting directly to the prod `/api/admin/deals/bulk` with the local key returns 401. The prod key differs, so local is the push path, as in earlier ticks.

## Freshness
| Surface | Status |
|---|---|
| IndexNow | **HTTP 200, 6 URLs** (3 slugs + 3) |
| Sitemap | ISR 30 min |
| llms.txt | force-dynamic |

## CEO audit (DB)
| Check | Result |
|---|---|
| Live deals | 11,456 (+3) |
| Pending | 0 |
| Null price / image | 0 / 0 |
| Posts | 343; coverless 0, seoless 0 |
| Posts per day (IST, 09-20 → 09-28) | 2/1/3/2/3/4/4/4/4 |
| 09-29 (IST) | 0 posts at 00:05, 5 minutes into the day. The blog cron (`9 */6`) covers it, so this is not rot; check it at the next tick. |
| Broadcast cursor | 11800 vs DB max 11803. The gap of 3 is exactly this batch and self-heals. |
| Prod endpoints | 7/7 return 200 |
| Unpushed commits | 0 before this report |

Result: **0 rot.**
