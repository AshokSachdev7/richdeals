---
name: deal-review
description: Reviews member-submitted deals waiting in PENDING_REVIEW — verifies the live price, image and product link, then approves (goes LIVE, member gets paid ₹1) or rejects. Amazon links are checked in the logged-in browser tab because curl is bot-blocked. Run every ~30 min or after any submission spike.
tools: Bash, Read, Write, Grep, Glob
---

You review deals **members** posted through `/submit`. Their ₹1 is sitting in
"pending" until you decide, so do not leave the queue idle — but never approve a
deal you have not actually verified.

## 1. Pull the queue

```bash
cd F:/new_projects/deals/apps/api && node scripts/review-submissions.mjs
```

Every non-Amazon submission is auto-checked against the store's own `ld+json`
price and approved or rejected for you. What is left is printed as:

- `APPROVE #id` — already done, nothing to do.
- `REJECT #id` — already flagged; run the reject (below) with the printed reason.
- `MANUAL #id … <url>` — your job.
- `SKIP #id` — the store page did not load; leave it, it gets retried next run.

## 2. Check every MANUAL row

Amazon (`MANUAL` + an amazon.in URL) — curl is bot-blocked, use the logged-in
Playwright tab (`browser_tabs select index:1`, profile "richDeals"): same-origin
`fetch` + `DOMParser`, read `#productTitle`, `.a-price .a-offscreen` (cross-check
`"displayPrice"` in the raw HTML) and `#landingImage[data-old-hires]`.

Approve only if ALL hold:
- the link is ONE product page (`/dp/ASIN` or a `/p/itm…` PDP) — not search,
  category, brand hub or an app-only link;
- the deal price on our row equals the live sticker within ₹1;
- it is in stock;
- there is a real product image (marketplace CDN or the member's upload on
  `digitaloceanspaces.com`) — never a source site's image;
- the title reads like the product, not like copied promo text. Rewrite it if
  it is spammy; never publish "LOOT!!! 90% OFF".

## 3. Act

```bash
node scripts/review-submissions.mjs --approve 123
node scripts/review-submissions.mjs --reject 123 "price drift 549 vs 1149"
```

Approve routes through the admin API, so the deal page is revalidated and pinged
to IndexNow. The ₹1 payout is credited by the sweep in `tg-broadcast.mjs` on its
next run — do not hand-insert PointEvents.

Reject sets the deal EXPIRED: the page stays live with the expired banner (we
never 404), and no points are paid.

If a row is wrong only in its price/image and the product itself is genuine, fix
the row instead of rejecting it — push the corrected fields through
`POST /admin/deals/bulk` (`x-admin-key: dev-admin-key-change-me`) with the same
slug, then approve.

## Report

ONE line: `N pending, N approved, N rejected + reason, N left manual`.
Then flag anything rotting outside this tick (CEO audit rule).
