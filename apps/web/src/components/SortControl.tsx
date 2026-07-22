"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

const OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "discount", label: "Biggest Discount" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
] as const;

const VALUES = OPTIONS.map((o) => o.value);

// Styled <select> that updates ?sort= in the URL, preserving other params.
// Server components re-render from searchParams — no client fetch needed.
export default function SortControl() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get("sort");
  const value = VALUES.includes(current as never) ? current! : "newest";

  function onChange(next: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (next === "newest") params.delete("sort");
    else params.set("sort", next);
    const q = params.toString();
    router.push(q ? `${pathname}?${q}` : pathname, { scroll: false });
  }

  return (
    <label className="flex items-center gap-2 text-sm font-semibold text-ink-soft">
      <span className="whitespace-nowrap">Sort by</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-ink shadow-sm transition-colors hover:border-brand/50 focus:border-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
      >
        {OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
