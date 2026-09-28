# TELEGRAM tick 2026-09-28af (~10:04 IST)

**Result:** 1 new deal pushed live (bulk `count:1`, `created:true`). IndexNow returned HTTP 200 for 4 URLs, and the prod deal page returns 200.

## Pushed
| Product ID | Product | Price | Listed price | Off | Stock | Source |
|---|---|---|---|---|---|---|
| WMNHPZ5YZCRA3ZGY | FOXSKY 6.5 kg semi-automatic top-load washing machine (Black) | ₹5,999 | ₹11,990 | 50% | InStock | SB Loots (`fktr.in/Cz57AA3`) |

The `fktr.in` link resolved through linkredirect to Flipkart `itm0acfede4cd2d9`. Price and stock were read from ld+json in the browser tab (₹5,999, InStock, rated 3.9 from 1,207 ratings), and the listed price is taken from the ld+json description. The affiliate link is `/p/itm…?pid=WMNHPZ5YZCRA3ZGY&affid=djhackraj`, and the image is from Flipkart's CDN.

## Sidebar scan (one browser_evaluate)
| Group | Last post | Verdict |
|---|---|---|
| SB Loots And Deals | Foxsky 6.5 kg washing machine, ₹5,999 | **Pushed** |
| CoolzTricks | Bajaj Classico BLDC fan, "@2790 with SBI CC" (`amzn.to` → B0H2CZMRPP) | The PDP shows ₹3,099 (−60%), in stock. Skipped because it is already live as id 4996 and re-pushing would rewrite its slug. |
| Dealzone | "199" `link.amazon/B005r3rjV` | Resolves to an Amazon `/s?` search page (Kratos), skipped |
| ONLINE SHOPPING DEALS | Solimo handwash | Pushed in tick 28ad |
| Dealdost, INDIAN CHEAP DEALS, Loot Deals 24x7 | Door stopper, handbag, Syska power bank | Already seen |
| IPHONE RATES, Rogerkart, IFS Tips, Deal Dibba, Hidden Loot | Passes, category, search, join links, Supercoins | Not single products |
| OMG LOOTDEALS and personal/bot chats | Spam | Skipped |
| RichDeals | Our own channel | Ignored |

## CEO audit (DB-verified)
| Check | Result |
|---|---|
| Live deals | 11,286 |
| Pending review | 0 |
| Null price or image | 0 / 0 |
| Posts missing cover or SEO fields | 0 of 341 |
| Posts per day (IST, 09-19 → 09-28) | 1/2/1/3/2/3/4/4/4/2. Never 0. |
| Broadcast cursor | 11632 vs DB max 11633. The difference is this tick's deal; the external cron will pick it up on its next run. |
| Prod endpoints (7) | all 200 |
| Unpushed commits before this commit | 0 |

**Watch:** 09-28 IST has 2 posts. The next BLOG tick can add 1–2, keeping the day at 4 or fewer.
