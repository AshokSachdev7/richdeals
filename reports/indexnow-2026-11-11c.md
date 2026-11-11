# INDEXNOW — 2026-11-11c

**Result:** IndexNow HTTP 200 for 34 urls (3 hubs + 25 newest deals, ids 16279-16303 + 6 newest posts). An earlier run this tick sent 37 urls including 3 stray header tokens from a parsing slip (`/DEALS`, `/16279-16303`, `/POSTS`); superseded by this clean ping.

## URLs submitted

| Group | Count | URLs |
|---|---|---|
| Hubs (script adds) | 3 | `/`, `/offers`, `/sitemap.xml` |
| Newest deals (16279-16303) | 25 | longway-kratos-1000w-juicer-mixer-grinder-with-4-jars-b0c59gvnd2 · fig-living-petite-handwoven-raffia-table-lamp-b0dfqd8ypv · humming-bird-plastic-building-blocks-for-kids-b0bttctgqt · amirite-silicone-case-for-airpods-3rd-gen-b0b9bx6kxf · fast-charging-battery-hub-for-insta360-x4-b0d2y1fxq8 · anugrah-wall-mounted-soap-box-with-lid-b099s1dp9q · baby-cotton-blend-t-shirt-and-shorts-set-b0ghfcq6gt · hp-everyday-16-inch-laptop-bag-a08jwaa-b0dcjxgfsf · amazon-brand-solimo-500ml-thermosteel-bottle-b0h3khq422 · wildhorn-leather-wallet-for-men-b0bt1t682z · attro-prime-magna-lunch-box-with-bottle-b0h7b7q4z4 · dewald-brevis-csk-action-figure-b0h86njzg6 · one94store-50m-led-string-lights-b0ftsw9p33 · athom-living-cotton-bath-towel-b0gqzmlcm9 · prodot-proseries-247s-usb-wired-keyboard-b0dr16m28h · ibell-turbo-vac-700-cordless-vacuum-cleaner-b0hq6z8b2v · deniklo-men-s-fleece-round-neck-sweatshirt-b08g29zwgj · xtore-graceful-lotus-ceramic-bonsai-planter-b0h4w9zwy4 · lavie-sport-enchant-36l-laptop-backpack-b0gsbg8l9d · goldmedal-atom-3w-led-round-downlight-b0cx8k52pr · hotkei-dining-chair-seat-covers-pack-of-4-b0bgc4pzs3 · my-giraffe-coco-baby-high-chair-b0dyjyfd89 · carefoam-orthopedic-wedge-pillow-b0gc4prdf2 · wipro-12w-alpha-led-downlight-b0fnqpw33h · syska-12w-b22-led-bulb-pack-of-8-b09mcssyt5 |
| Newest posts | 6 | `/blog/bentonite-clumping-cat-litter-guide-india` · `/blog/kids-kick-scooter-2-wheel-vs-3-wheel-by-age` · `/blog/mens-leather-wallet-buying-guide-india` · `/blog/quartz-vs-automatic-vs-solar-watch-which-to-buy-india` · `/blog/air-fryer-food-not-crispy-causes-fixes` · `/blog/cat6-vs-cat5e-vs-cat7-lan-cable-which-to-buy-india` |

Endpoint: `api.indexnow.org` (key `33f3a9d6…`), script `apps/api/scripts/indexnow-ping.mjs` slug mode. Output: `DONE: IndexNow -> HTTP 200 for 34 urls`.

## Freshness surfaces

- `sitemap.xml` ISR 1800 s; deals child = top-100 indexable by design, blog child picks up the 3 new posts automatically.
- `llms.txt` force-dynamic off live queries; no new hub added this tick.

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints `/ /offers /blog /sitemap.xml /feed.xml /api/deals /llms.txt` | 7/7 HTTP 200 | OK |
| DB LIVE vs API total | 15,734 = 15,734 | OK |
| PENDING_REVIEW | #16261, #16262 (member queue) | not rot |
| LIVE null price / null image | 0 / 0 | OK |
| DB max id vs broadcast cursor | 16,303 = 16,303 (lag 0) | OK |
| Posts total / coverless / seo-less | 479 / 0 / 0 | OK |
| Posts per day IST | 11-03:4 · 11-04:2 · 11-05:3 · 11-06:3 · 11-07:3 · 11-09:3 · 11-10:3 · 11-11:3 | OK |
| Session crons vs roster | 8/9 — AI-OVERVIEW `9 11 * * 3` missing | recreate in deal turn |
| Unpushed commits | 0 (before this commit) | OK |

## Still open

- `apps/api/src/deals/deals.service.ts` `topIndexable()` GSC pin-gate fix uncommitted/undeployed — ships with next deal turn commit + deploy.
- AI-OVERVIEW session cron missing — recreate with CronCreate in deal turn.
- Member queue #16261 / #16262 (deal-review).
- DO API token rotation (owner).
