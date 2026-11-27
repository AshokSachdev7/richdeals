# TG-MONITOR tick: 2026-11-27b

**Result:** 2 new deals are LIVE (#17421 Shopsy, #17422 Ajio). The bulk push returned HTTP 201 with count 2, and both rows came back `created:true`. One duplicate LIVE row, #5035 (LG washer), was price-synced. IndexNow returned HTTP 200 for 6 URLs. All 3 pages return 200 on prod.

Source: one sidebar eval across the 13 groups in the Playwright richDeals profile.

## Pushed

| # | Deal | Store / ID | Price | M.R.P. | Off | How it was verified |
|---|---|---|---|---|---|---|
| 17421 | JP SHINE Floral Double Mink Blanket, Lavender (SB Loots) | Shopsy BNFGSJU3HKUNVJSU | ₹567 | ₹2,199 | 74% | PDP in a Playwright page. Visible text and ld+json both said ₹567; the `finalPrice` regex said 537, so it was ignored. No sold-out widget |
| 17422 | Disney Princess Little Mermaid On Land Ariel doll (Rogerkart) | Ajio 4936631230 | ₹450 | ₹1,499 | 70% | PDP in a Playwright page (curl gets a 403), ADD TO BAG present. The NEW30 code is for new users only, so the price was kept at ₹450 |

- Both deals go through Cuelinks (`cid=527`).
- A ₹ guard checked that every ₹ figure in each deal's text equals its price or M.R.P.

## Price sync

#5035 LG T80VBMB4Z (B0DPHTSTYJ) was reposted in INDIAN CHEAP DEALS:

| Field | Before | After (PDP) |
|---|---|---|
| Price | ₹20,996 | ₹21,990 |
| M.R.P. | ₹28,990 | ₹28,990 |
| Discount | 28% | 24% |

- The page was in stock with add-to-cart present.
- The title, description and how-to steps were rewritten to match the new price.

## Rejected / skipped

| Group | Post | Reason |
|---|---|---|
| ONLINE SHOPPING DEALS | SASSAFRAS crop shirt/pants B0F9YZBG7T | The post said ₹338, the PDP shows ₹509 (drift) |
| Dealzone | French Connection watches | The link resolves to a `/s?` search page |
| Dealdost | Nykaa mascara | Price needs a new-user code |
| Hidden Loot | Swiggy coupon | Not a product |
| IFS Tips | Instamart | Grocery; prices depend on location |
| OMG LOOTDEALS | Credit card | Not a product |
| NonStopDeals | Caprese | Category page |
| CoolzTricks | "Many At Loot Price" | Multiple products |

`tg-multi-seen.json` now has 5,859 entries (+3: B0F9YZBG7T, BNFGSJU3HKUNVJSU, 4936631230).

## Freshness

- **IndexNow:** HTTP 200 for 6 URLs (the 3 slugs plus 3 hub URLs).
- **Sitemap:** the deals child is the pinned top-100 set, so the new deals are noindex by design and stay out of it.
- **llms.txt:** dynamic, so the new deals appear there automatically.
