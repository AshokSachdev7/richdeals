import Link from "next/link";

// Popular quick-filters → each links to a store/category/search page.
const CHIPS: { label: string; href: string }[] = [
  { label: "Amazon", href: "/stores/amazon" },
  { label: "Flipkart", href: "/stores/flipkart" },
  { label: "Under ₹299", href: "/search?q=under+299" },
  { label: "Electronics", href: "/category/shopping-category/electronics" },
  { label: "Fashion", href: "/category/shopping-category/fashion" },
];

// Live-stat trust chips. Static marketing figures (same as the source site) —
// numbers are directional, not a live DB count.
const STATS: { value: string; label: string; tint: string; tintBg: string; icon: React.ReactNode }[] = [
  { value: "2,400+", label: "live deals", tint: "text-brand-dark", tintBg: "bg-brand/10", icon: <path d="M13 2 3 14h7l-1 8 10-12h-7z" /> },
  { value: "100+", label: "stores", tint: "text-savings-dark", tintBg: "bg-savings/15", icon: <path d="M4 7h16l-1 5H5zM5 12v8h14v-8M9 20v-4h6v4" /> },
  { value: "Every few min", label: "fresh drops", tint: "text-green-700", tintBg: "bg-green-100", icon: <path d="M12 7v5l3 2M12 3a9 9 0 100 18 9 9 0 000-18z" /> },
];

// Light, compact, product-first hero (CashKaro/DesiDime vibe): white card, brand
// red as a lively accent (not a band), live-stat chips, one primary CTA that
// scrolls to the deal feed. Deliberately short so deals start high on the page.
// Red-on-white text uses brand-dark (#c1121f, 6.2:1) — the lighter brand red
// (4.17:1) is reserved for decorative glows/borders only. Search is in the
// header, so no second search box here.
export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      {/* Soft brand + amber glows for retail energy — subtle, never a colored band. */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full bg-brand/10 blur-3xl" />
        <div className="absolute -left-12 top-1/2 h-56 w-56 rounded-full bg-savings/10 blur-3xl" />
      </div>

      <div className="px-5 py-8 sm:px-9 sm:py-10">
        {/* Live trust badge */}
        <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1.5 text-xs font-bold text-brand-dark ring-1 ring-inset ring-brand/20">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
          </span>
          Live prices · updated every few minutes
        </span>

        <h1 className="mt-4 max-w-2xl font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-4xl">
          India&apos;s best deals,{" "}
          <span className="text-brand-dark">handpicked &amp; verified</span>
        </h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-gray-600">
          Real, working discounts from Amazon, Flipkart &amp; 100+ Indian stores — live prices, zero junk.
        </p>

        {/* Live-stat chips */}
        <div className="mt-5 flex flex-wrap gap-2.5">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3.5 py-2 shadow-sm"
            >
              <span className={`flex h-6 w-6 items-center justify-center rounded-full ${s.tintBg} ${s.tint}`}>
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {s.icon}
                </svg>
              </span>
              <span className="text-sm font-bold text-ink">
                {s.value} <span className="font-medium text-gray-500">{s.label}</span>
              </span>
            </div>
          ))}
        </div>

        {/* Primary CTA → scroll to feed, plus a secondary link */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="#deals-heading"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-brand-dark px-6 py-3 text-base font-bold text-white shadow-md shadow-brand/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            Browse Today&apos;s Deals
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
          <Link
            href="/coupons"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-gray-300 bg-white px-6 py-3 text-base font-bold text-ink transition-colors duration-200 hover:border-brand/40 hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
          >
            Coupons &amp; Offers
          </Link>
        </div>

        {/* Quick-filter chips */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">Popular</span>
          {CHIPS.map((c) => (
            <Link
              key={c.label}
              href={c.href}
              className="inline-flex min-h-[44px] items-center rounded-full border border-gray-200 bg-white px-4 text-sm font-semibold text-ink-soft shadow-sm transition-colors duration-200 hover:border-brand/40 hover:bg-brand/5 hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
            >
              {c.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
