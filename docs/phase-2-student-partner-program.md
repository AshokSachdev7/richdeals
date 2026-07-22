# Phase 2 — RichDeals Student Partner Program

> Status: **IDEA / PARKED for Phase 2** (not built). Captured 2026-07-22.

## 1. Vision
Turn students into RichDeals earners. A student signs up, generates their own
affiliate link for any product, shares it, and earns a % of the revenue when
their friends buy. They get a **login + dashboard** showing live earnings —
**pending** during the return window, **confirmed** after it closes, then
**paid**. Free, viral, performance-based distribution (pay only on real sales).

Reference models that prove demand: CashKaro, EarnKaro, GoPaisa. Our edge =
curated deals + student niche + clean dashboard UX.

## 1b. Two ways a partner earns
- **A) Share** — share a personal link to any existing deal, earn a % of commission on sales (section 2).
- **B) Contribute** — the partner FINDS a deal themselves, submits it, and earns **₹1 per approved post + commission** on any sales it drives. This doubles as free crowdsourced deal-sourcing (like DesiDime / IndiaFreeStuff community submissions) — it reduces our scraping load AND rewards the partner.

### Contributor flow (find & post)
1. Partner finds a genuine single-product deal → submits URL + price via dashboard.
2. System auto-checks: resolves the link, dedups against live deals, validates it's a real single product (ASIN / pid), pulls the image.
3. Goes to **pending-review** → admin (or auto-rules) approves.
4. On approval: partner credited **₹1 flat**, and the published deal carries their `ref` so any sale via it also earns them commission.
5. Live on site + auto-posted to the Telegram channel (credited).

### Anti-spam (critical for ₹1/post)
- Pay ONLY on **approved, unique, single-product** deals — never on submission.
- Dedup against existing deals + other pending submissions.
- Daily submission cap per partner (e.g. 20); quality score; auto-reject category/loot/affiliate-spam links.
- Reverse the ₹1 if the deal is later found fake/dupe.
- ₹1 is a small nudge; the real money is the commission — keeps incentive honest.

## 2. Student flow (share mode)
1. Sign up (Google login) → gets a unique `ref` code.
2. Paste any product / pick any RichDeals deal → get a personal share link:
   `richdeals.in/out/<dealId>?ref=<studentId>` (or a short link).
3. Share on WhatsApp / Instagram / college groups.
4. Friend clicks → we log the click → 302 to the store with our affiliate tag.
5. Friend buys → commission tracked against the student's `ref`.
6. Dashboard shows: **Clicks → Pending ₹ → Confirmed ₹ → Paid ₹**.
7. Payout to UPI once confirmed earnings cross a minimum (e.g. ₹250).

## 3. Revenue model
- RichDeals earns ~1–8% from Amazon/Flipkart via the affiliate network.
- Student gets a **share of net** (suggest **30–50% of net commission**, not gross).
- Example: ₹1,000 order, 4% net = ₹40 → student ₹16 (40%), RichDeals ₹24.
- Only works at volume — the program's job is to CREATE that volume.

## 4. ⚠️ Compliance (the make-or-break)
- **Raw Amazon Associates ToS generally PROHIBITS paying sub-affiliates / incentivised sharing.** Doing it on a raw Amazon tag risks a permanent account ban.
- **Fix:** route all student links through **EarnKaro / Cuelinks** — these ARE sub-affiliate networks built for exactly this (they handle multi-user attribution + payouts + compliance). Build the program ON TOP of them, not on raw Amazon.
- Flipkart affiliate has similar rules — same routing via the network.

## 5. Attribution (easy — we already own the redirect)
- Every deal link already flows through our own `/out/:dealId` click-logger.
- Add a `ref` param → store `studentId` on the Click row.
- Commission reconciliation: import the network's confirmed-sales report,
  match order → click → `ref` → credit the student.

## 6. Return-period gating (the honest bit the user already got right)
- Affiliate commission confirms only AFTER the return window (7–30 days) and
  the network's monthly confirmation cycle.
- Dashboard states: **Pending** (in return window) → **Confirmed** (window
  closed, network approved) → **Paid** (UPI sent).
- "Live showcase: itna milega after return period" = show the Pending pool with
  an expected-confirm date. Sets honest expectations, kills support tickets.

## 7. Fraud controls
- No self-referral (block same-device / same-account clicks).
- Minimum payout threshold + manual review over a ₹ ceiling.
- Cancelled / returned orders reverse the pending credit.
- Rate-limit link generation; flag abnormal click:sale ratios.

## 8. MVP scope (smallest thing that earns)
- Google login for students.
- `ref` on the existing `/out` redirect + Click table gets `studentId`.
- One dashboard page: total clicks, pending ₹, confirmed ₹, paid ₹, share link.
- Manual monthly reconciliation (upload EarnKaro/Cuelinks report → credit).
- UPI payout done manually at first.
Defer: auto-payout, leaderboards, tiers, custom short links, app.

## 9. Data model (sketch)
- `Partner` (id, userId, refCode, upiId, status, createdAt)
- `Referral` / reuse `Click` (add `partnerId`, `dealId`, `ts`, deviceHash)
- `Commission` (id, partnerId, orderRef, gross, net, share, status[pending|confirmed|paid|reversed], confirmAt, paidAt)
- `Payout` (id, partnerId, amount, upiRef, status, ts)

## 10. Risks
| Risk | Mitigation |
|---|---|
| Amazon ToS ban | Route via EarnKaro/Cuelinks, never raw Amazon |
| Thin margin | Cap student share to % of NET; need volume |
| Fraud / self-clicks | Device hash, thresholds, reversal on return |
| Payout ops load | Start manual + monthly; automate later |
| Attribution gaps | Own redirect + network report reconciliation |

## 11. Success metrics
- Active partners, links shared, click→sale conversion, GMV via partners,
  net revenue after student share, payout reliability, partner retention.

## 12. Verdict
Strong growth lever — do it in Phase 2, but **build on EarnKaro/Cuelinks**
(compliance + payout) rather than raw Amazon. Start with the manual MVP,
prove the click→sale→confirm loop, then automate.
