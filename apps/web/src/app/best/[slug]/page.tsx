import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDeals } from "@/lib/api";
import DealGrid from "@/components/DealGrid";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { HubBullets, HubFaq, newestUpdated } from "@/components/HubExplainer";
import { BEST_TOPICS, bestTopic } from "@/lib/best";
import { SITE_NAME, absUrl, breadcrumbSchema, dealItemListSchema, dealProductName, formatINR } from "@/lib/site";

export const revalidate = 1800;
export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BEST_TOPICS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = bestTopic((await params).slug);
  if (!t) return {};
  const url = absUrl(`/best/${t.slug}`);
  return {
    title: t.title,
    description: t.desc,
    alternates: { canonical: url },
    openGraph: { siteName: SITE_NAME, locale: "en_IN", title: t.h1, description: t.desc, url, type: "website", images: [{ url: absUrl("/og.png"), width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: t.h1 },
  };
}

export default async function BestPage({ params }: Props) {
  const t = bestTopic((await params).slug);
  if (!t) notFound();

  // API q= is a loose OR over several fields; the title regex keeps the page on-topic.
  const { items } = await getDeals({ q: t.q, maxPrice: t.maxPrice, sort: "price-asc", limit: 60 });
  const deals = items.filter((d) => t.include.test(d.title) && !t.exclude?.test(d.title)).slice(0, 30);
  const priced = deals.filter((d) => d.price != null && d.price > 0);
  const cheapest = priced[0];
  const top = priced[priced.length - 1];

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Offers", href: "/offers" },
    { name: t.h1, href: `/best/${t.slug}` },
  ];

  return (
    <div>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={dealItemListSchema(deals, t.h1)} />
      <Breadcrumbs items={crumbs} />
      <h1 className="mb-1 text-2xl font-extrabold">{t.h1}</h1>
      {/* Answer-first summary, computed from live rows so AI engines can quote it verbatim. */}
      <p className="mb-4 max-w-2xl text-sm leading-relaxed text-gray-600">
        {cheapest ? (
          <>
            {priced.length} {t.noun} are on sale right now
            {priced.length > 1 && <>, priced from {formatINR(cheapest.price!)} to {formatINR(top.price!)}</>}. The
            cheapest is the{" "}
            <a href={`/${cheapest.slug}`} className="text-brand underline">
              {dealProductName(cheapest)}
            </a>{" "}
            at {formatINR(cheapest.price!)}. Every price was checked on the store page when the deal was listed; confirm
            it before you order.
          </>
        ) : (
          <>No {t.noun} deals are live right now. New deals are added through the day, so check back soon.</>
        )}
      </p>
      <HubBullets bullets={t.bullets} updated={newestUpdated(deals)} />
      <DealGrid deals={deals} emptyMessage={`No ${t.noun} deals live right now. Check back soon!`} />
      <HubFaq faq={t.faq} />
      <p className="mt-6 text-sm text-gray-600">
        More ways to save:{" "}
        {BEST_TOPICS.filter((o) => o.slug !== t.slug).map((o, i) => (
          <span key={o.slug}>
            {i > 0 && " · "}
            <a href={`/best/${o.slug}`} className="text-brand underline">{o.h1.split(" – ")[0]}</a>
          </span>
        ))}
      </p>
    </div>
  );
}
