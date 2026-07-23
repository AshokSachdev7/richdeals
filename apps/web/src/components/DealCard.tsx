import Link from "next/link";
import type { DealDTO } from "@deals/shared";
import { formatINR, discountOf } from "@/lib/site";
import ProductImage from "./ProductImage";

const STORE_LOGOS: Record<string, string> = {
  amazon: "/stores/amazon.svg",
  flipkart: "/stores/flipkart.png",
  myntra: "/stores/myntra.png",
  ajio: "/stores/ajio.png",
  nykaa: "/stores/nykaa.png",
  tatacliq: "/stores/tatacliq.png",
  jiomart: "/stores/jiomart.png",
  croma: "/stores/croma.png",
  snapdeal: "/stores/snapdeal.png",
  pedigree: "/stores/pedigree.png",
  testbook: "/stores/testbook.png",
  meesho: "/stores/meesho.svg",
  firstcry: "/stores/firstcry.svg",
};

export default function DealCard({ deal }: { deal: DealDTO }) {
  const discount = discountOf(deal);
  const save = deal.mrp != null && deal.price != null && deal.mrp > deal.price ? deal.mrp - deal.price : null;
  const expired = deal.status === "EXPIRED";
  const logo = STORE_LOGOS[deal.store.slug.toLowerCase()];

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl hover:shadow-gray-200/60">
      <Link
        href={`/${deal.slug}`}
        className="relative block aspect-square overflow-hidden bg-gray-50/70"
        aria-label={deal.title}
      >
        {deal.image ? (
          <ProductImage
            src={deal.image}
            alt={deal.title}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 240px"
            className="object-contain p-4 group-hover:scale-[1.06]"
          />
        ) : logo ? (
          // no product image (category/loot offer) → show store logo
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logo} alt={deal.store.name} className="h-full w-full object-contain p-10 opacity-90" loading="lazy" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm font-semibold text-gray-400">{deal.store.name}</div>
        )}

        {/* discount hook — top-left, bold */}
        {discount != null && (
          <span className="absolute left-0 top-3 inline-flex items-center gap-0.5 rounded-r-md bg-brand px-2 py-1 text-xs font-extrabold text-white shadow-sm">
            <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true" fill="currentColor">
              <path d="M6 9.5 2.5 5.2l1.1-.9L5.3 6.4V2h1.4v4.4l1.7-2.1 1.1.9z" />
            </svg>
            <span className="tabular-nums">{discount}% OFF</span>
          </span>
        )}

        {/* store logo — small, subtle */}
        <span className="absolute right-2.5 top-2.5 inline-flex h-6 items-center rounded-md bg-white/95 px-1.5 shadow-sm ring-1 ring-black/5">
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo} alt={deal.store.name} className="h-3 w-auto object-contain" loading="lazy" />
          ) : (
            <span className="text-[10px] font-bold text-gray-600">{deal.store.name}</span>
          )}
        </span>

        {deal.isSuper && !expired && (
          <span className="absolute bottom-2.5 left-2.5 rounded-md bg-savings px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-ink shadow-sm">
            ★ Super Deal
          </span>
        )}

        {expired && (
          <span className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[1px]">
            <span className="rounded-md bg-gray-800 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">Expired</span>
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-3">
        <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-medium leading-snug text-gray-800">
          <Link href={`/${deal.slug}`} className="transition-colors hover:text-brand">
            {deal.title}
          </Link>
        </h3>

        {/* Price row: bold price + struck MRP + inline green save pill.
            nowrap keeps it one line so card heights stay consistent. */}
        <div className="mt-2 flex items-center gap-x-2 overflow-hidden">
          {deal.price != null && (
            <span className="font-display text-xl font-extrabold tabular-nums text-ink">{formatINR(deal.price)}</span>
          )}
          {deal.mrp != null && deal.price != null && deal.mrp > deal.price && (
            <span className="truncate text-sm text-gray-400 line-through tabular-nums">{formatINR(deal.mrp)}</span>
          )}
          {save != null && (
            <span className="shrink-0 rounded-md bg-savings/15 px-1.5 py-0.5 text-[11px] font-bold tabular-nums text-savings-dark">
              ↓ {formatINR(save)}
            </span>
          )}
        </div>

        {/* Coupon (optional, one line) */}
        {deal.couponCode ? (
          <div className="mt-2 flex items-center gap-1.5 rounded-lg border border-dashed border-brand/50 bg-brand/5 px-2 py-1 text-xs text-brand-dark">
            <span className="text-gray-500">Code</span>
            <span className="font-mono font-bold tracking-wider">{deal.couponCode}</span>
          </div>
        ) : deal.couponNote ? (
          <p className="mt-1.5 line-clamp-1 text-xs font-medium text-green-700">
            🏷 {deal.couponNote}
          </p>
        ) : null}

        {/* Footer pinned to bottom: divider + trust meta anchors the CTA so the
            equal-height gap reads as a designed footer, not empty space. */}
        <div className="mt-auto pt-3">
          <div className="mb-2 flex items-center justify-between border-t border-gray-100 pt-2 text-[11px] text-gray-400">
            <span className="truncate">on {deal.store.name}</span>
            <span className="inline-flex shrink-0 items-center gap-0.5 font-semibold text-green-600">
              <svg viewBox="0 0 20 20" className="h-3 w-3" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.1 3.1 6.8-6.8a1 1 0 011.4 0z" clipRule="evenodd" />
              </svg>
              Verified
            </span>
          </div>
          <a
            href={deal.outUrl}
            target="_blank"
            rel="sponsored nofollow noopener"
            aria-label={`Shop ${deal.title} on ${deal.store.name}`}
            className="flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-lg bg-brand px-4 text-sm font-bold text-white shadow-sm transition-all hover:bg-brand-dark active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2"
          >
            Grab Deal
            <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}
