# TELEGRAM-DEAL-MONITOR tick — 2026-11-24b

This tick ran from about 01:40 to 02:05 IST on 11-24. The sidebar was read in the Playwright `richDeals` profile with one `browser_evaluate` over `.chat-list`, covering the groups in `data/tg-groups.json`. The CoolzTricks chat history was then opened with a trusted sidebar click and scraped. Shortlinks were resolved, each candidate was deduped against `data/tg-multi-seen.json` and the live DB by productId, and every price was read on the Amazon product page in the logged-in tab.

**Result: 0 new deals pushed. The only fresh single-product ASIN (Bata) failed price verification, and every other candidate was already in the DB. 4 existing LIVE rows were repriced in place to their live product-page prices. IndexNow returned HTTP 200 for 7 URLs. The CEO audit is green apart from the missed posts on 11-21 and 11-22.**

## Candidates

| Candidate | Group | Shortlink → ASIN | Finding | Action |
|---|---|---|---|---|
| Bata derby shoes, "₹868" | CoolzTricks | `amzn.to/4Cc5Ep4` → B0GMJTNSPT | New. Product page reads ₹1,848 against ₹2,799, in stock, sold by Cocoblu | **Rejected** for drift |
| Crompton Star Lord 5W downlighter, pack of 10, "727" | CoolzTricks | `amzn.to/495kEHS` → B0CW21ZKWD | LIVE row #13590 at ₹944; product page reads ₹812 | **Repriced** |
| Dabur Herb'L charcoal toothpaste, pack of 2, "₹96" | CoolzTricks | `amzn.to/4ffb0pC` → B0BQC6B15R | LIVE row #977 at ₹88; product page reads ₹96 | **Repriced** |
| Dove Shea Butter hand wash 250 ml, "₹67" | CoolzTricks | `amzn.to/4kqafh8` → B092W5P5JG | LIVE row #13527 at ₹67; product page reads ₹104 | **Repriced**. The post's ₹67 is gone |
| Bosch 8 kg top-load washing machine, "₹18,740" with ICICI EMI | CoolzTricks | `amzn.to/4CazE4D` → B0GCNFRRL8 | LIVE row #4926 at ₹19,090; product page reads ₹20,490. The post's figure needs a bank card | **Repriced** to the card-free price |
| Lifelong LLSM120G sandwich maker, "504" | CoolzTricks | `amzn.to/48vL5X2` → B08LVVTGZK | Row #13500 is EXPIRED; product page has no price and no add-to-cart | Left EXPIRED |
| Patanjali shampoo, ₹240 | CoolzTricks | `amzn.to/4kpD39s` → B0D8BRRD1B | Row #5848 already matches the post | Duplicate |
| Milk frother | CoolzTricks | `amzn.to/4zTWmfI` → B0FYNR8NR7 | Row #16706, in the seen list | Duplicate |
| "Loot 428" | CoolzTricks | `amzn.to/493bhZc` → B0HG97GN9R | In the seen list, rejected in an earlier tick | Skipped |
| Myntra "Looto" | CoolzTricks | `myntr.in/tsmpkC` | No price in the post, so there was nothing to verify | Skipped |

**Skipped without a product-page read:**
- Multi-product, category or brand posts: Fastrack, Havells coupon, Bata/J&J, geysers, Jack & Jones, Cetaphil, ONLY/Cantabil, Rare Rabbit (Myntra), M&S.
- Already seen: Havells mixers, Amazonbasics basket, "3199".
- Junk: Spin & Win (quiz) and the Saffola coupon.
- Location-locked grocery: Minus30 ice cream (Hyderabad only).

## Repriced in place (Prisma update + `priceHistory` row)

| Row | Product | Old → new | M.R.P. |
|---|---|---|---|
| #13590 | Crompton Star Lord JBNXT 5W downlighter, pack of 10 | ₹944 → ₹812 | ₹2,500 (68%) |
| #977 | Dabur Herb'L charcoal toothpaste, pack of 2 | ₹88 → ₹96 | ₹365 (74%) |
| #13527 | Dove Shea Butter & Vanilla hand wash, 250 ml | ₹67 → ₹104 | ₹149 (30%) |
| #4926 | Bosch 8 kg 5-star top-load washing machine (WOE80AH0IN) | ₹19,090 → ₹20,490 | ₹26,490 (23%) |

Every product page was read in stock with add-to-cart. Before the update, a validator checked each title and description: every ₹ figure had to equal the new price or the M.R.P., and every percentage had to equal the computed discount. Two older copy bugs were fixed along the way:
- #13590's description quoted ₹850 and 66% while the row said ₹944 and 62%.
- #977's title still said 76%.

The Bosch description mentions bank-card EMI offers without a rupee figure, because that price is not available to every buyer. Slugs are unchanged, and the Bosch page returns 200 on prod.

## Freshness

| Surface | Status |
|---|---|
| IndexNow (`indexnow-ping.mjs`, 4 slugs + 3 hub URLs) | HTTP 200 for 7 URLs |
| Repriced deal page on prod (Bosch) | 200 |
| sitemap.xml | ISR `revalidate = 1800`. No new deals this tick |
| llms.txt | `force-dynamic`, rebuilt per request. Returns 200 |
| Seen list | 15 keys added (4 ASINs, 11 shortlink codes); 5,789 entries |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`) | All 200, 0.07–0.67s | OK |
| DB LIVE / total | 16,520 / 16,976 | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,126 = 17,126 | OK. The external broadcast cron has caught up on the deal-ingest 11-24a batch |
| Coverless posts | 0 | OK |
| Unpushed commits | 0 before this report (`master` = `origin/master` after fetch) | OK |
| Report suffix | `tg-monitor-2026-11-24.md` and `-24a.md` existed, so this report uses suffix `b` | OK |
| Deploy | None. This was a content-only tick | n/a |

## Posts per day (IST)

| Day | Posts |
|---|---|
| 11-18 to 11-20 | 3 each |
| **11-21** | **0 (missed)** |
| **11-22** | **0 (missed)** |
| 11-23 | 2 |
| 11-24 | 1 so far. CONTENT-SEO runs at 06:39, 12:39 and 18:39 IST |

## Still open

- **About 94% of LIVE deals** have no `priceValidUntil`.
- **The `/posts` API response is 5.8MB**, which is above Next's 2MB data-cache limit.
- **GSC traffic** is down about 70% since 10-28.
- **Inflated M.R.P.s:** see `tg-monitor-2026-11-23a.md` and `-23b.md`.
- **No buy box:** #7259, #12963 and #8707.
- **Flipkart drops:** boAt Stone 510 and the Caprese sling bag.
- **DO API token** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is still posting invite links that advertise child sexual abuse material. This tick opened only the CoolzTricks chat, did not open that chat, and opened none of its links. The owner should leave the chat and report it to Telegram (owner action).
