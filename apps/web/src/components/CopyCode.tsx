"use client";

import { useState } from "react";

// Dashed "copy code" coupon block. Client-only because it needs the clipboard.
export default function CopyCode({ code, note }: { code: string; note?: string | null }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ponytail: clipboard blocked (insecure ctx / denied) — code is still visible to copy by hand.
    }
  }

  return (
    <div className="rounded-xl border-2 border-dashed border-brand/50 bg-brand/5 p-3">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
            Coupon code
          </div>
          <div className="truncate font-mono text-lg font-extrabold tracking-wider text-brand-dark">
            {code}
          </div>
        </div>
        <button
          type="button"
          onClick={copy}
          aria-label={`Copy coupon code ${code}`}
          className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-sm font-bold text-brand-dark shadow-sm ring-1 ring-brand/30 transition-all hover:bg-brand hover:text-white active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1"
        >
          {copied ? (
            <>
              <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 8.5l3.5 3.5L13 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="5" y="5" width="8" height="8" rx="1.5" />
                <path d="M11 3H4a1 1 0 00-1 1v7" strokeLinecap="round" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      {note && <p className="mt-2 text-xs text-gray-500">{note}</p>}
    </div>
  );
}
