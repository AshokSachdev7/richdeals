# TELEGRAM tick 2026-09-28bi (20:04 IST)

## Scan
- Read all 13 groups from `data/tg-groups.json` with one `browser_evaluate` over the sidebar.
- 5 candidates were resolved:
  - Ambrane (`fkrt.cc`): pushed.
  - H&S shampoo (`fktr.in`): Flipkart `marketplace=GROCERY`, location-locked. Skipped.
  - Aqua Frisch purifier (`fkrt.to`): already LIVE in the DB as id 3609. Skipped.
  - IBELL mixer (`link.amazon`): pushed.
  - Mamaearth henna: truncated link, low-ticket FMCG. Skipped.
- Already seen: American Tourister, handbag, Syska.
- Junk: ConfirmTkt, SuperCoins, join spam.

## Pushed: 2
| Deal | Price | M.R.P. | Off | Verify |
|---|---|---|---|---|
| Ambrane 10000mAh 22.5W MagSafe power bank (Flipkart PWBH2Y8YP8FQDHUG) | ₹1,499 | ₹2,999 | 50% | ld+json InStock, 4.2★, `/p/itm` path anchored |
| IBELL WHISK400 400W hand mixer (Amazon B0F7L6WD6V) | ₹1,589 | ₹3,350 | 53% | `#centerCol` ₹1,588.99, In stock, add-to-cart present, 4.4★ (758) |

- Bulk push returned **count 2, created 2**, both `status:live`, with affiliate tags `affid=djhackraj` and `tag=ashoksachdev-21`.
- Both slugs return 200 on prod.
- **IndexNow: HTTP 200, 5 URLs** (2 slugs + 3).
- Seen list: 2,278 entries (+7).

## CEO audit (DB)
| Check | Result |
|---|---|
| Live deals | 11,426 (+2) |
| Pending | 0 |
| Null price / image | 0 / 0 |
| Posts | 343; coverless 0, seoless 0 |
| Posts per day (IST, 09-20 → 09-28) | 2/1/3/2/3/4/4/4/4. No day at 0; today is at the cap. |
| Broadcast cursor | 11773 = DB max, caught up |
| Prod endpoints | 7/7 return 200 |
| Unpushed commits | 0 before this report |

Result: **0 rot.**
