// Shared DTOs — the contract between API (@deals/api) and web (@deals/web).
// Web never touches the DB; it only consumes these shapes over HTTP.

export type DealType = "DEAL" | "FREEBIE" | "COUPON" | "RECHARGE";
export type DealStatus = "DRAFT" | "PENDING_REVIEW" | "LIVE" | "EXPIRED";
export type CategoryType = "SHOPPING_CATEGORY" | "SHOPPING_SITE";

export interface StoreDTO {
  id: number;
  name: string;
  slug: string;
  logo: string | null;
}

export interface CategoryDTO {
  id: number;
  name: string;
  slug: string;
  type: CategoryType;
}

export interface DealDTO {
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
  dealType: DealType;
  status: DealStatus;
  isSuper: boolean;
  isHot: boolean;
  store: StoreDTO;
  categories: CategoryDTO[];
  priceHistory: { price: number; postedAt: string }[];
  expiresAt: string | null;
  createdAt: string;
  // NOTE: affiliateUrl is NOT exposed raw. Web links to /out/:id on the API,
  // which logs the click then 302s to the affiliate URL (rel=sponsored).
  outUrl: string; // e.g. `${API_URL}/out/${id}`
}

export interface Paginated<T> {
  items: T[];
  nextCursor: number | null;
  total: number;
}

export type DealFeed = "latest" | "hot" | "super";
