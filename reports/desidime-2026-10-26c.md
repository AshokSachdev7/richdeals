# DesiDime ingest — 2026-10-26c (~04:30 IST)

## Stage 1

Stage 1 ran twice. The second run came after the parser fix below.

| | Run 1 | Run 2 (after fix) |
|---|---|---|
| Cards discovered (`/new` + homepage) | 34 | 37 |
| Junk / other-store dropped | 15 | 16 |
| Product-resolved | 18 | 18 |
| Already in DB (by productId) | 18 | 18 |
| Fresh | 0 | 0 |

## Pushed LIVE: 0

There were no fresh candidates, so there was nothing to push and no IndexNow ping.

## Fix: `affiliate()` silently dropped valid Amazon URLs

- **What happened.** In run 1, the STANLEY 87-369 adjustable wrench card resolved to an `amazon.in/STANLEY-87-369-Adjustable-Lightweight-…` URL. It was still dropped as "not a product" and added to `dd-dead.json`. The wrench is not in the DB.
- **Probable cause.** This is not confirmed for STANLEY, because the log cut the URL at 60 characters and the card is gone. It is the only path in `affiliate()` that returns `null` for an amazon.in product URL. `scripts/lib/ingest-common.mjs` `affiliate()` handles Flipkart's nested deeplinks by slicing at `finalUrl.lastIndexOf('http')`. It searched the whole URL, so an encoded `url=https%3A…` query param also triggered the slice. A valid `/dp/ASIN?…&url=https%3A…` URL then became garbage and returned `null`.
- **Fix.** The search now only covers the part before `?`. Asserts checked three cases:
  - an Amazon `/dp/` URL with an `https%3A` param → returns the ASIN;
  - the Flipkart `dl.flipkart.com/dlhttps://…/p/itm…` nested link → still resolves;
  - an Amazon `/s?` search URL → still `null`.
- **Who benefits.** IFS and the Telegram flows import the same helper, so they get the fix too.
- **Retry.** I removed the 28 ids that run 1 had added to `dd-dead.json` and re-ran stage 1. STANLEY had already rolled off `/new` and the homepage, so the DesiDime card price can't be recovered to verify against. It was skipped rather than guessed. The three drops in run 2 were all genuinely not products: a Myntra category, a Myntra listing and an Amazon `/s?` search.

## Freshness

N/A, because 0 deals were pushed. The sitemap is ISR with a 30-minute window; `llms.txt` is force-dynamic.

## CEO audit

| Check | Result |
|---|---|
| LIVE deals | 14,334 |
| PENDING_REVIEW | 0 |
| Null price / null image (LIVE) | 0 / 0 |
| Broadcast cursor | 14865, equal to the DB max of 14865 |
| Unpushed commits | 0 before this commit |

Nothing is rotting. The parser bug above was the only thing found, and it is fixed. One item carries forward: Playwright Chrome is signed out of Google. That affects YouTube Studio only; Amazon still works.
