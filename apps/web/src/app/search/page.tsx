import type { Metadata } from "next";
import Link from "next/link";
import { getDeals } from "@/lib/api";
import LoadMoreDeals from "@/components/LoadMoreDeals";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_NAME } from "@/lib/site";

// ponytail: thin wrapper over getDeals?q= — powers the header/hero search box and
// the WebSite SearchAction. Upgrade to Meilisearch later.
export const revalidate = 60;

const SUGGESTIONS: { label: string; href: string }[] = [
  { label: "Amazon", href: "/stores/amazon" },
  { label: "Flipkart", href: "/stores/flipkart" },
  { label: "Electronics", href: "/category/shopping-category/electronics" },
  { label: "Fashion", href: "/category/shopping-category/fashion" },
  { label: "Grocery", href: "/category/shopping-category/grocery" },
];

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `Search: ${q}` : "Search",
    description: `Search deals, coupons and freebies on ${SITE_NAME}.`,
    robots: { index: false, follow: true }, // search results pages: noindex
  };
}

function EmptyState({ query }: { query: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-10 text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand">
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3-3" strokeLinecap="round" />
        </svg>
      </span>
      <h2 className="mt-4 font-display text-xl font-bold text-ink">
        {query ? `No results for “${query}”` : "Search for a deal"}
      </h2>
      <p className="mx-auto mt-1.5 max-w-md text-sm text-gray-500">
        {query
          ? "Try a shorter term, a brand, or browse a popular category below."
          : "Type a product, brand or store name above, or start with one of these."}
      </p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        {SUGGESTIONS.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="cursor-pointer rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-ink-soft transition-colors duration-200 hover:bg-brand hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
          >
            {s.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q || "").trim();
  const { items, nextCursor, total } = query
    ? await getDeals({ q: query, limit: 30 })
    : { items: [], nextCursor: null, total: 0 };

  return (
    <div>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Search", href: "/search" }]} />

      {query && items.length > 0 ? (
        <>
          <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">
            Results for “{query}”
          </h1>
          <p className="mb-6 mt-1 text-sm text-gray-500">
            {total.toLocaleString("en-IN")} {total === 1 ? "deal" : "deals"} found
          </p>
          <LoadMoreDeals key={query} initialItems={items} initialCursor={nextCursor} q={query} />
        </>
      ) : (
        <>
          <h1 className="mb-6 font-display text-2xl font-bold text-ink sm:text-3xl">
            {query ? `Results for “${query}”` : "Search deals"}
          </h1>
          <EmptyState query={query} />
        </>
      )}
    </div>
  );
}
