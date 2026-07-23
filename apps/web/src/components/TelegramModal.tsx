"use client";

import { useEffect, useState } from "react";

const JOIN = "https://t.me/+aYRmCknf4_w0MGVl";
const JOINED = "rd_tg_joined";       // set once they click Join → never show again
const COUNT = "rd_tg_dismiss_v1";    // times dismissed via Close → cap at MAX_SHOWS
const MAX_SHOWS = 7;

// Join-our-Telegram modal. Shows shortly after each landing, up to 7 times per
// visitor. Clicking Join = never show again. Clicking Close counts toward the 7.
export default function TelegramModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(JOINED)) return;               // already joined → done
    const count = Number(localStorage.getItem(COUNT) || "0");
    if (count >= MAX_SHOWS) return;                          // dismissed 7 times → stop
    const t = setTimeout(() => setOpen(true), 2500);        // show on landing
    return () => clearTimeout(t);
  }, []);

  // Close = a dismissal; increments the counter toward the 7-show cap.
  const close = () => {
    setOpen(false);
    try {
      const count = Number(localStorage.getItem(COUNT) || "0");
      localStorage.setItem(COUNT, String(count + 1));
    } catch {}
  };

  // Join = they took the action → stop showing forever.
  const join = () => {
    setOpen(false);
    try {
      localStorage.setItem(JOINED, "1");
    } catch {}
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-end justify-center bg-black/50 p-4 backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tg-modal-title"
      onClick={close}
    >
      <div
        className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl animate-[tgpop_.25s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Telegram-blue header band */}
        <div className="relative flex flex-col items-center bg-gradient-to-br from-[#2AABEE] to-[#229ED9] px-6 pb-5 pt-7 text-center text-white">
          <button
            onClick={close}
            aria-label="Close"
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/30"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
            </svg>
          </button>
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/30">
            <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor" aria-hidden="true">
              <path d="M21.9 4.3 18.7 19.4c-.24 1.06-.87 1.32-1.76.82l-4.86-3.58-2.35 2.26c-.26.26-.48.48-.98.48l.35-4.94 9-8.13c.39-.35-.09-.54-.6-.19L5.9 13.5l-4.8-1.5c-1.04-.32-1.06-1.04.22-1.54l18.8-7.24c.87-.32 1.63.19 1.35 1.42z" />
            </svg>
          </span>
          <h2 id="tg-modal-title" className="mt-3 text-lg font-extrabold">
            Get deals before they sell out
          </h2>
          <p className="mt-1 text-sm text-white/90">
            Join <b>RichDeals</b> on Telegram — fresh loot, price-error alerts &amp; coupons, all day.
          </p>
        </div>

        <div className="px-6 pb-6 pt-4">
          <ul className="mb-4 space-y-1.5 text-sm text-gray-600">
            {["Instant alerts on the hottest drops", "Verified prices — no fake discounts", "Free to join, leave anytime"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0 text-green-500" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.1 3.1 6.8-6.8a1 1 0 011.4 0z" clipRule="evenodd" />
                </svg>
                {t}
              </li>
            ))}
          </ul>
          <a
            href={JOIN}
            target="_blank"
            rel="noopener"
            onClick={join}
            className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#229ED9] px-5 text-base font-bold text-white shadow-md shadow-[#229ED9]/30 transition-all hover:bg-[#1c8dc2] active:scale-[0.99]"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
              <path d="M21.9 4.3 18.7 19.4c-.24 1.06-.87 1.32-1.76.82l-4.86-3.58-2.35 2.26c-.26.26-.48.48-.98.48l.35-4.94 9-8.13c.39-.35-.09-.54-.6-.19L5.9 13.5l-4.8-1.5c-1.04-.32-1.06-1.04.22-1.54l18.8-7.24c.87-.32 1.63.19 1.35 1.42z" />
            </svg>
            Join Telegram Channel
          </a>
          <button onClick={close} className="mt-2 w-full py-1.5 text-xs font-medium text-gray-400 transition hover:text-gray-600">
            No thanks, maybe later
          </button>
        </div>
      </div>
      <style>{`@keyframes tgpop{from{opacity:0;transform:translateY(12px) scale(.97)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}
