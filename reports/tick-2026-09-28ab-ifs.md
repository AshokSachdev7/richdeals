# IFS DEAL-INGEST tick 2026-09-28ab (~08:33 IST)

**Result:** 9 new deals pushed live (bulk `count:9`, all `created:true`). IndexNow returned HTTP 200 for 12 URLs (9 slugs plus 3 standard paths).

**Sweep:** crawled `www.indiafreestuff.in` (the bare domain now 301s to www) across the homepage and `/deals?page=1..3`, with a 2.6s gap between requests. Found 96 slugs, 12 of them unseen. 10 candidates remained; all resolved through base64 `?rto=` to the real store URL, and none were already in the DB by productId.

## Pushed (every price verified on the Amazon PDP; IFS card prices ignored)
| ASIN | Product | PDP price | M.R.P. | Off | Stock |
|---|---|---|---|---|---|
| B0F63G38GG | Adjustable fridge organizer drawer, pack of 2 | ₹238 | ₹1,999 | 88% | In stock |
| B0D62LVKCN | American Tourister Instavibe 3-piece trolley set | ₹7,999 | ₹28,990 | 72% | In stock |
| B0F2VJN7FQ | AZDOME 4K 3-channel dash cam, ADAS | ₹12,999 | ₹29,999 | 57% | In stock |
| B0F3P8FZLN | DELITE KOM 29" 6-shelf wall shoe rack | ₹9,346 | ₹17,072 | 45% | Only 2 left |
| B0C28T39WT | Hand-knotted jute rug, 6x9 ft | ₹5,698 | ₹12,000 | 53% | In stock |
| B0FVFH3QSR | LOCCUS outdoor 4-seater rope sofa set | ₹29,999 | ₹79,999 | 63% | In stock |
| B0DMZYSYXW | Mokobara Aisle Trunk cabin trolley 40L | ₹4,999 | ₹10,999 | 55% | In stock |
| B0FFBD54QX | Skybags Streax medium check-in trolley | ₹1,988 | ₹7,500 | 73% | Only 2 left |
| B0GPYZ9LMJ | V ONE electric standing desk, 100x60 | ₹10,689 | ₹32,990 | 68% | In stock |

- Affiliate links use `/dp/ASIN?tag=ashoksachdev-21`. Their `dealhind-21` tag and the `ref=sr_…&m=` seller parameters were stripped.
- Images come from m.media-amazon.com. The copy is original and follows the GEO playbook: answer first, then what it is, rating, a buying tip, and the verified price line.
- The IFS card prices were all wrong (₹11, ₹399, ₹99 and so on). This matches the known "IFS card prices lie" behaviour.

## Rejected
| Item | Reason |
|---|---|
| Alfa by VIP Runway 2-piece set (Flipkart STCHFNFWGPGAZJ7W) | The "Min buy 2" condition could not be verified on the PDP; ld+json shows ₹2,299 against the card's ₹28. |
| Purvaja women's dress "upto 96% off" | Category/multi-product post |
| Bata Archer thong slipper | Already live (id 11622) |

## CEO audit (DB-verified)
| Check | Result |
|---|---|
| Live deals | 11,284 |
| Pending review | 0 |
| Null price or image | 0 / 0 |
| Posts missing cover or SEO fields | 0 of 341 |
| Posts per day (IST, 09-19 → 09-28) | 1/2/1/3/2/3/4/4/4/2. Never 0. |
| Broadcast cursor | 11622 vs DB max 11631. The external cron will pick up this batch on its next run. |
| Prod endpoints (7) | all 200 |
| Unpushed commits before this commit | 0 |

**Watch:** 09-28 IST has 2 posts. The next BLOG tick can add 1–2, keeping the day at 4 or fewer. For the next IFS tick, the prev list is `ifs-prev-next.txt` (1,735 slugs).
