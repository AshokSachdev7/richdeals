"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/forum", label: "Forum" },
  { href: "/?feed=hot", label: "Hot" },
  { href: "/stores", label: "Stores" },
  { href: "/categories", label: "Categories" },
  { href: "/freebies", label: "Freebies" },
  { href: "/coupons", label: "Coupons" },
  { href: "/offers", label: "Offers" },
  { href: "/blog", label: "Blog" },
  { href: "/submit", label: "Post a deal" },
];

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

type Me = { name: string | null; email: string; points: number };

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [me, setMe] = useState<Me | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Signed-in members should see themselves, not a generic "Earn" pill.
  useEffect(() => {
    fetch(`${API}/auth/me`, { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then(setMe)
      .catch(() => setMe(null));
  }, []);

  const who = me ? me.name?.trim().split(/\s+/)[0] || me.email.split("@")[0] : null;

  return (
    <header
      className={`sticky top-0 z-30 border-b bg-white/90 backdrop-blur transition-shadow duration-200 ${
        scrolled ? "border-gray-200 shadow-md shadow-black/5" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Link
          href="/"
          aria-label={SITE_NAME}
          className="flex shrink-0 items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-mark.svg" alt="" className="h-8 w-8" />
          <span className="font-display text-2xl font-extrabold tracking-tight">
            <span className="text-ink">Rich</span>
            <span className="text-brand">Deals</span>
          </span>
        </Link>
        <nav className="hidden flex-1 md:block" aria-label="Primary">
          <ul className="flex items-center gap-5 text-sm font-semibold text-ink-soft lg:gap-6">
            {NAV.map((n) => (
              <li key={n.label} className="whitespace-nowrap">
                <Link href={n.href} className="transition-colors duration-200 hover:text-brand">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <form
          action="/search"
          method="GET"
          role="search"
          className="ml-auto flex flex-1 items-center rounded-full border border-gray-300 bg-gray-50 px-3 transition-colors duration-200 focus-within:border-brand focus-within:bg-white md:max-w-[15rem]"
        >
          <span className="text-gray-400" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3-3" strokeLinecap="round" />
            </svg>
          </span>
          <label htmlFor="header-search" className="sr-only">
            Search deals
          </label>
          <input
            id="header-search"
            type="search"
            name="q"
            placeholder="Search deals, stores…"
            className="w-full bg-transparent px-2 py-1.5 text-sm text-ink placeholder:text-gray-400 focus:outline-none"
          />
        </form>

        {/* Earning is the one action we actively sell, so it gets a pill, not a nav slot.
            Once you are signed in the pill becomes your name + balance. */}
        <Link
          href="/account"
          className="hidden shrink-0 items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-bold text-white transition-colors duration-200 hover:bg-brand md:inline-flex"
        >
          {who ? (
            <>
              <span className="max-w-[7rem] truncate">{who}</span>
              <span className="rounded-full bg-white/15 px-2 py-0.5 text-xs">₹{me?.points ?? 0}</span>
            </>
          ) : (
            <>
              <span aria-hidden="true">🎁</span> Earn
            </>
          )}
        </Link>
      </div>

      <nav className="border-t border-gray-100 md:hidden" aria-label="Primary mobile">
        <ul className="no-scrollbar mx-auto flex max-w-6xl items-center gap-5 overflow-x-auto px-4 py-2 text-sm font-semibold text-ink-soft">
          {NAV.map((n) => (
            <li key={n.label} className="whitespace-nowrap">
              <Link href={n.href} className="transition-colors duration-200 hover:text-brand">
                {n.label}
              </Link>
            </li>
          ))}
          <li className="whitespace-nowrap">
            <Link href="/account" className="font-bold text-brand">
              {who ? `${who} · ₹${me?.points ?? 0}` : "🎁 Earn"}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
