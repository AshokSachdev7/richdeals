import type { CategoryDTO, DealDTO, StoreDTO } from '@deals/shared';

// Prisma "Deal with relations" shape we map from. Kept loose on purpose so we
// don't depend on generated types at author time.
type DealWithRelations = {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  howTo: string[];
  image: string | null;
  mrp: number | null;
  price: number | null;
  discountPct: number | null;
  couponCode: string | null;
  couponNote: string | null;
  dealType: DealDTO['dealType'];
  status: DealDTO['status'];
  isSuper: boolean;
  isHot: boolean;
  expiresAt: Date | null;
  createdAt: Date;
  store: { id: number; name: string; slug: string; logo: string | null };
  categories: {
    category: { id: number; name: string; slug: string; type: CategoryDTO['type'] };
  }[];
  priceHistory: { price: number; postedAt: Date }[];
};

function apiBase(): string {
  return process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
}

export function toStoreDTO(store: DealWithRelations['store']): StoreDTO {
  return { id: store.id, name: store.name, slug: store.slug, logo: store.logo };
}

// affiliateUrl is intentionally never read here — web reaches it only via outUrl.
export function toDealDTO(deal: DealWithRelations): DealDTO {
  return {
    id: deal.id,
    slug: deal.slug,
    title: deal.title,
    description: deal.description,
    howTo: deal.howTo ?? [],
    image: deal.image,
    mrp: deal.mrp,
    price: deal.price,
    discountPct: deal.discountPct,
    couponCode: deal.couponCode,
    couponNote: deal.couponNote,
    dealType: deal.dealType,
    status: deal.status,
    isSuper: deal.isSuper,
    isHot: deal.isHot,
    store: toStoreDTO(deal.store),
    categories: deal.categories.map((c) => ({
      id: c.category.id,
      name: c.category.name,
      slug: c.category.slug,
      type: c.category.type,
    })),
    priceHistory: deal.priceHistory.map((p) => ({
      price: p.price,
      postedAt: p.postedAt.toISOString(),
    })),
    expiresAt: deal.expiresAt ? deal.expiresAt.toISOString() : null,
    createdAt: deal.createdAt.toISOString(),
    outUrl: `${apiBase()}/out/${deal.id}`,
  };
}

// Shared Prisma `include` so every query returns the mapper's expected shape.
export const dealInclude = {
  store: true,
  categories: { include: { category: true } },
  priceHistory: { orderBy: { postedAt: 'desc' as const } },
};
