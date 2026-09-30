# Deal-ingest (indiafreestuff) — 2026-09-30f

## Pushed
**18 LIVE**, all on Amazon with `?tag=ashoksachdev-21`. The bulk push returned count 18, created 18, ok 18. Every price was read on the PDP. The DB dedup check came back empty, so there were no slug rewrites.

| Slug | Price / MRP | Off |
|---|---|---|
| adidas-mens-feelcozy-crew-neck-sweatshirt-b09hc755ff | ₹1,649 / 3,999 | 59% |
| alton-leo-2050-pull-out-sink-mixer-chrome-b071vzbvzb | ₹2,238 / 15,665 | 86% |
| symbol-mens-cotton-full-sleeve-formal-shirt-b08zhgnjwb | ₹749 / 3,398 | 78% |
| ant-esports-supernova-lite-wireless-gaming-controller-white-b0h65wl5gg | ₹1,698 / 2,999 | 43% |
| attro-admire-deluxe-3-compartment-steel-lunch-box-b0glqchfkw | ₹649 / 1,149 | 44% |
| attro-glassox-borosilicate-glass-containers-set-of-7-b0fjygpd47 | ₹1,699 / 2,499 | 32% |
| e-ezra-banarasi-brocade-silk-table-runner-6-seater-pink-b08y5j3bpq | ₹699 / 2,250 | 69% |
| dell-15-dc15250-core-i7-1355u-16gb-512gb-laptop-b0fc2tjx5n | ₹73,911 / 89,007 | 17% |
| lifelong-stainless-steel-wall-mounted-bathroom-shelf-black-b0d14w7nqy | ₹639 / 2,999 | 79% |
| mamaearth-coco-tinted-lip-balm-2g-b09h3f446c | ₹150 / 299 | 50% |
| milton-aroma-tiffin-big-insulated-500ml-grey-b0f6v6gzfc | ₹499 / 875 | 43% |
| nuuk-halo-v2-linkd-smart-3d-air-circulator-fan-bldc-b0gp67f314 | ₹10,499 / 16,999 | 38% |
| safari-nex-26l-laptop-backpack-rain-cover-usb-b0fttbw9y5 | ₹1,469 / 4,499 | 67% |
| shayan-dual-comfort-4-inch-queen-reversible-mattress-b0h2f4mcsz | ₹5,728 / 16,998 | 66% |
| skybags-streax-medium-check-in-trolley-coral-b0ffbbfsy3 | ₹1,988 / 7,500 | 73% |
| skybags-swirl-75cm-large-check-in-trolley-green-b0gx5m4dpg | ₹3,410 / 7,000 | 51% |
| timex-mens-analog-watch-round-dial-water-resistant-b0fkzlqhgk | ₹5,877 / 9,795 | 40% |
| titan-purple-ceramics-mother-of-pearl-womens-watch-b0c24d87jq | ₹7,789 / 14,205 | 45% |

## Rejected (46 of the 64 IFS ASINs)
- **Rating ≤3.5:** bottle 3.1, ATTRO Shine 3.3, Bouncefit 3.3, Ezra 3.0 and 1.0, Havells fan 3.2, Teakwood 2.9.
- **≤7 ratings:** Ant stand, ATORSE, Ezra plate, EDNITA, manicure kit, Diolty, Havells geysers ×3, Nivea, phenyl, Ezra runner red, nighty and sweater, Timex TWEG ×3, Tokyo Talkies.
- **Only 1-2 left:** Caprese Felix, Ezra glass bottle, Maped, Milton Summit.
- **No add-to-cart button:** Caprese Briar, Noise soundbar, LOOM TREE, Timex B09MS4Z61L and B07QR5FS48.
- **Food:** Karachi Bakery ×2, jaggery, Tata coffee, Tetley.
- **Other:**
  - anti-dandruff shampoo — health claims
  - Gala scrub ₹65 — low ticket
  - ATTRO baking dish — only 14% off
  - Style Quotient top — no image
  - Skybags Streax Turquoise — colour duplicate
- **Flipkart PIDs:** casio LTP-V007, IFB 187L and impulse rucksack were skipped because they were not verified in the browser. Longway Kiger was rejected for price drift.

## Freshness
- IndexNow returned **HTTP 200** for 21 URLs (18 slugs plus 3 auto paths).
- Sitemap is ISR with a 30-minute refresh. llms.txt is force-dynamic.

## CEO audit (DB-verified)
- **Deals:** LIVE 11,614 · PENDING 0 · null price 0 · null image 0.
- **Posts:** 349 total · coverless 0 · seo-less 0.
- **Posts per day (IST):** 09-27 = 2, 09-28 = 4, 09-29 = 4, 09-30 = 2.
- **Broadcast cursor:** 11972 vs max id 11985. This is normal drift from the external cron, not rot.
- **Prod endpoints:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals` and `/llms.txt` all return 200.
- **Unpushed commits:** 0.
- **Result: 0 rot.**
