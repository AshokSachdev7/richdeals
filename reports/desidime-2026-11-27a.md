# DESIDIME-INGEST tick: 2026-11-27a

**Result:** 5 new deals are LIVE (#17416 to #17420): 2 from Amazon, 2 from Flipkart and 1 from Myntra. The bulk push returned HTTP 201 with count 5, and every row came back `created:true`. One duplicate LIVE row, #3370 (Logitech C920), was price-synced from ₹8,995 to ₹7,849. IndexNow returned HTTP 200 for 9 URLs. All prod endpoints returned 200.

## DesiDime is blocking curl

- curl to `desidime.com/new` now gets the Cloudflare JS challenge, and curl to `visit.desidime.com` gets a 403 with zero redirects.
- The cards were read and every Buy Now link (11 of 11) was resolved in the logged-in Playwright profile instead, one new page per link.
- **Bug found:** an unresolved hop stayed on `visit.desidime.com`. `affiliate()` read that as a store called "Visit" and wrapped it in Cuelinks, so a junk deal would have been pushed.
  - Fix in `lib/ingest-common.mjs`: added `desidime` and `smartbuy` (HDFC card-offer pages) to the `NOT_A_STORE` pattern.
  - Follow-on fix in `ingest-desidime.mjs`: a card that is still on desidime after the resolve is no longer added to `dd-dead`. A 403 is transient, so the card is retried on the next tick instead of being dropped forever.
- **Ceiling:** unattended stage 1 now yields almost nothing while Cloudflare blocks curl. Until it lets curl through again, the tick has to scrape `/new` and resolve the links in the browser.

## Cards (20 on /new)

| Outcome | Count | Cards |
|---|---|---|
| No price on the card | 5 | 2202783, 2202775, 2202771, 2202768, 2202764 |
| Junk (quick-commerce, cashback, Blinkit ghee) | 3 | 2202782, 2202778, 2202773 |
| Skipped: grocery, prices depend on location | 1 | 2202770 Noice Motichoor |
| Price drift | 5 | see Rejects |
| Duplicate, price-synced | 1 | #3370 C920 |
| **Pushed** | **5** | below |

## Pushed

| # | Deal | Store / ID | Price | M.R.P. | Off | How it was verified |
|---|---|---|---|---|---|---|
| 17416 | Liberty Premium Adult Diaper Pants, M, 30 count | Amazon B07MVWV33Z | ₹480 | ₹1,600 | 70% | Logged-in PDP tab, add-to-cart present. The PDP showed a per-unit ₹16, so the pack price from the card was used |
| 17417 | Havells Pulse 500W mixer grinder, 3 SS jars | Amazon B0DZX4LWW5 | ₹1,790 | ₹3,895 | 54% | Logged-in PDP tab, in stock |
| 17418 | NIKI TASHA Turbo Series 750W mixer grinder | Flipkart MIXH2TTGQTHSZ89K | ₹1,054 | ₹2,995 | 65% | PDP ld+json read in the browser, InStock |
| 17419 | Thomson UltraMix 500W juicer mixer grinder | Flipkart MIXHZGZAVHGZHM8G | ₹1,253 | ₹2,999 | 58% | PDP ld+json read in the browser, InStock |
| 17420 | Everyuth Naturals Rejuvenating Flora body lotion, 500ml | Myntra 28611894 | ₹125 | ₹625 | 80% | The PDP has no ld+json and `__myx` is empty. The DOM read ₹125 / M.R.P. ₹625 with ADD TO BAG and no sold-out text |

Affiliate links:
- **Amazon:** `?tag=ashoksachdev-21`
- **Flipkart:** `affid=djhackraj`
- **Myntra:** InRDeals `inr678975705`

Images:
- Amazon and Flipkart images come from the marketplace CDNs.
- The Myntra image filename is mislabeled ("LoveBeautyPlanet…"). I opened the image and confirmed it shows the correct Everyuth bottle.

Titles and descriptions are rewritten. A ₹ guard checked that every ₹ figure in the title, description and how-to steps equals the deal's price or M.R.P.

## Price sync

#3370 Logitech C920 (B006JH8T3S) was reposted on DesiDime:

| Field | Before | After (PDP) |
|---|---|---|
| Price | ₹8,995 | ₹7,849 |
| M.R.P. | ₹10,295 | ₹10,295 |
| Discount | 13% | 24% |

- The description was rewritten to match the new price.
- The slug still contains `rs-7499`. I left it alone so the indexed URL doesn't change.

## Rejects (added to `dd-rejected.json` for 24h)

| Card | Product | Card price | Live price |
|---|---|---|---|
| 2202781 | iQOO B07WYMJPVS | ₹17,499 | ₹15,449 |
| 2202776 | WHOOP B0DY2SWV16 | ₹24,690 | ₹21,690 |
| 2202767 | GIVA B09PBR3H44 | ₹660 | ₹634 |
| 2202786 | InnoQ WMNH8YZRVUBC2KUT | ₹4,718 | ₹4,466 |
| 2202761 | Havells Ambrose fan FANGYYSEW5EFFD7B | ₹2,730 | ₹2,290 |

## Freshness

- **IndexNow:** HTTP 200 for 9 URLs (the 5 new slugs, the C920 slug, `/`, `/offers` and `/sitemap.xml`).
- **New deal page:** `/everyuth-naturals-rejuvenating-flora-body-lotion-500ml-28611894` returns 200 on prod.
- **Sitemap:** the deals child is the top-100 pinned set, so the new deals are noindex by design and stay out of it.
- **llms.txt:** dynamic, so the new deals appear there automatically.
