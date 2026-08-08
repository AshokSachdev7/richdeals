import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
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
  const seo = storeSeo(store.slug);
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
  const seo = storeSeo(store.slug);

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

  return (
    <div>
      <JsonLd data={itemListSchema} />
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Breadcrumbs items={crumbs} />
      <div className="mb-5 flex items-center gap-3">
        {store.logo ? (
          <Image src={store.logo} alt={store.name} width={48} height={48} className="h-12 w-12 rounded object-contain" />
        ) : seo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={faviconUrl(seo.domain)}
            alt={`${store.name} logo`}
            width={48}
            height={48}
            className="h-12 w-12 rounded border border-gray-100 object-contain p-1"
          />
        ) : null}
        <div>
          <h1 className="text-2xl font-extrabold">{store.name} Deals</h1>
          <p className="text-sm text-gray-500">
            All live {store.name} offers and coupon codes, refreshed daily.
          </p>
        </div>
      </div>
      {/* Evergreen SEO/GEO intro — answer-first, keyword-tuned, above the grid */}
      {seo && (
        <div className="mb-6 max-w-3xl space-y-3 text-[15px] leading-relaxed text-gray-700">
          {seo.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      )}
      <div className="mb-5 flex justify-end">
        <SortControl />
      </div>
      <DealGrid deals={items} emptyMessage={`No ${store.name} deals live right now. Check back soon!`} />
      <Pager basePath={`/stores/${store.slug}`} cursor={nextCursor} params={{ sort }} />
      {!cursor && (
        <CollectionSeo name={store.name} deals={items} variant="store" extraFaqs={seo?.faqs} />
      )}
    </div>
  );
}
