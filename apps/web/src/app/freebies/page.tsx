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
    title: "Free Samples & Freebies in India — Free Stuff Today",
    description: `Free samples, freebies and free stuff in India, updated today — live giveaways and near-free deals from top brands on ${SITE_NAME}. Grab them fast before stock runs out.`,
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
      <h1 className="mb-1 text-2xl font-extrabold">Free Samples &amp; Freebies in India</h1>
      <p className="mb-4 max-w-2xl text-sm leading-relaxed text-gray-600">
        The best place to get free stuff in India today: live free samples, brand giveaways and near-free deals,
        all verified and refreshed daily. New freebies drop through the day and sell out fast — grab them while
        stocks last. For sampling programs and the scam checks, read our{" "}
        <a href="/blog/how-to-get-free-samples-freebies-india" className="text-brand underline">
          guide to getting free samples in India
        </a>.
      </p>
      <div className="mb-5 flex justify-end">
        <SortControl />
      </div>
      <DealGrid deals={items} emptyMessage="No freebies live right now. Check back soon!" />
      <Pager basePath="/freebies" cursor={nextCursor} params={{ sort }} />
    </div>
  );
}
