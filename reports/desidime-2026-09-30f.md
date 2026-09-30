# DESIDIME-INGEST — 2026-09-30f (08:44 IST)

**Pushed 1 LIVE** (`/admin/deals/bulk` count 1, created). IndexNow HTTP 200, 4 urls.

## Funnel
- 25 cards discovered; 17 junk/other-store dropped (Amazon rewards, CRED contest, spin-wheel, etc.).
- 5 product-resolved, 3 already in DB, 2 fresh.

| ASIN | Deal | DD ₹ | PDP ₹ | MRP | Verdict |
|---|---|---|---|---|---|
| B0GD2RY84M | AILKIN 100W USB-A to Type-C cable | 699 | 699 | 2,999 | **LIVE** (77% off, 4.0★ / 7,214, In stock) |
| B0F8BVSK21 | boAt Airdopes 141 Gen 2 | 761 | 799 | 3,990 | reject — drift ₹38, no coupon on PDP |

## CEO audit — 0 rot
- Prod 7/7 200. Live 11596 = API total. Pending 0, nullPrice 0, nullImage 0.
- Posts 349, coverless 0, seoless 0. Posts/day IST 09-22→09-30: 3,2,3,4,4,4,4,4,2.
- Broadcast cursor 11954 vs maxDeal 11965 — catching up on the 09-30a IFS batch (was 11944), external cron working.
- Unpushed commits 0 (before this report).
- Amazon `.pw-profile` session still logged out; electronics PDPs read fine.
