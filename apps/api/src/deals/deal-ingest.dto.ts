import type { DealStatus } from '@deals/shared';

// Payload the ingest pipeline / admin sends to create or update a deal.
export interface IngestDealDto {
  slug: string;
  sourceSlug?: string | null;
  title: string;
  description?: string | null;
  howTo?: string[];
  image?: string | null;
  store: string; // store name or slug, e.g. "amazon"
  mrp?: number | null;
  price?: number | null;
  discountPct?: number | null;
  couponCode?: string | null;
  couponNote?: string | null;
  productId?: string | null;
  affiliateUrl: string;
  isSuper?: boolean;
  isHot?: boolean;
  status?: string; // "live" | "pending-review" | "draft" | "expired"
}

const STATUS_MAP: Record<string, DealStatus> = {
  live: 'LIVE',
  'pending-review': 'PENDING_REVIEW',
  draft: 'DRAFT',
  expired: 'EXPIRED',
};

export function mapStatus(s?: string): DealStatus {
  return (s ? STATUS_MAP[s.toLowerCase()] : undefined) ?? 'PENDING_REVIEW';
}

export function toStoreSlug(store: string): string {
  return store.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function titleCase(s: string): string {
  return s.replace(/(^|[\s-])(\w)/g, (_, p, c) => p + c.toUpperCase());
}
