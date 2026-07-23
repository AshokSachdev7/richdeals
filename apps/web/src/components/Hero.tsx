import Link from "next/link";
import { getDeals } from "@/lib/api";
import { formatINR, discountOf } from "@/lib/site";
import ProductImage from "./ProductImage";

// Popular quick-filters → each links to a store/category/search page.
const CHIPS: { label: string; href: string }[] = [
  { label: "Amazon", href: "/stores/amazon" },
  { label: "Flipkart", href: "/stores/flipkart" },
  { label: "Under ₹299", href: "/search?q=under+299" },
  { label: "Electronics", href: "/category/shopping-category/electronics" },
  { label: "Fashion", href: "/category/shopping-category/fashion" },
];

const STATS: { value: string; label: string; tint: string; tintBg: string; icon: React.ReactNode }[] = [
  { value: "2,400+", label: "live deals", tint: "text-brand-dark", tintBg: "bg-brand/10", icon: <path d="M13 2 3 14h7l-1 8 10-12h-7z" /> },
  { value: "100+", label: "stores", tint: "text-savings-dark", tintBg: "bg-savings/15", icon: <path d="M4 7h16l-1 5H5zM5 12v8h14v-8M9 20v-4h6v4" /> },
  { value: "Every few min", label: "fresh drops", tint: "text-green-700", tintBg: "bg-green-100", icon: <path d="M12 7v5l3 2M12 3a9 9 0 100 18 9 9 0 000-18z" /> },
];

// Product-first hero: brand-red gradient wash + faint grid texture, copy left,
// rotating Superdeal card right (aligned TOP so no dead space), and a full-width
// auto-scrolling ticker of real live deals along the bottom for "prices moving
// now" energy. Async server component — force-dynamic re-rolls the pick + ticker
// every request. Red-on-white text uses brand-dark (#c1121f, 6.2:1).
export default async function Hero() {
  const { items } = await getDeals({ limit: 32 });
  const pool = items
    .filter((d) => d.image && discountOf(d) != null)
    .sort((a, b) => (discountOf(b) ?? 0) - (discountOf(a) ?? 0))
    .slice(0, 16);
  const hot = pool.length ? pool[new Date().getHours() % pool.length] : null;
  const hotDiscount = hot ? discountOf(hot) : null;
  // Ticker = the rest of the hot pool (skip the featured one), deduped by slug.
  const ticker = pool.filter((d) => d.slug !== hot?.slug).slice(0, 10);

  return (
    <section className="relative isolate overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      {/* Atmosphere: brand-red top-right wash, warm savings glow, faint grid grain */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-brand/[0.07] via-white to-savings/[0.06]" />
        <div className="absolute -right-20 -top-28 h-72 w-72 rounded-full bg-brand/15 blur-3xl" />
        <div className="absolute -left-16 bottom-8 h-56 w-56 rounded-full bg-savings/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #0a0a0a 1px, transparent 1px), linear-gradient(to bottom, #0a0a0a 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="grid items-start gap-5 px-5 pt-4 pb-4 sm:px-7 sm:pt-5 lg:grid-cols-[1.45fr_1fr] lg:gap-8">
        {/* ── Left: copy ─────────────────────────────────────────── */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-brand-dark ring-1 ring-inset ring-brand/25 backdrop-blur">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
            </span>
            Live prices · updated every few minutes
          </span>

          <h1 className="mt-2.5 font-display text-2xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-[1.9rem]">
            India&apos;s best deals,{" "}
            <span className="relative inline-block text-brand-dark">
              handpicked &amp; verified
              <span className="absolute -bottom-0.5 left-0 h-[2px] w-full rounded-full bg-gradient-to-r from-brand to-savings" aria-hidden="true" />
            </span>
          </h1>
          <p className="mt-2 max-w-lg text-sm leading-snug text-gray-600">
            Real, working discounts from Amazon, Flipkart &amp; 100+ Indian stores — live prices, zero junk.
          </p>

          <div className="mt-3.5 flex flex-wrap gap-2">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/90 px-3 py-1.5 shadow-sm backdrop-blur"
              >
                <span className={`flex h-5 w-5 items-center justify-center rounded-full ${s.tintBg} ${s.tint}`}>
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {s.icon}
                  </svg>
                </span>
                <span className="text-sm font-bold text-ink">
                  {s.value} <span className="font-medium text-gray-500">{s.label}</span>
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:items-center">
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
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-gray-300 bg-white/90 px-6 py-3 text-base font-bold text-ink backdrop-blur transition-colors duration-200 hover:border-brand/40 hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
            >
              Coupons &amp; Offers
            </Link>
          </div>

          <div className="mt-3.5 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">Popular</span>
            {CHIPS.map((c) => (
              <Link
                key={c.label}
                href={c.href}
                className="inline-flex min-h-[44px] items-center rounded-full border border-gray-200 bg-white/90 px-4 text-sm font-semibold text-ink-soft shadow-sm backdrop-blur transition-colors duration-200 hover:border-brand/40 hover:bg-brand/5 hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>

        {/* ── Right: rotating Superdeal of the hour ──────────────── */}
        {hot && (
          <div className="rounded-2xl border border-gray-200 bg-white p-3 shadow-lg shadow-gray-300/40 ring-1 ring-black/[0.02]">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wide text-white shadow-sm shadow-brand/30">
              ⚡ Superdeal of the hour
            </span>

            {/* Compact: image left, details right — keeps the card short */}
            <div className="mt-2.5 flex gap-3">
              <Link href={`/${hot.slug}`} className="block shrink-0" aria-label={hot.title}>
                <div className="relative h-28 w-28 overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 sm:h-32 sm:w-32">
                  <ProductImage
                    src={hot.image!}
                    alt={hot.title}
                    sizes="140px"
                    className="object-contain p-2 transition-transform duration-500 hover:scale-105"
                  />
                  {hotDiscount != null && (
                    <span className="absolute left-1 top-1 rounded bg-brand px-1.5 py-0.5 text-[10px] font-extrabold text-white shadow-sm">
                      {hotDiscount}% OFF
                    </span>
                  )}
                </div>
              </Link>

              <div className="min-w-0 flex-1">
                <h2 className="line-clamp-3 text-sm font-semibold leading-snug text-ink">
                  <Link href={`/${hot.slug}`} className="transition-colors hover:text-brand-dark">
                    {hot.title}
                  </Link>
                </h2>
                <div className="mt-1.5 flex items-baseline gap-2">
                  {hot.price != null && (
                    <span className="font-display text-xl font-extrabold tabular-nums text-ink">{formatINR(hot.price)}</span>
                  )}
                  {hot.mrp != null && hot.price != null && hot.mrp > hot.price && (
                    <span className="text-xs text-gray-400 line-through tabular-nums">{formatINR(hot.mrp)}</span>
                  )}
                </div>
              </div>
            </div>

            <Link
              href={`/${hot.slug}`}
              className="mt-2.5 inline-flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-xl bg-brand px-5 text-sm font-bold text-white shadow-sm transition-all hover:bg-brand-dark active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2"
            >
              Grab Deal
              <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        )}
      </div>

      {/* ── Bottom: live deal ticker (real deals, auto-scroll) ─── */}
      {ticker.length >= 4 && (
        <div className="relative mt-1 border-t border-gray-200/80 bg-white/60 py-2.5 backdrop-blur">
          {/* edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent" aria-hidden="true" />
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="ml-4 hidden shrink-0 items-center gap-1.5 rounded-full bg-brand/10 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-brand-dark sm:inline-flex">
              🔥 Hot now
            </span>
            <div className="rd-ticker flex shrink-0 items-center gap-3 pl-3">
              {/* duplicated once for a seamless loop */}
              {[...ticker, ...ticker].map((d, i) => {
                const off = discountOf(d);
                return (
                  <Link
                    key={`${d.slug}-${i}`}
                    href={`/${d.slug}`}
                    className="inline-flex shrink-0 items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs shadow-sm transition-colors hover:border-brand/40 hover:bg-brand/5"
                  >
                    <span className="max-w-[180px] truncate font-semibold text-ink-soft">{d.title}</span>
                    {d.price != null && (
                      <span className="font-display font-extrabold tabular-nums text-ink">{formatINR(d.price)}</span>
                    )}
                    {off != null && (
                      <span className="rounded bg-savings/15 px-1.5 py-0.5 font-bold text-savings-dark">{off}%</span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
          {/* Marquee keyframes, paused on hover, disabled for reduced-motion. */}
          <style>{`
            .rd-ticker{animation:rd-marquee 40s linear infinite;will-change:transform}
            .rd-ticker:hover{animation-play-state:paused}
            @keyframes rd-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
            @media (prefers-reduced-motion:reduce){.rd-ticker{animation:none}}
          `}</style>
        </div>
      )}
    </section>
  );
}
