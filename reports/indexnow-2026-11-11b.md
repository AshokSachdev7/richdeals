# INDEXNOW — 2026-11-11b

**Result:** two pings, both HTTP 200. 28 URLs (25 newest LIVE deals + 3 hubs) via slug mode, 13 URLs (6 newest posts + 7 hubs/sitemaps) via --paths.

## Pings

| Mode | Input | URLs sent | HTTP |
|---|---|---|---|
| slug | 25 newest LIVE deal slugs (ids 16279-16303) | 28 (slugs + `/`, `/offers`, `/sitemap.xml`) | 200 |
| --paths | 6 newest `/blog/*` + `/blog` `/feed.xml` `/llms.txt` `/sitemap.xml` + 3 sitemap children | 13 | 200 |

Deals pinged (newest first): longway-kratos-1000w-juicer-mixer-grinder-with-4-jars-b0c59gvnd2, fig-living-petite-handwoven-raffia-table-lamp-b0dfqd8ypv, humming-bird-plastic-building-blocks-for-kids-b0bttctgqt, amirite-silicone-case-for-airpods-3rd-gen-b0b9bx6kxf, fast-charging-battery-hub-for-insta360-x4-b0d2y1fxq8, anugrah-wall-mounted-soap-box-with-lid-b099s1dp9q, baby-cotton-blend-t-shirt-and-shorts-set-b0ghfcq6gt, hp-everyday-16-inch-laptop-bag-a08jwaa-b0dcjxgfsf, amazon-brand-solimo-500ml-thermosteel-bottle-b0h3khq422, wildhorn-leather-wallet-for-men-b0bt1t682z, attro-prime-magna-lunch-box-with-bottle-b0h7b7q4z4, dewald-brevis-csk-action-figure-b0h86njzg6, one94store-50m-led-string-lights-b0ftsw9p33, athom-living-cotton-bath-towel-b0gqzmlcm9, prodot-proseries-247s-usb-wired-keyboard-b0dr16m28h, ibell-turbo-vac-700-cordless-vacuum-cleaner-b0hq6z8b2v, deniklo-men-s-fleece-round-neck-sweatshirt-b08g29zwgj, xtore-graceful-lotus-ceramic-bonsai-planter-b0h4w9zwy4, lavie-sport-enchant-36l-laptop-backpack-b0gsbg8l9d, goldmedal-atom-3w-led-round-downlight-b0cx8k52pr, hotkei-dining-chair-seat-covers-pack-of-4-b0bgc4pzs3, my-giraffe-coco-baby-high-chair-b0dyjyfd89, carefoam-orthopedic-wedge-pillow-b0gc4prdf2, wipro-12w-alpha-led-downlight-b0fnqpw33h, syska-12w-b22-led-bulb-pack-of-8-b09mcssyt5.

Posts pinged: quartz-vs-automatic-vs-solar-watch-which-to-buy-india, air-fryer-food-not-crispy-causes-fixes, cat6-vs-cat5e-vs-cat7-lan-cable-which-to-buy-india, washing-machine-shaking-fix-stand-anti-vibration-pads, robot-vacuum-vs-stick-vacuum-which-to-buy-india, how-to-choose-a-baby-stroller-india.

## Freshness

- sitemap.xml is ISR with a 1800s revalidate, so it carries the batch within 30 min. llms.txt is force-dynamic.
- No new static route added since last tick; `staticRoutes` unchanged.

## CEO audit

| Check | Value | State |
|---|---|---|
| Prod endpoints | 7/7 HTTP 200 | OK |
| DB LIVE vs API total | 15,734 = 15,734 | OK |
| PENDING_REVIEW | #16261, #16262 | member queue, not rot |
| LIVE null price / null image | 0 / 0 | OK |
| DB max id vs broadcast cursor | 16,303 = 16,303 (lag 0) | OK |
| Posts | 476, 0 coverless, 0 seo-less | OK |
| Posts/day IST | 11-05:3 11-06:3 11-07:3 11-09:3 11-10:3 **11-11:0** | ROT until CONTENT-SEO ships (next tick in queue) |
| Unpushed commits | 0 | OK |

## Still open

- 11-11 IST posts = 0 at time of tick. CONTENT-SEO owes 2-3 today; it is the next tick in this session.
- Uncommitted `topIndexable()` pin-gate fix in `apps/api/src/deals/deals.service.ts` ships with SITEMON-b deploy.
- Member queue #16261/#16262 awaits deal-review.
- DO API token rotation (owner).
