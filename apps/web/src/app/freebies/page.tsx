import type { Metadata } from "next";
import { getDeals } from "@/lib/api";
import DealGrid from "@/components/DealGrid";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_NAME, absUrl } from "@/lib/site";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Free Stuff & Freebies",
  description: `Free samples, free products and giveaway offers in India — grab them fast on ${SITE_NAME}.`,
  alternates: { canonical: absUrl("/freebies") },
};

export default async function FreebiesPage() {
  const { items } = await getDeals({ type: "FREEBIE", limit: 40 });
  return (
    <div>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Freebies", href: "/freebies" }]} />
      <h1 className="mb-1 text-2xl font-extrabold">Freebies & Free Stuff</h1>
      <p className="mb-5 text-sm text-gray-500">
        Free samples, giveaways and zero-cost offers — while stocks last.
      </p>
      <DealGrid deals={items} emptyMessage="No freebies live right now. Check back soon!" />
    </div>
  );
}
