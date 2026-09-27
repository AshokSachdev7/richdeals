# TELEGRAM-DEAL-MONITOR tick 2026-09-27zv

**Result:** 0 new deals. No candidate passed verification, so nothing was pushed and there was no IndexNow ping (0 slugs).

## Sweep
- **Read:** the sidebar of all 13 groups in `data/tg-groups.json`, with one `browser_evaluate` over `.chat-list .ListItem.Chat`.

## Rejected
| Group | Post | Why |
|---|---|---|
| Dealzone | Panchmeva mixed dry fruits, 500 g ₹234 / 1 kg ₹372 (`fktr.in` → Flipkart NDFHPM8HZBZS8GXW / NDFHR55AQG2RNWR2) | Grocery: low-ticket FMCG, location-locked, price swings daily ("buy max qty") |
| CoolzTricks | "48" `amzn.to/4z0L2Oa` → B0D9YGT71L, Negi galaxy toy car | PDP `#availability` reads "Currently unavailable", and there is no add-to-cart button |
| Dealdost | Skullcandy Uproar ANC at ₹1,999 with code TGDD (`bit.ly` → skullcandy.in) | Price depends on a coupon code. The page has no ld+json or readable price, so the price cannot be verified |
| SB Loots | Bear House, up to 71% off | Brand-wide sale, not a single product |
| ONLINE SHOPPING DEALS | Treo beer mug ₹160 | The link is still truncated in the sidebar (`link.amaz...`). Skipped again and left off the seen list |
| Others | Syska power bank, handbag, Skybags, Supercoins, Instamart, iPhone pass, spam | Already seen, or not a deal |

- **Seen list:** 8 keys added (links plus productIds). It is now 2,165 entries.

## Freshness
- No batch was pushed, so there was nothing to ping.
- Sitemap: 10,579 URLs. `llms.txt`: 200.

## CEO audit (DB-verified)
| Check | Result |
|---|---|
| Live deals | 11,254 |
| Pending review | 0 |
| Live deals with null price or image | 0 |
| Posts missing cover or SEO fields | 0 of 338 |
| Posts today (IST) | 3 (meets the 2–3 rule). Last 9 days: 3/2/1/3/2/3/4/4/3, never 0. |
| Broadcast cursor | 11601, equal to DB max 11601. Caught up. |
| Prod endpoints (7) | all 200 |
| Unpushed commits before this commit | 0 |
