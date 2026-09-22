# INDEXNOW tick `2026-09-22ai`

**Run:** 2026-09-22 13:27:15 → 19:27:15 IST (rolling 6h window), host `richdeals.in`, key `33f3a9d63ca15676bbd90586ea80e65f`.

**Result: HTTP 200 for 59 urls** — 56 slugs (51 new deal pages + 5 in-window refreshes of older LIVE rows) plus the three paths the script appends itself. `api.indexnow.org` resolved; **no Bing fallback needed**, second consecutive working tick.

---

## What was submitted

```
node scripts/indexnow-ping.mjs $(cat _slugs0922ai.txt)
```

```
DONE: IndexNow -> HTTP 200 for 59 urls
```

| bucket | count |
|---|---|
| deal slugs, `createdAt` within the last 6h | 51 |
| post slugs, `createdAt` within the last 6h | 0 |
| older LIVE deals refreshed in-window (`PriceHistory.postedAt`) | 5 |
| appended by the script (`/`, `/offers`, `/sitemap.xml`) | 3 |
| **submitted** | **59** |
| **HTTP** | **200** |

The url count is always `slugs + 3` — the script prepends `/`, `/offers` and `/sitemap.xml`, then dedups through a `Set`. 56 + 3 = 59. The count is the receipt: if it had not matched, an argument would have been dropped on the way in.

The window query reads `createdAt`, never `updatedAt`. `updatedAt` churn on a deal row is the click counter moving, not the page changing — pinging on that would submit thousands of unchanged URLs every tick.

**0 posts in the window is correct, not rot.** The blog cron is `9 */6 * * *`, so at most one firing falls inside any 6h window, and three posts are already live for this IST day against a cap of four. Nothing was published in the window, so nothing was there to submit.

The 51 deal creates arrived in five distinct batches, each one a prior tick: 13:39 → ids 10879–10899 (21), 13:57 → 10900–10901 (2), 14:52 → 10902 (1), 15:35 → 10903–10918 (16), 17:30 → 10919–10929 (11, tick `ab`).

---

## The 2 URLs deliberately not re-submitted

Tick `af` ran ~30 minutes before this one and pinged its own output: deal **10930** (the new Shopsy mehendi page) and deal **8902** (the Samsung monitor refresh). Both are inside this tick's 6h window, and both were excluded.

IndexNow treats repeat submission of an unchanged URL as spam, and the penalty lands on the host, not the URL. A rolling-window resubmit tick exists to catch the *older* end of the window — pages whose first ping was hours ago and whose crawl may have been deferred — not to re-announce what a sibling tick announced minutes earlier. The ~2h-old tick-`ab` cohort (10919–10929, plus refresh 1746) was back in scope by that same rule.

The five in-window refreshes that *were* submitted: deals **7713**, **10333**, **1883**, **1746**, **2982** — older LIVE rows whose price moved inside the window, so their live content genuinely differs from what a crawler last saw.

---

## No fallback needed

`https://api.indexnow.org/indexnow` answered on the first POST. The Bing GET fallback (`https://www.bing.com/indexnow?url=<encoded>&key=…`, one request per URL) stays wired but was not used.

That is now two ticks in a row (`af`, `ai`) after four consecutive DNS failures. The resolution problem is intermittent on this network, not permanent — the flag below is downgraded again, not dropped.

---

## Freshness cross-check

Live sitemap: **9,893** `<loc>` entries, against 9,892 after tick `af` — **+1**, exactly the one new page tick `af` created (deal 10930). Delta fully attributed, no unexplained drift.

Spot checks against prod, all 200:

- `/meenakshi-amar-suhag-fast-mehandi-cone-pack-of-12-300-g-mehhajgjbvmf7xku`
- `/samsung-galaxy-buds3-fe-with-anc-and-galaxy-ai-black-b0fpf9n2pj`
- `/livon-professional-smoothening-hair-serum-189-B0CTHK`
- `/sitemap.xml`
- `/llms-full.txt`

---

## CEO audit

Clean: live deals **10,583**, PENDING_REVIEW **0**, null price **0**, null image **0**, coverless posts **0**, seo-less posts **0**, broadcast cursor vs DB max (10930) in range, max deal id 10930.

Rot, all flagged, none executed:

1. **Blog floor still missed on 2026-09-21 — 1 post against a floor of 2.** Posts/day IST: 09-22 **3**, 09-21 **1**, 09-20 2, 09-19 3, 09-18 3. Cause is the session cron `9 */6 * * *` losing firings when the session is down; the durable Task Scheduler fix is unauthorised.
2. **41 live deals state a price in the title the row does not hold** — flat for four ticks. Off-by-one rounding on 9708, 5450, 14, 7554; the worst are legacy hand-typed coupon titles (1716, 1450, 2602). Retitle pass not authorised.
3. **nullMrp 1,622 / nullPct 1,599** — backfill still unapproved.
4. **The 1 LIVE Cuelinks-wrapped Flipkart row** should carry plain `?pid=…&affid=djhackraj`.
5. **Myntra deals 36, 38, 115 are category landings, not PDPs** — delist to EXPIRED on a nod (pages stay live per the EXPIRED-banner rule).
6. **Deal 4237 (`B0CP2KW151`, Beurer MN9X) is Currently unavailable on Amazon** — still on the EXPIRED path, not refreshed to a price nobody can pay.
7. **`api.indexnow.org` is intermittent, not dead — 200 two ticks running.** Keep the Bing GET fallback wired; do not rewrite the script around either assumption.
8. **The DO API token pasted in chat during setup is still unrotated** (DO → API → Tokens → delete + regenerate).
9. **Amazon.in sign-in state in the `richDeals` Playwright profile is flagged only, never fixed here** — logging in touches owner credentials.
10. **CLAUDE.md freshness rule #3 names the wrong file.** It says to confirm `llms.txt` carries the batch, but `/llms.txt` is a hub/summary surface and carries no deal URLs by design — `/llms-full.txt` is the deal-bearing one. Both return 200 and both are `force-dynamic`, so nothing is broken; the rule text points the check at a file that can never show the batch. Flagged, not edited.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
