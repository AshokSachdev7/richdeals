# RichDeals — SEO Growth Log

Autonomous organic-traffic engineering. KPI = **qualified organic clicks**, not
activity, not indexed-URL count. Property `sc-domain:richdeals.in`.

---

## Baseline (GSC, 2026-05-11 → 08-07, 90d)

| Metric | Value |
|--------|-------|
| Total impressions | 14,279 |
| Total clicks | 48 (byQuery agg) / 96 (byPage agg — query-anonymization gap) |
| Site CTR | ~0.3–0.6% |
| Queries with ≥1 imp | 356 |
| Pages with ≥1 imp | 152 (106 blog) |

**Traffic concentration:** the blog is ~99% of organic. **Two pages hold 93% of
all impressions:**

| Page | Imp | Clk | Pos | Read |
|------|-----|-----|-----|------|
| `/blog/how-to-get-free-samples-freebies-india` | 11,893 | 87 | 6.9 | The engine. Real clicks come from long-tail top-3 queries ("free sample india" pos 7.2 @35.7%, "freebies online" pos 4.3 @16.7%). The 11,072-imp "where to get free samples" @ **0 clk** is an **AI-Overview / navigational intent ceiling**, NOT a title bug — retitling won't unlock it. |
| `/blog/best-vacuum-cleaners-india-2026` | 2,189 | 0 | 10.2 | Pure **rank-up** target: stuck top-of-page-2. Good title already. Needs authority/internal links, not a rewrite. |

**Titles already optimized (08-08, AFTER this GSC window):** both top pages were
retitled to intent-matched titles on 08-08 and verified LIVE in prod this run:
- free-samples → *"Where to Get Free Samples in India (2026): Real Sources & Scam Check"*
- vacuum → *"Best Vacuum Cleaners in India 2026: Top Picks Compared"*

So the 90d 0-click data **predates** the current titles. The CTR-title lever on
the top-2 was already pulled — measure, don't re-touch (would violate "do NOT
change titles merely because…").

---

## Opportunity DB (top, ranked by realistic click upside)

| # | Opportunity | Evidence | Action | Risk | Status |
|---|-------------|----------|--------|------|--------|
| 1 | Vacuum page pos 10.2 → page 1 | 2,189 imp, 0 clk, good title | Content authority + internal links from home/appliance posts (verify such posts exist first). NOT filler. | MED | QUEUED (owner/next batch) |
| 2 | Flipkart BBD cannibalization | `-guide` (pos 21, 2.8k chars, 0 clk) vs `-lowest-price-guide` (pos 11, 7.2k chars) split the "big billion days 2026" cluster | **308 the thin dup → keeper** to consolidate equity | LOW | **DONE this run** |
| 3 | Free-samples cluster long-tail | "companies that give free samples" pos 9.1, "how to get free products" pos 6.3, "how to get free stuff online in india" pos 3.8 — all 0 clk on the pillar | Ensure each long-tail has a strong in-cluster target + contextual links (relatedPosts already topical since ae42758). | LOW | QUEUED |
| 4 | Festival/sale cluster pos 8–13 | festival-sale-calendar "september sale 2026" pos 10, diwali pos 9.4–10.8, GIF pos 10–11 | Rank-up via freshness + internal links as festive season nears. Seasonal — time it, don't churn now. | MED | QUEUED |
| 5 | Minor cannibalization: Amazon lightning deals | `/blog/how-amazon-lightning-deals-work-india` vs `/stores/amazon` both rank pos 21–72 for "lightning deals" | Tiny (7 imp). Watch, no action. | — | NOTED |

Deal pages remain a demand ceiling (30/3,903 ever shown, top page 11 imp/90d) —
NOT chasing their index count. Confirmed correct call from prior forensic run.

---

## Actions taken

### 2026-08-10 — Action A: consolidate Flipkart BBD cannibalization (Opportunity #2)
- **File:** `apps/web/next.config.js` — added `redirects()` with a `permanent: true`
  (308) redirect `/blog/flipkart-big-billion-days-2026-guide` →
  `/blog/flipkart-big-billion-days-2026-lowest-price-guide`.
- **Why:** two near-duplicate posts (same pub date Jul 22, same query cluster) split
  link equity; the weak one is 40% the length, sits at pos 21, and earns **0 clicks**
  — so consolidating sacrifices zero traffic and concentrates equity on the pos-11
  keeper that can realistically reach page 1.
- **Risk:** LOW. Single URL (not a mass change), native Next routing feature,
  fully git-reversible, zero DB writes. Evidence-backed per the NEVER-list's
  "without evidence" qualifier.
- **Build:** `npm run build -w @deals/web` clean.
- **Commit:** `19d6885` — pushed `ae42758..19d6885 master`.
- **Deploy:** `76b5bc5f-6b8c-44a5-8969-42122a712e8a` (DO app cd95718d). Local :4000
  killed before deploy (PG slot gotcha).
- **Freshness:** IndexNow ping both BBD URLs after ACTIVE (recrawl → sees 308 → drops dup).

---

## Measurement plan
Re-pull GSC in ~2–3 weeks (min 14d for the 308 to be recrawled/consolidated):
- **Success for #2:** `-lowest-price-guide` position improves (11 → single digits),
  cluster impressions consolidate onto one URL, first clicks appear.
- **Watch the top-2:** with the 08-08 titles now live, expect CTR > 0 on the
  vacuum page and higher CTR on free-samples long-tail. If still flat, the ceiling
  is position/intent, not title.

## Next 20 (prioritized, not yet done)
1. Verify home/appliance posts exist that can topically link to the vacuum page; add contextual links (Opp #1).
2. Time festive-cluster rank-up work to the pre-Diwali window (Opp #4).
3. Strengthen free-samples cluster spoke pages for the 0-click long-tail (Opp #3).
4. Consider a dedicated "how to get free stuff online in India" angle (pillar ranks pos 3.8 but title says "samples").
