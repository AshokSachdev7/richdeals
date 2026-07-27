"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

// ponytail: one client component for the whole account surface — signed out shows the
// form, signed in shows the dashboard. No SSR cookie forwarding, no auth context, no
// route guards. /account is noindex anyway, so there is nothing to prerender.
const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface Me {
  id: number;
  email: string;
  name: string | null;
  points: number;
  refCode: string;
  createdAt: string;
  redeemAt: number;
  checkedInToday: boolean;
}

interface LedgerRow {
  kind: string;
  points: number;
  dealId: number | null;
  createdAt: string;
}

const KIND_LABEL: Record<string, string> = {
  signup: "Welcome bonus",
  referral: "Friend joined",
  daily: "Daily check-in",
  click: "Deal visit",
};

const EARN_TIERS = [
  { icon: "🎁", label: "Sign up (one time)", points: 100 },
  { icon: "👥", label: "A friend joins with your code", points: 50 },
  { icon: "📅", label: "Check in, every day", points: 10 },
  { icon: "🛍️", label: "Open any deal", points: 2 },
];

async function call<T>(path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    method: body ? "POST" : "GET",
    credentials: "include",
    headers: { "content-type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { message?: string }).message || "Something went wrong");
  return data as T;
}

export default function AccountClient() {
  const [me, setMe] = useState<Me | null>(null);
  const [ledger, setLedger] = useState<LedgerRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<"register" | "login">("register");
  const [ref, setRef] = useState("");
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  const loadLedger = useCallback(() => {
    call<LedgerRow[]>("/auth/ledger")
      .then(setLedger)
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    // ponytail: read ?ref= off window instead of useSearchParams — no Suspense boundary needed.
    const code = new URLSearchParams(window.location.search).get("ref");
    if (code) {
      setRef(code);
      setMode("register");
    }
    call<Me>("/auth/me")
      .then((u) => {
        setMe(u);
        loadLedger();
      })
      .catch(() => undefined)
      .finally(() => setLoading(false));
  }, [loadLedger]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const path = mode === "register" ? "/auth/register" : "/auth/login";
      const body =
        mode === "register"
          ? { ...form, ref: ref || undefined }
          : { email: form.email, password: form.password };
      setMe(await call<Me>(path, body));
      loadLedger();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function checkIn() {
    setBusy(true);
    try {
      await call("/auth/checkin", {});
      setMe(await call<Me>("/auth/me"));
      loadLedger();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function logout() {
    await call("/auth/logout", {}).catch(() => undefined);
    setMe(null);
    setLedger([]);
    setForm({ email: "", password: "", name: "" });
  }

  if (loading) return <p className="py-10 text-center text-sm text-gray-500">Loading…</p>;

  if (!me) {
    const field =
      "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-ink transition-colors placeholder:text-gray-400 focus:border-brand focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand/10";

    return (
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl shadow-ink/5 ring-1 ring-gray-100 md:grid md:grid-cols-[1.05fr_1fr]">
        {/* Value panel — the reason to sign up, not decoration. */}
        <aside className="hero-dots relative bg-ink px-7 py-9 text-white md:px-9 md:py-11">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand/30 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-savings/20 blur-3xl"
          />
          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-savings ring-1 ring-inset ring-white/15">
              Rewards
            </span>
            <h1 className="mt-4 font-display text-3xl font-extrabold leading-[1.15] md:text-4xl">
              Shop the deals.
              <br />
              <span className="text-brand-accent">Get paid in points.</span>
            </h1>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">
              A free RichDeals account turns every price drop you grab into points. No cost, no
              catch — start at 100 before you even browse.
            </p>

            <ul className="mt-8 space-y-px">
              {EARN_TIERS.map((t) => (
                <li
                  key={t.label}
                  className="flex items-center gap-4 border-t border-white/10 py-3.5 first:border-t-0"
                >
                  <span aria-hidden="true" className="text-xl">
                    {t.icon}
                  </span>
                  <span className="flex-1 text-sm text-white/85">{t.label}</span>
                  <span className="font-display text-lg font-extrabold tabular-nums text-savings">
                    +{t.points}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-7 flex items-center gap-2 text-xs text-white/45">
              <span aria-hidden="true">🔒</span>
              Points have no cash value yet. Redeeming unlocks at 1,000.
            </p>
          </div>
        </aside>

        {/* Form panel */}
        <div className="px-7 py-9 md:px-9 md:py-11">
          <div className="mb-6 inline-flex rounded-full bg-gray-100 p-1 text-sm font-bold">
            {(["register", "login"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setMode(m);
                  setError("");
                }}
                className={`rounded-full px-4 py-1.5 transition-colors ${
                  mode === m ? "bg-white text-ink shadow-sm" : "text-gray-500 hover:text-ink"
                }`}
              >
                {m === "register" ? "Create account" : "Sign in"}
              </button>
            ))}
          </div>

          <h2 className="font-display text-xl font-extrabold text-ink">
            {mode === "register" ? "Join free in 20 seconds" : "Welcome back"}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {mode === "register"
              ? "Email and a password. That is the whole form."
              : "Your points are exactly where you left them."}
          </p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            {mode === "register" && (
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-ink">
                  Name <span className="font-normal text-gray-400">(optional)</span>
                </label>
                <input
                  id="name"
                  placeholder="Priya"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={field}
                />
              </div>
            )}
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-ink">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={field}
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-ink">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={8}
                autoComplete={mode === "register" ? "new-password" : "current-password"}
                placeholder={mode === "register" ? "At least 8 characters" : "••••••••"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className={field}
              />
            </div>

            {mode === "register" && (
              <div>
                <label htmlFor="ref" className="mb-1.5 block text-sm font-semibold text-ink">
                  Friend&apos;s referral code{" "}
                  <span className="font-normal text-gray-400">(optional)</span>
                </label>
                <input
                  id="ref"
                  placeholder="e.g. 9AD01F87"
                  maxLength={16}
                  value={ref}
                  onChange={(e) => setRef(e.target.value.trim().toUpperCase())}
                  className={`${field} font-mono uppercase tracking-widest`}
                />
                <p className="mt-1.5 text-xs text-gray-500">
                  Got a code from a friend? Paste it here — they earn 50 points when you join.
                </p>
              </div>
            )}

            {error && (
              <p className="rounded-xl bg-red-50 px-4 py-2.5 text-sm font-semibold text-brand-dark">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-xl bg-brand py-3.5 font-display text-sm font-extrabold tracking-wide text-white shadow-lg shadow-brand/25 transition-all hover:bg-brand-dark active:scale-[0.99] disabled:opacity-50"
            >
              {busy
                ? "Please wait…"
                : mode === "register"
                  ? "Create free account → +100 points"
                  : "Sign in"}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-gray-500">
            {mode === "register" ? "Already have an account?" : "New here?"}{" "}
            <button
              type="button"
              onClick={() => {
                setMode(mode === "register" ? "login" : "register");
                setError("");
              }}
              className="font-bold text-brand hover:underline"
            >
              {mode === "register" ? "Sign in" : "Create one free"}
            </button>
          </p>
        </div>
      </div>
    );
  }

  const shareUrl = `https://richdeals.in/register?ref=${me.refCode}`;
  const pct = Math.min(100, Math.round((me.points / me.redeemAt) * 100));

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold text-ink">Hi {me.name || me.email.split("@")[0]} 👋</h1>
        <button onClick={logout} className="text-sm font-semibold text-gray-500 hover:text-brand">
          Sign out
        </button>
      </div>

      <div className="mt-5 rounded-2xl bg-brand p-5 text-white">
        <p className="text-sm opacity-80">Your points</p>
        <p className="font-display text-4xl font-extrabold">{me.points.toLocaleString("en-IN")}</p>
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/25">
          <div className="h-full rounded-full bg-white" style={{ width: `${pct}%` }} />
        </div>
        <p className="mt-2 text-xs opacity-90">
          {me.points >= me.redeemAt
            ? "You have hit the redeem threshold — rewards open soon."
            : `${(me.redeemAt - me.points).toLocaleString("en-IN")} points to go until redeem unlocks at ${me.redeemAt.toLocaleString("en-IN")}.`}
        </p>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-200 p-4">
          <h2 className="font-display text-base font-bold text-ink">Daily check-in</h2>
          <p className="mt-1 text-sm text-gray-600">+10 points, once every day.</p>
          <button
            onClick={checkIn}
            disabled={busy || me.checkedInToday}
            className="mt-3 w-full rounded-lg bg-ink py-2 text-sm font-bold text-white disabled:bg-gray-200 disabled:text-gray-500"
          >
            {me.checkedInToday ? "Checked in today ✓" : busy ? "…" : "Check in for +10"}
          </button>
        </div>

        <div className="rounded-xl border border-gray-200 p-4">
          <h2 className="font-display text-base font-bold text-ink">Invite friends</h2>
          <p className="mt-1 text-sm text-gray-600">
            +50 points each time someone joins with your code{" "}
            <span className="font-mono font-bold text-brand">{me.refCode}</span>.
          </p>
          <button
            onClick={() => {
              navigator.clipboard?.writeText(shareUrl);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="mt-3 w-full rounded-lg border border-brand py-2 text-sm font-bold text-brand"
          >
            {copied ? "Link copied ✓" : "Copy invite link"}
          </button>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-gray-200 p-4">
        <h2 className="font-display text-base font-bold text-ink">Earn more</h2>
        <p className="mt-1 text-sm text-gray-600">
          Every deal you open from{" "}
          <Link href="/" className="text-brand hover:underline">
            RichDeals
          </Link>{" "}
          earns 2 points (once per deal per day). Browse{" "}
          <Link href="/?feed=hot" className="text-brand hover:underline">
            today&apos;s hot deals
          </Link>{" "}
          and stack them up.
        </p>
      </div>

      <div className="mt-5">
        <h2 className="font-display text-base font-bold text-ink">Recent activity</h2>
        {ledger.length === 0 ? (
          <p className="mt-2 text-sm text-gray-500">Nothing yet.</p>
        ) : (
          <ul className="mt-2 divide-y divide-gray-100 text-sm">
            {ledger.map((row, i) => (
              <li key={i} className="flex items-center justify-between py-2">
                <span className="text-gray-700">{KIND_LABEL[row.kind] || row.kind}</span>
                <span className="font-bold text-brand">+{row.points}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="mt-6 rounded-lg bg-gray-50 p-3 text-xs text-gray-500">
        Redeeming is not open yet — points keep accruing on your account and will be redeemable once
        rewards go live. Points have no cash value until then.
      </p>
    </div>
  );
}
