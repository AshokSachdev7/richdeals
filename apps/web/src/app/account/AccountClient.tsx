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
  pendingDeals?: number;
  pendingPoints?: number;
}

interface LedgerRow {
  kind: string;
  points: number;
  dealId: number | null;
  createdAt: string;
}

interface Redemption {
  id: number;
  points: number;
  status: "pending" | "paid" | "rejected";
  voucher: string | null;
  note: string | null;
  createdAt: string;
  settledAt: string | null;
}

interface MyDeal {
  id: number;
  slug: string;
  title: string;
  image: string | null;
  price: number | null;
  status: "DRAFT" | "PENDING_REVIEW" | "LIVE" | "EXPIRED";
  createdAt: string;
}

// What the member actually wants to know: did it publish, and did I get paid.
const DEAL_STATUS: Record<MyDeal["status"], { label: string; cls: string }> = {
  PENDING_REVIEW: { label: "⏳ Being checked", cls: "bg-amber-50 text-amber-700 ring-amber-200" },
  LIVE: { label: "✅ Live · +1 point", cls: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
  EXPIRED: { label: "⛔ Not published", cls: "bg-gray-100 text-gray-500 ring-gray-200" },
  DRAFT: { label: "📝 Draft", cls: "bg-gray-100 text-gray-500 ring-gray-200" },
};

const KIND_LABEL: Record<string, string> = {
  signup: "Welcome bonus",
  referral: "Friend joined",
  daily: "Daily check-in",
  click: "Deal visit",
  deal_submit: "Deal you submitted",
  redeem: "Redeemed for a voucher",
  redeem_refund: "Redeem cancelled — points back",
};

// 1 point = ₹1, everywhere. No conversion, no paisa.
const EARN_TIERS = [
  { icon: "🎁", label: "Sign up (one time)", points: 1 },
  { icon: "👥", label: "A friend joins with your code", points: 1 },
  { icon: "📅", label: "Check in, every day", points: 1 },
  { icon: "🔗", label: "Submit a deal we publish", points: 1 },
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
  const [myDeals, setMyDeals] = useState<MyDeal[]>([]);
  const [payouts, setPayouts] = useState<Redemption[]>([]);
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
    call<MyDeal[]>("/auth/my-deals")
      .then(setMyDeals)
      .catch(() => undefined);
    call<Redemption[]>("/auth/redemptions")
      .then(setPayouts)
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

  async function redeem() {
    setBusy(true);
    setError("");
    try {
      await call("/auth/redeem", {});
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
    setMyDeals([]);
    setPayouts([]);
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
              A free RichDeals account pays you in points for the deals you send in. 1 point = ₹1.
              No cost, no catch, no conversion maths.
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
              1 point = ₹1. Cash out as an Amazon gift card at 100 points.
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
                  Got a code from a friend? Paste it here — they earn 1 point (₹1) when you join.
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
                  ? "Create free account → +1 point"
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
  const openPayout = payouts.find((p) => p.status === "pending");

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold text-ink">Hi {me.name || me.email.split("@")[0]} 👋</h1>
        <button onClick={logout} className="text-sm font-semibold text-gray-500 hover:text-brand">
          Sign out
        </button>
      </div>

      <div className="mt-5 rounded-2xl bg-brand p-5 text-white">
        <p className="text-sm opacity-80">Your points — 1 point = ₹1</p>
        <p className="font-display text-4xl font-extrabold">
          {me.points.toLocaleString("en-IN")}{" "}
          <span className="text-xl font-bold opacity-80">= ₹{me.points.toLocaleString("en-IN")}</span>
        </p>
        {!!me.pendingPoints && (
          <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold">
            ⏳ {me.pendingPoints} pending — {me.pendingDeals} deal{me.pendingDeals === 1 ? "" : "s"} being verified
          </p>
        )}
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/25">
          <div className="h-full rounded-full bg-white" style={{ width: `${pct}%` }} />
        </div>
        <p className="mt-2 text-xs opacity-90">
          {openPayout
            ? `Payout of ₹${openPayout.points.toLocaleString("en-IN")} requested — your voucher code lands here once we send it.`
            : me.points >= me.redeemAt
              ? `Cash out ₹${me.points.toLocaleString("en-IN")} as an Amazon gift card.`
              : `${(me.redeemAt - me.points).toLocaleString("en-IN")} points to go until redeem unlocks at ${me.redeemAt.toLocaleString("en-IN")}.`}
        </p>
        {!openPayout && me.points >= me.redeemAt && (
          <button
            onClick={redeem}
            disabled={busy}
            className="mt-3 w-full rounded-xl bg-white py-3 font-display text-sm font-extrabold text-brand transition-opacity disabled:opacity-60"
          >
            {busy ? "…" : `Redeem ₹${me.points.toLocaleString("en-IN")} → Amazon gift card`}
          </button>
        )}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-200 p-4">
          <h2 className="font-display text-base font-bold text-ink">Daily check-in</h2>
          <p className="mt-1 text-sm text-gray-600">+1 point (₹1), once every day.</p>
          <button
            onClick={checkIn}
            disabled={busy || me.checkedInToday}
            className="mt-3 w-full rounded-lg bg-ink py-2 text-sm font-bold text-white disabled:bg-gray-200 disabled:text-gray-500"
          >
            {me.checkedInToday ? "Checked in today ✓" : busy ? "…" : "Check in for +1"}
          </button>
        </div>

        <div className="rounded-xl border border-gray-200 p-4">
          <h2 className="font-display text-base font-bold text-ink">Invite friends</h2>
          <p className="mt-1 text-sm text-gray-600">
            +1 point (₹1) each time someone joins with your code{" "}
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

      <div className="mt-5 rounded-2xl border-2 border-brand/20 bg-brand/[0.03] p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-lg font-bold text-ink">Found a deal? Send it in.</h2>
            <p className="mt-1 text-sm text-gray-600">
              Paste the product link. We check the store&apos;s live price ourselves — if it holds up
              and it is not already on RichDeals, it goes live and you earn{" "}
              <span className="font-bold text-ink">1 point (₹1)</span>.
            </p>
          </div>
          <span className="hidden shrink-0 rounded-full bg-brand px-3 py-1 text-xs font-bold text-white sm:block">
            +1
          </span>
        </div>
        <Link
          href="/submit"
          className="mt-4 inline-flex rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-dark"
        >
          Post a deal
        </Link>
        <p className="mt-3 text-xs text-gray-500">
          Single product pages only — no search, category or app-only links. Amazon links take a short
          manual price check before they publish. One payout per deal, first submitter wins.
        </p>
      </div>

      <div className="mt-5 rounded-xl border border-gray-200 p-4">
        <h2 className="font-display text-base font-bold text-ink">Earn more</h2>
        <p className="mt-1 text-sm text-gray-600">
          Points come from deals you send in — 1 point (₹1) per deal we check and publish. Talking
          on the{" "}
          <Link href="/forum" className="text-brand hover:underline">
            forum
          </Link>{" "}
          earns karma instead: rank and badges, not rupees.
        </p>
      </div>

      <div className="mt-5">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-display text-base font-bold text-ink">Deals you sent in</h2>
          {myDeals.length > 0 && (
            <span className="text-xs text-gray-500">
              {myDeals.filter((d) => d.status === "LIVE").length} of {myDeals.length} published
            </span>
          )}
        </div>
        {myDeals.length === 0 ? (
          <p className="mt-2 text-sm text-gray-500">
            None yet.{" "}
            <Link href="/submit" className="font-semibold text-brand hover:underline">
              Send your first one
            </Link>{" "}
            — 1 point (₹1) when it publishes.
          </p>
        ) : (
          <ul className="mt-2 divide-y divide-gray-100">
            {myDeals.map((d) => {
              const s = DEAL_STATUS[d.status] ?? DEAL_STATUS.DRAFT;
              return (
                <li key={d.id} className="flex items-center gap-3 py-3">
                  {d.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={d.image}
                      alt=""
                      className="h-12 w-12 shrink-0 rounded-lg object-contain ring-1 ring-gray-100"
                    />
                  ) : (
                    <span className="h-12 w-12 shrink-0 rounded-lg bg-gray-50 ring-1 ring-gray-100" />
                  )}
                  <div className="min-w-0 flex-1">
                    {d.status === "LIVE" ? (
                      <Link
                        href={`/${d.slug}`}
                        className="line-clamp-2 text-sm font-semibold text-ink hover:text-brand"
                      >
                        {d.title}
                      </Link>
                    ) : (
                      <p className="line-clamp-2 text-sm font-semibold text-ink">{d.title}</p>
                    )}
                    <p className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                      {d.price != null && <span className="font-bold text-ink">₹{d.price.toLocaleString("en-IN")}</span>}
                      <span>
                        {new Date(d.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                      </span>
                    </p>
                  </div>
                  <span
                    className={`shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ring-inset ${s.cls}`}
                  >
                    {s.label}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
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
                <span className={`font-bold ${row.points < 0 ? "text-gray-500" : "text-brand"}`}>
                  {row.points < 0 ? "−" : "+"}
                  {Math.abs(row.points)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {payouts.length > 0 && (
        <div className="mt-5">
          <h2 className="font-display text-base font-bold text-ink">Payouts</h2>
          <ul className="mt-2 divide-y divide-gray-100 text-sm">
            {payouts.map((p) => (
              <li key={p.id} className="py-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-bold text-ink">₹{p.points.toLocaleString("en-IN")}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(p.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </span>
                </div>
                {p.status === "pending" && (
                  <p className="mt-1 text-xs text-amber-700">
                    ⏳ Being processed — gift-card codes go out within 3 working days.
                  </p>
                )}
                {p.status === "paid" && (
                  <p className="mt-1 text-xs text-emerald-700">
                    ✅ Amazon gift card:{" "}
                    <span className="select-all rounded bg-emerald-50 px-1.5 py-0.5 font-mono font-bold">
                      {p.voucher}
                    </span>{" "}
                    — redeem it at amazon.in/gc/redeem.
                  </p>
                )}
                {p.status === "rejected" && (
                  <p className="mt-1 text-xs text-gray-500">
                    ⛔ Not paid — points were returned to your balance.{p.note ? ` ${p.note}` : ""}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-6 rounded-lg bg-gray-50 p-3 text-xs text-gray-500">
        1 point = ₹1. Redeeming unlocks at {me.redeemAt} points and pays out as an Amazon gift-card
        code, sent by hand within 3 working days. You cash out your full balance in one go — one
        request at a time.
      </p>
    </div>
  );
}
