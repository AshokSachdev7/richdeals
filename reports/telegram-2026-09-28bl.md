# Telegram tick 2026-09-28bl (21:04 IST)

## Scan
- Read the sidebar with one `browser_evaluate` over `.chat-list .ListItem.Chat`, which covers all source groups in one call.
- Read the full post text from the open ONLINE SHOPPING DEALS chat, because the Crompton post was cut off in the sidebar.

Skipped:
- Liberty "upto 85%": a sale hub.
- Mixed dry fruits: grocery, labelled "loot".
- Ambrane MagSafe: already pushed at 28bi.
- Rogerkart trolley, the handbag and the Syska power bank: already in `tg-multi-seen.json`.
- IFS tips, Big Billion Pass, Supercoins and non-deal chats: not single products.
- Reebok sports bra (B0F38DP3T4): already LIVE as id 11780 from IFS 28bj.

## Verification (Amazon `#centerCol` in the logged-in tab)
| ASIN | Deal | Price read on the page | Channel price |
|---|---|---|---|
| B0GPVB9MXT | Boldfit massage gun | ₹899 / M.R.P. ₹1,499 (40%), in stock, 4.0★ (167) | "FAST ₹899", matches |
| B0D7CLWZ2H | Mamaearth henna paste 200 g | ₹125 / ₹249 (50%), in stock, 4.0★ (690) | ₹125, matches |
| B0DC6JVW32 | Crompton Galaxy pixel ladi light 10 m | ₹97 / ₹400 (76%), in stock, 4.3★ (517) | ₹97, matches |

The Boldfit page also shows "Min purchase value INR 7490". That is the bank-offer threshold, not a minimum order.

## Push
- `/admin/deals/bulk` returned **count 3, created 3**, all `status:live`, with `tag=ashoksachdev-21`. The source tags (`7383-21`, `vivek123034-21`) were stripped.
- Images come from `m.media-amazon.com`. The copy is original.
- IndexNow: **HTTP 200, 6 URLs** (3 slugs + 3).
- The seen list is now 2,285 entries.

## CEO audit (DB)
| Check | Result |
|---|---|
| Live deals | 11,440 (+3) |
| Pending | 0 |
| Null price / image | 0 / 0 |
| Posts | 343; coverless 0, seoless 0 |
| Posts per day (IST, 09-20 → 09-28) | 2/1/3/2/3/4/4/4/4. No day at 0; today is at the cap. |
| Broadcast cursor | 11784 vs DB max 11787. The gap of 3 is exactly this batch; the external cron will catch up. |
| Prod endpoints | 7/7 return 200. The new Crompton page returns 200. |
| Unpushed commits | 0 before this report |

Result: **0 rot.**
