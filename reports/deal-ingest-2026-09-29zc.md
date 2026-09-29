# DEAL-INGEST indiafreestuff tick — 2026-09-29zc (18:36 IST)

## Discovery
- 4 IFS listing pages (≥2.5 s apart): 95 slugs, **30 new**. Dropped pre-resolve: showpiece-store (Myntra sale hub), image-error test post, eBay-motors tester.
- 27 base64 `?rto=` resolved: 26 Amazon, 1 Flipkart. Pre-verify rejects: realme 16x B0HD17L8N1 (coupon + Axis CC EMI), Shayan mattress (coupon + SBI CC).
- DB dedup: only B0D22H9Y9Q (M&S vest, #2289 LIVE ₹319) existed.

## Verification (every price on PDP; Amazon logged-in tab, FK ld+json tab)
| Rejected | Reason |
|---|---|
| Pepe women jeans B0DT3XBPKD / B0DT3ZGPCL / B0FSYPX4KV | unavailable, no buy box |
| Puma Princeps B0CLY3HF3X | only 2 left, 3.4★ (2) |
| Prabha kadhai B0FCD43TP1 | no buy-box price (IFS ₹100 bogus) |
| Gladful spread B0GVYRQZX4 | drift ₹250 → ₹379, food |
| Macroman trunk BRFGG3YE65GEGFFD (FK) | drift ₹115 → ₹289 |
| IGC puffer, ROWLANS shoes, kids helmet, baggy track pant | 0 ratings |
| Havells COB, Prabha jug, Cetaphil baby bar | 1–2 ratings (jug 1.0★) |

**Accepted 10 (Amazon, all in stock):** Symbol track pants ₹349 · FreshDcart fan cover ₹196 · Orient 12 W panel ₹1,149 · Presto! wipes 720 ₹759 · Utkarsh flower DIY kit ₹203 · plant stand ×4 ₹187 · ABOUT SPACE TV unit ₹4,999 · Lifelong mini volleyball ₹120 (PDP ₹119.65) · Leader Sportz pull-up bar ₹699 · 10 m clothesline ₹199.
IFS card prices for fan cover (₹190) = post 3% coupon; TV unit (₹4,699) = post coupon — stored price is pre-coupon PDP. Copy original from PDP facts; images m.media-amazon.com. Affiliate `?tag=ashoksachdev-21`.

## Repost fix
- M&S vest #2289 was LIVE but PDP now unavailable → `prisma.update` status EXPIRED (page stays up with banner, drops from sitemap).

## Push / freshness
- `/admin/deals/bulk` → **count 10**, all `created:true`, status live.
- IndexNow **HTTP 200**, 13 urls (10 + 3). Sample deal page 200. sitemap ISR 1800 s; llms.txt force-dynamic, no new hub.

## CEO audit
| Check | Result |
|---|---|
| Live deals | 11,572 = API total (11,563 + 10 − 1 expired), max id 11921 |
| Pending / null price / null image | 0 / 0 / 0 |
| Posts | 347, coverless 0, seoless 0 |
| Posts/day IST | 09-25→09-29 all 4 (cap) |
| Broadcast cursor | 11911 vs max 11921 — batch awaits external tg-broadcast (self-heals) |
| Prod endpoints | 7/7 200 |
| Unpushed commits | 0 before this report |

Result: **10 live, 1 expired, IndexNow 200, 0 rot.**
