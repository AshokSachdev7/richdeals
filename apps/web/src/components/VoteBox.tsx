"use client";

import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// Arrow pair + live score. Clicking the arrow you already picked clears the vote.
// Optimistic: the number moves first, and snaps back if the API says no.
export default function VoteBox({
  slug,
  score,
  myVote = 0,
  size = "md",
}: {
  slug: string;
  score: number;
  myVote?: number;
  size?: "sm" | "md";
}) {
  const [value, setValue] = useState(myVote);
  const [count, setCount] = useState(score);
  const [error, setError] = useState("");

  async function cast(next: number) {
    const want = value === next ? 0 : next;
    const prev = { value, count };
    setValue(want);
    setCount(count + (want - value));
    setError("");
    try {
      const res = await fetch(`${API}/forum/vote`, {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ slug, value: want }),
      });
      if (!res.ok) throw new Error(res.status === 401 ? "Sign in to vote" : "Try again");
      const data = (await res.json()) as { score: number; myVote: number };
      setCount(data.score);
      setValue(data.myVote);
    } catch (e) {
      setValue(prev.value);
      setCount(prev.count);
      setError(e instanceof Error ? e.message : "Try again");
    }
  }

  const arrow = size === "sm" ? "text-base" : "text-lg";
  const on = "text-brand";
  const off = "text-gray-300 hover:text-gray-500";

  return (
    <div className="flex w-10 shrink-0 flex-col items-center">
      <button
        type="button"
        aria-label="Upvote"
        aria-pressed={value === 1}
        onClick={() => cast(1)}
        className={`${arrow} leading-none ${value === 1 ? on : off}`}
      >
        ▲
      </button>
      <span
        className={`py-0.5 font-display text-sm font-extrabold tabular-nums ${
          count > 0 ? "text-ink" : "text-gray-400"
        }`}
      >
        {count}
      </span>
      <button
        type="button"
        aria-label="Downvote"
        aria-pressed={value === -1}
        onClick={() => cast(-1)}
        className={`${arrow} leading-none ${value === -1 ? "text-gray-600" : off}`}
      >
        ▼
      </button>
      {error && <span className="mt-1 text-center text-[10px] leading-tight text-gray-500">{error}</span>}
    </div>
  );
}
