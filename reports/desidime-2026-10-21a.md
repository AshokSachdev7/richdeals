# DESIDIME — 2026-10-21a (13:36 IST)

**4 pushed LIVE (3 Amazon + 1 Myntra). IndexNow HTTP 200, 7 URLs.**

The first tick after the 33-hour idle gap. Playwright MCP is down, so Amazon
was verified by plain curl. On this tick curl got full PDPs back with no captcha.
The live price was read from `"priceAmount"`, with a fallback to
`apex-pricetopay-value` → `a-price-whole`. Stock was confirmed by
`#add-to-cart-button`.

## Funnel

| Stage | Count |
|---|---|
| Discovered (/new + homepage cards) | 38 |
| Product-resolved (after JUNK/GROCERY filters) | 27 |
| Already in DB | 4 |
| Fresh | 23 |
| Rejected: Amazon PDP drift | 11 |
| Rejected: ld+json drift (Myntra 3, Flipkart 3) | 6 |
| Rejected: no ld+json / not a product | 2 |
| **Pushed** | **4** |

## Pushed

| Deal | Price | MRP | Note |
|---|---|---|---|
| `k-and-f-concept-72mm-variable-nd-filter-nd2-nd400-b08kgkkfzb` | ₹2,429 | ₹6,999 | PDP = card |
| `neewer-74-inch-video-tripod-fluid-head-tp75-b0bpxrvd79` | ₹13,658 | null | MRP ₹79,499 would mean 83% off, so it was nulled |
| `eureka-forbes-omni-vac-1200w-vacuum-cleaner-b0hh9ttrrg` | ₹2,999 | null | MRP ₹20,000 would mean 85% off, so it was nulled |
| `titan-purple-glam-it-up-analog-watch-women-nt2664wm01-5a4b23dd6c87` | ₹2,947 | ₹5,895 | Myntra ld+json ok; InRDeals link on the clean URL (`/buy?shared=true` stripped) |

All four were bulk-created (`created:true`), and the titles and descriptions were rewritten.

## Rejected

| Item | ID | Card → live |
|---|---|---|
| Amazon | B0FR2B5YTH | ₹182 → ₹199 |
| Bajaj Shield 10L geyser | B07PJ5VMHZ | ₹5,490 → ₹6,100 |
| Amazon | B0BR8MMSNH | ₹107 → ₹268 |
| Amazon | B0H8P895HL | ₹56,490 → ₹62,990 |
| Amazon | B0F29P9CKJ | ₹38,199 → ₹43,999 (₹1,000 coupon still doesn't close the gap) |
| Amazon | B0F3DBMCBQ | ₹12,896 → ₹15,440 |
| Amazon | B0CGRS4FNF | ₹4,508 → ₹6,440 |
| Amazon | B0FFMX9JWR | ₹6,569 → ₹7,299 |
| Amazon | B0FFGSXN4G | ₹8,098 → ₹9,290 |
| Amazon | B0F79R1D5K | ₹4,884 → ₹6,429 |
| Amazon | B0DVP8HSQB | ₹2,400 → ₹3,298 |
| EXIDE tubular inverter battery | Flipkart IBAHBH6KCGJSZPMD | ₹8,961 → ₹12,149 |
| ZEBRONICS Jumbo Lite | Flipkart ACCGK5FMYZEXTTQH | ₹450 → ₹498 |
| Mokobara cabin suitcase | Flipkart STCGUHRRHBSSDCZE | ₹4,319 → ₹5,999 |
| Lakme / Rexona / Aqua Red (low-ticket FMCG) | Myntra ×3 | ₹67–71 → ₹77–81 |
| Denver Volt deo | Hamaramall | no ld+json |
| Flipkart SuperCoins → miles | X | not a product |

Most of the drift comes from card prices that bake in bank offers. This is the same pattern as 10-20d.

## CEO audit

- **Domain:** BACK. RDAP NS = Cloudflare (`nia`/`leif`), changed 2026-10-20T20:30Z after the owner cleared HostingRaja e-KYC. richdeals.in returns 200 on all prod endpoints.
- **Posts (IST):** 2 today (#513 BOFU massage gun vs shiatsu, #514 TOFU massager guide), both from this batch. Coverless 0.
- **Deals:** before this tick, nothing new for 33h (#13915 was the newest), because the session sat idle. This tick ends the drought.
- **Playwright / chrome-devtools MCP:** CONNECT_TIMEOUT. TG is blocked, and so is Flipkart PDP verification.
