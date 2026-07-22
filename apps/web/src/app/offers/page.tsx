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
      <h1 className="mb-1 font-display text-2xl font-extrabold text-ink sm:text-3xl">💰 Money Offers</h1>
      <p className="mb-7 max-w-2xl text-sm text-gray-500">
        Handpicked signup offers with real rewards — credit cards, demat & savings accounts, loans and more.
        Sign up through {SITE_NAME} and grab the bonus.
      </p>

      {live.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
          New high-reward offers landing soon. Check back shortly!
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {live.map((o) => (
            <a
              key={o.slug}
              href={o.url}
              target="_blank"
              rel="sponsored nofollow noopener"
              className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className={`bg-gradient-to-br ${o.color} px-5 py-6 text-white`}>
                <span className="text-xs font-bold uppercase tracking-wide text-white/80">{o.category}</span>
                <div className="mt-1 font-display text-xl font-extrabold">{o.payout}</div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h2 className="font-display text-base font-bold text-ink group-hover:text-brand">{o.name}</h2>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-gray-500">{o.blurb}</p>
                <span className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-brand px-5 text-sm font-bold text-white shadow-sm transition-colors group-hover:bg-brand-dark">
                  {o.cta}
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
