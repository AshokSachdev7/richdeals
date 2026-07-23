import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_NAME, absUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `The terms governing your use of ${SITE_NAME} — a deals and coupons aggregator.`,
  alternates: { canonical: absUrl("/terms") },
};

export default function TermsPage() {
  return (
    <div>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Terms of Use", href: "/terms" }]} />
      <article className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-extrabold text-ink">Terms of Use</h1>
        <p className="mt-2 text-sm text-gray-500">Last updated: {new Date().getFullYear()}</p>

        <div className="mt-6 space-y-5 text-sm leading-relaxed text-gray-700">
          <p>By using {SITE_NAME} you agree to these terms. If you do not agree, please do not use the site.</p>

          <div>
            <h2 className="mb-1 font-display text-lg font-bold text-ink">Deals &amp; prices</h2>
            <p>
              {SITE_NAME} lists deals, discounts and coupons aggregated from third-party retailers. Prices,
              availability and offer terms change constantly and are set by the retailer, not by us. We show
              the price observed at the time of publishing and cannot guarantee it will be the same when you
              visit the store. Always confirm the final price and details on the retailer&rsquo;s page before buying.
            </p>
          </div>

          <div>
            <h2 className="mb-1 font-display text-lg font-bold text-ink">No warranty</h2>
            <p>
              The site is provided &ldquo;as is&rdquo;. We do not sell any products and are not responsible for
              purchases, delivery, warranty or after-sales service — those are solely between you and the retailer.
            </p>
          </div>

          <div>
            <h2 className="mb-1 font-display text-lg font-bold text-ink">Affiliate relationship</h2>
            <p>
              Outbound links may be affiliate links through which we may earn a commission. This never changes
              the price you pay. See our <a href="/disclosure" className="text-brand hover:underline">Affiliate Disclosure</a>.
            </p>
          </div>

          <div>
            <h2 className="mb-1 font-display text-lg font-bold text-ink">Intellectual property</h2>
            <p>
              Brand names, logos and trademarks belong to their respective owners and are used for
              identification only. Our original written content may not be copied without permission.
            </p>
          </div>

          <div>
            <h2 className="mb-1 font-display text-lg font-bold text-ink">Changes</h2>
            <p>We may update these terms at any time. Continued use of the site means you accept the current version.</p>
          </div>
        </div>
      </article>
    </div>
  );
}
