# DESIDIME-INGEST tick — 2026-11-20k

This tick ran stage 1 (`apps/api/scripts/ingest-desidime.mjs`) over the DesiDime `/new` listing and the homepage cards, with no per-deal fetch. It applied the JUNK and GROCERY filters and resolved each Buy Now through `visit.desidime.com` to the real merchant URL. Amazon candidates were verified in the logged-in Playwright tab; non-Amazon ones went through `productLd()` (±₹1, InStock). Candidates were deduped by productId against the live DB, and duplicate LIVE rows were price-checked. Run at about 20:44–21:00 IST on 11-20.

**Result: 1 pushed (#17036, the Solimo 24L foldable underbed storage box on Amazon), with HTTP 201, `count: 1`, `created: true` and LIVE. 1 duplicate was repriced (#13704 Philips HL7756, ₹2,449 → ₹3,299). 3 Amazon candidates drifted or were unavailable on the PDP and were rejected, and 2 were dropped as FMCG or grocery. IndexNow returned HTTP 200 for 5 URLs. Prod returned 200 everywhere and the CEO audit is green.**

## Stage 1 funnel

| Step | Count |
|---|---|
| Cards read | 35 |
| Junk or other-store drops (Amazon Now ₹9, Levi's `/s?`, Invideo, Helium10, Oxford Street jeans category, men's shirt category, and others) | 14 |
| Resolved to a single product | 15 |
| Already in the DB | 4 |
| Rejected within 24h (OnePlus Pad Go TABGTHGMBPDCHWGP) | 1 |
| Fresh | 10 |

Stage 1 itself skipped 4 of the fresh ones: the Haier 215L refrigerator RFRHQNJQCKPHQVTJ (drift from the card's ₹19,309), Flipkart Minutes pet food PFDHMJNUMZCNEMCJ (out of stock), the Lenovo IdeaPad Slim 5 COMHZX8EUBZANC6Z (drift from the card's ₹90,640) and Omnisend 33fa5531948c (no ld+json).

## PDP verification

| Product | ID | Card | PDP | Outcome |
|---|---|---|---|---|
| Voltas Beko 8kg 5-star front-load washer | B0FDH7M1QS | ₹22,340 | ₹25,090, M.R.P. ₹56,990 | Rejected (drift) |
| Hykes knee cap | B09RB5249D | ₹99 | ₹499, "Currently unavailable", no add-to-cart | Rejected |
| Solimo foldable underbed storage box 24L, Black & Grey | B08WYMLMX4 | ₹233 | ₹233, M.R.P. ₹1,400, In stock, add-to-cart present, no coupon | Pushed |
| Samsung 256L 2-star refrigerator | B0G8K4KSR6 | ₹23,990 | ₹28,740 with a ₹1,000 coupon (₹27,740 net), M.R.P. ₹35,999 | Rejected (drift) |
| Philips HL7756 mixer grinder | B01GZSQJPA | — | ₹3,299, M.R.P. ₹4,795, In stock, add-to-cart present | Duplicate of #13704, repriced |
| Vaseline lip balm | B07VLKB66C | ₹103 | not read | Rejected (low-ticket FMCG) |
| Walnuts | NDFHZNAETF3XJ8UQ | ₹741 | not read | Rejected (grocery) |

The 5 rejects were appended to `data/dd-rejected.json` (now 2,177 entries), which stays unstaged, as usual.

## Duplicate hits

| Row | Product | DB price | Action |
|---|---|---|---|
| #13704 | Philips HL7756 (B01GZSQJPA) | ₹2,449 | Repriced to ₹3,299 (see below) |
| #17035 | Orient Aquator Edge 15L geyser (B0FCYBZ351) | ₹5,999 = card | None |
| #17006 | Solimo quilt (B0D73T7R7W) | ₹329 = card | None |
| #17003 | Billion air fryer (AFRHPHNXNGCY5DNN) | ₹2,599 = card | None |

## Pushed

| id | Slug | Price | M.R.P. | Off |
|---|---|---|---|---|
| 17036 | `/amazon-brand-solimo-foldable-underbed-storage-box-24l-black-grey-b08wymlmx4` | ₹233 | ₹1,400 | 83% |

The affiliate link is `https://www.amazon.in/dp/B08WYMLMX4?tag=ashoksachdev-21`. The image is the marketplace CDN `m.media-amazon.com/images/I/71Sxi+2ZpBL._SL1500_.jpg`, keyed to the "24L Single Unit Black & Grey" variant. The description is original copy. The productId was checked against the DB right before the push, and the row was read back as LIVE at ₹233 / ₹1,400. The M.R.P. looks inflated for a fabric storage box, so #17036 joins the inflated-M.R.P. list.

## Repriced

| Row | Before | After |
|---|---|---|
| #13704 Philips HL7756 750W mixer grinder | ₹2,449 / ₹4,795 (49% off) | ₹3,299 / ₹4,795 (31% off) |

The title ₹ was updated to match ("at ₹3,299 (31% Off)"), a priceHistory row was added, and the slug is unchanged. The live page shows ₹3,299.

## Freshness

| Check | Result |
|---|---|
| IndexNow | HTTP 200 for 5 URLs (#17036 and #13704 plus the 3 hub URLs that slug mode adds) |
| `sitemap.xml` | 200. ISR 1800s; the deals child is top-100 only by design. |
| `llms.txt` | 200 (`force-dynamic`) |

## Prod endpoints

| Endpoint | Status | Time |
|---|---|---|
| `/` | 200 | 0.21s |
| `/offers` | 200 | 0.08s |
| `/blog` | 200 | 0.55s |
| `/sitemap.xml` | 200 | 0.07s |
| `/feed.xml` | 200 | 0.08s |
| `/llms.txt` | 200 | 0.42s |
| `/amazon-brand-solimo-foldable-underbed-storage-box-24l-black-grey-b08wymlmx4` | 200 | 0.18s |
| `/philips-hl7756-750w-mixer-grinder-3-steel-jars-b01gzsqjpa` | 200 (₹3,299 in the page) | 0.15s |
| `/api/deals` | 200: total 16,429, newest id 17,036 | — |

## CEO audit

| Check | Value | Status |
|---|---|---|
| DB LIVE vs API total | 16,429 = 16,429 (16,886 rows in total) | OK |
| PENDING_REVIEW | 0 | OK |
| Null price / null image | 0 / 0 | OK |
| Max deal id | 17,036 | OK |
| Posts | 503, 0 coverless, 0 without seoTitle or seoDesc | OK |
| Broadcast cursor vs DB max | 17,035 vs 17,036 | OK. #17036 was just pushed; the external tg-broadcast cron sends it on its next run. |
| Unpushed commits | 0 after `git fetch`, before this report | OK |
| Report suffix | `desidime-2026-11-20a` to `-j` existed, so this report uses suffix `k` | OK |
| Session crons vs roster | 9 of 9 | OK, nothing recreated |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-16 | 3 |
| 11-17 | 3 |
| 11-18 | 3 |
| 11-19 | 3 |
| **11-20** | **3** |

No day is 0 and none is above the cap of 4.

## Fixes

#13704 repriced (above). Nothing else needed.

## Still open

- **GSC top rows** #2321, #3492, #3506 and #4188 lose `priceValidUntil` on 11-26 unless they are re-checked first.
- **About 94% of LIVE deals** have no `priceValidUntil`.
- **`/posts` API response is 5.8MB**, above Next's 2MB data-cache limit. This is a performance issue, not an outage.
- **GSC traffic** is down about 70% since 10-28.
- **IFS redirector** is partly alive (7 of 106 resolved at DEAL-INGEST 20j, all Amazon).
- **Inflated M.R.P.s:** #16784, #16792, #16891, #16882, #12328, #4927, #16246, #16941, #16945, #16947, #16952, #16953, #16963, #16965, #16988, #16992, #16999, #14903, #17001, #17002, #17005, #17006, #17014, #17023, #17030, #17031, #17032, #17035, plus the new #17036. #17027 stays on watch.
- **No buy box, on watch:** #9689, #15663, #14424, #16741, #16756, #3906, #16920, #5204, #16973.
- **Low stock:** #16768, #16779, #12651, the Max sweatshirt, #16917, #3221, #360, #16943, #16946, #16953, #16962, #16967, #16972, #16973, #16974, #16977, #16989, #16991, #16994, #16996, #7569, #17022, #17033.
- **Drift rejects to retry:** Hindware Cleo Plus 60 (B0CSD8PG75), the Lenovo L22-4e + 210 combo (B0HKNG4SCJ), the Havells Nucleus Slim and GEOSLIM Jumbo stoves (B0DX7CG4CW, B0GJ5ZTWGJ), Tukzer Baggita (B0BR9PH49F), the Philips T Beamer bulb (B097MZ9SV3), the IFB 241L refrigerator (B0GWQ46LC3), the Vijaysales Voltas 1.5T AC (f987704ab186), and from this tick the Voltas Beko washer (B0FDH7M1QS), the Samsung 256L refrigerator (B0G8K4KSR6), the Haier 215L refrigerator (RFRHQNJQCKPHQVTJ) and the Lenovo IdeaPad Slim 5 (COMHZX8EUBZANC6Z).
- **ASIN reuse:** #2351, #15344, #6989, #4097. B0C7BM7L45 has two LIVE pages (#5577, #7673).
- **Stage 1 Flipkart gaps:** AFRHEPNAA6BPEF9W, COMHPXZQCZGP35HE, SHOGGJ9YQMEJVGXV.
- **DO API token** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is still posting invite links that advertise child sexual abuse material. It is not in `tg-groups.json`; none of its links were opened. The owner should leave the chat and report it to Telegram (owner action).

## CronList next runs

All times IST:

| Job | Next run |
|---|---|
| DEAL-INGEST | 11-20 20:53 |
| TG | 11-20 21:01 |
| SITEMON | 11-20 21:14 |
| DESIDIME | 11-20 22:43 |
| CONTENT-SEO | 11-21 00:39 |
| INDEXNOW | 11-21 01:23 |
| SCHEMA-AUDIT | 11-21 04:39 |
| SEO-AUDIT-FIX | 11-21 05:58 |
| AI-OVERVIEW | 11-25 11:39 |
