import Link from "next/link";
import type { DealFeed } from "@deals/shared";
import { getDeals } from "@/lib/api";
import Hero from "@/components/Hero";
import CategoryStrip from "@/components/CategoryStrip";
import LoadMoreDeals from "@/components/LoadMoreDeals";

export const revalidate = 300;

// Super Deals lead — that's what a visitor sees first.
const TABS: { key: DealFeed; label: string }[] = [
  { key: "super", label: "Super Deals" },
  { key: "hot", label: "Hot" },
  { key: "latest", label: "Latest" },
];

const HEADINGS: Record<DealFeed, { title: string; sub: string }> = {
  super: { title: "Super Deals — Today's Biggest Loot", sub: "Handpicked lowest-price steals, refreshed all day." },
  hot: { title: "Hot Deals", sub: "Trending right now across Amazon, Flipkart & more." },
  latest: { title: "Latest Deals", sub: "Freshly added drops, newest first." },
};

const VALUE_PROPS: { title: string; body: string; icon: React.ReactNode }[] = [
  {
    title: "Verified, not spammed",
    body: "Every deal is checked for a real, working discount before it goes live. No dead links, no fake MRPs.",
    icon: <path d="M9 12.5l2 2 4-4.5M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />,
  },
  {
    title: "Live prices",
    body: "Prices pulled straight from the store, so what you see is what you pay at checkout.",
    icon: <path d="M4 15l4-4 3 3 5-6M3 20h18" />,
  },
  {
    title: "Updated every few minutes",
    body: "Fresh loot drops around the clock. New deals land the moment they go live.",
    icon: <path d="M12 7v5l3 2M12 3a9 9 0 100 18 9 9 0 000-18z" />,
  },
  {
    title: "Best of every store",
    body: "Amazon, Flipkart and 100+ Indian stores in one feed — handpicked, never auto-dumped.",
    icon: <path d="M4 7h16l-1 5H5zM5 12v8h14v-8M9 20v-4h6v4" />,
  },
];

function isFeed(v: string | undefined): v is DealFeed {
  return v === "latest" || v === "hot" || v === "super";
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ feed?: string }>;
}) {
  const { feed } = await searchParams;
  const active: DealFeed = isFeed(feed) ? feed : "super";
  const { items, nextCursor } = await getDeals({ feed: active, limit: 30 });
  const heading = HEADINGS[active];

  return (
    <div className="space-y-2">
      <Hero />

      <CategoryStrip />

      <section aria-labelledby="deals-heading" className="mt-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="deals-heading" className="font-display text-2xl font-bold text-ink sm:text-3xl">
              {heading.title}
            </h2>
            <p className="mt-1 text-sm text-gray-500">{heading.sub}</p>
          </div>

          {/* Feed tabs */}
          <div className="inline-flex rounded-full bg-gray-100 p-1" role="tablist" aria-label="Deal feeds">
            {TABS.map((t) => {
              const on = t.key === active;
              return (
                <Link
                  key={t.key}
                  href={t.key === "super" ? "/" : `/?feed=${t.key}`}
                  role="tab"
                  aria-selected={on}
                  className={`cursor-pointer rounded-full px-4 py-2 text-sm font-bold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 ${
                    on
                      ? "bg-brand text-white shadow"
                      : "text-gray-600 hover:text-brand"
                  }`}
                >
                  {t.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-6">
          <LoadMoreDeals
            key={active}
            initialItems={items}
            initialCursor={nextCursor}
            feed={active}
          />
        </div>
      </section>

      {/* Why RichDeals */}
      <section aria-labelledby="why-heading" className="mt-16 rounded-3xl bg-ink px-5 py-12 text-white sm:px-10">
        <h2 id="why-heading" className="text-center font-display text-2xl font-bold sm:text-3xl">
          Why shop with RichDeals
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-white/70">
          A deals feed built for people who hate wasting money — and time.
        </p>
        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUE_PROPS.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl bg-white/5 p-6 ring-1 ring-inset ring-white/10 transition-colors duration-200 hover:bg-white/10"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-savings/20 text-savings">
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
                  {v.icon}
                </svg>
              </span>
              <h3 className="mt-4 font-display text-lg font-bold">{v.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/70">{v.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
