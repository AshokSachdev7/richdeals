# TELEGRAM-DEAL-MONITOR tick: 2026-09-25am (13:06 IST)

**No new deals were created. 3 live deals got a lower price. IndexNow returned HTTP 200 for 6 URLs.**

## Scan
One sidebar read of the 13 groups in `data/tg-groups.json` found 5 new links. The rest were already in the seen list or were not single-product posts.

| Group | Link | Resolves to | Result |
|---|---|---|---|
| ONLINE SHOPPING DEALS | `link.amazon/B03YuVgPe` | B07P8KPQJ1 Solimo glass lunch box 2×400 ml | PDP ₹467 / M.R.P. ₹1,060, in stock. **Price refreshed** (it was listed at ₹499) |
| ONLINE SHOPPING DEALS | `link.amazon/B00o8Sa7T` | B0GGB2RWF3 Lakme Peptide Lip IV, Peptalk Pink | PDP ₹163 / ₹399, in stock. **Price refreshed** (it was listed at ₹199) |
| ONLINE SHOPPING DEALS | `link.amazon/B06hdvMMp` | B0CH34WWFR Wonderchef Taurus 3 L cooker | PDP ₹1,190, the same price as live row 11193. Skipped because nothing changed |
| Dealzone | `link.amazon/B00cYLy5U` | B0GSZ2PHQF Lakme Blush & Glow jelly face wash 150 g | PDP ₹195 / ₹490, in stock. **Price refreshed** (it was listed at ₹247) |
| CoolzTricks | `myntr.it/mQslTiF` | Myntra sweatshirt category/sort listing | Rejected because it is not a single product |

The other groups had nothing usable:
- SB Loots: a supercoins task.
- Hidden Loot: a Swiggy CCD offer.
- Deal Dibba: a t.me join link.
- IFS Tips: Instamart.
- Dealdost: a stock post with no link.
- Rogerkart: already in the seen list.
- The remaining groups showed old posts.

## Push
- Script: `apps/api/scripts/push-tg-0925am.mjs`. It writes new copy and pins the existing slugs, because the upsert overwrites the slug.
- `/admin/deals/bulk` returned **count 3, all `created:false`**. That means the rows were updated in place.
- DB check:
  - ids 3130, 5268 and 10653 are LIVE with the new prices.
  - A priceHistory row was logged for each: 499→467, 199→163 and 247→195.
  - Slugs and images are unchanged, and the images are hiRes `m.media-amazon.com`.
- Seen list: 9 keys checked, 8 appended (the list is now 1992). B0GSZ2PHQF was already in it.
- IndexNow: `indexnow-ping.mjs` sent 3 slugs + 3 = **HTTP 200, 6 URLs**.

## CEO audit
| Check | Result |
|---|---|
| LIVE deals | 10884. None pending, none with a null price or null image |
| Posts | 330. None missing a cover, none missing SEO fields |
| Posts per day (IST), 09-17 → 09-25 | 3, 3, 3, 2, 1, 3, 2, 3, **3** |
| Broadcast cursor | 11212 against DB max 11231. It was 11197 last tick, so the external cron is catching up |
| Prod endpoints | `/ /offers /blog /sitemap.xml /feed.xml /llms.txt /api/deals`: all 200 |
| Unpushed commits | 0 before this commit |

**Verdict:** green.
