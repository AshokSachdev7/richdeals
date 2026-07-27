"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import VoteBox from "./VoteBox";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface Comment {
  id: number;
  body: string;
  flag: "working" | "expired" | null;
  createdAt: string;
  author: string;
  karma: number;
}

interface Thread {
  score: number;
  commentCount: number;
  myVote: number;
  workingCount: number;
  expiredCount: number;
  comments: Comment[];
}

const ago = (iso: string) => {
  const mins = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  return hrs < 24 ? `${hrs}h ago` : `${Math.round(hrs / 24)}d ago`;
};

const FLAG_BADGE = {
  working: { text: "Still working ✅", cls: "bg-green-50 text-green-700" },
  expired: { text: "Expired ❌", cls: "bg-red-50 text-red-700" },
} as const;

// The deal page IS the thread — comments, votes and working/expired reports all
// hang off the deal row, so fresh community copy lands on the page that ranks.
export default function ForumThread({ slug }: { slug: string }) {
  const [t, setT] = useState<Thread | null>(null);
  const [body, setBody] = useState("");
  const [flag, setFlag] = useState<"working" | "expired" | "">("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      const res = await fetch(`${API}/forum/thread?slug=${encodeURIComponent(slug)}`, {
        credentials: "include",
        cache: "no-store",
      });
      if (res.ok) setT(await res.json());
    } catch {
      // ponytail: thread is an enhancement — a dead API must not break the deal page.
    }
  }, [slug]);

  useEffect(() => {
    load();
  }, [load]);

  async function post(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`${API}/forum/comment`, {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ slug, body, flag: flag || undefined }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Could not post that.");
      setBody("");
      setFlag("");
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not post that.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section id="thread" className="mt-10 scroll-mt-20">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="font-display text-xl font-extrabold text-ink">
          Discussion {t ? `(${t.commentCount})` : ""}
        </h2>
        {t && t.workingCount > 0 && (
          <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-bold text-green-700">
            {t.workingCount} say still working
          </span>
        )}
        {t && t.expiredCount > 0 && (
          <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-700">
            {t.expiredCount} say expired
          </span>
        )}
        <Link href="/forum" className="ml-auto text-sm font-bold text-brand hover:underline">
          All threads →
        </Link>
      </div>

      <div className="mt-4 flex gap-4 rounded-2xl border border-gray-200 p-4">
        {t && <VoteBox slug={slug} score={t.score} myVote={t.myVote} />}
        <form onSubmit={post} className="min-w-0 flex-1">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={3}
            maxLength={2000}
            placeholder="Did this price work for you? Anything others should know before they buy?"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-ink placeholder:text-gray-400 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/10"
          />
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {(["working", "expired"] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFlag(flag === f ? "" : f)}
                className={`rounded-full px-3 py-1.5 text-xs font-bold ring-1 ring-inset ${
                  flag === f
                    ? "bg-ink text-white ring-ink"
                    : "text-gray-600 ring-gray-200 hover:ring-gray-400"
                }`}
              >
                {FLAG_BADGE[f].text}
              </button>
            ))}
            <button
              type="submit"
              disabled={busy || body.trim().length < 2}
              className="ml-auto rounded-xl bg-brand px-5 py-2 text-sm font-bold text-white disabled:opacity-40"
            >
              {busy ? "Posting…" : "Post"}
            </button>
          </div>
          {error && <p className="mt-2 text-sm font-semibold text-brand-dark">{error}</p>}
          <p className="mt-2 text-xs text-gray-500">
            +2 karma per comment, +1 more for a working/expired report.{" "}
            <Link href="/account" className="text-brand hover:underline">
              Sign in
            </Link>{" "}
            to take part.
          </p>
        </form>
      </div>

      {t && t.comments.length > 0 && (
        <ul className="mt-5 space-y-4">
          {t.comments.map((c) => (
            <li key={c.id} className="rounded-xl border border-gray-100 bg-gray-50/60 p-4">
              <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                <span className="font-bold text-ink">{c.author}</span>
                <span className="rounded-full bg-white px-2 py-0.5 font-bold text-brand ring-1 ring-gray-200">
                  {c.karma} karma
                </span>
                {c.flag && (
                  <span className={`rounded-full px-2 py-0.5 font-bold ${FLAG_BADGE[c.flag].cls}`}>
                    {FLAG_BADGE[c.flag].text}
                  </span>
                )}
                <span>{ago(c.createdAt)}</span>
              </div>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-gray-700">{c.body}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
