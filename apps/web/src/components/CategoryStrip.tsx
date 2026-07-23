import Link from "next/link";

// Quick-links: stores + shopping categories. SVG icons only (no emoji).
type Item = { label: string; href: string; icon: React.ReactNode; tint: string };

const ITEMS: Item[] = [
  {
    label: "Amazon",
    href: "/stores/amazon",
    tint: "text-orange-500",
    icon: <path d="M3 16c3 2 7 3 11 3 3 0 6-.6 8-2M6 11a6 6 0 0112 0M9 11h6" />,
  },
  {
    label: "Flipkart",
    href: "/stores/flipkart",
    tint: "text-blue-600",
    icon: <path d="M6 4h12v4H6zM8 8v12h8V8M10 12h4" />,
  },
  {
    label: "Electronics",
    href: "/category/shopping-category/electronics",
    tint: "text-violet-600",
    icon: <path d="M4 5h16v11H4zM2 20h20M9 8h6" />,
  },
  {
    label: "Fashion",
    href: "/category/shopping-category/fashion",
    tint: "text-pink-600",
    icon: <path d="M8 4l4 3 4-3 3 4-3 2v9H8v-9L5 8z" />,
  },
  {
    label: "Beauty",
    href: "/category/shopping-category/beauty-grooming",
    tint: "text-rose-500",
    icon: <path d="M9 3h6v4l2 2v11H7V9l2-2zM9 13h6" />,
  },
  {
    label: "Grocery",
    href: "/category/shopping-category/grocery-gourmet",
    tint: "text-green-600",
    icon: <path d="M4 5h2l2 11h10l2-8H7M9 20a1 1 0 100 .01M17 20a1 1 0 100 .01" />,
  },
  {
    label: "Mobiles",
    href: "/category/shopping-category/mobiles",
    tint: "text-cyan-600",
    icon: <path d="M8 3h8v18H8zM11 18h2" />,
  },
  {
    label: "Home & Kitchen",
    href: "/category/shopping-category/home-kitchen",
    tint: "text-amber-600",
    icon: <path d="M4 11 12 4l8 7M6 10v10h12V10" />,
  },
];

export default function CategoryStrip() {
  return (
    <section aria-labelledby="shop-by" className="mt-10">
      <h2 id="shop-by" className="mb-1 font-display text-xl font-bold text-ink sm:text-2xl">
        Shop by store &amp; category
      </h2>
      <p className="mb-4 text-sm text-gray-500">Jump straight to the deals you care about.</p>
      <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 sm:gap-3 lg:grid-cols-8">
        {ITEMS.map((it) => (
          <Link
            key={it.label}
            href={it.href}
            className="group flex flex-col items-center gap-2.5 rounded-2xl border border-gray-200 bg-white p-3 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg hover:shadow-brand/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 sm:p-4"
          >
            <span
              className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gray-50 ${it.tint} transition-colors duration-200 group-hover:bg-brand/10 sm:h-12 sm:w-12`}
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
            <span className="text-xs font-bold leading-tight text-ink-soft group-hover:text-brand sm:text-sm">
              {it.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
