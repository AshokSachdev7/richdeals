# INDEXNOW tick 2026-10-11e (22:12 IST)

IndexNow returned **HTTP 200 for 13 URLs**, sent in `--paths` mode with `MSYS_NO_PATHCONV=1`.

## URLs submitted

**7 LIVE deals** created in the last 6 hours:
- `/babique-penguin-plush-soft-toy-for-kids-black-and-white-17-cm-b0d3fhjpt3`
- `/babique-ball-rattle-sound-soft-toy-for-babies-10-cm-b08pvydsx1`
- `/crompton-galaxy-usb-copper-string-fairy-lights-100-led-10-m-warm-white-b0bd43w4yp`
- `/crompton-dyna-ray-9w-b22-led-bulb-cool-day-light-pack-of-2-b0b6ffhlh9`
- `/vega-edge-isi-certified-full-face-gloss-finish-helmet-with-clear-visor-b07fckz4km`
- `/realme-techlife-100-l-direct-cool-single-door-1-star-refrigerator-rfrhzj2ztd4sg3hg`
- `/tibra-collection-men-solid-cotton-blend-straight-kurta-maroon-ktagbrwhpnk48jxk`

**1 post** published in the last 6 hours:
- `/blog/how-emergency-inverter-led-bulbs-work-backup-charging-india`

**5 hubs:** `/sitemap.xml`, `/offers`, `/blog`, `/feed.xml`, `/llms.txt`

## Report timestamp fix

The WildHorn wallet (12923) has `createdAt` 14:48 IST. That puts it outside this window, so it was correctly left out. The 22:16 and 20:18 IST times in the headers of the `desidime-2026-10-11h`/`i` reports were wrong. The DB `createdAt` values are the source of truth.

## CEO audit

Measured at 22:10 IST, 2 minutes before this tick, with no changes since.

| Check | Result |
|---|---|
| Posts today (IST) | 4, at the cap |
| Posts with no cover / no SEO fields | 0 / 0 |
| LIVE deals with null price / null image | 0 / 0 |
| PENDING_REVIEW | 0 |
| LIVE deals | 12,413 |
| Broadcast cursor | 12927, DB max 12930. The 3 new rows are waiting for the external broadcast cron. |
| Prod endpoints (7) | all 200 |
| Unpushed commits | 0 before this report |
| Session crons | 6 of 9 running. telegram-deal-monitor, deal-ingest (indiafreestuff) and AI-OVERVIEW are missing. Say "restore all crons" to recreate them. |
