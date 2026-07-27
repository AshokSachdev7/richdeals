import type { Metadata } from "next";
import { isAuthed, login, logout } from "../actions";

export const metadata: Metadata = { title: "Dashboard — RichDeals Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const API = process.env.API_INTERNAL_URL || "http://localhost:4000";

type Series = { d: string; n: number }[];
type Stats = {
  users: { total: number; today: number; last7d: number; last30d: number };
  clicks: { total: number; today: number; last7d: number };
  deals: { live: number; pending: number; expired: number; total: number };
  posts: { total: number; today: number };
  community: { comments: number; votes: number; pointsAwarded: number };
  signupSeries: Series;
  clickSeries: Series;
  topDeals: { id: number; slug: string; title: string; n: number }[];
  recentUsers: { id: number; email: string; name: string | null; points: number; createdAt: string; referred: boolean }[];
};

async function fetchStats(): Promise<Stats | null> {
  const res = await fetch(`${API}/admin/stats`, {
    headers: { "x-admin-key": process.env.ADMIN_KEY || "" },
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function DashboardPage() {
  if (!(await isAuthed())) {
    return (
      <div className="mx-auto mt-20 max-w-sm rounded-xl border border-gray-200 bg-white p-6">
        <h1 className="mb-1 text-xl font-extrabold">Admin login</h1>
        <p className="mb-4 text-sm text-gray-500">Enter the admin key.</p>
        <form action={login} className="flex flex-col gap-3">
          <input
            name="key"
            type="password"
            autoFocus
            placeholder="Admin key"
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand focus:outline-none"
          />
          <button className="rounded-lg bg-brand px-4 py-2 text-sm font-bold text-white hover:bg-brand-dark">
            Sign in
          </button>
        </form>
      </div>
    );
  }

  const s = await fetchStats();
  if (!s) {
    return <p className="mt-10 text-sm text-red-600">Stats API unreachable — is the API running on {API}?</p>;
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-extrabold">Dashboard</h1>
          <a href="/admin" className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600 hover:bg-gray-200">
            Deals →
          </a>
        </div>
        <form action={logout}>
          <button className="text-sm text-gray-500 underline">Logout</button>
        </form>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Card label="Members" value={s.users.total} sub={`+${s.users.today} today · +${s.users.last7d} in 7d`} tone="brand" />
        <Card label="Deal clicks" value={s.clicks.total} sub={`${s.clicks.today} today · ${s.clicks.last7d} in 7d`} />
        <Card label="Live deals" value={s.deals.live} sub={`${s.deals.pending} pending · ${s.deals.expired} expired`} />
        <Card label="Blog posts" value={s.posts.total} sub={`${s.posts.today} published today`} />
      </div>

      <div className="mb-6 grid gap-4 lg:grid-cols-2">
        <Chart title="New members / day (14d, IST)" series={s.signupSeries} bar="bg-brand" />
        <Chart title="Deal clicks / day (14d, IST)" series={s.clickSeries} bar="bg-gray-800" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Most clicked deals (7d)">
          {s.topDeals.length === 0 ? (
            <Empty>No clicks recorded in the last 7 days.</Empty>
          ) : (
            <table className="w-full text-left text-sm">
              <tbody>
                {s.topDeals.map((d) => (
                  <tr key={d.id} className="border-t border-gray-100 first:border-0">
                    <td className="py-2 pr-3">
                      <a href={`/${d.slug}`} target="_blank" className="line-clamp-1 font-medium hover:text-brand">
                        {d.title}
                      </a>
                    </td>
                    <td className="w-16 py-2 text-right font-bold tabular-nums">{d.n}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Panel>

        <Panel title="Newest members">
          {s.recentUsers.length === 0 ? (
            <Empty>No signups yet.</Empty>
          ) : (
            <table className="w-full text-left text-sm">
              <tbody>
                {s.recentUsers.map((u) => (
                  <tr key={u.id} className="border-t border-gray-100 first:border-0">
                    <td className="py-2 pr-3">
                      <span className="font-medium">{u.name || u.email.split("@")[0]}</span>
                      <span className="ml-2 text-xs text-gray-400">{u.email}</span>
                      {u.referred && (
                        <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                          referred
                        </span>
                      )}
                    </td>
                    <td className="w-24 py-2 text-right text-xs text-gray-500">
                      ₹{u.points} · {new Date(u.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Panel>
      </div>

      <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4 text-xs leading-relaxed text-gray-500">
        <strong className="text-gray-700">What these numbers are.</strong> Members, clicks, deals and posts come straight
        out of our database. <strong>Pageviews and unique visitors are not here</strong> — the gtag snippet reports those
        to Google Analytics, and nothing writes them back to us. &ldquo;Deal clicks&rdquo; counts every outbound tap on a
        Shop Now button, which is the traffic number we own. Community: {s.community.comments} comments,{" "}
        {s.community.votes} votes, ₹{s.community.pointsAwarded} in points awarded.
      </div>
    </div>
  );
}

function Card({ label, value, sub, tone }: { label: string; value: number; sub: string; tone?: "brand" }) {
  return (
    <div className={`rounded-xl border p-4 ${tone === "brand" ? "border-brand/30 bg-brand/5" : "border-gray-200 bg-white"}`}>
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</p>
      <p className="mt-1 text-3xl font-extrabold tabular-nums">{value.toLocaleString("en-IN")}</p>
      <p className="mt-1 text-xs text-gray-500">{sub}</p>
    </div>
  );
}

// Bars are plain divs — a chart library for 14 numbers would be more code than the chart.
function Chart({ title, series, bar }: { title: string; series: Series; bar: string }) {
  const days: Series = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date(Date.now() - i * 864e5);
    const key = new Date(d.getTime() + 5.5 * 3600e3).toISOString().slice(0, 10);
    days.push({ d: key, n: series.find((r) => r.d === key)?.n ?? 0 });
  }
  const max = Math.max(1, ...days.map((r) => r.n));
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <p className="mb-3 text-sm font-bold">{title}</p>
      <div className="flex h-28 items-end gap-1">
        {days.map((r) => (
          <div key={r.d} className="group relative flex-1" title={`${r.d}: ${r.n}`}>
            <div className={`${bar} rounded-t`} style={{ height: `${Math.round((r.n / max) * 104) || 2}px` }} />
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[10px] text-gray-400">
        <span>{days[0].d.slice(5)}</span>
        <span className="font-semibold text-gray-600">peak {max}</span>
        <span>{days[days.length - 1].d.slice(5)}</span>
      </div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <p className="mb-2 text-sm font-bold">{title}</p>
      {children}
    </div>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return <p className="py-4 text-sm text-gray-400">{children}</p>;
}
