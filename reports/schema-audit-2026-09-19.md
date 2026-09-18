# SCHEMA-AUDIT — 2026-09-19 (IST)

Report only, no fixes applied. 13 URLs fetched live from prod, every
`application/ld+json` block parsed and field-validated. **Zero parse errors, zero
invalid Offers, zero missing required blocks.** Two advisory gaps below, both
pre-existing and neither a validity error.

## Scope

| Kind | URL |
|---|---|
| home | `/` |
| hub | `/offers` `/coupons` `/freebies` `/blog` |
| deal ×5 (newest) | `sounce-ergonomic-mouse-pad-…-b0gkpg5mms` · `athom-living-cotton-waffle-bath-towel-…-b07nqll85z` · `hrx-parabola-cabin-size-hard-shell-suitcase-b0hhpv98cg` · `nippon-paint-matex-gold-interior-emulsion-4l-b0dxx8p18c` · `65w-supervooc-charger-with-type-c-cable-b0g58kh8xr` |
| post ×3 (newest) | `/blog/how-to-stop-spam-calls-dnd-india-2026` · `/blog/open-box-delivery-amazon-flipkart-india-2026` · `/blog/flipkart-supercoins-earn-redeem-guide-india-2026` |

Plus 4 edge-case probes outside the brief's list: 2 EXPIRED deals and 2 null-price deals.

## Results

All 13 returned **HTTP 200**. Block counts and types:

| URL | Blocks | Types found | Expected missing | Errors |
|---|---|---|---|---|
| `/` | 3 | Organization, WebSite, ItemList | — | 0 |
| `/offers` | 3 | Organization, WebSite, BreadcrumbList | — | 0 |
| `/coupons` | 5 | Organization, WebSite, BreadcrumbList, ItemList, FAQPage | — | 0 |
| `/freebies` | 5 | Organization, WebSite, BreadcrumbList, ItemList, FAQPage | — | 0 |
| `/blog` | 3 | Organization, WebSite, BreadcrumbList, CollectionPage | — | 0 |
| deal ×5 | 5 each | Organization, WebSite, **Product**, **BreadcrumbList**, **FAQPage** | — | 0 |
| post ×3 | 5 each | Organization, WebSite, **Article**, BreadcrumbList, FAQPage | — | 0 |

Validated per type: Product (name, image, offers), Offer (price numeric,
priceCurrency, availability, url, priceValidUntil format), BreadcrumbList (position,
name, item on every non-terminal crumb), FAQPage (every Question has a name and a
non-empty `acceptedAnswer.text`), Article (headline ≤110 chars, image, datePublished,
author, publisher).

## Offer integrity — the check the brief singles out

**No invalid Offer found.** Every Product that emits an Offer emits a numeric price.
Sample from the deal pushed an hour ago:

```json
"offers": { "@type": "Offer", "priceCurrency": "INR", "price": "129",
  "priceValidUntil": "2026-10-02", "validFrom": "2026-09-18",
  "itemCondition": "https://schema.org/NewCondition",
  "availability": "https://schema.org/InStock",
  "url": "https://richdeals.in/sounce-ergonomic-mouse-pad-non-slip-waterproof-b0gkpg5mms",
  "seller": { "@type": "Organization", "name": "Amazon" } }
```

`priceValidUntil` is `validFrom` + 14d, matching the documented rule. Price `129`
matches the DB row exactly.

**EXPIRED deals flip availability correctly.** `ready-to-play-…-bookysta-com-…`
(EXPIRED, price 900) emits `availability: Discontinued` and drops `priceValidUntil`
while keeping the page live with its EXPIRED banner. That is the documented behaviour
working as intended.

## Visible-copy check on FAQPage

Schema-only FAQ markup is a manual-action risk, so every `Question.name` in every
FAQPage was string-matched against the page's rendered text with all `<script>` blocks
and tags stripped.

| Page | Schema Qs | Visible | Schema-only |
|---|---|---|---|
| `/coupons` | 4 | 4 | **0** |
| `/freebies` | 4 | 4 | **0** |
| deal (sounce) | 6 | 6 | **0** |
| post (DND guide) | 5 | 5 | **0** |

**Clean.** The visible FAQ sections added in `c9a0ddf` are carrying matching copy.

## Article completeness

Full node on the newest post, nothing missing:

```json
{ "@type": "Article", "headline": "How to Stop Spam Calls and SMS in India: The Full DND Guide (2026)",
  "description": "…", "image": ["…/og/how-to-stop-spam-calls-dnd-india-2026.png"],
  "datePublished": "2026-09-18T19:16:41.484Z", "dateModified": "2026-09-18T19:16:55.131Z",
  "author": { "@type": "Organization", "name": "RichDeals Editorial", "url": "https://richdeals.in/about" },
  "publisher": { "@type": "Organization", "name": "RichDeals", "logo": { "@type": "ImageObject", "url": "https://richdeals.in/logo.png" } },
  "mainEntityOfPage": "…" }
```

`dateModified` present, headline 66 chars, OG image absolute. All 3 posts identical in shape.

## Advisory gap 1 — Product node dropped entirely on null-price deals

Two null-price pages were probed. Neither emits a Product block at all — not a Product
with the Offer omitted, but **no Product node whatsoever**:

```
/amazon-audible-90-days-free-trial--3-free-audiobooks → Organization, WebSite, BreadcrumbList, FAQPage
/ajio-flat-75-off-on-everything                       → Organization, WebSite, BreadcrumbList, FAQPage
```

CLAUDE.md documents "Offer omitted entirely when there's no price", which is the correct
call — an Offer without a price is invalid. Dropping the whole Product goes one step
further than the doc says. It is **valid** (a Product with no offers is legal schema),
but those pages lose product rich-result eligibility.

**Blast radius is small and entirely historical:** null-price deals number **188, all of
them EXPIRED**. Zero LIVE deals have a null price. Since EXPIRED pages are deliberately
delisted from the sitemap and noindexed, the lost eligibility costs nothing today. Worth
knowing only because it changes the shape of the fix if the null-price rule ever meets a
LIVE row.

Recommendation: leave it. Re-check if `LIVE with null price` ever leaves 0.

## Advisory gap 2 — Product carries no `sku` and no `brand`

All 5 deal pages: `sku: null`, `brand: null`.

`sku` is the carried **W8** item — the ASIN is in `Deal.productId` but `productId` is not
on the shared DTO, so the page template cannot read it. Needs an API change, unchanged
from prior ticks.

`brand` is not tracked as a field at all. It would have to be parsed out of the title,
which is a guess, not a fact — **do not synthesise it**. Same reasoning applies to
`aggregateRating` and `review`, which are correctly absent: we hold no review data and
emitting any would be fabricated markup and a manual-action risk. Their absence is right,
not rot.

## Verdict

| Check | Result |
|---|---|
| Parse errors | **0** |
| Missing expected blocks | **0** |
| Invalid Offer (no price) | **0** |
| Malformed `priceValidUntil` | **0** |
| BreadcrumbList defects | **0** |
| FAQPage without visible copy | **0** |
| Article missing required fields | **0** |
| Advisory gaps | 2 (both pre-existing, neither an error) |

Structured data on richdeals.in is in good shape. The only actionable item is W8
(`sku` ← `productId`), which was already on the board and still needs an API change.
