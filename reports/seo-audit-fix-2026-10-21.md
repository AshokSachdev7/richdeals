# SEO-AUDIT-FIX · 2026-10-21 (14:30 IST)

## Light on-page pass across 9 page types

Pages checked: home, `/offers`, `/blog`, `/freebies`, `/coupons`, `/stores`, `/categories`, one post and one deal.

| Check | Result |
|---|---|
| `<h1>` per page | exactly 1 on every page |
| Images without alt | 0 |
| Meta descriptions | 155–167 chars |
| Titles | ≤60 chars once `&amp;` is decoded, with one exception |

The exception is `/freebies` at about 63 visible characters. That is minor, so I left it.

## Fixed

Deal page titles can end on a dangling connector word. For example:

> `Titan Purple Glam It Up Analog Watch for @ ₹2,947 (50% Off)`

The 48-character name cap cut the title just before "Women". `dealSeoTitle()` (`apps/web/src/lib/site.ts`) now strips a trailing `for/with/and/or/of/in/to/by/on/the` after truncation.
- Matching is case-sensitive, so a model name like "Galaxy A" survives.
- An assert check covers 6 cases.
- The web build is green.
- The fix ships with this deploy and applies to every deal title.

## Not changed

- The noindex on non-top-100 deals stays. It is the owner directive from 2026-10-16.
