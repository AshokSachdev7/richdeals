# TELEGRAM-DEAL-MONITOR tick 2026-09-26ay (20:05 IST)

**4 deals pushed LIVE (3 Amazon + 1 Flipkart). `/admin/deals/bulk` returned 201 with count 4 and created all 4 (ids 11509–11512). IndexNow returned HTTP 200 for 7 URLs (4 slugs + 3).**

## Sweep
- One `browser_evaluate` over `.chat-list .ListItem.Chat` in the richDeals Playwright profile. Five new single-product posts; the rest were repeats, grocery, spam or our own channel.
- Shortlinks resolved with curl → ASIN / Flipkart pid. None was in `data/tg-multi-seen.json` or the DB.
- Amazon: same-origin fetch in the logged-in tab, `#centerCol` price + M.R.P., add-to-cart, clip-coupon flag, `data-old-hires` image.
- Flipkart: ld+json `offers.price` + availability in a Flipkart tab.

## Pushed
| Group | Store | Product | Price / M.R.P. |
|---|---|---|---|
| CoolzTricks | Amazon | Studds Drifter ISI+DOT full-face helmet (B0DBDFFY7D) | 1,502 / 2,695 |
| Dealzone | Amazon | WAICO 13-in-1 tubeless puncture kit (B0GCSFQ47T) | 189 / 999 |
| ONLINE SHOPPING DEALS | Amazon | Solimo adult diapers pants, L, 10 ct (B0C8THGZLV) | 199 / 580 |
| SB Loots | Flipkart | FREECULTR printed bandana, pack of 2 (BDAG22BWF5S2QYFR) | 249 / 999 |

- Copy is original, 3 sentences each; only ₹ figures are the live price plus one "about ₹20 per pant" per-unit mention.
- `/out/11509` → 302 `amazon.in/dp/B0DBDFFY7D?tag=ashoksachdev-21`; `/out/11512` → 302 `flipkart…pid=BDAG22BWF5S2QYFR&affid=djhackraj`. Prod deal page 200.

## Rejected
| Group | Item | Reason |
|---|---|---|
| Dealdost | Caresmith Bloom 4-in-1 trimmer B09Q5YTT39 | PDP ₹1,099; channel ₹891 only after a 19% clip coupon |
| Others | IFS Tips Instamart, Rogerkart cashew, handbag, Syska | Repeats / grocery |
| Others | Hidden Loot Supercoins, Deal Dibba, OMG | Spam / junk |

Seen file: 2,085 → 2,090.

## Freshness
- **IndexNow:** HTTP 200 for 7 URLs.
- **Sitemap:** 10,482 `<loc>` at read time; ISR `revalidate = 1800` picks up the 4 rows within 30 min.
- **llms.txt:** 200, dynamic.

## CEO audit
- **Prod:** all 7 endpoints 200, all ≤0.46 s.
- **Deals:** 11,165 live, 0 pending, 0 null price, 0 null image. DB max 11512.
- **Posts:** 335, 0 coverless, 0 seo-less. IST days 09-18 → 09-26: 3/3/2/1/3/2/3/4/4. Today at cap.
- **Broadcast cursor:** 11508 vs DB max 11512 — this batch, drained by the external tg-broadcast cron.
- **Git:** 0 unpushed before this commit.

Verdict: green. 4 deals shipped and pinged.
