import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getDeal, getDeals } from "@/lib/api";
import DealGrid from "@/components/DealGrid";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import CopyCode from "@/components/CopyCode";
import { SITE_NAME, absUrl, formatINR, discountOf } from "@/lib/site";

export const revalidate = 300;

type Props = { params: Promise<{ dealSlug: string }> };

const STORE_LOGOS: Record<string, string> = {
  amazon: "/stores/amazon.svg",
  flipkart: "/stores/flipkart.svg",
};

function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const diff = Date.now() - then;
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const mins = Math.round(diff / 60000);
  if (Math.abs(mins) < 60) return rtf.format(-mins, "minute");
  const hours = Math.round(mins / 60);
  if (Math.abs(hours) < 24) return rtf.format(-hours, "hour");
  const days = Math.round(hours / 24);
  if (Math.abs(days) < 30) return rtf.format(-days, "day");
  const months = Math.round(days / 30);
  if (Math.abs(months) < 12) return rtf.format(-months, "month");
  return rtf.format(-Math.round(months / 12), "year");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { dealSlug } = await params;
  const deal = await getDeal(dealSlug);
  if (!deal) return { title: "Deal not found" };

  const discount = discountOf(deal);
  const priceBit = deal.price != null ? ` @ ${formatINR(deal.price)}` : "";
  const description =
    deal.description?.slice(0, 160) ||
    `${deal.title}${priceBit}${discount != null ? ` — ${discount}% off` : ""} at ${deal.store.name}. Grab this ${deal.dealType.toLowerCase()} on ${SITE_NAME}.`;
  const canonical = absUrl(`/${deal.slug}`);

  return {
    title: deal.title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title: `${deal.title} | ${SITE_NAME}`,
      description,
      images: deal.image ? [{ url: deal.image, alt: deal.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: deal.title,
      description,
      images: deal.image ? [deal.image] : undefined,
    },
  };
}

// Trust signals shown in the buy box — static, honest microcopy (no fake numbers).
const TRUST: { label: string; sub: string; icon: React.ReactNode }[] = [
  {
    label: "Verified deal",
    sub: "Checked for a real, working price",
    icon: <path d="M9 12.5l2 2 4-4.5M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />,
  },
  {
    label: "Live price",
    sub: "Pulled straight from the store",
    icon: <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />,
  },
  {
    label: "Secure checkout",
    sub: "You pay on the store, not here",
    icon: <path d="M6 10V7a6 6 0 1112 0v3M5 10h14v10H5z" />,
  },
];

export default async function DealPage({ params }: Props) {
  const { dealSlug } = await params;
  const deal = await getDeal(dealSlug);
  if (!deal) notFound();

  const discount = discountOf(deal);
  const expired = deal.status === "EXPIRED";
  const canonical = absUrl(`/${deal.slug}`);

  const related = (await getDeals({ store: deal.store.slug, limit: 12 })).items.filter(
    (d) => d.id !== deal.id,
  );

  const crumbs = [
    { name: "Home", href: "/" },
    { name: deal.store.name, href: `/stores/${deal.store.slug}` },
    { name: deal.title, href: `/${deal.slug}` },
  ];

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: deal.title,
    image: deal.image ? [deal.image] : undefined,
    description: deal.description || deal.title,
    brand: { "@type": "Brand", name: deal.store.name },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: deal.price ?? deal.mrp ?? undefined,
      availability: expired
        ? "https://schema.org/Discontinued"
        : "https://schema.org/InStock",
      url: canonical,
      seller: { "@type": "Organization", name: deal.store.name },
    },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absUrl(c.href),
    })),
  };

  const storeLogo = STORE_LOGOS[deal.store.slug.toLowerCase()];
  const hasStrike = deal.mrp != null && deal.price != null && deal.mrp > deal.price;
  const saveAmount = hasStrike ? deal.mrp! - deal.price! : null;
  const postedIso = deal.priceHistory[0]?.postedAt ?? deal.createdAt;

  const StoreChip = (
    <Link
      href={`/stores/${deal.store.slug}`}
      className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-700 transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
    >
      {storeLogo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={storeLogo} alt="" className="h-3.5 w-auto object-contain" />
      ) : null}
      {deal.store.name}
    </Link>
  );

  return (
    <article>
      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumbSchema} />
      <Breadcrumbs items={crumbs} />

      {/* Title band */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {StoreChip}
        {deal.isSuper && !expired && (
          <span className="inline-flex items-center gap-1 rounded-full bg-savings px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-ink">
            ★ Super Deal
          </span>
        )}
        {!deal.isSuper && deal.isHot && !expired && (
          <span className="rounded-full bg-orange-500 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
            Hot
          </span>
        )}
        {expired && (
          <span className="rounded-full bg-gray-700 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
            Expired
          </span>
        )}
      </div>
      <h1 className="mt-2 max-w-4xl font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
        {deal.title}
      </h1>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10">
        {/* LEFT — sticky product image */}
        <div>
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200/80 sm:p-10 lg:sticky lg:top-6">
            {deal.image ? (
              <Image
                src={deal.image}
                alt={deal.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-contain"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-gray-300">
                No image
              </div>
            )}
            <span className="absolute left-4 top-4 inline-flex items-center rounded-lg bg-white/95 px-2.5 py-1.5 shadow-sm ring-1 ring-black/5 backdrop-blur">
              {storeLogo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={storeLogo} alt={deal.store.name} className="h-4 w-auto object-contain" />
              ) : (
                <span className="text-xs font-semibold text-gray-700">{deal.store.name}</span>
              )}
            </span>
            {discount != null && !expired && (
              <span className="absolute right-0 top-4 inline-flex items-center gap-1 rounded-l-lg bg-brand px-3 py-1.5 text-sm font-extrabold text-white shadow-md">
                <svg viewBox="0 0 12 12" className="h-3.5 w-3.5" aria-hidden="true" fill="currentColor">
                  <path d="M6 9.5 2.5 5.2l1.1-.9L5.3 6.4V2h1.4v4.4l1.7-2.1 1.1.9z" />
                </svg>
                {discount}% OFF
              </span>
            )}
            {expired && (
              <div className="absolute inset-x-0 bottom-0 bg-ink/85 px-4 py-2.5 text-center text-sm font-semibold text-white backdrop-blur-sm">
                This deal has expired — price may no longer be available.
              </div>
            )}
          </div>
        </div>

        {/* RIGHT — buy box */}
        <div className="flex flex-col gap-4">
          {/* Price card with savings header */}
          <div className="overflow-hidden rounded-2xl shadow-sm ring-1 ring-gray-200/80">
            {saveAmount != null && (
              <div className="flex items-center justify-between gap-2 bg-gradient-to-r from-green-600 to-green-500 px-5 py-2 text-white">
                <span className="text-sm font-bold">You save {formatINR(saveAmount)}</span>
                {discount != null && (
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-extrabold tabular-nums">
                    {discount}% OFF
                  </span>
                )}
              </div>
            )}
            <div className="bg-white p-5">
              {deal.price != null ? (
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-display text-4xl font-extrabold tabular-nums text-ink">
                    {formatINR(deal.price)}
                  </span>
                  {hasStrike && (
                    <span className="text-lg text-gray-400 line-through tabular-nums">
                      {formatINR(deal.mrp!)}
                    </span>
                  )}
                </div>
              ) : deal.mrp != null ? (
                <span className="font-display text-3xl font-extrabold tabular-nums text-ink">
                  {formatINR(deal.mrp)}
                </span>
              ) : (
                <span className="text-lg font-semibold text-gray-500">See price on {deal.store.name}</span>
              )}
              <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-medium text-gray-500">
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-brand" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M8 2v3M8 11v3M2 8h3M11 8h3" strokeLinecap="round" />
                </svg>
                Live price on {deal.store.name} — grab it before it changes
              </p>

              {/* Coupon */}
              {deal.couponCode ? (
                <div className="mt-4">
                  <CopyCode code={deal.couponCode} note={deal.couponNote} />
                </div>
              ) : deal.couponNote ? (
                <p className="mt-4 rounded-xl bg-gray-50 px-3 py-2 text-sm text-gray-600 ring-1 ring-gray-200">
                  {deal.couponNote}
                </p>
              ) : null}

              {/* CTA */}
              <a
                href={deal.outUrl}
                target="_blank"
                rel="sponsored nofollow noopener"
                className="mt-4 inline-flex min-h-[54px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand px-6 text-lg font-bold text-white shadow-md shadow-brand/25 transition-all hover:bg-brand-dark active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2"
              >
                Shop Now on {deal.store.name}
                <svg viewBox="0 0 16 16" className="h-5 w-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <p className="mt-2 text-center text-xs text-gray-400">
                Affiliate link • {SITE_NAME} may earn a commission
              </p>
            </div>
          </div>

          {/* Trust rows */}
          <ul className="grid gap-2 rounded-2xl bg-gray-50 p-4 ring-1 ring-gray-200/80">
            {TRUST.map((t) => (
              <li key={t.label} className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-brand shadow-sm ring-1 ring-gray-200">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {t.icon}
                  </svg>
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-bold text-ink">{t.label}</span>
                  <span className="block text-xs text-gray-500">{t.sub}</span>
                </span>
              </li>
            ))}
          </ul>

          {/* How to grab — compact, fills the column */}
          {deal.howTo.length > 0 && (
            <div className="rounded-2xl bg-white p-5 ring-1 ring-gray-200/80">
              <h2 className="font-display text-base font-bold text-ink">How to grab this deal</h2>
              <ol className="mt-3 space-y-2.5">
                {deal.howTo.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs font-bold tabular-nums text-brand-dark">
                      {i + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-gray-700">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-1 text-xs text-gray-500">
            {postedIso && (
              <span className="inline-flex items-center gap-1.5">
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-gray-400" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <circle cx="8" cy="8" r="6" />
                  <path d="M8 5v3l2 1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Updated {relativeTime(postedIso)}
              </span>
            )}
            {deal.categories.map((c) => (
              <Link
                key={c.id}
                href={`/category/${c.type === "SHOPPING_SITE" ? "shopping-site" : "shopping-category"}/${c.slug}`}
                className="rounded-full bg-gray-100 px-2.5 py-0.5 font-medium text-gray-600 transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Description */}
      {deal.description && (
        <section className="mt-12">
          <h2 className="font-display text-xl font-bold text-ink">About this deal</h2>
          <p className="mt-3 max-w-2xl whitespace-pre-line text-[15px] leading-relaxed text-gray-700">
            {deal.description}
          </p>
        </section>
      )}

      {/* Price history — only meaningful with more than one point */}
      {deal.priceHistory.length > 1 && (
        <section className="mt-12">
          <h2 className="font-display text-xl font-bold text-ink">Price history</h2>
          <ol className="mt-4 max-w-md">
            {deal.priceHistory.map((p, i) => (
              <li key={i} className="flex items-center gap-3 border-b border-gray-100 py-2.5 last:border-0">
                <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${i === 0 ? "bg-brand" : "bg-gray-300"}`} aria-hidden="true" />
                <span className="text-sm text-gray-500">
                  {new Date(p.postedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </span>
                <span className="ml-auto text-sm font-bold tabular-nums text-ink">{formatINR(p.price)}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-4 font-display text-xl font-bold text-ink">
            More deals from {deal.store.name}
          </h2>
          <DealGrid deals={related} />
        </section>
      )}
    </article>
  );
}
