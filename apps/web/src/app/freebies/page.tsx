import type { Metadata } from "next";
import { getDeals } from "@/lib/api";
import DealGrid from "@/components/DealGrid";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import SortControl from "@/components/SortControl";
import Pager from "@/components/Pager";
import { HubBullets, HubFaq, newestUpdated } from "@/components/HubExplainer";
import { SITE_NAME, absUrl, itemListSchema, breadcrumbSchema } from "@/lib/site";

const BULLETS = [
  { label: "What's here", text: "live free samples, giveaways and near-free deals from Indian stores and brands, each listed with the price we verified when it was added." },
  { label: "How to claim", text: "open a listing, then complete the form or place the order on the store's own page — nothing is claimed on this site." },
  { label: "Stock", text: "sample campaigns close fast; expired listings stay online with an EXPIRED label instead of being deleted, so a bookmark never 404s." },
];

const FAQ = [
  { q: "Are the freebies on this page really free?", a: "Some are true zero-cost samples or giveaways; others are near-free deals where the figure shown is what the store charged when we checked. The price on this page is the price verified at listing time — confirm it on the store page before you order." },
  { q: "How often is this page updated?", a: "New freebies are added through the day as they are found and verified. The date above the list is when the newest listing on this page was added." },
  { q: "Why has a freebie stopped working?", a: "Free-sample stock runs out quickly and brands close campaigns without notice. Expired listings keep their page with an EXPIRED label rather than disappearing." },
  { q: "Where can I learn how free sampling works in India?", a: "Our guide to getting free samples in India covers the main sampling programs and the scam checks worth running before you hand over an address." },
];

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ sort?: string; cursor?: string }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  // Paged variants are crawl paths to older freebies, not index targets.
  const { cursor } = await searchParams;
  return {
    title: "Free Samples & Freebies in India Today",
    description: `Free samples, freebies and free stuff in India, updated today — live giveaways and near-free deals from top brands on ${SITE_NAME}. Grab them before they run out.`,
    robots: cursor ? { index: false, follow: true } : { index: true, follow: true },
    alternates: { canonical: absUrl("/freebies") },
    openGraph: { title: "Free Samples & Freebies in India Today", description: `Free samples, freebies and free stuff in India, updated today on ${SITE_NAME}.`, url: absUrl("/freebies"), type: "website", images: [{ url: absUrl("/og.png"), width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: "Free Samples & Freebies in India Today" },
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
      <HubBullets bullets={BULLETS} updated={newestUpdated(items)} />
      <div className="mb-5 flex justify-end">
        <SortControl />
      </div>
      <DealGrid deals={items} emptyMessage="No freebies live right now. Check back soon!" />
      <Pager basePath="/freebies" cursor={nextCursor} params={{ sort }} />
      <HubFaq faq={FAQ} />
    </div>
  );
}
