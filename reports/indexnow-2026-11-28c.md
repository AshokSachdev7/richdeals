# INDEXNOW tick: 2026-11-28c (about 13:20 IST)

**Result:** IndexNow returned **HTTP 200** for 65 URLs. That is 62 slugs plus the 3 hub URLs (`/`, `/offers`, `/sitemap.xml`) the script adds automatically. Everything went in one slug-mode call. `--paths` was not used.

## Window (last 6 hours from 07:16 IST, from the DB)

| Bucket | Count | How it was selected |
|---|---|---|
| New LIVE deals | 45 (#17648–#17692) | `createdAt` within the window |
| Repriced LIVE deals | 16 | A `PriceHistory` row within the window on a deal created before it. `updatedAt` is not used because it is the click counter. |
| Expired | 1 (#17602 Symbol jeans) | Set to EXPIRED in ingest 11-28g |
| Posts | 0 | No post was created or updated in the window. #643 and #644 were pinged in earlier ticks |

**Repriced ids:** 12909, 17646, 954, 11148, 10407, 2932, 1414, 5644, 13763, 13290, 8725, 6186, 9155, 14309, 1650, 9423

## Slugs pinged (62)

```
lifelong-magsafe-10000mah-power-bank-b0h6ls8dnf
ninja-air-fryer-pro-4-7l-b0hhjfxzfw
souled-store-hydros-mens-clogs-naruto-b0f8nj4g6d
amazon-basics-memory-foam-travel-neck-pillow-combo-b0h7xnlxvm
lavish-musk-luxury-attar-roll-on-12ml-b0fxggbcyt
bangalore-refinery-1g-24k-gold-bar-coneargtznse6szr
himalaya-total-care-baby-pants-diaper-xxl-44-b0h6bhm738
khaitan-volt-5-5-litre-instant-water-heater-b0h8pbszmy
kabello-kids-wool-hand-gloves-b08khc5nsz
atootfusion-foldable-cotton-mattress-b00ui648cc
nilkamal-plastic-arm-chair-set-of-2-b07x6n9ggd
nilkamal-chr2101-mid-back-arm-chair-b09rv7smjy
nilkamal-ecoair-latex-king-mattress-b0blg8p24l
marcoware-6-mode-hand-shower-b09j91v6s3
head-and-shoulders-anti-dandruff-shampoo-340ml-b0769lrx82
wild-stone-beyond-deodorant-pack-of-2-b08spxbmps
arrow-tailored-fit-2-piece-suit-men-b0fn4tpx19
us-polo-assn-denim-co-mens-jacket-b0cpff23xc
triggr-arcus-one-wireless-headphones-acchkbkzga8y7zgz
hifresh-air-purifier-300-cadr-aqi-display-b0gvstnzmh
boldfit-lightweight-running-shoes-men-b0h9l3h1d1
portronics-sono-10w-portable-bluetooth-speaker-b0h1vc21z1
arrow-mens-polyester-regular-jacket-b0bkqgw3mt
mcp-sf400a-digital-kitchen-scale-b0cgrcb278
baby-go-cotton-footed-romper-pack-of-2-b0ff1ktl22
kuber-industries-laundry-basket-pack-of-2-b0d7vhytkx
atom-a134-digital-kitchen-scale-b0h54zj7w7
ambrane-car-air-purifier-hepa13-b0hrzcygz4
giordano-analog-watch-for-men-b0gvjmbkqg
boat-rockerz-421-gen2-headphones-b0h1mnlv4d
levis-512-slim-tapered-jeans-b0cn9ndh6n
fedus-rj45-ethernet-coupler-b08znhn4rj
2-in-1-electric-bbq-raclette-hotpot-b07gcqg7mm
netizen-cast-iron-waffle-maker-b0c62b73v1
lapcare-3-pin-desktop-power-cable-b0h6b7nhvn
oriley-metal-flower-pot-b0d47279xq
dog-winter-fur-coat-b0blg3ft6q
singer-cutie-dx-electric-kettle-b0hpg67wvt
dropcut-groove-pro-styler-trimmer-b0h21skx4r
olay-regenerist-retinol-24-night-cream-b08698tw6x
nayasa-easy-containers-1000ml-set-of-3-b0crdz63gs
lakme-9-to-5-primer-matte-compact-b08396ppfh
crae-3d-crystal-astronaut-night-lamp-b0dznmv3tc
fire-boltt-aero-lite-tws-earbuds-b0ghqm1lz6
head-and-shoulders-active-cleanse-shampoo-90ml-42127738
halonix-2-in-1-all-rounder-9w-0-5w-b22d-led-bulb-b08r4dwm3n
alvami-womens-silk-solid-kurta-set-b0fdh21y55
park-avenue-good-morning-grooming-collection-y7yplt
haier-6-kg-5-star-oceanus-wave-drum-fully-automatic-top-load-washing-machine-hwm-b0hbb6w6gq
amazon-basics-polycotton-basket-large-hamper-polycotton-baskets-for-storage-14d--b0h3kl
athena-lifestyle-black-solid-ribbed-bodycon-dress-b0fgd7
livon-hyaluron-shampoo-for-women-men-hydrates-dry-dull-hair-2x-soft-shiny-hair-n-b0fzh5
acer-aspire-one-ryzen-3-7320u-14-inch-laptop-B0GYRK1RZC
visio-world-24-inch-hd-ready-qled-tv-b0h5r6c68n
dabur-gulabari-rose-soap-150-g-pack-of-4-b0d6b9hz6n
attro-food-bite-kids-3-compartment-lunch-box
fastrack-dezire-fx1-smartwatch
ecolink-polycarbonate-3w-led-tiltable-spot-light-z29n
milton-comet-1000-stainless-steel-water-bottle-1-litre-black-b0cxnsccvw
lowest-havells-mixer-grinder-toaster-hand-blender-7927-B0GNLS
signoraware-executive-microsafe-steel-350ml-container-set-of-1-red-rs-165-amazon
symbol-mens-carrot-fit-stretch-jeans-b09vt138jg
```

## Notes

- **Sitemap:** the deals child is the top-100 pinned set, so new deals are `noindex` by design. The pages and blog children are ISR (30 min).
- **llms.txt:** generated on each request.

## CEO audit (about 13:20 IST)

| Check | Value | Status |
|---|---|---|
| Prod | `/` 0.17s, `/offers` 0.07s, `/blog` 0.59s, `/sitemap.xml` 0.08s, `/feed.xml` 0.09s, `/api/deals` 0.08s, all 200 | OK |
| LIVE / PENDING_REVIEW / null price / null image | 17,085 / 0 / 0 / 0 | OK |
| Newest deal / broadcast cursor | #17692 / 17685 | OK. The broadcast is still working through the 11-28g batch |
| Posts on 11-28 (IST) | 2 (#643, #644) / coverless 0 / missing SEO fields 0 | OK; the CONTENT-SEO tick (18:39) covers the third |
| Crons | 9 of 9 (SITEMON 11-28n) | OK |
| Unpushed commits | 0 before this report | OK |
| Still open | SCHEMA-AUDIT reports for 11-26 and 11-27 are missing. The deploy script builds web before restarting rd-api. The Telegram roster is down to about 5 of 13 active groups | Carried |
