import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { SITE_NAME, absUrl, breadcrumbSchema } from "@/lib/site";
import { OFFERS } from "@/lib/offers";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Money Offers — Credit Cards, Demat & Signup Bonuses",
  description: `Earn with the best signup offers in India — credit cards, demat accounts, savings accounts, loans and more, handpicked by ${SITE_NAME}.`,
  alternates: { canonical: absUrl("/offers") },
};

export default function OffersPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Offers", href: "/offers" },
  ];
  // Only show offers with a real affiliate link wired in.
  const live = OFFERS.filter((o) => o.live && o.url && o.url !== "#");

  return (
    <div>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Breadcrumbs items={crumbs} />
      <h1 className="mb-2 font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Money Offers</h1>
      <p className="mb-8 max-w-2xl text-[15px] leading-relaxed text-gray-600">
        Handpicked signup offers with real benefits — credit cards, demat &amp; savings accounts, loans and more.
        Sign up through {SITE_NAME} and get the perk.
      </p>

      {live.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-600">
          New offers landing soon. Check back shortly!
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {live.map((o) => (
            <a
              key={o.slug}
              href={o.url}
              target="_blank"
              rel="sponsored nofollow noopener"
              className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm ring-1 ring-transparent transition-all duration-200 hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              {/* Per-offer color as a slim accent bar — no text on it, so contrast is never an issue. */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${o.color}`} aria-hidden="true" />
              <div className="flex flex-1 flex-col p-5">
                <span className="inline-flex w-fit items-center rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-gray-600">
                  {o.category}
                </span>
                <div className="mt-3 font-display text-xl font-extrabold leading-snug text-ink">{o.hook}</div>
                <h2 className="mt-1 text-sm font-semibold text-gray-700 group-hover:text-brand">{o.name}</h2>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-gray-600">{o.blurb}</p>
                <span className="mt-5 inline-flex min-h-[46px] items-center justify-center gap-1.5 rounded-xl bg-brand px-5 text-sm font-bold text-white shadow-sm transition-colors group-hover:bg-brand-dark">
                  {o.cta}
                  <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      )}

      <p className="mt-8 text-xs text-gray-400">
        {SITE_NAME} may earn a referral commission on signups, at no extra cost to you.
      </p>
    </div>
  );
}
