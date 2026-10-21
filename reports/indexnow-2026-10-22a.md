# INDEXNOW · 2026-10-22a (01:06 IST)

**HTTP 200 for 41 URLs, submitted in `--paths` mode (this mode adds no URLs on its own, so the hubs were listed explicitly).**

- Deals: the newest 30 LIVE deals by id (ids 14025–14054). This covers the IFS 10-22a batch, DesiDime 10-22a and TG 10-22a.
- Posts:
  - #516 `/blog/usb-vs-xlr-vs-wireless-lavalier-mic-which-to-buy-india`
  - #515 `/blog/thermal-wear-cotton-vs-wool-vs-fleece-which-to-buy-india`
  - #514 `/blog/massager-guide-neck-vs-foot-vs-massage-gun-which-to-buy-india`
- Hubs: `/`, `/offers`, `/blog`, `/freebies`, `/coupons`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`

Each deal batch was also pinged in its own tick. This run is the 6-hourly freshness resubmit.

## CEO audit

- At SITEMON 10-22b (01:04 IST), prod and the DO ingress returned 200 on 12/12 checks.
- **Posts (IST 2026-10-22):** 1 so far, which is normal at 01:06. Coverless 0, seoless 0.
- **Deals:** 13,526 LIVE. null-price 0, null-image 0, PENDING_REVIEW 0. Broadcast cursor 14045 against a highest deal id of 14054; the external cron is draining the IFS batch.
- **Crons:** 9/9 in CronList. Unpushed commits: 0.
- **Rot:** Deal Dibba has been missing from the TG sidebar for 3 ticks.
- **Rot:** chrome-devtools and reticle MCPs are still CONNECT_TIMEOUT. Playwright covers the work.
- **Rot:** the DO API token has still not been rotated (owner action).
