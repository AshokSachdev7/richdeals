import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getStore, getDeals } from "@/lib/api";
import DealGrid from "@/components/DealGrid";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { SITE_NAME, absUrl } from "@/lib/site";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const store = await getStore(slug);
  if (!store) return { title: "Store not found" };
  const title = `${store.name} Deals, Offers & Coupons`;
  const description = `Latest ${store.name} deals, discount coupons and loot offers — verified and updated daily on ${SITE_NAME}.`;
  return {
    title,
    description,
    alternates: { canonical: absUrl(`/stores/${store.slug}`) },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      type: "website",
      images: store.logo ? [{ url: store.logo }] : undefined,
    },
  };
}

export default async function StorePage({ params }: Props) {
  const { slug } = await params;
  const store = await getStore(slug);
  if (!store) notFound();

  const { items } = await getDeals({ store: store.slug, limit: 40 });

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Stores", href: "/stores" },
    { name: store.name, href: `/stores/${store.slug}` },
  ];

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${store.name} deals`,
    itemListElement: items.map((d, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absUrl(`/${d.slug}`),
      name: d.title,
    })),
  };

  return (
    <div>
      <JsonLd data={itemListSchema} />
      <Breadcrumbs items={crumbs} />
      <div className="mb-5 flex items-center gap-3">
        {store.logo && (
          <Image src={store.logo} alt={store.name} width={48} height={48} className="h-12 w-12 rounded object-contain" />
        )}
        <div>
          <h1 className="text-2xl font-extrabold">{store.name} Deals</h1>
          <p className="text-sm text-gray-500">
            All live {store.name} offers and coupon codes, refreshed daily.
          </p>
        </div>
      </div>
      <DealGrid deals={items} emptyMessage={`No ${store.name} deals live right now. Check back soon!`} />
    </div>
  );
}
