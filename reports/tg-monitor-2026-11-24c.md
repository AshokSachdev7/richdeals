# TELEGRAM-DEAL-MONITOR tick — 2026-11-24c

This tick ran from about 02:45 to 03:15 IST on 11-24. The sidebar was read in the Playwright `richDeals` profile with one `browser_evaluate` over `.chat-list`, filtered to the groups in `data/tg-groups.json`. The CoolzTricks chat history was then opened with a trusted sidebar click and scraped. Shortlinks were resolved, each candidate was deduped against `data/tg-multi-seen.json` and the live DB by productId, and every price was read on the Amazon product page in the logged-in tab.

**Result: 0 new deals pushed. Both fresh single-product ASINs failed price verification, and the other candidates were duplicates, multi-product posts or junk. 1 duplicate LIVE row (GKD coaster set, #17081) has no buy box any more and was moved to EXPIRED. IndexNow returned HTTP 200 for 4 URLs. The CEO audit is green apart from the missed posts on 11-21 and 11-22.**

## Candidates

| Candidate | Group | Shortlink → ASIN | Finding | Action |
|---|---|---|---|---|
| Attro Pro Sip 750 ml bottle, "@227" | CoolzTricks | `amzn.to/4fEj43k` → B0CK2D18NS | New. Product page reads ₹429, in stock, add-to-cart, sold by RetailEZ | **Rejected** for drift |
| Portable charcoal BBQ grill, "1001" | CoolzTricks | `amzn.to/48npmAD` → B0FQHZ6Y4Q | New. Product page reads ₹5,923 against ₹6,999, "Only 1 left in stock" | **Rejected** for drift |
| GKD wooden coaster set of 6, ₹90 | ONLINE SHOPPING DEALS | `amzn.to/B0b3zIdhs` → B0D2KSQ7DP | LIVE row #17081 at ₹90. Desktop `#availability` reads "Currently unavailable" with no price and no add-to-cart; the mobile `/gp/aw/d/` page also has no price and no add-to-cart | **Moved to EXPIRED** |
| Zebronics MagBoost C 25 W wireless car charger, @999 | Rogerkart Deals | `B0HQJLP2CN` | LIVE row #17059 at ₹999; product page reads ₹999 against ₹4,799, in stock | Duplicate, no change |
| LG washing machine | INDIAN CHEAP DEALS | `amzn.to/B08FsUNwo` → B0DPHTSTYJ | LIVE row #5035 at ₹20,996; product page reads ₹20,996 against ₹28,990, in stock | Duplicate, no change |

**Skipped without a product-page read:**
- Multi-product, category or brand posts: Sonata watches "starts at 487" (Dealzone, men's and women's links), Shoetopia "starts @307", Fastrack watches coupon, Bata up to 84%, Jack & Jones (2 posts), Cetaphil, Caprese up to 90% (NonStopDeals, Flipkart category).
- Junk: Saffola coupon (CoolzTricks), credit-card offer (Dealdost), Swiggy (IFS Tips), Swiggy Dineout (Hidden Loot), the SB Loots settings promo.
- Loot Deals 24x7, OMG LOOTDEALS and Deal Dibba did not appear in the loaded sidebar.

## Status change

| Row | Product | Change | Prod page |
|---|---|---|---|
| #17081 | GKD wooden coaster set of 6, birds design, 3.5 inch | LIVE → EXPIRED (Prisma `deal.update`, status only) | 200, with the EXPIRED banner |

The page stays live, as the expired-deal rule requires. Its title still says "91% Off", the inflated-M.R.P. pattern noted in the 11-23 reports; it is no longer an active offer, so the copy was left alone.

## Freshness

| Surface | Status |
|---|---|
| IndexNow (`indexnow-ping.mjs`, 1 slug + 3 hub URLs) | HTTP 200 for 4 URLs |
| Expired deal page on prod | 200 |
| sitemap.xml | ISR `revalidate = 1800`. No new deals this tick |
| llms.txt | `force-dynamic`, rebuilt per request. Returns 200 |
| Seen list | 12 keys added (2 ASINs, 10 shortlink codes); 5,801 entries |

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (`/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, `/llms.txt`) | All 200, 0.07–0.59s | OK |
| DB LIVE / total | 16,522 / 16,979 (one fewer LIVE than deal-ingest 11-24b because of the #17081 expiry) | OK |
| PENDING_REVIEW / null price / null image | 0 / 0 / 0 | OK |
| Max deal id vs broadcast cursor | 17,129 = 17,129 | OK. The broadcast has caught up on the deal-ingest 11-24b batch |
| Coverless posts | 0 | OK |
| Unpushed commits | 0 before this report (`master` = `origin/master` after fetch) | OK |
| CronList vs roster | 9 of 9 present | OK, nothing recreated |
| Report suffix | `tg-monitor-2026-11-24.md`, `-24a.md` and `-24b.md` existed, so this report uses suffix `c` | OK |
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
- **Copy mismatches:** #8707's title says "(65% Off)" while its M.R.P. and discountPct are null, and #12963's text says 55% while the row says 57%.
- **Flipkart drops:** boAt Stone 510, the Caprese sling bag, and the 6 `/indiafreestuff/p/` cards from deal-ingest 11-24b.
- **Timestamp:** `desidime-2026-11-24b.md` most likely added the IST offset twice ("08:05 IST"); its data is unaffected.
- **DO API token** still needs rotating (owner action).
- **Telegram safety:** an untracked chat in the logged-in Telegram account ("𝙎𝙥𝙚𝙘𝙞𝙖𝙡 𝙑𝙞𝙙𝙚𝙤𝙨", with an "Auto Request Accepter Bot") is still posting invite links that advertise child sexual abuse material. This tick's sidebar read was filtered to the tracked group titles, it opened only the CoolzTricks chat, it did not open that chat and it opened none of its links. The owner should leave the chat and report it to Telegram (owner action).
