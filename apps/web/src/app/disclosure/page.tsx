import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_NAME, absUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: `${SITE_NAME} earns affiliate commissions on some outbound links. Here's how that works.`,
  alternates: { canonical: absUrl("/disclosure") },
};

export default function DisclosurePage() {
  return (
    <div>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Affiliate Disclosure", href: "/disclosure" }]} />
      <article className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-extrabold text-ink">Affiliate Disclosure</h1>
        <div className="mt-6 space-y-5 text-sm leading-relaxed text-gray-700">
          <p>
            {SITE_NAME} is a free deals and coupons website. To keep it free, we participate in affiliate
            programs run by retailers such as Amazon, Flipkart and others, and via affiliate networks.
          </p>
          <p>
            When you click a &ldquo;Grab Deal&rdquo; button and buy something, we may earn a small commission
            from the retailer. <strong>This costs you nothing extra</strong> — you pay the same price you would
            have paid otherwise.
          </p>
          <p>
            Commissions help us cover hosting and the work of finding, verifying and writing up genuine deals.
            They never influence the price you see, and we aim to list only real, working discounts. A deal
            being an affiliate link does not mean it is a better or worse offer than any other.
          </p>
          <p>
            All product names, logos and brands are the property of their respective owners and are used for
            identification purposes only.
          </p>
        </div>
      </article>
    </div>
  );
}
