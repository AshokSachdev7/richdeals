import type {
  DealDTO,
  StoreDTO,
  CategoryDTO,
  Paginated,
  DealFeed,
  DealType,
} from "@deals/shared";

// Server-side only. The web app talks to the NestJS API over HTTP — never a DB.
const API = process.env.API_INTERNAL_URL || "http://localhost:4000";

const emptyPage = <T>(): Paginated<T> => ({ items: [], nextCursor: null, total: 0 });

// Single resilient GET: on ANY failure (unreachable API, non-2xx, bad JSON)
// return the safe fallback so pages render instead of crashing the build.
async function apiGet<T>(path: string, fallback: T, revalidate: number = 300): Promise<T> {
  try {
    const res = await fetch(`${API}${path}`, { next: { revalidate } });
    if (!res.ok) return fallback;
    return (await res.json()) as T;
  } catch {
    // ponytail: swallow everything — resilience is the whole point here.
    return fallback;
  }
}

export interface DealQuery {
  feed?: DealFeed;
  type?: DealType;
  store?: string; // store slug
  categoryType?: "shopping-category" | "shopping-site";
  category?: string; // category slug
  q?: string; // free-text search (powers the header search box / SearchAction)
  cursor?: number;
  limit?: number;
}

function qs(params: Record<string, string | number | undefined>): string {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== "") sp.set(k, String(v));
  }
  const s = sp.toString();
  return s ? `?${s}` : "";
}

export function getDeals(params: DealQuery = {}): Promise<Paginated<DealDTO>> {
  return apiGet(
    `/deals${qs({
      feed: params.feed,
      type: params.type,
      store: params.store,
      categoryType: params.categoryType,
      category: params.category,
      q: params.q,
      cursor: params.cursor,
      limit: params.limit,
    })}`,
    emptyPage<DealDTO>(),
  );
}

export function getDeal(slug: string): Promise<DealDTO | null> {
  return apiGet<DealDTO | null>(`/deals/${encodeURIComponent(slug)}`, null);
}

export function getStores(): Promise<StoreDTO[]> {
  return apiGet<StoreDTO[]>(`/stores`, []);
}

export async function getStore(slug: string): Promise<StoreDTO | null> {
  // API returns { store, deals }; unwrap the store so slug/name are correct.
  const res = await apiGet<{ store: StoreDTO } | null>(`/stores/${encodeURIComponent(slug)}`, null);
  return res?.store ?? null;
}

export async function getCategory(
  type: "shopping-category" | "shopping-site",
  slug: string,
): Promise<CategoryDTO | null> {
  // API returns { category, deals }; unwrap so slug/name are correct.
  const res = await apiGet<{ category: CategoryDTO } | null>(
    `/categories/${type}/${encodeURIComponent(slug)}`,
    null,
  );
  return res?.category ?? null;
}

export function getCategories(): Promise<CategoryDTO[]> {
  return apiGet<CategoryDTO[]>(`/categories`, []);
}

// ---- Blog ----------------------------------------------------------------
// No PostDTO in @deals/shared yet; keep a minimal local shape. Posts may be
// empty from the API for now — pages render a graceful empty state.
export interface PostDTO {
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  coverImage: string | null;
  author: string | null;
  publishedAt: string;
  updatedAt?: string;
}

export function getPosts(): Promise<Paginated<PostDTO>> {
  return apiGet(`/posts`, emptyPage<PostDTO>());
}

export function getPost(slug: string): Promise<PostDTO | null> {
  return apiGet<PostDTO | null>(`/posts/${encodeURIComponent(slug)}`, null);
}
