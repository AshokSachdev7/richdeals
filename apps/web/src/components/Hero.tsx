import Link from "next/link";

// Popular quick-searches → each links to /search or a category/store page.
const CHIPS: { label: string; href: string }[] = [
  { label: "Amazon", href: "/stores/amazon" },
  { label: "Flipkart", href: "/stores/flipkart" },
  { label: "Under ₹299", href: "/search?q=under+299" },
  { label: "Electronics", href: "/category/shopping-category/electronics" },
  { label: "Fashion", href: "/category/shopping-category/fashion" },
];

// Compact banner — headline + a modest search, chips inline. Deliberately slim
// so the deal grid sits high on the page (deals are the star, not the search).
export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden rounded-2xl bg-gradient-to-r from-brand via-brand-dark to-savings-dark shadow-lg shadow-brand/20">
      <div className="hero-dots pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-savings/40 blur-3xl" aria-hidden="true" />

      <div className="relative flex flex-col gap-4 px-5 py-6 sm:px-8 sm:py-7 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <h1 className="font-display text-xl font-extrabold leading-tight tracking-tight text-white drop-shadow-sm sm:text-2xl">
            Loot Deals, Coupons &amp; Freebies — <span className="text-amber-200">Handpicked Daily</span>
          </h1>
          <p className="mt-1 text-sm text-white/85">
            Verified live prices from Amazon, Flipkart &amp; 100+ Indian stores. Zero junk.
          </p>
          {/* Popular chips */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            {CHIPS.map((c) => (
              <Link
                key={c.label}
                href={c.href}
                className="cursor-pointer rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold text-white ring-1 ring-inset ring-white/25 backdrop-blur transition-colors duration-200 hover:bg-white hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Modest search — full width on mobile, fixed on desktop */}
        <form
          action="/search"
          method="GET"
          role="search"
          className="flex w-full items-center gap-2 rounded-xl bg-white p-1.5 shadow-md ring-1 ring-black/5 focus-within:ring-2 focus-within:ring-savings lg:w-80 lg:shrink-0"
        >
          <span className="pl-1.5 text-gray-400" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3-3" strokeLinecap="round" />
            </svg>
          </span>
          <label htmlFor="hero-search" className="sr-only">Search deals, products or stores</label>
          <input
            id="hero-search"
            type="search"
            name="q"
            placeholder="Search deals or stores…"
            className="min-w-0 flex-1 bg-transparent px-1 py-1.5 text-sm text-ink placeholder:text-gray-400 focus:outline-none"
          />
          <button
            type="submit"
            className="inline-flex h-9 shrink-0 cursor-pointer items-center rounded-lg bg-brand px-3.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-1 focus-visible:ring-offset-brand"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
}
