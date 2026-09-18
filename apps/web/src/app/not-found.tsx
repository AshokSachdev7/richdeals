import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

// ponytail: Next's built-in 404 is a dead end — no links, no crawl paths out.
// This keeps the layout chrome and hands both users and crawlers the hubs.
// Canonical/robots stay with the root layout: Next emits its own
// <meta name="robots" content="noindex"> for not-found, which wins.
const LINKS = [
  { href: "/offers", label: "All live deals" },
  { href: "/categories", label: "Browse categories" },
  { href: "/stores", label: "Browse stores" },
  { href: "/coupons", label: "Coupons" },
  { href: "/freebies", label: "Freebies" },
  { href: "/blog", label: "Deal guides & blog" },
];

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl py-12 text-center">
      <p className="font-display text-5xl font-extrabold text-brand">404</p>
      <h1 className="mt-3 text-2xl font-extrabold text-ink">This page is not here</h1>
      <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-gray-700">
        The link may be broken, or the page may have moved. Expired deals stay live on {SITE_NAME} with an
        EXPIRED banner, so a missing page usually means a mistyped URL.
      </p>
      <ul className="mt-8 grid grid-cols-2 gap-3 text-left text-sm sm:grid-cols-3">
        {LINKS.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="block rounded-lg border border-gray-200 px-3 py-2 font-medium text-ink hover:border-brand hover:text-brand"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm">
        <Link href="/" className="text-brand hover:underline">
          ← Back to the {SITE_NAME} homepage
        </Link>
      </p>
    </div>
  );
}
