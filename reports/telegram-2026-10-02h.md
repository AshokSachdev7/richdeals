# TELEGRAM-DEAL-MONITOR — 2026-10-02 (16:59 IST)

**Read 13 groups in one sidebar read. 3 posts were not in the seen list → 1 pushed LIVE. Bulk count 1, created 1/1. IndexNow HTTP 200 for 4 urls. New deal page returns 200.**

## Pushed

Checked on the Amazon product page in the logged-in Playwright tab: `#centerCol` price, "In stock", and the add-to-cart button present.

| ASIN | Deal | Price | MRP | Rating | Source |
|---|---|---|---|---|---|
| B09232XNTX | Bella Vita Luxury perfume gift set for women, 4 x 20 ml | ₹449 (+5% coupon ≈ ₹427) | ₹849 | 4.3 (33,665) | Rogerkart Deals |

- **Affiliate link:** `/dp/ASIN?tag=ashoksachdev-21`. The `rogerkart-21` tag was stripped.
- **Image:** m.media-amazon.com.
- **Copy:** original. `couponNote` is set.

## Not pushed

| Item | Reason |
|---|---|
| Rupa Jon brief, pack of 3, B01N6WL0YL (CoolzTricks) | Product page shows ₹309 vs ₹154 in the post; also "Only 5 left" |
| Parachute Advansed protein shampoo 1.2 L, B0GQV895L5 (Dealzone) | Repost of LIVE id 2985. Re-verified: still ₹549. The posted ₹374 is the price after the 32% coupon, and the row's `couponNote` already says so. No change needed. |

Other sidebar posts were skipped:
- **Already seen:** Havells MCB, Tommy backpack, ladies handbag, Syska power bank.
- **Not a single product:** gift cards, SuperCoins, CRED stocks, a Myntra sale page, a denim edit.
- **Personal care:** Mamaearth soap pack.

Seen list: 2,527 → 2,530 entries.

## CEO audit (16:59 IST)

| Check | Result |
|---|---|
| Endpoints | 7/7 return 200 |
| LIVE deals | 11,904 (+1) |
| PENDING | 0 |
| Null price / null image | 0 / 0 |
| Posts | 357; 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-02: 2 so far (cap 4); 09-25 → 10-01: 4 each |
| Max deal id / broadcast cursor | 12,382 / 12,343. The cursor is draining the IFS batch through the external cron. |
| Unpushed commits | 0 before this report |

No rot found.
