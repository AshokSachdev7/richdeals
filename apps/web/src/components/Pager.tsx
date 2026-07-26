import Link from "next/link";

// Crawlable "next page" link for the cursor-paginated listings. Without it
// every deal past the first page is orphaned — reachable only through the
// client-side Load More fetch, which no crawler runs.
export default function Pager({
  basePath,
  cursor,
  params = {},
}: {
  basePath: string;
  cursor: number | null;
  params?: Record<string, string | undefined>;
}) {
  if (cursor == null) return null;
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) if (v) sp.set(k, v);
  sp.set("cursor", String(cursor));

  return (
    <nav className="mt-8 flex justify-center" aria-label="Pagination">
      <Link
        href={`${basePath}?${sp.toString()}`}
        rel="next"
        className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-ink px-8 text-sm font-bold text-white shadow-lg transition-colors hover:bg-ink-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
      >
        Next page
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </nav>
  );
}
