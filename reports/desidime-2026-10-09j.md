# DesiDime tick 2026-10-09j (18:46 IST)

**1 deal pushed** (count 1, created:true). IndexNow HTTP 200 (4 URLs). Deal page on prod returns 200.

Stage 1 found 34 cards. 21 resolved to a single product, 2 were already in the DB, and 19 were fresh. 18 of the 19 were rejected.

## Pushed

| Deal | Price | M.R.P. | Verification | Affiliate |
|---|---|---|---|---|
| [JBL Cinema SB560 3.1 soundbar with wireless subwoofer](https://richdeals.in/jbl-cinema-sb560-3-1-channel-dolby-audio-soundbar-with-wireless-subwoofer-250-w-b0d45zcn3y) (B0D45ZCN3Y) | ₹10,999 | ₹25,999 (58% off) | Amazon PDP: price matches, In stock + add-to-cart, 4.1★ / 558 ratings | Amazon `ashoksachdev-21` |

## Rejected

| Item | Card price | Live price | Reason |
|---|---|---|---|
| Lenovo Idea Tab with pen (Amazon) | ₹20,749 | ₹23,999 | Price drift; 2.0★ / 5 ratings |
| SHARP 9 kg top-load washer (Amazon) | ₹10,760 | none | No price, no add-to-cart |
| Prestige Iris 750 W mixer (Amazon) | ₹2,107 | ₹2,429 | Price drift |
| Nutri juicer mixer 500 W (Amazon) | ₹1,353 | ₹1,470 | Price drift; only 1 left; 7 ratings |
| KARWAN "iPhone" 20 W adapter (Amazon) | ₹265 | ₹279 | Price drift; third-party brand sold under an iPhone title |
| Fastrack Trendies watch (Amazon) | ₹1,280 | ₹1,392 | Price drift |
| Centuary Sleepables queen mattress (Amazon) | ₹4,872 | ₹7,155 | Price drift |
| Bose SoundLink Plus (Amazon) | ₹17,690 | ₹19,990 | Price drift |
| Dabur Glucose-D 1 kg (Amazon) | ₹135 | n/a | Food |
| Bosch TrueMixx Pro mixer (Flipkart) | ₹4,859 | ₹5,799 | Price drift (ld+json read in browser tab) |
| Sony WF-LC900 (Myntra) | ₹11,091 | ₹15,990 | Price drift |
| Kidsmate scooter, JBL Go 5, TCL G64 monitor (repeats) | | | Price drift, re-checked this tick |
| Sony WF-1000XM5 (Reliance Digital, repeat) | ₹13,990 | ₹13,990 | Only 1 rating |
| Chiwda (Instamart), samosa (webview), "₹150 off" events card | | | Food / non-store / not a product |

## CEO audit

| Check | Result |
|---|---|
| Audit counts (posts today IST, coverless, SEO-less, null price, null image, PENDING_REVIEW, LIVE, DB max) | `{posts:3,cov:0,seo:0,np:0,ni:0,pend:0,live:12371,max:12888}` |
| Prod `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/llms.txt`, `/api/deals` | 200 for all 7 |
| Broadcast cursor | 12887. DB max is 12888, which is this tick's row; the external broadcast cron will pick it up on its next run. |
| Unpushed commits | 0 before this commit |

Clean.
