# DEAL-INGEST indiafreestuff tick — 2026-09-25j (02:49 IST)

**35 pushed LIVE** (34 Amazon, 1 Myntra).
- `/admin/deals/bulk` returned **HTTP 201, count 35**, and all 35 rows came back `created:true`.
- LIVE deals went from 10748 to 10783. The max deal id is now 11130.
- IndexNow returned **HTTP 200** for 38 URLs (35 slugs plus 3 hub URLs).

## Funnel
| Stage | Count |
|---|---|
| IFS listed (`/deals` + `/deals/superdeals`, fetched ≥2.5 s apart) | 69 |
| New (not in the prior sweep) | 56 |
| Single-product candidates | 53 |
| Resolved (base64 `?rto=` Buy Now → store URL) | 53 (50 Amazon, 1 Flipkart, 2 Myntra) |
| Already in the DB | 6 |
| Rejected | 12 |
| **Published** | **35** |

## Published (price verified on the product page)
Amazon prices were read from `#centerCol` in the logged-in tab. The Myntra price was read from the product page.

| ID | Product | Price / MRP |
|---|---|---|
| B0DFTJ14JC | Frosty fridge bottles ×6 | ₹306 / ₹1,080 |
| B0FMRQDJL6 | Cortina velvet sofa cover | ₹148 / ₹599 |
| B0FCBPT18L | Araami cervical pillow | ₹284 / ₹2,099 |
| B09S3NN3LS | Kabello kids role-play set | ₹99 / ₹499 |
| B0GLFYBMX5 | Goldmedal Bolt travel adaptor | ₹387 / ₹1,400 |
| B0HDNWMGR9 | Sitting monkey plush 28 cm | ₹199 / ₹599 |
| B0HDNQQWF8 | Cow plush 30 cm | ₹199 / ₹599 |
| B0GZ4T3HV4 | Ecomistiq sofa spring repair kit | ₹928 / ₹6,018 |
| B0DWK3TPPQ | MiniSteps fat cat plush | ₹102 / ₹1,299 |
| B0FDG5H3S5 | Sheesham rehal 12" (5% clip coupon) | ₹239 / ₹699 |
| B071NL2GQ8 | Klapp baby roller skates (3% coupon) | ₹545 / ₹999 |
| B0HG33DNC5 | 5015 turbo fan (3D printer) | ₹1,242 / ₹2,334 |
| B0HG5TLDZ7 | PT100 V6 heater block | ₹1,131 / ₹2,121 |
| B0DWK9TSF2 | Mini Steps bath toys | ₹152 / ₹699 |
| B0F1N9GNPK | Protoner cricket set | ₹515 / ₹2,999 |
| B0H7KX13BS | Plastic arm chairs ×2 | ₹898 / ₹2,500 |
| B0GYS9TZWP | Solimo round containers ×6 | ₹442 / ₹1,999 |
| B08B8QSCFD | Kingsway Aura car cover | ₹583 / ₹1,450 |
| B0HC469Y9L | Elevate study table with hutch | ₹1,998 / ₹10,000 |
| B0BL1J3JP1 | Signoraware steel lunch box | ₹357 / ₹751 |
| B0CYHDGQ7H | Symactive knee/elbow pad ×2 | ₹289 / ₹900 |
| B0821KJSJ1 | Fastrack Beat perfume 100 ml (3% coupon) | ₹419 / ₹895 |
| B0H5QVST75 | Longway Clipzy clip fan | ₹799 / ₹2,199 |
| B0F9LF8ZYC | Halonix 11 W emergency bulb ×2 | ₹385 / ₹1,198 |
| B0GYNL9WPL | French press 600 ml | ₹499 / ₹1,699 |
| B0CY5GNHKQ | Faber Nutrifit Nero blender (1 left) | ₹1,785 / ₹5,490 |
| B0FJMGWF5K | Lifelong saucepan 1.5 L | ₹199 / ₹999 |
| B0GLFSFF46 | Lifelong 4.2 L air fryer | ₹2,999 / ₹12,999 |
| B0H42DBG6P | Meridian trolley bags ×3 | ₹3,999 / ₹37,997 |
| B0FKBRGT1B | Lifelong hair dryer 1200 W | ₹699 / ₹2,499 |
| B0CCJ8MBLD | Lifelong beard trimmer | ₹549 / ₹2,000 |
| B0GGBVHRTS | Lifelong 3-in-1 trimmer | ₹599 / ₹1,499 |
| B0B19475TB | Lifelong body massager | ₹299 / ₹2,499 |
| B0CSZ4YN4C | Impulse AspireAtlas 30 L backpack | ₹399 / ₹2,999 |
| Myntra 43988901 | Mast & Harbour suede driving shoes | ₹384 / ₹1,999 |

**Affiliate links:**
- Amazon uses `?tag=ashoksachdev-21` on `/dp/ASIN`. The source tag `dealhind-21` was stripped.
- Myntra goes through InRDeals (`inr678975705`).

**Content and images:**
- All copy is original, written to the GEO playbook: 3 paragraphs of at least 900 characters and a 4-step how-to per deal. 22 descriptions were first under 900 characters and were lengthened with usage and care notes only, no invented specs.
- Images come from `m.media-amazon.com` `_SL1500_` and myntassets.

**Script:** `apps/api/scripts/push-ifs-0925j.mjs`.

## Rejected
| ID | Reason |
|---|---|
| B0DMK7S9W6 Wooden Street | Needs a ₹1,500 coupon, and only a thumbnail image is available |
| B0DBDT457G LA VERNE sherpa, B0FCG2R959 Timex, B0GV49SCYJ Solimo cooker, B0F5WDFQ5H waffle maker | No price on the product page |
| B0CSFP4H47 Karam goggles | Price drift: ₹774 on the product page vs ₹190 on IFS |
| B0BV2HSXPF La Verne protector | Price drift: ₹597 vs ₹359 |
| B0CCVGK3HP Solimo jars | Price drift: ₹649 vs ₹539 |
| B0F59SK4HY Solimo trolley | Price drift: ₹2,136 vs ₹1,834 |
| Myntra 45289195 Kent air fryer | Price drift: ₹3,299 vs ₹3,170 |
| B0DWJZ7T6D Mini Steps rattle | Minimum purchase is 2 |
| Flipkart JEAH7EZBDGEDJTWH DENIM FIT jeans | Its own `/p/itm` path could not be found (the `dl` URL returns 404) |

**Already in the DB:** B0GWW7V4KG, B0FHJR9D4F, B0CX967WGH, B09PTT5B5X, B07LC95P6C, B0HDPNQ63T.

## Freshness
- **IndexNow:** HTTP 200 for 38 URLs.
- **Prod spot-check:** the Myntra shoes page and the Lifelong air fryer page both return 200.
- **Sitemap:** served under ISR (1800 s), so the batch appears within 30 min.
- **llms.txt:** force-dynamic, so it is already current.

## CEO audit (checked against the DB and prod)
- **Deals:** 10783 LIVE, 0 PENDING_REVIEW. 0 LIVE rows have a null price or image.
- **Posts:** 328 in total, 0 coverless, 0 seoless.
- **Posts per day (IST):** 09-20=2, 09-21=1, 09-22=3, 09-23=2, 09-24=3, 09-25=1 so far (it is 02:49 IST). No finished day at 0.
- **Broadcast cursor:** 11095, against a max deal id of 11130. This batch just landed, so the external cron is still catching up; that is expected, not rot.
- **Prod endpoints:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt` and `/api/deals` all return 200.
- **Git:** 0 unpushed commits before this tick.

Verdict: green.
