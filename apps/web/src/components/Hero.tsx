import Link from "next/link";

// Popular quick-filters → each links to a store/category/search page.
const CHIPS: { label: string; href: string }[] = [
  { label: "Amazon", href: "/stores/amazon" },
  { label: "Flipkart", href: "/stores/flipkart" },
  { label: "Under ₹299", href: "/search?q=under+299" },
  { label: "Electronics", href: "/category/shopping-category/electronics" },
  { label: "Fashion", href: "/category/shopping-category/fashion" },
];

// Premium marketing hero: deep ink base with layered red/amber glows for depth
// (no flat gradient band). One primary CTA — search lives in the site header,
// so no second search box here. Chips are the quick-filter row.
export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden rounded-3xl bg-ink shadow-xl shadow-ink/20">
      {/* Layered depth: soft brand glow + amber glow + dotted texture */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-24 -top-28 h-72 w-72 rounded-full bg-brand/40 blur-3xl" />
        <div className="absolute -right-20 top-1/3 h-72 w-72 rounded-full bg-savings/25 blur-3xl" />
        <div className="hero-dots absolute inset-0 opacity-40" />
      </div>

      <div className="relative mx-auto flex max-w-2xl flex-col items-center px-5 py-12 text-center sm:px-8 sm:py-16">
        {/* Live trust badge */}
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white ring-1 ring-inset ring-white/20 backdrop-blur">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-savings opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-savings" />
          </span>
          Live prices · updated every few minutes
        </span>

        <h1 className="mt-5 font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl">
          India&apos;s best deals,{" "}
          <span className="bg-gradient-to-r from-brand-accent to-savings bg-clip-text text-transparent">
            handpicked
          </span>{" "}
          &amp; verified
        </h1>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg">
          Real, working discounts from Amazon, Flipkart &amp; 100+ Indian stores. Live prices, zero junk.
        </p>

        {/* One primary CTA + a secondary link */}
        <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center">
          <Link
            href="#deals-heading"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-bold text-brand-dark shadow-lg shadow-black/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-50 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            Browse Today&apos;s Deals
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
          <Link
            href="/coupons"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-white/10 px-6 py-3 text-base font-bold text-white ring-1 ring-inset ring-white/25 backdrop-blur transition-colors duration-200 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            Coupons &amp; Offers
          </Link>
        </div>

        {/* Quick-filter chips */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-medium text-white/55">Popular:</span>
          {CHIPS.map((c) => (
            <Link
              key={c.label}
              href={c.href}
              className="cursor-pointer rounded-full bg-white/10 px-3 py-2 text-xs font-semibold text-white ring-1 ring-inset ring-white/20 backdrop-blur transition-colors duration-200 hover:bg-white hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {c.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
