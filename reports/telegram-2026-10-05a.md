# Telegram tick 2026-10-05a

Sidebar sweep, 13 groups (one `browser_evaluate`), dedup vs `data/tg-multi-seen.json`.

## Pushed — `/admin/deals/bulk` count 2

| Deal | Price | Note |
|---|---|---|
| Lakme Glycolic Illuminate Serum 1% (B0CPDNFW3Z) | ₹279 / M.R.P. ₹749 (63% off) | NEW id 12565. 4.2★ (400), in stock + ATC, 30 ml variant (title says 15 ml — flagged in howTo) |
| SanDisk Ultra Curve 64GB USB 3.2 (B0B4N243KC) | ₹800, no M.R.P. on PDP | created:false — already LIVE id 12535 at ₹800 since 10-04; slug unchanged, copy refreshed. mrp/discount left null (channel "regular ₹1,344" not on page) |

## Rejected
- Ray-Ban Meta B0GFNYJBZW — PDP ₹22,425 vs channel ₹15,425 (SBI card price)
- adidas watch — amzn.lt/EMCrv6tY DNS dead
- Police perfume — myntr.it → Myntra search page
- Dove/Vaseline — FMCG
- Flipkart Black ₹499, Swiggy Dineout, Amazon Business post, "video dekho" — promo / not product
- Handbag B0G38DGNKM (LIVE 7110 ₹3,459), Syska power bank, B082YH1TPN — seen

## Freshness
- IndexNow: HTTP 200, 5 urls (2 slugs + 3 hubs)
- sitemap ISR 1800s, llms.txt force-dynamic — no new static routes

## CEO audit
live 12,086 · pending 0 · null price 0 · null image 0 · DB max 12565 vs broadcast cursor 12564 (new row, next broadcast run) · posts 367, coverless 0, today (IST) 1 · prod `/ /offers /blog /sitemap.xml /feed.xml /api/deals` + new deal page all 200 · unpushed 0. Clean.
