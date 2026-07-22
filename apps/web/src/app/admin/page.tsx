import type { Metadata } from "next";
import type { DealDTO } from "@deals/shared";
import { formatINR } from "@/lib/site";
import { isAuthed, login, logout, setStatus, remove } from "./actions";

export const metadata: Metadata = { title: "Admin — RichDeals", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const API = process.env.API_INTERNAL_URL || "http://localhost:4000";
const STATUSES = ["ALL", "LIVE", "PENDING_REVIEW", "EXPIRED", "DRAFT"] as const;

async function fetchDeals(status: string, q: string): Promise<DealDTO[]> {
  const params = new URLSearchParams({ limit: "100" });
  if (status && status !== "ALL") params.set("status", status);
  if (q) params.set("q", q);
  const res = await fetch(`${API}/admin/deals?${params}`, {
    headers: { "x-admin-key": process.env.ADMIN_KEY || "" },
    cache: "no-store",
  });
  if (!res.ok) return [];
  return (await res.json()).deals ?? [];
}

export default async function AdminPage({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const sp = await searchParams;
  const authed = await isAuthed();

  if (!authed) {
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
          {sp.e && <p className="text-xs font-medium text-red-600">Wrong key.</p>}
        </form>
      </div>
    );
  }

  const status = sp.status || "ALL";
  const q = sp.q || "";
  const deals = await fetchDeals(status, q);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold">Admin — Deals</h1>
        <form action={logout}>
          <button className="text-sm text-gray-500 underline">Logout</button>
        </form>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        {STATUSES.map((s) => (
          <a
            key={s}
            href={`/admin?status=${s}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              status === s ? "bg-brand text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {s}
          </a>
        ))}
        <form action="/admin" className="ml-auto flex gap-2">
          <input type="hidden" name="status" value={status} />
          <input
            name="q"
            defaultValue={q}
            placeholder="Search title…"
            className="rounded-lg border border-gray-300 px-3 py-1 text-sm focus:border-brand focus:outline-none"
          />
        </form>
      </div>

      <p className="mb-2 text-sm text-gray-500">{deals.length} deal(s)</p>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-3 py-2">#</th>
              <th className="px-3 py-2">Image</th>
              <th className="px-3 py-2">Title</th>
              <th className="px-3 py-2">Store</th>
              <th className="px-3 py-2">Price</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((d) => (
              <tr key={d.id} className="border-t border-gray-100 hover:bg-gray-50/60">
                <td className="px-3 py-2 text-gray-400">{d.id}</td>
                <td className="px-3 py-2">
                  <div className="relative h-10 w-10 overflow-hidden rounded bg-gray-50">
                    {/* plain img: admin lists deals from many marketplace CDNs; next/image host allowlist would crash on any new host */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {d.image && <img src={d.image} alt="" className="h-full w-full object-contain" loading="lazy" />}
                  </div>
                </td>
                <td className="max-w-[280px] px-3 py-2">
                  <a href={`/${d.slug}`} target="_blank" className="line-clamp-2 font-medium hover:text-brand">
                    {d.title}
                  </a>
                </td>
                <td className="px-3 py-2 text-gray-600">{d.store.name}</td>
                <td className="px-3 py-2 tabular-nums">
                  {d.price != null ? formatINR(d.price) : "—"}
                  {d.mrp != null && d.mrp !== d.price && (
                    <span className="ml-1 text-xs text-gray-400 line-through">{formatINR(d.mrp)}</span>
                  )}
                </td>
                <td className="px-3 py-2">
                  <StatusBadge status={d.status} />
                </td>
                <td className="px-3 py-2">
                  <div className="flex items-center justify-end gap-1">
                    {d.status !== "LIVE" && (
                      <form action={setStatus.bind(null, d.id, "LIVE")}>
                        <button className="rounded bg-green-600 px-2 py-1 text-xs font-semibold text-white hover:bg-green-700">
                          Approve
                        </button>
                      </form>
                    )}
                    {d.status !== "EXPIRED" && (
                      <form action={setStatus.bind(null, d.id, "EXPIRED")}>
                        <button className="rounded bg-amber-500 px-2 py-1 text-xs font-semibold text-white hover:bg-amber-600">
                          Expire
                        </button>
                      </form>
                    )}
                    <form action={remove.bind(null, d.id)}>
                      <button className="rounded bg-red-600 px-2 py-1 text-xs font-semibold text-white hover:bg-red-700">
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    LIVE: "bg-green-100 text-green-700",
    PENDING_REVIEW: "bg-blue-100 text-blue-700",
    EXPIRED: "bg-gray-200 text-gray-600",
    DRAFT: "bg-yellow-100 text-yellow-700",
  };
  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${map[status] || "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
}
