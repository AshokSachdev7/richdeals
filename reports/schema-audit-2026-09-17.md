# Schema audit: richdeals.in, 2026-09-17

Method: I fetched live HTML with a Chrome user agent, extracted every `<script type="application/ld+json">` block, ran `JSON.parse` on each one and checked the parsed data against Google's rich-result requirements for Product/Offer, BreadcrumbList, FAQPage and Article. The script also compared each FAQ question and the first 60 characters of each answer with the visible page text, checked the canonical tag against the requested URL, looked for duplicate blocks, and matched each deal's schema price against the price from `/api/deals`. Newest deals came from `/api/deals`. Newest posts came from `/api/posts`, sorted by `publishedAt`. As an extra check, I also fetched 3 expired deals (found through the DB), one of them with no price.

## URLs checked (16)

| # | URL | Blocks | Types | Canonical | Robots |
|---|-----|--------|-------|-----------|--------|
| 1 | / | 3 | Organization, WebSite, ItemList (30 nested Product) | OK | index |
| 2 | /offers | 3 | Organization, WebSite, BreadcrumbList | OK | index |
| 3 | /coupons | 5 | Org, WebSite, BreadcrumbList, ItemList, FAQPage | OK | index |
| 4 | /freebies | 5 | Org, WebSite, BreadcrumbList, ItemList, FAQPage | OK | index |
| 5 | /blog | 3 | Org, WebSite, BreadcrumbList, CollectionPage>ItemList | OK | index |
| 6 | /jiomotive-4g-obd-gps-tracker-wi-fi-router-b0clrqmkyr | 5 | Org, WebSite, Product, BreadcrumbList, FAQPage | OK | index |
| 7 | /goboult-made-in-india-k10-ear-buds-wireless-50h-playtime-4-mics | 5 | same | OK | index |
| 8 | /stanley-70-368e-double-open-end-spanner-matte-finish-10--11mm | 5 | same | OK | index |
| 9 | /johnson-ruby-ss204-stainless-steel-kitchen-sink-... | 5 | same | OK | index |
| 10 | /ponds-hydra-light-hyaluronic-acid-hydrating-gel-facewash-hydrate-and-glow-100g | 5 | same | OK | index |
| 11 | /blog/how-to-port-vodafone-vi-to-airtel-india-2026 | 5 | Org, WebSite, Article, BreadcrumbList, FAQPage | OK | index |
| 12 | /blog/how-to-find-bsnl-number-india-2026 | 5 | same | OK | index |
| 13 | /blog/how-to-activate-airtel-sim-india-2026 | 5 | same | OK | index |
| 14 | /tokyo-talkies-sweatshirts-upto-83-off-starting-from-rs251-1785987 (expired) | 5 | Org, WebSite, Product, BreadcrumbList, FAQPage | OK | noindex |
| 15 | /aristocrat-duffel-bags-upto-86-off-starting-from (expired) | 5 | same | OK | noindex |
| 16 | /off-h-playback-wireless-earbuds (expired, price null) | 4 | Org, WebSite, BreadcrumbList, FAQPage (no Product) | OK | noindex |

## Clean (passed on all pages)

- **JSON parse errors: 0.** All 70 blocks parse.
- **Canonical mismatches: 0.** Every canonical equals the requested URL.
- **Duplicate or conflicting blocks: 0.** Each type appears at most once per page, and there is one Organization and one WebSite from the layout.
- **Product required fields:** name, image and offers are present on every deal page.
- **Offer required fields:** price is numeric and matches the API price on all 5 deals. `priceCurrency` is INR. `availability` is InStock on live deals and Discontinued on expired ones. `priceValidUntil` is set.
- **No-price rule:** the null-price deal (#16) has no Product and no Offer. The rule holds.
- **BreadcrumbList:** positions run 1..n in order, every item has a name, item URLs are absolute on https://richdeals.in, and the last item equals the canonical. The linked pages (`/stores/amazon`, `/blog`) return 200.
- **FAQPage visibility:** every Question name and answer from the schema appears in the visible page text on all 11 pages that have an FAQ.
- **Article:** headline (≤110 chars), image (DO Spaces OG cover), datePublished, dateModified, author (Organization "RichDeals Editorial", with a URL to /about, which returns 200), publisher with a logo (`/logo.png` returns 200), and `mainEntityOfPage` equal to the canonical.

## Findings

No blocking errors that would stop a rich result were found. These are warnings and correctness risks, most severe first.

### W1. Blog FAQPage answers contain raw markdown (`**bold**`, `[text](url)`)
- Example: /blog/how-to-port-vodafone-vi-to-airtel-india-2026. 3 of 10 answers are affected, for example `SMS **PORT** followed by ... to **1900**`. /blog/how-to-activate-airtel-sim-india-2026 has 5 of 10.
- Impact: Google and answer engines may show the literal asterisks and link syntax.
- Source: `apps/web/src/app/blog/[slug]/page.tsx` → `extractFaq()` passes `a` through without stripping markdown. `extractHowTo()` in the same file already strips `**` and links, so the fix is to reuse that approach.

### W2. Offer `validFrom` and `priceValidUntil` come from the render time, not the deal
- Example: all deal pages show `validFrom: 2026-09-16` and `priceValidUntil: 2026-09-30`. That includes expired deals #14 and #15, which are marked `Discontinued` but still carry a `priceValidUntil` 2 weeks in the future.
- Impact: the dates contradict each other on expired deals, and `validFrom` changes on every render.
- Source: `apps/web/src/app/[dealSlug]/page.tsx` lines 128-129 (`new Date()`), and `apps/web/src/lib/site.ts` `dealItemListSchema()` line 55. A better approach: `validFrom` = `postedAt`/`createdAt`; for expired deals, drop `priceValidUntil` or set it to the expiry date.

### W3. Offer falls back to MRP when price is null (latent)
- `const offerPrice = deal.price ?? deal.mrp ?? null;` emits an Offer priced at MRP when `price` is null. That breaks the "Offer absent when no price" rule, and the schema price would not match the visible "Tap Get Deal" copy.
- Right now there are 0 LIVE null-price deals, and the one null-price expired deal also has a null MRP, so nothing is visibly affected yet.
- Source: `apps/web/src/app/[dealSlug]/page.tsx` line 127.

### W4. Deal FAQ contains generic claims that aren't in the deal row
- Example: /jiomotive-4g-obd-gps-tracker-wi-fi-router-b0clrqmkyr says "Yes ... carries the standard manufacturer warranty" and "No-Cost EMI ... commonly offered". /off-h-playback-wireless-earbuds is expired with no price, yet says "It is among the best live prices we have tracked" right next to "No — this offer has ended."
- The copy is visible and matches the schema, so this is not a schema error. It does conflict with the CLAUDE.md rule (FAQ built only from real fields, 4 Q&As; pages currently show 4-6) and could draw a quality or manual-action review.
- Source: `apps/web/src/lib/site.ts` → `dealFaq()`: the category branches (electronics/fashion/beauty/...) and the "best price" answer, which ignores `status === EXPIRED` and `price == null`.

### W5. Homepage ItemList nests full Product and Offer objects that point to other pages
- Example: `/`. That's 30 `ListItem`s, each with `url` plus an `item: Product{offers}` whose page is somewhere else.
- Google's carousel guidance uses url-only ListItems on summary pages. Product markup is supposed to sit on the page where the product is the main subject. Google won't award a rich result for this, and it risks "Product on non-product page" warnings in GSC Merchant/Product reports.
- Source: `apps/web/src/lib/site.ts` → `dealItemListSchema()` (called from `apps/web/src/app/page.tsx` line 82 and `app/category/[type]/[slug]/page.tsx`). Suggested change: emit `{position, url}` only, as /coupons already does.

### W6. /coupons and /freebies ItemList (and visible grid) is the generic latest feed
- Example: /coupons and /freebies list exactly the same URLs (goboult, stanley, johnson, ponds ...) under the H1 "Coupon Codes Today". The type filter isn't reaching the API: `getDeals({type:"COUPON"})` sends `?type=`, but the controller has no `@Query('type')` (only feed/cursor/store/category/q/limit/sort). The live API returns the same first slugs for `?type=COUPON` as for no filter.
- Impact: the schema and page intent don't match (a coupons hub whose ItemList has no coupons), which weakens the FAQ and hub relevance.
- Source: `apps/api/src/deals/deals.controller.ts` (missing `type`/`categoryType` params). The callers are `apps/web/src/app/coupons/page.tsx` line 43 and `apps/web/src/app/freebies/page.tsx`.

### W7. Deal BreadcrumbList last crumb uses the raw title with its price/store tail
- Example: /jiomotive-...: `"JioMotive 4G OBD GPS Tracker & Wi-Fi Router at ₹2249 – Amazon"`.
- Impact: a noisy breadcrumb in the SERP, and the price inside it goes stale.
- Source: `apps/web/src/app/[dealSlug]/page.tsx` line 119 (`name: deal.title`). `dealProductName(deal)` is already imported there and is the replacement.

### W8. Product missing `brand` (recommended); no sku/gtin/mpn
- All 5 live deal pages. The code intentionally leaves out `brand` (see the comment near line 150). An ASIN-derived `sku` is available for Amazon deals (for example, the slug suffix `b0clrqmkyr`).
- `hasMerchantReturnPolicy`/`shippingDetails` are also absent. That's expected: RichDeals isn't the merchant, so it only qualifies for product snippets, not merchant listings. No action needed.
- Source: `apps/web/src/app/[dealSlug]/page.tsx`, `productSchema`.

## Summary by type

| Type | Errors | Warnings | Example URL | Source |
|------|--------|----------|-------------|--------|
| JSON parse | 0 | 0 | - | - |
| Canonical | 0 | 0 | - | - |
| Duplicates | 0 | 0 | - | `app/layout.tsx` (Org/WebSite once) |
| Product | 0 | 2 (brand; ItemList-nested Products) | /jiomotive-..., / | `app/[dealSlug]/page.tsx`, `lib/site.ts` dealItemListSchema |
| Offer | 0 | 2 (render-time dates, incl. future priceValidUntil on Discontinued; latent MRP fallback) | /tokyo-talkies-... | `app/[dealSlug]/page.tsx` L127-129, `lib/site.ts` L55 |
| BreadcrumbList | 0 | 1 (raw title tail) | /jiomotive-... | `app/[dealSlug]/page.tsx` L119 |
| FAQPage | 0 | 2 (markdown in answers; generic/contradictory deal FAQ) | /blog/how-to-port-vodafone-vi-to-airtel-india-2026, /off-h-playback-wireless-earbuds | `app/blog/[slug]/page.tsx` extractFaq, `lib/site.ts` dealFaq |
| ItemList | 0 | 1 (coupons/freebies not filtered) | /coupons | `apps/api/src/deals/deals.controller.ts` |
| Article | 0 | 0 | - | `app/blog/[slug]/page.tsx` |

---

## Re-run (after b84f726 deploy): 13 target URLs plus all 308 posts

The `/api/posts` endpoint ignores `limit`, so the script checked every published post as well as the 13 target URLs.

**Target set** (homepage, /offers, /coupons, /freebies, /blog, 5 newest deals, 3 newest posts): all return 200.
- JSON parse errors: 0. Canonical mismatches: 0.
- Product/Offer on the 5 newest deals (ids 10340-10343 and B0088TKTY2): name, image, price, INR currency and availability are all present. Offer price matches `/api/deals` on all 5. No Offer without a price.
- BreadcrumbList: positions are sequential and every item has a name.
- Article on posts: headline, image, datePublished and author are all present.
- Blocks from the earlier report now pass: W1 (FAQ markdown), W2 and W3 (Offer validity and mrp fallback), and W7 (breadcrumb name).

### Errors and missing blocks

1. **Missing FAQPage on 103 of 308 posts. This is a parser gap, not missing content.**
   - These posts have a visible `## FAQ` section, but each question is written as a bold line (`**Is QLED as good as OLED?**`) instead of an `### ` heading.
   - `extractFaq()` in `apps/web/src/app/blog/[slug]/page.tsx:28` only splits on `^###\s+`, so it returns `[]` and no FAQPage is emitted.
   - Example: the newest post, `/blog/qled-vs-oled-vs-mini-led-tv-india-2026`.
   - Breakdown: 189 posts use `###` (FAQPage OK), 103 use bold questions (FAQPage missing), 15 have no FAQ section (correctly omitted).
   - Fix: in `extractFaq`, also accept `^\*\*(.+\?)\*\*$` as a question line. That is about a 5-line change and is low risk, because the questions are already visible on the page.
2. **Markdown escape leaks into FAQ answer text (minor).**
   - `/blog/vi-balance-check-number-india-2026` answer text reads `Dial \*199# ...`: the backslash escape from the markdown source is kept.
   - Fix: add `.replace(/\([*#_\[\]])/g, "$1")` to the answer cleanup.
   - The script also raised "FAQ markdown" flags on posts that only contain USSD codes (`*121#`). Those are false positives and are not counted here.
3. **W8 (still open): Product has no `brand` or `sku`** on all 5 newest deals. This is a warning and does not block eligibility. `sku` could come from `productId`; brand needs a data source.

W4, W5 and W6 from the earlier report were not re-checked here and remain open.
