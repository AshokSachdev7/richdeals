# TELEGRAM-DEAL-MONITOR tick — 2026-09-22 02:46 IST

**0 published.** No IndexNow ping this tick — nothing was pushed, so there is
nothing to ping (the ping is mandatory only after a batch).

## Sidebar sweep

One `browser_evaluate` over `.chat-list .ListItem.Chat`. The newest message in
every one of the 13 source groups is byte-identical to the 02:05 sweep — no
source group posted in the last 40 minutes. Triage:

| Group | Newest post | Verdict |
|---|---|---|
| CoolzTricks | HP Travel Hub USB-C @1186 | pushed 02:05 (deal #10836) |
| Rogerkart Deals | Police Cabin Trolley 65L @1599 | pushed 02:05 (deal #10838) |
| ONLINE SHOPPING DEALS | Clensta Shampoo+Conditioner ₹399 | pushed 02:05 (deal #10837) |
| INDIAN CHEAP DEALS | Ladies Handbag ₹3,500 | dup of live deal #7110 |
| Loot Deals 24x7 | Syska 10000mAh ₹799 (Flipkart) | in `tg-multi-seen.json` |
| Dealzone | 88% off branded shoes, 6 brand links | multi-product category |
| Dealdost | "Loot: Mobile & Tablet Protection @199" | loot/category |
| IndiaFreeStuff Tips | Swiggy Instamart search trick | not a product |
| Hidden Loot Deals | Zepto search trick, Delhi-only | not a product |
| OMG LOOTDEALS | "Video dekho paisa kamao" | app promo |
| Deal Dibba | t.me join links | not a store |
| SB Loots And Deals | notification how-to | not a deal |
| NonStopDeals | nothing newer | none |

Sidebar also carried RichDeals' own channel (our broadcast of #10838 — proof
the broadcast landed) and assorted DMs/bots, all ignored.

## Unlisted group worth a look (owner call, not actioned)

`𝗟𝗔𝗧𝗘𝗦𝗧 𝗜𝗣𝗛𝗢𝗡𝗘 𝗥𝗔𝗧𝗘𝗦 𝗨𝗣𝗗𝗔𝗧𝗘𝗦` (`-1004400885213`) is in the account's chat list
but **not** in `data/tg-groups.json`, so it is out of this tick's scope. Its
newest post resolved cleanly:

```
bilty.co/njBm8j → tatacliq.com/apple-20w-usb-c-power-adapter-white-for-iphone-ipad-airpods/p-mp000000008093500
```

Single product, Tata Cliq, Cuelinks-eligible — i.e. exactly the shape we take.
Not pushed: the source list was deliberately re-verified on 2026-09-13 and
adding an unvetted channel to it silently is how junk gets into the ingest.
Worth a few ticks of watching before it earns a place in the file.

## CEO audit

| Check | Result |
|---|---|
| prod endpoints | 7/7 **200** — `/` 0.19s, `/offers` 0.12s, `/blog` 0.40s, `/sitemap.xml` 0.30s, `/feed.xml` 0.09s, `/api/deals` 0.10s, `/llms.txt` 0.54s |
| LIVE deals | 10491 |
| LIVE null price / null image | 0 / 0 |
| PENDING_REVIEW backlog | 0 |
| broadcast cursor vs DB max | 10838 vs 10838 — level |
| unpushed commits | 0 |
| coverless / seo-less posts | 0 / 0 |
| posts/day IST | 09-18=3 09-19=3 **09-20=2 09-21=1** 09-22=3 |

No new rot. 09-21's single post is the known broken day, already recorded as
unfixable in `tick-2026-09-22-telegram-sitemon.md` — not re-flagged as new.

**Standing gap, unchanged and still the biggest risk on the board:** every one
of these ticks runs only because this session is open. `schtasks` has zero
richdeals entries, so telegram, indiafreestuff, desidime, broadcast and the
BLOG tick all stop the moment it closes — which is exactly what produced the
~14h deal outage and the broken 09-21 blog day. Task Scheduler wiring was
offered and has had no reply, so nothing was changed.
