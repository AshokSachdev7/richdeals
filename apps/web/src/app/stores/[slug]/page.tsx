import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getStore, getDeals } from "@/lib/api";
import DealGrid from "@/components/DealGrid";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import SortControl from "@/components/SortControl";
import Pager from "@/components/Pager";
import CollectionSeo from "@/components/CollectionSeo";
import { storeSeo } from "@/lib/store-seo";
import { SITE_NAME, absUrl, dealItemListSchema, breadcrumbSchema } from "@/lib/site";

export const revalidate = 300;

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string; cursor?: string }>;
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const store = await getStore(slug);
  if (!store) return { title: "Store not found" };
  // Deeper pages exist to be crawled (they carry the only links to older
  // deals), not to be indexed — noindex,follow keeps them out of the index.
  const { cursor } = await searchParams;
  const seo = storeSeo(store.slug, store.name);
  const title = seo?.seoTitle ?? `${store.name} Deals, Offers & Coupons`;
  const description =
    seo?.seoDesc ??
    `Latest ${store.name} deals, discount coupons and loot offers — verified and updated daily on ${SITE_NAME}.`;
  return {
    title,
    description,
    robots: cursor ? { index: false, follow: true } : undefined,
    alternates: { canonical: absUrl(`/stores/${store.slug}`) },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      type: "website",
      images: store.logo ? [{ url: store.logo }] : undefined,
    },
  };
}

// ponytail: no reliable free logo API (Clearbit is dead) — the brand favicon is
// the recognizable mark and always resolves. Plain <img> avoids the next/image
// host allowlist and degrades to alt text if a domain has no icon.
const faviconUrl = (domain: string) =>
  `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

export default async function StorePage({ params, searchParams }: Props) {
  const { slug } = await params;
  const store = await getStore(slug);
  if (!store) notFound();
  const { sort, cursor } = await searchParams;
  const seo = storeSeo(store.slug, store.name);

  const { items, nextCursor } = await getDeals({
    store: store.slug,
    sort,
    cursor: cursor ? Number(cursor) : undefined,
    limit: 40,
  });

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Stores", href: "/stores" },
    { name: store.name, href: `/stores/${store.slug}` },
  ];

  const itemListSchema = dealItemListSchema(items, `${store.name} deals`);
  const count = items.length;
  const countLabel = count > 0 ? `${count}${nextCursor ? "+" : ""} live deal${count === 1 ? "" : "s"}` : "No live deals yet";

  return (
    <div>
      <JsonLd data={itemListSchema} />
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Breadcrumbs items={crumbs} />

      {/* Branded hero — logo tile + title + trust chips over a soft brand wash */}
      <section className="relative mb-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-br from-brand/10 via-brand-accent/5 to-transparent"
        />
        <div className="relative flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-5 sm:p-6">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm ring-1 ring-black/5">
            {store.logo ? (
              <Image src={store.logo} alt={`${store.name} logo`} width={56} height={56} className="h-12 w-12 rounded-lg object-contain" />
            ) : seo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={faviconUrl(seo.domain)} alt={`${store.name} logo`} width={48} height={48} className="h-11 w-11 rounded-lg object-contain" />
            ) : (
              <span className="font-display text-2xl font-extrabold text-brand">{store.name.slice(0, 1)}</span>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="font-display text-2xl font-extrabold leading-tight text-ink sm:text-3xl">
              {store.name} Deals, Offers &amp; Coupons
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Live {store.name} prices, hand-picked and refreshed daily.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-bold text-green-700 ring-1 ring-green-600/15">
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
                  <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.1 3.1 6.8-6.8a1 1 0 011.4 0z" clipRule="evenodd" />
                </svg>
                Verified daily
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-brand/5 px-2.5 py-1 text-xs font-bold text-brand-dark ring-1 ring-brand/15">
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
                  <path d="M10 2a1 1 0 011 1v1.06a6 6 0 014.94 4.94H17a1 1 0 110 2h-1.06A6 6 0 0111 15.94V17a1 1 0 11-2 0v-1.06A6 6 0 014.06 11H3a1 1 0 110-2h1.06A6 6 0 019 4.06V3a1 1 0 011-1z" />
                </svg>
                Live prices
              </span>
              <span className="inline-flex items-center rounded-full bg-savings/10 px-2.5 py-1 text-xs font-bold text-savings-dark ring-1 ring-savings/20">
                {countLabel}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Evergreen SEO/GEO intro — answer-first, keyword-tuned, above the grid */}
      {seo && (
        <div className="mb-6 max-w-3xl space-y-3 text-[15px] leading-relaxed text-gray-700">
          {seo.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      )}

      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-ink-soft">
          {count > 0 ? `Showing ${countLabel}` : `${store.name} deals`}
        </p>
        <SortControl />
      </div>

      {count > 0 ? (
        <DealGrid deals={items} />
      ) : (
        <StoreEmptyState name={store.name} />
      )}

      <Pager basePath={`/stores/${store.slug}`} cursor={nextCursor} params={{ sort }} />
      {!cursor && (
        <CollectionSeo name={store.name} deals={items} variant="store" extraFaqs={seo?.faqs} />
      )}
    </div>
  );
}

// Zero-deal hubs are real pages (evergreen SEO copy + FAQ below), so the empty
// slot should route the visitor onward instead of dead-ending on a dashed box.
const POPULAR = [
  { slug: "amazon", name: "Amazon" },
  { slug: "flipkart", name: "Flipkart" },
  { slug: "myntra", name: "Myntra" },
  { slug: "jiomart", name: "JioMart" },
];
function StoreEmptyState({ name }: { name: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-10">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand/5 text-brand">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 2.3a1 1 0 00.7 1.7H17M17 17a2 2 0 100 4 2 2 0 000-4zM9 19a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
      <h2 className="mt-4 font-display text-lg font-bold text-ink">No {name} deals live right now</h2>
      <p className="mx-auto mt-1 max-w-md text-sm text-gray-500">
        We check {name} through the day — fresh markdowns land here as soon as they go live. Meanwhile, grab a verified deal from these:
      </p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        <Link
          href="/offers"
          className="inline-flex min-h-[44px] items-center rounded-lg bg-brand px-5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2"
        >
          Browse all live deals
        </Link>
        {POPULAR.filter((s) => s.name !== name).map((s) => (
          <Link
            key={s.slug}
            href={`/stores/${s.slug}`}
            className="inline-flex min-h-[44px] items-center rounded-lg border border-gray-200 bg-white px-4 text-sm font-semibold text-ink-soft transition-colors hover:border-brand/40 hover:text-brand"
          >
            {s.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
