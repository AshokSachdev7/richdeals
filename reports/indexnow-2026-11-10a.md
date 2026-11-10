# IndexNow — 2026-11-10a

**Result: slug mode HTTP 200 (23 URLs), paths mode HTTP 200 (11 URLs).**

## Pings

- Slug mode: the 20 newest LIVE deals (#16232-#16251), and the script added the 3 hubs. Result: **HTTP 200 for 23 URLs**.
- Paths mode: `/blog`, `/feed.xml`, `/llms.txt` plus the 8 newest posts. Paths mode adds nothing on its own, so the hubs were listed by hand. Result: **HTTP 200 for 11 URLs**.
  - `/blog/quartz-vs-automatic-vs-solar-watch-which-to-buy-india`
  - `/blog/air-fryer-food-not-crispy-causes-fixes`
  - `/blog/cat6-vs-cat5e-vs-cat7-lan-cable-which-to-buy-india`
  - `/blog/washing-machine-shaking-fix-stand-anti-vibration-pads`
  - `/blog/robot-vacuum-vs-stick-vacuum-which-to-buy-india`
  - `/blog/how-to-choose-a-baby-stroller-india`
  - `/blog/travel-neck-pillow-memory-foam-vs-inflatable`
  - `/blog/does-lumbar-support-cushion-help-back-pain-office-chair-car`
- sitemap.xml is ISR with a 1800s revalidate. llms.txt is force-dynamic.

## CEO audit

| Check | Result |
|---|---|
| Prod 7 URLs | 7/7 return 200 |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 |
| Posts | 476. 0 coverless, 0 without SEO fields. 11-10 IST: 3. |
| Unpushed commits | 0 (before this report) |

## Still open

- Blog misses: 11-08 had 0 posts, 11-02 had 0, 11-01 had 1.
- Same-price dup confirmations write no PH row in the desidime, TG and IFS dup-sync paths (SEO-AUDIT-FIX candidate).
- TG groups Loot Deals 24x7, OMG LOOTDEALS and Deal Dibba not checked.
- TG 11-04l backlog: Vyom, Syska PWBGGD4THDQZYAY6, CELLO Kidzbee, B0G2BBWKCP, KTAGY3VM4MDQBXVM, B07BK983NP, B0CGQ834KW, ENVH9AFZTTYXS38D. TIED RIBBONS toran.
- Price drift: #11896 Flipkart ₹664 vs DB ₹899, 16 bare Flipkart links, 96 drift rows.
- The DO API token still needs rotating (owner action).
