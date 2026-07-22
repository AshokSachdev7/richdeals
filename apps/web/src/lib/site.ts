import type { DealDTO } from "@deals/shared";

// Central site constants + tiny pure helpers reused across pages/components.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "RichDeals";
export const SITE_TAGLINE = "Best Deals, Coupons & Freebies in India";

export function absUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function formatINR(n: number): string {
  return `₹${n.toLocaleString("en-IN")}`;
}

// JSON-LD helpers for listing pages (ItemList + BreadcrumbList).
export function itemListSchema(paths: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: paths.map((path, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absUrl(path),
    })),
  };
}

export function breadcrumbSchema(crumbs: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absUrl(c.href),
    })),
  };
}

// Prefer the API-provided discount; fall back to computing from MRP/price.
export function discountOf(deal: Pick<DealDTO, "discountPct" | "mrp" | "price">): number | null {
  if (deal.discountPct != null) return deal.discountPct;
  if (deal.mrp && deal.price && deal.mrp > deal.price) {
    return Math.round((1 - deal.price / deal.mrp) * 100);
  }
  return null;
}

// Human labels for category URL segments.
export const CATEGORY_TYPE_LABEL: Record<string, string> = {
  "shopping-category": "Category",
  "shopping-site": "Store",
};
