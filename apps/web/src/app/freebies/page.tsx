import type { Metadata } from "next";
import { getDeals } from "@/lib/api";
import DealGrid from "@/components/DealGrid";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import SortControl from "@/components/SortControl";
import Pager from "@/components/Pager";
import { SITE_NAME, absUrl, itemListSchema, breadcrumbSchema } from "@/lib/site";

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ sort?: string; cursor?: string }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  // Paged variants are crawl paths to older freebies, not index targets.
  const { cursor } = await searchParams;
  return {
    title: "Free Stuff & Freebies",
    description: `Free samples, free products and giveaway offers in India — grab them fast on ${SITE_NAME}.`,
    robots: cursor ? { index: false, follow: true } : undefined,
    alternates: { canonical: absUrl("/freebies") },
  };
}

export default async function FreebiesPage({ searchParams }: Props) {
  const { sort, cursor } = await searchParams;
  const { items, nextCursor } = await getDeals({
    type: "FREEBIE",
    sort,
    cursor: cursor ? Number(cursor) : undefined,
    limit: 40,
  });
  const crumbs = [{ name: "Home", href: "/" }, { name: "Freebies", href: "/freebies" }];
  return (
    <div>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={itemListSchema(items.map((d) => `/${d.slug}`))} />
      <Breadcrumbs items={crumbs} />
      <h1 className="mb-1 text-2xl font-extrabold">Freebies & Free Stuff</h1>
      <p className="mb-4 text-sm text-gray-500">
        Free samples, giveaways and zero-cost offers — while stocks last.
      </p>
      <div className="mb-5 flex justify-end">
        <SortControl />
      </div>
      <DealGrid deals={items} emptyMessage="No freebies live right now. Check back soon!" />
      <Pager basePath="/freebies" cursor={nextCursor} params={{ sort }} />
    </div>
  );
}
