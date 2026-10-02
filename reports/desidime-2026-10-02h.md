# DESIDIME-INGEST — 2026-10-02 (14:49 IST)

**34 cards found → 17 resolved to a product → 1 already in DB → 16 fresh → 7 pushed LIVE (2 Amazon + 5 Shopsy). Bulk count 7, created 7/7. IndexNow HTTP 200 for 11 urls. All 7 new deal pages return 200. One stale LIVE row was also fixed (S-GUARD padlock, id 10945).**

## Pushed

| Store | ID | Deal | Price | MRP | Rating | Verified |
|---|---|---|---|---|---|---|
| Amazon | B0D7VTJFVH | Beardo detangling paddle hair brush | ₹140 | ₹280 | 4.0 (770) | PDP: In stock, add-to-cart present |
| Amazon | B07XY5LX2W | Cello melamine mug, set of 4, 200 ml | ₹208.54 | ₹440 | 3.7 (27) | PDP: In stock, add-to-cart present |
| Shopsy | EOEHH4UVZW9A3YEH | STRANGER BROTHERS black casual sneakers | ₹442 | ₹1,499 | 3.6 (127) | ld+json via curl, InStock |
| Shopsy | VPXGPZPHTCMPB56V | Rudransh pull-back robot car toy | ₹158 | ₹599 | 4.2 (441) | ld+json via curl, InStock |
| Shopsy | XCFGSGPNZ6XYF2RF | VINAMRA28 Z-shape plant stand | ₹270 | ₹399 | 4.3 (1,275) | ld+json via curl, InStock |
| Shopsy | XPSH9BBHX4JZHQRC | Karnav woven cotton silk saree | ₹393 | ₹1,999 | 3.9 (1,047) | ld+json via curl, InStock |
| Shopsy | XTOGYDV2GNWJH2SF | YANDZONE embroidered black top | ₹215 | ₹1,599 | 4.0 (490) | ld+json via curl, InStock |

- **Affiliate links:**
  - Amazon uses `/dp/ASIN?tag=ashoksachdev-21`. The `desidime01-21` tag and `ascsubtag` were stripped.
  - Shopsy goes through Cuelinks, with the `affid=operation4`, `cmpid` and `mcn` params stripped.
- **MRP:** taken from the product page, not the card. Two cards were wrong: the robot car card said ₹499 (product page ₹599) and the plant stand card said ₹999 (product page ₹399).
- **Images:** m.media-amazon.com and rukmini1.flixcart.com.
- **Copy:** original.

## Fixed (dedup hit with a moved price)

| ID | Deal | Was | Now |
|---|---|---|---|
| 10945 | S-GUARD 52 mm padlock, pack of 2 (Shopsy) | ₹137, 69% off | ₹157, 65% off |

The price was corrected in the title, the description, the how-to steps and the price fields. The deal was included in the IndexNow ping.

## Rejected (8)

| Item | Reason |
|---|---|
| WD My Passport SSD 2TB B08MRBRJ9H | No add-to-cart and no price on the product page |
| Haier 12 kg washing machine B0FCSGSSSB | Product page shows ₹50,090 vs ₹38,340 on the card, and only 5 ratings |
| Cruise 1.5 ton AC B0GHFT36VV | Product page shows ₹35,490 vs ₹32,240 on the card (the card price is post-bank-offer) |
| NAUGHTY MEN track pant (Shopsy) | Price drift: ₹240 live vs ₹120 on the card |
| Albroow thread (Shopsy) | Price drift: ₹234 live vs ₹117 on the card |
| Clubmaster sunglasses (Shopsy) | Price drift: ₹196 live vs ₹175 on the card |
| Innovist "Chemist at Play" sale | Sale hub page, not a single product |
| Littles baby wipes (BigBasket) | No ld+json; low-ticket FMCG |

The other 17 cards were dropped in stage 1 as junk or non-product links.

## CEO audit (14:49 IST)

| Check | Result |
|---|---|
| Endpoints | 7/7 return 200 |
| LIVE deals | 11,855 (+7) |
| PENDING | 0 |
| Null price / null image | 0 / 0 |
| Posts | 357; 0 coverless, 0 seo-less |
| Posts per day (IST) | 10-02: 2 so far (cap 4); 09-25 → 10-01: 4 each |
| Max deal id / broadcast cursor | 12,333 / 12,326. The 7-deal gap is this batch; the external tg-broadcast cron drains it. |
| Unpushed commits | 0 before this report |

No rot found.
