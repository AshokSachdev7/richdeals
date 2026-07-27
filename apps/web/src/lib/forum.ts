// Server-side only. Same shape as lib/api.ts: never throw, always render.
const API = process.env.API_INTERNAL_URL || "http://localhost:4000";

export type ForumTab = "hot" | "new" | "top" | "unanswered";

export interface ForumCard {
  id: number;
  slug: string;
  title: string;
  image: string | null;
  price: number | null;
  mrp: number | null;
  discountPct: number | null;
  couponCode: string | null;
  score: number;
  commentCount: number;
  createdAt: string;
  expiresAt: string | null;
  status: string;
  store: { name: string; slug: string } | null;
  postedBy: string;
  isMemberPost: boolean;
  workingCount: number;
  expiredCount: number;
}

export interface ForumMember {
  id: number;
  name: string | null;
  karma: number;
}

async function get<T>(path: string, fallback: T, revalidate = 60): Promise<T> {
  try {
    const res = await fetch(`${API}${path}`, { next: { revalidate } });
    if (!res.ok) return fallback;
    return (await res.json()) as T;
  } catch {
    return fallback;
  }
}

export function getForumFeed(tab: ForumTab, page = 1) {
  return get<{ items: ForumCard[]; page: number; tab: ForumTab }>(
    `/forum?tab=${tab}&page=${page}`,
    { items: [], page, tab },
    // Hot/new churn every few minutes; anything staler than that looks dead.
    60,
  );
}

export function getLeaderboard() {
  return get<ForumMember[]>("/forum/leaderboard", [], 300);
}
