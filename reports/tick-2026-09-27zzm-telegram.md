# TELEGRAM-DEAL-MONITOR tick 2026-09-27zzm (~22:06 IST)

**Result:** 1 new deal live (Shopsy). Live deals went from 11,271 to 11,272.

## Scan
- **Sidebar:** one evaluate over `.chat-list .ListItem.Chat` covering all groups in `data/tg-groups.json`.
- **Shortlinks:** resolved with curl. The Shopsy link's source `affid=inf_...` was stripped.
- **Verification:** the Shopsy PDP was read with curl (HTTP 200). Shopsy has no ld+json, so price came from SPECIAL_PRICE / Final Price, M.R.P. from Maximum Retail Price, and stock from `availabilityStatus: IN_STOCK` plus `isAvailable: true`.
- **Dedup:** the productId is not in the DB.

## Pushed (`/admin/deals/bulk`, count 1, `created:true`)
| Deal | pid | Price | M.R.P. | Rating |
|---|---|---|---|---|
| ZAWI Craft macrame wall hanging shelf, wooden | UQNGVGCNUBKEDZGT | ₹242 | ₹1,899 (87% off) | 4.2★ (79) |

- **Affiliate:** Cuelinks `cid=527`. Shopsy is not Flipkart.
- **Image:** rukminim3.flixcart.com (HTTP 200).
- **Pre-flight:** every ₹ figure in the copy matches the price, the title price matches, and no source tag is left in the URL.
- **Script:** `apps/api/scripts/push-tg-0927zzm.mjs`.

## Rejected
- **Vaku power bank @ ₹499:** the price depends on a coupon code, and the store's list price is ₹3,999. Unverifiable.
- **Clazkit soap tray (B0H8SRLVVJ):** the channel said ₹83; the PDP shows ₹166.05 with no clip coupon.
- **Dry fruits (B0HKZNYPW9, B0HKMMM4LQ):** grocery/FMCG.
- **Other links:** already seen or not a single product.

`tg-multi-seen.json`: 9 entries added, 2,205 total.

## Freshness
- **IndexNow:** HTTP 200 for 4 URLs (1 slug plus the 3 standard paths).
- **Sitemap:** ISR 1800, picks up the batch within 30 minutes.
- **llms.txt:** force-dynamic, already current.
- **Prod:** the deal page returns 200.

## CEO audit (DB-verified)
| Check | Result |
|---|---|
| Live deals | 11,272 |
| Pending review | 0 |
| Live deals with null price or image | 0 |
| Posts missing cover or SEO fields | 0 of 339 |
| Posts today (IST) | 4 (at the cap). Last 9 days: 3/2/1/3/2/3/4/4/4, never 0. |
| Broadcast cursor | 11618 vs DB max 11619. The gap is exactly this tick's deal, queued for the external cron; not rot. |
| Prod endpoints (7) | all 200 |
| Unpushed commits before this commit | 0 (checked after `git fetch`) |
