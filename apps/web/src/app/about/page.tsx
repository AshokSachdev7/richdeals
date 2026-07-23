import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_NAME, SITE_TAGLINE, absUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `${SITE_NAME} — ${SITE_TAGLINE}. How we find and verify the best deals in India.`,
  alternates: { canonical: absUrl("/about") },
};

export default function AboutPage() {
  return (
    <div>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About", href: "/about" }]} />
      <article className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-extrabold text-ink">About {SITE_NAME}</h1>
        <div className="mt-6 space-y-5 text-sm leading-relaxed text-gray-700">
          <p>
            {SITE_NAME} is an Indian deals, coupons and freebies destination. We track offers across Amazon,
            Flipkart and 100+ stores, verify the price is genuinely live, and publish the ones worth your time —
            with clear pricing and no clickbait.
          </p>
          <div>
            <h2 className="mb-1 font-display text-lg font-bold text-ink">What we do</h2>
            <ul className="list-inside list-disc space-y-1">
              <li>Surface real, working discounts — updated throughout the day.</li>
              <li>Check the advertised price against the live retailer price before publishing.</li>
              <li>Write our own descriptions so you know exactly what the deal is.</li>
              <li>Keep pages live even after a deal expires, marked clearly.</li>
            </ul>
          </div>
          <div>
            <h2 className="mb-1 font-display text-lg font-bold text-ink">How we stay free</h2>
            <p>
              Some outbound links are affiliate links that earn us a small commission at no extra cost to you.
              Read our <a href="/disclosure" className="text-brand hover:underline">Affiliate Disclosure</a> for details.
            </p>
          </div>
          <div>
            <h2 className="mb-1 font-display text-lg font-bold text-ink">Stay updated</h2>
            <p>Follow our Telegram channel (linked in the footer) for the freshest drops.</p>
          </div>
        </div>
      </article>
    </div>
  );
}
