import type { Metadata } from "next";
import Link from "next/link";
import { getForumFeed, getLeaderboard, type ForumTab } from "@/lib/forum";
import { SITE_NAME, absUrl, formatINR } from "@/lib/site";
import ProductImage from "@/components/ProductImage";
import VoteBox from "@/components/VoteBox";

// Scores and comments move constantly — a cached shell shows stale counts.
export const dynamic = "force-dynamic";

const TABS: { key: ForumTab; label: string }[] = [
  { key: "hot", label: "Hot" },
  { key: "new", label: "New" },
  { key: "top", label: "Top today" },
  { key: "unanswered", label: "Unanswered" },
];

export const metadata: Metadata = {
  title: `Deals Forum — vote, discuss and report live deals | ${SITE_NAME}`,
  description:
    "The RichDeals community forum. Vote deals up or down, tell everyone whether a price is still working, and earn karma for helping other shoppers.",
  alternates: { canonical: absUrl("/forum") },
};

const ago = (iso: string) => {
  const mins = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.round(hrs / 24)}d ago`;
};

export default async function ForumPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; page?: string }>;
}) {
  const sp = await searchParams;
  const tab = (TABS.find((t) => t.key === sp.tab)?.key ?? "hot") as ForumTab;
  const page = Math.max(1, Number(sp.page) || 1);

  const [feed, top] = await Promise.all([getForumFeed(tab, page), getLeaderboard()]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-ink md:text-3xl">Deals Forum</h1>
          <p className="mt-1 text-sm text-gray-600">
            Every deal is a thread. Vote it up, say if it still works, get karma for helping.
          </p>
        </div>
        <Link
          href="/account"
          className="rounded-xl bg-brand px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-dark"
        >
          Post a deal → +1 point (₹1)
        </Link>
      </div>

      <nav className="mt-5 flex gap-1 overflow-x-auto border-b border-gray-200 pb-px">
        {TABS.map((t) => (
          <Link
            key={t.key}
            href={t.key === "hot" ? "/forum" : `/forum?tab=${t.key}`}
            className={`whitespace-nowrap rounded-t-lg px-4 py-2.5 text-sm font-bold ${
              t.key === tab
                ? "border-b-2 border-brand text-brand"
                : "text-gray-500 hover:text-ink"
            }`}
          >
            {t.label}
          </Link>
        ))}
      </nav>

      <div className="mt-5 grid gap-6 md:grid-cols-[1fr_260px]">
        <div>
          {feed.items.length === 0 ? (
            <p className="rounded-xl border border-gray-200 p-6 text-sm text-gray-500">
              Nothing here yet. Check the{" "}
              <Link href="/forum" className="text-brand hover:underline">
                Hot
              </Link>{" "}
              tab.
            </p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {feed.items.map((d) => (
                <li key={d.id} className="flex gap-3 py-4">
                  <VoteBox slug={d.slug} score={d.score} size="sm" />

                  {d.image && (
                    <Link
                      href={`/${d.slug}`}
                      className="relative hidden h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-white ring-1 ring-gray-100 sm:block"
                    >
                      <ProductImage src={d.image} alt={d.title} sizes="64px" className="object-contain p-1" />
                    </Link>
                  )}

                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/${d.slug}`}
                      className="line-clamp-2 font-semibold leading-snug text-ink hover:text-brand"
                    >
                      {d.title}
                    </Link>

                    <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500">
                      {d.price != null && (
                        <span className="font-bold text-savings">{formatINR(d.price)}</span>
                      )}
                      {d.store && <span>{d.store.name}</span>}
                      <span>by {d.postedBy}</span>
                      <span>{ago(d.createdAt)}</span>
                      {d.workingCount > 0 && (
                        <span className="rounded-full bg-green-50 px-2 py-0.5 font-bold text-green-700">
                          {d.workingCount} say working
                        </span>
                      )}
                      {d.expiredCount > 0 && (
                        <span className="rounded-full bg-red-50 px-2 py-0.5 font-bold text-red-700">
                          {d.expiredCount} say expired
                        </span>
                      )}
                    </div>
                  </div>

                  <Link
                    href={`/${d.slug}#thread`}
                    className="shrink-0 self-center rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-bold text-gray-600 hover:border-brand hover:text-brand"
                  >
                    💬 {d.commentCount}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 flex justify-between">
            {page > 1 ? (
              <Link
                href={`/forum?tab=${tab}&page=${page - 1}`}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-bold text-gray-600"
              >
                ← Previous
              </Link>
            ) : (
              <span />
            )}
            {feed.items.length >= 20 && (
              <Link
                href={`/forum?tab=${tab}&page=${page + 1}`}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-bold text-gray-600"
              >
                Next →
              </Link>
            )}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-xl border border-gray-200 p-4">
            <h2 className="font-display text-sm font-bold text-ink">Top members</h2>
            {top.length === 0 ? (
              <p className="mt-2 text-xs text-gray-500">No karma earned yet. Be first.</p>
            ) : (
              <ol className="mt-3 space-y-2 text-sm">
                {top.map((m, i) => (
                  <li key={m.id} className="flex items-center gap-2">
                    <span className="w-5 text-xs font-bold text-gray-400">{i + 1}</span>
                    <span className="flex-1 truncate text-gray-700">{m.name || `member${m.id}`}</span>
                    <span className="font-bold text-brand">{m.karma}</span>
                  </li>
                ))}
              </ol>
            )}
          </div>

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-xs leading-relaxed text-gray-600">
            <h2 className="font-display text-sm font-bold text-ink">How karma works</h2>
            <ul className="mt-2 space-y-1">
              <li>Comment on a thread → +2 karma</li>
              <li>Flag a deal working or expired → +1 karma</li>
              <li>Someone upvotes your deal → +1 karma</li>
            </ul>
            <p className="mt-2">
              Karma is rank and badges only. Rupees come from{" "}
              <Link href="/account" className="text-brand hover:underline">
                submitting a deal we publish
              </Link>{" "}
              — 1 point = ₹1.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
