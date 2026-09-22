# TELEGRAM-DEAL-MONITOR tick 2026-09-22s

**Run:** 2026-09-22 12:43–12:52 IST · richdeals.in · inline (not subagent)
**Result:** **1 published** (#10878, Wonderchef Bellagio sauce pan ₹649), IndexNow **HTTP 200 / 4 urls**, 1 ASIN dropped again for the same verified defect, 1 shortlink resolved to a search page, 10 sidebar skips.

---

## Sidebar sweep

One `browser_evaluate` over `.chat-list .ListItem.Chat` — 25 rows, no chat switching, no chat-list reload. 12 of the 13 roster groups in `data/tg-groups.json` had a row.

| # | Group | Newest post | Disposition |
|---|---|---|---|
| 1 | SB Loots And Deals | Wonderchef sauce pan, **MRP - 1860**, `amazn.lt/Quljwxgu` | **candidate → published at our verified price** |
| 2 | Dealzone | "Upto 68% Off On Lakme" `link.amazon/B0gFgHe6t` | skip — resolved to a `/s?k=lakme` search page |
| 3 | ONLINE SHOPPING DEALS | Yonex ET 901 grip ₹85, `link.amazon/B0hLf0C6s` | candidate → **dropped, no list price on the PDP** |
| 4 | CoolzTricks Official | baby wipes (unchanged) | skip — dispositioned, #10865 |
| 5 | Rogerkart Deals | sale hub | skip — sale hub |
| 6 | Dealdost | loot/category `fkrt.cc` | skip — loot/category |
| 7 | INDIAN CHEAP DEALS | Ladies Handbag (unchanged) | skip — dispositioned, #7110 |
| 8 | Loot Deals 24x7 | Syska power bank (unchanged) | skip — dispositioned |
| 9 | IndiaFreeStuff Tips & Tricks | app trick | skip — not a product |
| 10 | Hidden Loot Deals & Offers | search trick | skip — not a product |
| 11 | Deal Dibba | t.me join links | skip — join-bait |
| 12 | OMG LOOTDEALS | earn-money post | skip — not a deal |
| 13 | NonStopDeals | no row in this sweep | no post |

3 link candidates, 10 skips. Non-roster rows (DMs, bots, rate channels) ignored.

> The sweep again returned the `Telegram` service chat (id `777000`) carrying a live login code. It is a credential: not echoed, not acted on, not recorded here or in the commit.

### Free confirmation: the `RichDeals` row

Our own channel's sidebar row carried the **Nivia knee support ₹187 / ₹1,999 / 91% broadcast — that is #10877 from tick r.** Tick r classified its cursor gap as "not rot, the external cron will pick it up." The broadcast going out settles it: a **fifth** consecutive confirmation, from the channel itself rather than from the cursor file.

---

## Shortlink resolution — 3 of 3 resolved

`curl -sL -o /dev/null -A "<browser UA>" -w 'code=%{http_code} eff=%{url_effective}' --max-time 25`.

| Shortlink | HTTP | Resolves to | Their tag (stripped) |
|---|---|---|---|
| `amazn.lt/Quljwxgu` | 200 | `/dp/B0CTYMGCPV` | `bhavesh015-21` |
| `link.amazon/B0gFgHe6t` | 503 | `/s?k=lakme&i=beauty&…` | `glitzdeal05-21` |
| `link.amazon/B0hLf0C6s` | 200 | `/dp/B06WV77YDB` | `vivek123034-21` |

Two things worth recording.

**`amazn.lt` works.** That is the second consecutive tick it has resolved cleanly. Tick p reported it DNS-dead for three ticks running and CLAUDE.md still names it live; tick r retracted the flag, and this tick confirms the retraction rather than re-raising it. The flag is closed, not carried.

**`link.amazon/B0gFgHe6t` is another shortlink-code-is-not-an-ASIN case**, and the most useful shape of it: the code is ASIN-shaped, the destination is a *search* page, and only resolution reveals that. Had the code been trusted as an ASIN the tick would have fetched a PDP for a product that was never being advertised. The 503 on the redirect is Amazon throttling the hop, not a dead link — the `url_effective` came back intact, which is the only field that matters here.

---

## Dedup — 2 → 1 fresh

`data/tg-multi-seen.json` (1801 entries at read) + live DB by `productId`.

| productId | seen | DB | Verdict |
|---|---|---|---|
| B0CTYMGCPV | false | none | **fresh → verify** |
| B06WV77YDB | true | none | correctly dispositioned last tick, correctly absent from the DB |

The B06WV77YDB row is the dedup file doing exactly what it exists for: tick r decided not to publish it, recorded the decision, and this tick did not have to re-derive that decision from scratch. Note the shape — `seen=true` with `DB=none` is the signature of a *deliberate drop*, not of a publish. A seen-entry with no DB row is the record of a judgement call, and it survived a channel re-post.

---

## PDP verification — both ASINs in one `browser_evaluate`

`fetch(url,{credentials:'include'})` + `DOMParser` from the open `amazon.in` tab, under the same `?th=1&psc=1` as the image.

| ASIN | Channel claim | PDP price | MRP | `.savingsPercentage` | `#availability` | Note |
|---|---|---|---|---|---|---|
| B0CTYMGCPV | "MRP - 1860" (no deal price) | **₹649.00** | ₹1,860 | −65% | In stock | channel MRP matches PDP MRP exactly |
| B06WV77YDB | "₹85" | ₹85.00 | **absent** | **node absent** | In stock | no list price → dropped |

### B0CTYMGCPV — publishable

`#centerCol` innerText: `"₹649.00 with 65 percent savings -65% ₹649 M.R.P.: ₹1,860.00M.R.P.: ₹1,860₹1,860"`.

This is the cleanest source-agreement case the Telegram path has produced. The SB Loots post carried **no deal price at all** — only "MRP - 1860" — and that MRP matches the PDP's M.R.P. to the rupee. So there is nothing to contradict: the discount claim is ours, read off the PDP, and the one number the channel did assert independently checks out. A post with no price is not a defective post for our purposes, because we verify on the PDP regardless of what the channel claims; the price always comes from the PDP read, never from the message.

`round(1 − 649/1860)` = 65, which matches the PDP's own `-65%` badge. That agreement is the check worth running: the rendered badge and our computed `discountPct` are derived independently, and a mismatch would mean the MRP we captured is not the one Amazon is striking through.

hiRes image from `#landingImage`'s `data-a-dynamic-image`, keys sorted by width desc: `51RG+9HLHmL._SX679_.jpg`. Read under the same URL as the price, so image and price describe the same variant.

### B06WV77YDB — dropped again, second independent confirmation

`#centerCol` innerText, in full: `"₹85.00 ₹85"`. Nothing else. No `M.R.P.` string, and no `.savingsPercentage` node in the document at all. `#availability` reads `In stock` (with the known trailing-JSON noise, matched on the leading substring rather than compared for equality).

Tick r dropped this ASIN for exactly this reason. Two reads, roughly 45 minutes apart, both showing the same absence, is what separates a listing that genuinely has no list price from a transient read failure — and the difference matters, because "the read failed" would call for a retry while "there is no MRP" calls for a drop. It is the latter.

The reasoning is unchanged and worth restating rather than cross-referencing: with no list price there is no verifiable savings claim, so the Offer schema would either carry a fabricated MRP or carry none. Publishing it would mean adding a 1,625th null-MRP row to the very backlog this tick's audit flags below. A ₹85 in-stock product is real, but a deal page needs two numbers to be a deal page.

---

## Published — #10878

| Field | Value |
|---|---|
| slug | `wonderchef-bellagio-sauce-pan-16-cm-1-4-l-non-stick-ceramic-pfas-and-pfoa-free-b0ctymgcpv` |
| price / mrp / pct | ₹649 / ₹1,860 / 65% (`round(1 − 649/1860)`, matches PDP −65%) |
| isSuper / isHot | false / false (649 > 250 and > 500) |
| image | `m.media-amazon.com/…/51RG+9HLHmL._SX679_.jpg` |
| affiliate | `/dp/B0CTYMGCPV?th=1&psc=1&tag=ashoksachdev-21` |

Description written from the PDP's own spec bullets — virgin aluminium conducting heat ~9× better than stainless steel, ceramic coating free of PFAS/PFOA/heavy metals/nickel, 3 mm wall, cool-touch two-tone handle, 2-year warranty, 16 cm / 1.4 L sizing. No channel text, no source text. `priceHistory` row written.

The howTo `confirm` line names the variant explicitly: Wonderchef sells the Bellagio sauce pan in several diameters at different prices, so a buyer landing on a larger pan would see a price that does not match our page. Naming the size on the page is cheaper than being wrong about it.

Pre-flight passed: title-₹ vs numeric price, `price < mrp`, CDN image host, indexability (`discountPct 65 ≥ 20`), slug ends in the full lowercased productId, no in-batch dup.

---

## Freshness (owner directive 2026-07-27)

| Check | Result |
|---|---|
| IndexNow | **HTTP 200 / 4 urls** — new slug + `/`, `/offers`, `/sitemap.xml` |
| sitemap.xml | ISR `revalidate = 1800`; #10878 passes `dealIndexable()` (pct 65 ≥ 20, price + image present, age 0) and enters on the next revalidate |
| llms.txt | `force-dynamic`, rebuilt per request; no new hub page |

The SITEMON tick earlier today observed #575 appearing in the live sitemap within about 7 minutes of its write rather than at the 1800s worst case, so "enters on the next revalidate" is now an observed behaviour on this site and not just a reading of the config.

---

## CEO audit

| Check | Value | Verdict |
|---|---|---|
| posts/day IST (last 5) | 09-18=3, 09-19=3, 09-20=2, 09-21=1, 09-22=3 | never 0, never >4 — rule held; 09-21 remains the one 1-post day |
| coverless posts | 0 | clean |
| seo-less posts | 0 | clean |
| deals LIVE | 10,531 (was 10,530) | +1 = this tick's publish, fully accounted |
| null price | 0 | clean |
| null image | 0 | clean |
| null mrp | 1,624 | carried — unchanged from the pre-push read |
| null discountPct | 1,601 | carried — same |
| PENDING_REVIEW backlog | 0 | clean |
| tg-broadcast cursor | `lastId 10878` == DB max `10878`, stamped 12:49:04 IST | **caught up, zero gap** |
| unpushed commits | 0 (before this tick's commit) | clean |

**The cursor read is the notable one.** Every recent tick has had to defend a one-row gap between `lastId` and the DB max as "not rot, the cron will catch it." This tick there is no gap to defend: the external broadcast cron ran at 12:49:04 IST, about two minutes after #10878 was created, and the cursor now equals the DB max exactly. Combined with the RichDeals sidebar row confirming tick r's #10877 broadcast, that is the same finding observed from both ends in one tick — the drift self-heals, and the window is minutes, not hours. It should not be flagged again.

`nullMrp 1,624` / `nullPct 1,601` are unchanged across this tick's own push, which is the expected result and also the proof: our push added a row with both fields populated, so the Telegram path is not feeding the backlog. The counts dropped by exactly 1 each between tick p (1,625/1,602) and tick r — that was tick r's #575 rot fix, one row repaired by hand. At one row per tick the backlog outlives the site. It remains a one-time bulk backfill, still unauthorized, still not a Telegram tick's job to run.

---

## Carried flags (unchanged, owner's call)

1. **CLAUDE.md freshness rule #3 names the wrong file.** `/llms.txt` carries no deal URLs by design; `/llms-full.txt` is the one to check for deal-batch freshness. Their rule text — flagged, not edited.
2. **CLAUDE.md "reject on drift >₹1" is stale for indiafreestuff.** Their card price is post-clip-coupon, not wrong. Their rule text — flagged, not edited.
3. **DO API token still needs rotating** — pasted in chat during setup, no longer needed for daily work.
4. **Amazon.in sign-in state in the `richDeals` Playwright profile** still reads logged-out. Flag only; fixing it means touching owner credentials, and the PDP read path does not depend on it — both reads this tick succeeded.

Dropped from this list: the `amzn.lt` flag. Two consecutive clean resolutions retire it.
