# Flipkart affiliate fix, 2026-09-28

## Why
The owner asked how a Flipkart deal got tracked through Cuelinks.

**Answer:** it didn't.
- The SB Loots `fktr.in` shortlink resolves to `linkredirect.in/visitretailer/2276?id=2327812`. That is SB Loots' own Cuelinks publisher account.
- We keep only the `pid` from that link. The deal is pushed with our own `affid=djhackraj`, as the `ingest.config.json` matrix requires.

## What the audit found
Checked every Flipkart row in the DB:

| Link type | Rows |
|---|---|
| `affid=djhackraj` | 287 |
| Missing our affid | 13 |

The 13 bad rows:

| Problem | Rows | Status |
|---|---|---|
| Wrapped in `ekaro.in/enkr?url=flipkart.com/p?pid=…` with no EarnKaro id of ours. Opened in the browser, `/p?pid=` returns **404**, so these clicks landed on a dead page. | 8 | LIVE |
| Wrapped in our Cuelinks. Flipkart must be direct. | 2 | Pepe vest LIVE; Nutrolis shilajit EXPIRED |
| Another publisher's Cuelinks (`linkredirect.in id=225817`) | 1 | EXPIRED hub |
| Brand sale hubs with no tag at all | 2 | EXPIRED |

## Fix
Rewrote `affiliateUrl` on all 13 rows:
- Pid rows now use `https://www.flipkart.com/product/p/itme?pid=<PID>&affid=djhackraj`.
  - This form opens the real product page (HTTP 200).
  - Checked all 10 pids: every page title matches the deal.
  - Pepe vest keeps its real `/p/itm00c7cbd358a2d` path.
- Hub rows now use the clean flipkart.com URL with `&affid=djhackraj`.

Re-read the DB after the update: **0 Flipkart rows without our affid.** No row was deleted and no status was changed.

## Open items
**Out of stock?** For 7 of the 8 LIVE ekaro rows, the product page does not serve Product ld+json:
- Butterfly Plus, Butterfly Rapid, Crompton DS 500
- 2× Set Wet
- ASUS WT200, Pepe vest

That usually means the product is out of stock or has no price. Two pages do serve ld+json with a price and InStock: Butterfly food processor (₹5,399) and Killer perfume (₹180).

**Redirect not tested with a browser UA.** `/api/out/:id` sends bot UAs to the deal page, so curl cannot reach the affiliate URL. A browser-UA request would log a fake click, so the DB value is the check.
