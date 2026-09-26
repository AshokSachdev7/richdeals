# DEAL-INGEST indiafreestuff tick 2026-09-26ba (20:35 IST)

**6 deals pushed LIVE (4 Amazon + 2 Flipkart). `/admin/deals/bulk` returned count 6, all created. IndexNow HTTP 200 for 9 URLs (6 slugs + 3).**

## Sweep
- IFS homepage + `/deals/index` pages 1–3, ≥2.5 s between requests: 102 slugs, 26 new since 26au.
- Dropped before resolving: Freecultr / Studds (pushed in 26ay), ICICI/AXIS variant slug, duplicate min-buy-2 slugs → 21 candidates.
- All 21 base64 `?rto=` Buy Now ids resolved to real store URLs (their `dealhind-21` / `affid=adminnxtify` stripped).
- Dedup vs live DB by `productId` (Prisma): 0 already live.
- Every price re-read on the PDP (Amazon: logged-in tab `#centerCol`; Flipkart: ld+json).

## Pushed (ids 11513–11518)
| Store | Product | Price / M.R.P. |
|---|---|---|
| Amazon | Symbol men's quilted bomber jacket | 679 / 3,399 |
| Amazon | Faber FRC Sydney 1.8 L rice cooker, 2 steel pots | 3,800 / 7,599 |
| Amazon | Mumma's LIFE 3 L triply kadai with lid | 1,311 / 3,599 |
| Amazon | Tokyo Talkies women sleeveless dress | 160 / 1,599 |
| Flipkart | AMAK INC microfibre chair pad, pack of 2 | 146 / 999 |
| Flipkart | OSCAR Jazz Club + Forever Oud EDP combo 200 ml | 299 / 2,298 |

- Original 3-sentence copy from PDP facts; only ₹ figures are the live price plus "about ₹" per-unit mentions.
- Images from `m.media-amazon.com` / `rukmini1.flixcart.com`.
- `/out/11513` → `amazon.in/dp/B095SYF8RQ?tag=ashoksachdev-21`; `/out/11518` → Flipkart `affid=djhackraj`.

## Rejected
| Item | Reason |
|---|---|
| boAt Slazer K100+ B0H2MFYHCB | IFS ₹1,478 vs PDP ₹1,599 (drift) |
| Meridian 65 cm suitcase B0H429BQJF | IFS ₹1,599 vs PDP ₹2,199 (drift) |
| TIGC zipper jacket B0BNLN5MWJ | 3.0★ |
| SNOW WAVE mosquito killer (Flipkart) | 3.5★, 11 reviews |
| ACTIVA Aero Five fan (Flipkart) | ₹4,549 is ICICI/AXIS card-only; PDP ₹4,999 |
| Lifelong leg massager B0G496XTL6 | SBI-card-only price |
| Car bumper clips B0D4YYB1GT | No rating, no hi-res image |
| ArtRight kit, Eightiz bin, oil comb, flour sifter, Tung Tung keychain, zip launcher | Clip coupon needed |
| Crop tank top ×2 | "Min Buy 2", ambiguous |

## Freshness
- **IndexNow:** HTTP 200, 9 URLs.
- **Sitemap:** 10,486 `<loc>` (ISR 1800 s, catches the rest within 30 min).
- **llms.txt:** 200, dynamic.

## CEO audit
- **Prod:** 7/7 endpoints 200, all ≤0.43 s.
- **Deals:** 11,171 live, 0 pending review, 0 null price, 0 null image. DB max 11518.
- **Posts:** 335, 0 coverless, 0 seo-less. IST posts/day 09-18 → 09-26: 3/3/2/1/3/2/3/4/4. Today at cap.
- **Broadcast cursor:** 11512 vs DB max 11518 — this batch, external cron drains it.
- **Git:** 0 unpushed before this commit.

Verdict: green. 6 shipped and pinged; IFS card prices drifted on 2 of 8 Amazon checks.
