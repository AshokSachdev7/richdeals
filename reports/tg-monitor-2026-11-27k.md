# TELEGRAM-DEAL-MONITOR tick: 2026-11-27k

**Result:** 1 new deal is LIVE: #17593 (Amazon). The bulk push returned HTTP 201 with count 1, and the row came back `created:true`. One duplicate repost (Gear Classic 4 backpack, #12667) had a stale price and was synced from its PDP. IndexNow returned HTTP 200 for 5 URLs. All prod endpoints, the new page and the synced page returned 200.

## Sidebar read

One `browser_evaluate` call in the Playwright richDeals profile read the newest post from each rendered source group. Personal chats and bots were skipped. Playwright was healthy, so the curl `t.me/s/` fallback was not needed.

| Group | Newest post | Outcome |
|---|---|---|
| Dealzone | Dabur Almond Shampoo 650ml at 297, `link.amazon/B07cPheui` → B07T4KFRT3 | **Pushed** (source tag `glitzdeal05-21` stripped) |
| CoolzTricks | Gear 31L laptop backpack at 985, `amzn.to/4zJWSfu` → B0DY4JCZ46 | Duplicate of LIVE #12667. The price had moved, so the row was **synced** (see below) |
| SB Loots And Deals | Puma 70–80% off | Skipped: multi-product |
| Rogerkart Deals | NATURAL CRAVING amla candy (`fkrt.co`) | Skipped: food/grocery |
| Dealdost | Mufti Black Friday sale | Skipped: sale hub |
| ONLINE SHOPPING DEALS | SASSAFRAS | Skipped: rejected earlier (size-variant price) |
| Hidden Loot | Swiggy coupon | Skipped: not a product |
| IndiaFreeStuff Tips & Tricks | Instamart item | Skipped: quick commerce |
| OMG LOOTDEALS | Credit card referral | Skipped: junk |
| INDIAN CHEAP DEALS | LG washing machine sale | Skipped: sale hub |
| NonStopDeals | Caprese handbags | Skipped: sale hub |
| Loot Deals 24x7, Deal Dibba | Not rendered | Low activity, so the virtualized sidebar did not render them |

## Pushed

| # | Deal | Store | ID | Price | M.R.P. | Off | How it was verified |
|---|---|---|---|---|---|---|---|
| 17593 | Dabur Almond Shampoo, 650 ml | Amazon | B07T4KFRT3 | ₹297 | ₹662 | 55% | Logged-in PDP, `#corePriceDisplay .a-price-whole`; in stock; add-to-cart present; no coupon |

- **Affiliate:** `?tag=ashoksachdev-21` on `/dp/ASIN`.
- **Image:** `m.media-amazon.com`, from `#landingImage` `data-old-hires`.
- **Copy:** the title and description are rewritten and answer-first, and the description gives the date the price was checked. The item is single-variant, so how-to step 2 reads "Check the price shows ₹297". The ₹ guard passed.

## Price sync (duplicate LIVE row, re-read on PDP)

| Row | Product | Before | After (PDP) | Off |
|---|---|---|---|---|
| #12667 | Gear Classic 4 31L anti-theft laptop backpack (B0DY4JCZ46) | ₹599 / M.R.P. ₹4,399 | ₹985 / M.R.P. ₹4,399 | 86% → 78% |

- The price went **up** by ₹386, so the page was understating it, which is a stale-Offer risk. The title, description and how-to were rewritten with the new ₹ figure and %, and the description now gives the date the price was checked. The old "4.4/5 from 1,510 ratings" line was dropped because it was not re-read this tick. The ₹ guard passed. The slug is unchanged.

## Freshness

- **IndexNow:** HTTP 200 for 5 URLs (1 new slug, 1 synced slug, `/`, `/offers` and `/sitemap.xml`).
- **Prod:** `/`, `/offers`, `/blog`, `/sitemap.xml`, `/feed.xml`, `/api/deals`, the new deal page and the synced page all returned 200.
- **Sitemap:** the deals child is the top-100 pinned set, so the new deal is noindex by design and stays out of it.
- **llms.txt:** generated on each request, so the new deal shows up there without any extra step.
- **Seen list:** `tg-multi-seen.json` now holds 5,873 entries (+B07T4KFRT3; B0DY4JCZ46 was already there).
- **Audit after the push:** 0 LIVE deals with a null price, 0 with a null image, 0 PENDING_REVIEW. Newest deal is #17593. Posts on 11-27 (IST): 2. Unpushed commits before this one: 0.
