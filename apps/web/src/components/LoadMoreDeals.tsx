"use client";

import { useState } from "react";
import type { DealDTO, DealFeed, Paginated } from "@deals/shared";
import DealCard from "./DealCard";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
const LIMIT = 30;

function skeletonKeys(n: number) {
  return Array.from({ length: n }, (_, i) => i);
}

export default function LoadMoreDeals({
  initialItems,
  initialCursor,
  feed,
  q,
}: {
  initialItems: DealDTO[];
  initialCursor: number | null;
  feed?: DealFeed;
  q?: string;
}) {
  const [items, setItems] = useState<DealDTO[]>(initialItems);
  const [cursor, setCursor] = useState<number | null>(initialCursor);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function loadMore() {
    if (loading || cursor == null) return; // no double-fetch
    setLoading(true);
    setError(false);
    try {
      const sp = new URLSearchParams();
      if (feed) sp.set("feed", feed);
      if (q) sp.set("q", q);
      sp.set("cursor", String(cursor));
      sp.set("limit", String(LIMIT));
      const res = await fetch(`${API}/deals?${sp.toString()}`);
      if (!res.ok) throw new Error(String(res.status));
      const page = (await res.json()) as Paginated<DealDTO>;
      setItems((prev) => [...prev, ...page.items]);
      setCursor(page.nextCursor);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  if (!items.length && !loading) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
        No deals found right now. Check back soon!
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {items.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
        {loading &&
          skeletonKeys(10).map((k) => (
            <div
              key={`sk-${k}`}
              className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
              aria-hidden="true"
            >
              <div className="aspect-square bg-gray-100" />
              <div className="space-y-2 p-3">
                <div className="h-3 w-3/4 rounded bg-gray-100" />
                <div className="h-3 w-1/2 rounded bg-gray-100" />
                <div className="h-9 rounded-xl bg-gray-100" />
              </div>
              {/* shimmer sweep (respects prefers-reduced-motion via globals.css) */}
              <div className="pointer-events-none absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            </div>
          ))}
      </div>

      <div className="mt-8 flex flex-col items-center gap-3">
        {error && (
          <p className="text-sm font-medium text-brand" role="alert">
            Couldn&apos;t load more deals. Please try again.
          </p>
        )}

        {cursor != null ? (
          <button
            type="button"
            onClick={loadMore}
            disabled={loading}
            className="inline-flex min-h-[48px] cursor-pointer items-center gap-2 rounded-full bg-ink px-8 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:bg-ink-soft disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            {loading ? (
              <>
                <svg viewBox="0 0 24 24" className="h-4 w-4 animate-spin" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                  <path d="M21 12a9 9 0 00-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
                Loading…
              </>
            ) : (
              <>
                {error ? "Retry" : "Load More Deals"}
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </>
            )}
          </button>
        ) : (
          items.length > 0 && (
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-savings" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              You&apos;ve seen all deals
            </p>
          )
        )}
      </div>
    </div>
  );
}
