# CONTENT-SEO tick 2026-11-07a (IST ~00:55)

**Result: 3 posts published (#597-#599). 11-07 IST went from 0 to 3 posts (cap 4). Covers 3/3, IndexNow HTTP 200, all 3 URLs serve 200 on prod.**

## Published

| id | Slug | seoTitle (chars) | seoDesc (chars) | Internal links |
|---|---|---|---|---|
| 597 | is-mattress-topper-worth-it-topper-vs-new-mattress | 53 | 156 | 5 deals + /offers + 2 blog |
| 598 | does-lumbar-support-cushion-help-back-pain-office-chair-car | 45 | 160 | 6 deals + /offers + 3 blog |
| 599 | travel-neck-pillow-memory-foam-vs-inflatable | 53 | 158 | 4 deals + /offers + 1 blog |

- `insert-blog-mdmeta.mjs apps/api/_blog1107 <3 slugs>` → "DONE: 3 inserted. IndexNow -> HTTP 200". The first run had no slug args, printed the usage line and inserted nothing. The rerun with the slugs worked.
- `gen-blog-covers.mjs` → "3 blog covers generated + uploaded" to `richdeals.sfo3.digitaloceanspaces.com/og/<slug>.png`. Alt text = post.title.
- No in-body markdown images, so no empty-alt risk.

## Keyword research

Queries:
- mattress topper worth it / topper vs new mattress India
- lumbar support cushion back pain evidence
- travel neck pillow memory foam vs inflatable

SERP read:
- wakefit.co (topper benefits; protector vs topper)
- kingkoil.in (topper as a mattress replacement)
- tomsguide.com (topper vs new mattress)
- PMC3766244 / PubMed 23826832 (lumbar pillow sitting study, *Chiropractic & Manual Therapies* 2013)
- slouchonline.com
- alibaba product-insights (pillow types)
- choice.community neck pillow thread

Gaps filled:
- The Indian topper SERP is mostly brand blogs. Our post is a neutral guide to when a topper is enough and when the mattress needs replacing.
- The lumbar post cites the study and states its limits plainly (small, single 30-minute session). No pain-relief claims.
- No India-focused neck pillow guide covered trains, buses and cars. Ours adds a safety note that drivers should not wear U-pillows.

## CEO audit

| Check | Value | Status |
|---|---|---|
| Prod endpoints (/, /offers, /blog, sitemap, feed, /api/deals, llms.txt) | 7/7 200 + 3 new post URLs 200 | OK |
| API total vs DB LIVE | 15,616 = 15,616 | OK |
| PENDING_REVIEW | 0 | OK |
| LIVE null price / null image | 0 / 0 | OK |
| Max deal id | 16,182 | OK |
| Posts total / coverless / seo-less | 470 / 0 / 0 | OK |
| Posts per IST day | 10-29:4 10-30:4 10-31:4 11-01:1 11-03:4 11-04:2 11-05:3 11-06:3 11-07:3 | OK (11-02 = 0, historical) |
| Unpushed commits | 0 (before this report) | OK |
| Crons | 9/9 (last CronList) | OK |

## Still open

- TG 11-04l: B0GXB76VRW (Samsung 43" TV) duplicates #4983, which is LIVE at ₹29,750. The channel's ₹25,175 is the price after coupon + HDFC. Unchecked: Vyom ×2 / ×3, Syska PWBGGD4THDQZYAY6, the CELLO Kidzbee link, B0G2BBWKCP, KTAGY3VM4MDQBXVM, B07BK983NP, B0CGQ834KW, ENVH9AFZTTYXS38D.
- IFS 11-04k: 79 candidates have never been checked.
- DESIDIME leftovers: 12 Amazon ASINs (B0FB8XHSL3 … B07WXRR2VH). The next DESIDIME tick handles them.
- INDEXNOW helper: filters on `createdAt` instead of `postedAt`, and has a stray `publishedAt` OR clause.
- #11896: Flipkart shows ₹664, DB has ₹899. 16 bare Flipkart links. 96 drift rows. Single deals still to check: #37, #1665, #1656, #6405, #6426, #15976, #7820, #14840, #14396.
- Reticle MCP: CONNECTION_CLOSED. Rotating the DO token is the owner's job.
