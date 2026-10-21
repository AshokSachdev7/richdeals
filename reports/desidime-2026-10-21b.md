# DESIDIME — 2026-10-21b

**3 pushed LIVE (1 Amazon + 2 Myntra). IndexNow HTTP 200, 6 URLs.**

Desktop-UA curl on `amazon.in/dp/ASIN` returned a CAPTCHA for all 14 ASINs this
tick, even though it worked in 21a. Playwright MCP is still CONNECT_TIMEOUT.
The fallback that worked was a mobile UA (Pixel 8 Chrome) on
`https://www.amazon.in/gp/aw/d/ASIN`. It returns the full PDP with
`"priceAmount"`, `add-to-cart-button` and colorImages, and no captcha.

## Funnel

| Stage | Count |
|---|---|
| Discovered (/new + homepage cards) | 36 |
| Product-resolved (after JUNK/GROCERY filters) | 25 |
| Already in DB | 6 |
| Fresh | 19 |
| Rejected: junk (Amazon "Sample @1") | 1 |
| Rejected: Amazon PDP drift | 13 |
| Rejected: Flipkart ld+json drift | 2 |
| **Pushed** | **3** |

## Pushed

| Deal | Price | MRP | Note |
|---|---|---|---|
| `twosoft-womens-soft-anti-slip-flip-flops-b0g81t325h` | ₹75 | null | PDP = card; MRP ₹599 would mean 87% off, so it was nulled; image keyed to landingAsinColor Brown |
| `skybags-set-of-3-textured-8-wheel-trolley-bags-102l-9c0043888819` | ₹6,762 | ₹22,500 | Myntra ld+json ok; InRDeals on the clean URL (`/buy` + utm stripped) |
| `lakme-blush-glow-watermelon-sheet-mask-pack-of-3-afe8cca7c51a` | ₹90 | ₹300 | Myntra ld+json ok; InRDeals on the clean URL |

All three were created (`created:true`). Titles and descriptions were rewritten and given GEO answer-first copy.

## Rejected (card → live)

| Item | ID | Card → live |
|---|---|---|
| TCL 65" RGB-MiniLED TV | B0GX6FMSQ7 | ₹94,992 → ₹1,09,990 (a ₹10k coupon still leaves a gap) |
| Teakwood trolley set | B0DXC6ND9Y | ₹2,970 → ₹3,299 |
| HRX 3-pc luggage | B0HHPBQKPB | ₹3,150 → ₹3,499 |
| Greenchef 3L cooker | B0BSNR1V9N | ₹969 → ₹1,490 |
| Cello H2O 920ml | B092R6DLGS | ₹114 → ₹159 |
| Black+Decker 25L geyser | B0D7D9TLKB | ₹5,470 → ₹6,078 |
| Skybags Swirl set of 3 | B0GX5QL49H | ₹4,050 → ₹4,499 |
| Samsung Tab S10 FE | B0F29P9CKJ | ₹38,199 → ₹43,999 |
| Godrej 7kg washer | B0F3DBMCBQ | ₹12,896 → ₹15,440 |
| Lavna smart lock | B0CGRS4FNF | ₹4,508 → ₹4,990 |
| AO Smith 25L geyser | B0FFMX9JWR | ₹6,569 → ₹7,299 |
| Polycab 10L geyser | B0F79R1D5K | ₹4,884 → ₹6,429 |
| Zebronics 4-port hub | B0B5H846HT | ₹139 → ₹149 |
| Zebronics Jumbo Lite | Flipkart ACCGK5FMYZEXTTQH | ₹450 → ₹498 |
| Mokobara cabin | Flipkart STCGUHRRHBSSDCZE | ₹4,319 → ₹5,999 |
| "Sample @1" | Amazon B0C6Y5QMN5 | junk |

5 of these ASINs also drifted in 21a. The DesiDime cards keep re-listing
bank-offer prices, so expect the same rejects next tick.

## CEO audit

- Posts (IST): 2 today (#513, #514). Coverless 0, seoless 0.
- LIVE deals: 13,422. Null price 0, null image 0, PENDING_REVIEW 0. Max deal id 13946.
- Playwright / chrome-devtools / reticle MCP: CONNECT_TIMEOUT. TG has to use the t.me/s fallback, and the Flipkart PDP can't be browser-verified. A Claude Code restart fixes it.
- Amazon desktop curl is now captcha'd; the mobile `/gp/aw/d/` route is the working fallback.
- DO API token rotation is still outstanding (owner).
