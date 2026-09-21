# SCHEMA-AUDIT — richdeals.in — 2026-09-22 (04:00 IST)

**Result: 0 errors, 0 missing required blocks across 13 URLs.** Report only, nothing changed.

Method: fetch each live URL with a browser UA, extract every `<script type="application/ld+json">`, `JSON.parse` each (flattening `@graph` / arrays), then assert per page type — Product needs `name` + an Offer carrying `price`, `priceCurrency`, `availability`, `priceValidUntil`; FAQPage needs a non-empty `mainEntity` with both `name` and `acceptedAnswer.text` on every Q; BreadcrumbList needs a non-empty `itemListElement` with positions; Article needs `headline`, `datePublished`, `author`, `image`.

## Coverage

| URL | HTTP | Blocks found | Errors |
|---|---|---|---|
| `/` | 200 | WebSite, Organization, ItemList | — |
| `/offers` | 200 | WebSite, Organization, BreadcrumbList | — |
| `/coupons` | 200 | WebSite, Organization, BreadcrumbList, ItemList, FAQPage | — |
| `/freebies` | 200 | WebSite, Organization, BreadcrumbList, ItemList, FAQPage | — |
| `/blog` | 200 | WebSite, Organization, BreadcrumbList, CollectionPage | — |
| `/police-origine-65l-cabin-trolley-tsa-lock` | 200 | Product+Offer, BreadcrumbList, FAQPage, WebSite, Organization | — |
| `/clensta-anti-dandruff-shampoo-conditioner-250ml` | 200 | same | — |
| `/hp-travel-hub-usb-c-g3-multiport-adapter` | 200 | same | — |
| `/fire-boltt-aero-luxe-tws-earbuds-midnight-black` | 200 | same | — |
| `/t2f-girls-cotton-flared-leggings-pack-of-3` | 200 | same | — |
| `/blog/cheap-ipad-stylus-alternative-apple-pencil-price-india-2026` | 200 | Article, BreadcrumbList, FAQPage, WebSite, Organization | — |
| `/blog/do-you-need-a-watch-winder-automatic-watch-india-2026` | 200 | same | — |
| `/blog/phone-cooling-fan-gaming-worth-it-india-2026` | 200 | same | — |

No unparseable block, no Offer without a price, no empty FAQPage, no Article missing a date or image.

## Spot check of the emitted shape

Deal `#10838`:

```json
"offers": {"@type":"Offer","priceCurrency":"INR","price":"1599",
  "priceValidUntil":"2026-10-05","validFrom":"2026-09-21",
  "itemCondition":"https://schema.org/NewCondition",
  "availability":"https://schema.org/InStock",
  "url":"https://richdeals.in/police-origine-65l-cabin-trolley-tsa-lock",
  "seller":{"@type":"Organization","name":"Amazon"}}
```

Post `phone-cooling-fan-gaming-worth-it-india-2026`: Article with `headline`, `description`, DO-Spaces `image`, `datePublished` + `dateModified`, Organization `author` pointing at `/about`, `publisher` with a logo `ImageObject`, and `mainEntityOfPage`. All correct.

## Notes, not errors

- **Homepage carries no BreadcrumbList** — correct, it is the breadcrumb root. Its `ItemList` covers the deal grid.
- **Product blocks carry no `brand`, `sku` or `gtin`.** Valid for Google's product snippet (`name` + `offers` is the required floor), but merchant-listing eligibility and some AI shopping surfaces read `brand`. Brand is derivable from the title for most rows; `sku` could be the ASIN/pid we already store as `productId`. Low-cost upgrade to `page.tsx` if product rich results ever become a priority — not rot today.
- **No `aggregateRating` / `review` anywhere.** Deliberate and correct: we hold no first-party reviews, and synthesising them is a manual-action risk.
- FAQPage appears on `/coupons` and `/freebies` too, each with visible matching copy — same template path as the deal pages, so the schema-only risk does not apply.
