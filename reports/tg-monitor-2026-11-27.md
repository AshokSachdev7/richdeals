# telegram-deal-monitor — 2026-11-27

Source: sidebar read of 13 groups (Playwright richDeals, after killing a wedged chrome) + public preview
`t.me/s/coolztricks` (only active group; 17 posts in 30h). Most groups stale.

## Pushed (new, LIVE)
| ASIN | Deal | Price | MRP | Off |
|---|---|---|---|---|
| B0FM38MRWL | boat-rockerz-371-bluetooth-headphones-50h-battery-b0fm38mrwl | 899 | 2999 | 70% |
| B0F5BGTXGG | boat-airdopes-141-elite-anc-earbuds-42h-battery-b0f5bgtxgg | 794 | 5990 | 87% |

Bulk `count:2`, both `created:true`; prod pages 200.

## Re-verified existing rows (dup reposts → PDP price moved, title/desc/discount fixed)
| id | Deal | Old → New |
|---|---|---|
| 16680 | himalaya-cocoa-butter-intensive-body-lotion-400ml-b006g84aa6 | 220 → 140 |
| 9894 | havells-eso-750-watt-mixer-grinder-4-jars-b0d7vh | 3495 → 3900 |
| 16970 | havells-fab-bldc-ceiling-fan-1200mm-white-b0d8yr7rs5 | 2645 → 2111 |
| 13674 | parachute-advansed-coco-nourish-body-lotion-600ml-b0cg17dt8t | 162 → 168 |

Unchanged (price matches DB): Revlon B006LXBS24 174, Axe Intense B09JG4GHS3 90, Axe Gold B09264ZY38 90,
Santoor B00G4UBBOY 139, Havells bulb B0D738FNB2 349, Cutting Edge bottle B0F8QDZVB8 350.

## Rejected
- Price drift vs channel: Lakme B008KH3RH8 (308→635), SignoraWare B00JJH0NW0 (805→1799), SASSAFRAS B0F9YZBG7T (338→509).
- Apparel price read null: Tokyo Talkies B0GVTNX16Z, SF Jeans B0DLW4NN5J.
- Low-ticket grocery: cold brew B0H82QJNJ2. Category/search/cashback/multi-product/Swiggy/Instamart/card posts.

## Freshness
IndexNow (6 slugs + `/`, `/offers`, `/sitemap.xml`): **HTTP 200, 9 urls**. Sitemap ISR ≤30 min; llms.txt dynamic.

## CEO audit
- Prod endpoints 200 (last SITEMON). Posts today (IST): 2 — rule met.
- Deals: ~45h ingest stall (newest 11-25 10:38Z) ended by this tick; crons 9/9 restored.
- Playwright wedge fixed by killing our pw-profile chrome tree.
