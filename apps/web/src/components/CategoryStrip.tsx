import Link from "next/link";

// Quick-links: stores + shopping categories.
// Stores render their REAL logo (files in /public/stores). Categories have no
// logo, so they get a gradient badge + SVG icon. Each tile owns ONE hue
// (tinted card + hover glow) so none reads as the odd one out. Full literal
// class strings — Tailwind JIT scans source, dynamic hues would be purged.
type Item = {
  label: string;
  href: string;
  card: string; // border + tinted bg + hover glow + focus ring
  label_: string; // hover label colour
  logo?: string; // store: real logo path
  badge?: string; // category: gradient chip
  icon?: React.ReactNode; // category: SVG mark
};

const ITEMS: Item[] = [
  {
    label: "Amazon",
    href: "/stores/amazon",
    card: "border-orange-100 bg-orange-50/60 hover:shadow-orange-500/20 focus-visible:ring-orange-400/50",
    label_: "group-hover:text-orange-700",
    logo: "/stores/amazon.svg",
  },
  {
    label: "Flipkart",
    href: "/stores/flipkart",
    card: "border-blue-100 bg-blue-50/60 hover:shadow-blue-500/20 focus-visible:ring-blue-400/50",
    label_: "group-hover:text-blue-700",
    logo: "/stores/flipkart.svg",
  },
  {
    label: "Electronics",
    href: "/category/shopping-category/electronics",
    card: "border-violet-100 bg-violet-50/60 hover:shadow-violet-500/20 focus-visible:ring-violet-400/50",
    label_: "group-hover:text-violet-700",
    badge: "bg-gradient-to-br from-violet-400 to-violet-600 shadow-violet-500/30",
    icon: <path d="M4 5h16v11H4zM2 20h20M9 8h6" />,
  },
  {
    label: "Fashion",
    href: "/category/shopping-category/fashion",
    card: "border-pink-100 bg-pink-50/60 hover:shadow-pink-500/20 focus-visible:ring-pink-400/50",
    label_: "group-hover:text-pink-700",
    badge: "bg-gradient-to-br from-pink-400 to-pink-600 shadow-pink-500/30",
    icon: <path d="M8 4l4 3 4-3 3 4-3 2v9H8v-9L5 8z" />,
  },
  {
    label: "Beauty",
    href: "/category/shopping-category/beauty-grooming",
    card: "border-rose-100 bg-rose-50/60 hover:shadow-rose-500/20 focus-visible:ring-rose-400/50",
    label_: "group-hover:text-rose-700",
    badge: "bg-gradient-to-br from-rose-400 to-rose-600 shadow-rose-500/30",
    icon: <path d="M9 3h6v4l2 2v11H7V9l2-2zM9 13h6" />,
  },
  {
    label: "Grocery",
    href: "/category/shopping-category/grocery-gourmet",
    card: "border-emerald-100 bg-emerald-50/60 hover:shadow-emerald-500/20 focus-visible:ring-emerald-400/50",
    label_: "group-hover:text-emerald-700",
    badge: "bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-emerald-500/30",
    icon: <path d="M4 5h2l2 11h10l2-8H7M9 20a1 1 0 100 .01M17 20a1 1 0 100 .01" />,
  },
  {
    label: "Mobiles",
    href: "/category/shopping-category/mobiles",
    card: "border-cyan-100 bg-cyan-50/60 hover:shadow-cyan-500/20 focus-visible:ring-cyan-400/50",
    label_: "group-hover:text-cyan-700",
    badge: "bg-gradient-to-br from-cyan-400 to-cyan-600 shadow-cyan-500/30",
    icon: <path d="M8 3h8v18H8zM11 18h2" />,
  },
  {
    label: "Home & Kitchen",
    href: "/category/shopping-category/home-kitchen",
    card: "border-amber-100 bg-amber-50/60 hover:shadow-amber-500/20 focus-visible:ring-amber-400/50",
    label_: "group-hover:text-amber-700",
    badge: "bg-gradient-to-br from-amber-400 to-amber-600 shadow-amber-500/30",
    icon: <path d="M4 11 12 4l8 7M6 10v10h12V10" />,
  },
];

export default function CategoryStrip() {
  return (
    <section aria-labelledby="shop-by" className="mt-10">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <h2 id="shop-by" className="font-display text-xl font-bold text-ink sm:text-2xl">
            Shop by store &amp; category
          </h2>
          <p className="mt-1 text-sm text-gray-500">Jump straight to the deals you care about.</p>
        </div>
        <Link
          href="/categories"
          className="hidden shrink-0 items-center gap-1 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-bold text-ink-soft transition-colors duration-200 hover:border-brand/40 hover:text-brand sm:inline-flex"
        >
          All categories
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 sm:gap-3 lg:grid-cols-8">
        {ITEMS.map((it) => (
          <Link
            key={it.label}
            href={it.href}
            className={`group flex flex-col items-center gap-3 rounded-2xl border bg-white p-4 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 ${it.card}`}
          >
            {it.logo ? (
              // Real store logo on a clean white chip; brand colour lives in the mark.
              <span className="flex h-12 w-full items-center justify-center rounded-2xl bg-white px-2 shadow-sm ring-1 ring-black/5 transition-transform duration-200 group-hover:scale-105">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={it.logo} alt={`${it.label} logo`} className="max-h-6 w-auto max-w-full object-contain" loading="lazy" />
              </span>
            ) : (
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-md transition-transform duration-200 group-hover:scale-110 ${it.badge}`}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {it.icon}
                </svg>
              </span>
            )}
            <span className={`text-xs font-bold leading-tight text-ink transition-colors duration-200 sm:text-sm ${it.label_}`}>
              {it.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
