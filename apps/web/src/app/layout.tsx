import type { Metadata } from "next";
import Link from "next/link";
import { Rubik, Nunito_Sans } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import SiteHeader from "@/components/SiteHeader";
import Analytics from "@/components/Analytics";
import { SITE_NAME, SITE_URL, SITE_TAGLINE, absUrl } from "@/lib/site";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-rubik",
  display: "swap",
});

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: `${SITE_NAME} brings you the best online deals, discount coupons, freebies and loot offers from Amazon, Flipkart and more — updated daily.`,
  applicationName: SITE_NAME,
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": absUrl("/feed.xml") },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
  },
  twitter: { card: "summary_large_image", title: SITE_NAME },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: absUrl("/logo.png"),
    sameAs: [
      "https://t.me/" + SITE_NAME.toLowerCase(),
      "https://twitter.com/" + SITE_NAME.toLowerCase(),
    ],
  };
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" className={`${rubik.variable} ${nunito.variable}`}>
      <body>
        <Analytics />
        <JsonLd data={orgSchema} />
        <JsonLd data={websiteSchema} />

        <SiteHeader />

        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>

        <footer className="mt-16 border-t border-gray-200 bg-gradient-to-b from-white to-gray-50">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 text-sm sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
            {/* Brand + logo */}
            <div>
              <Link href="/" className="inline-flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo-mark.svg" alt="" className="h-9 w-9" />
                <span className="font-display text-xl font-extrabold tracking-tight">
                  <span className="text-ink">Rich</span><span className="text-brand">Deals</span>
                </span>
              </Link>
              <p className="mt-4 max-w-xs leading-relaxed text-gray-500">
                {SITE_TAGLINE}. Handpicked, verified deals with live prices from Amazon, Flipkart &amp; 100+ Indian stores — updated all day.
              </p>
              <a
                href="https://web.telegram.org/a/#-1004416895404"
                target="_blank"
                rel="noopener"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-bold text-white shadow-sm transition-all hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M21.9 4.3 18.7 19.4c-.24 1.06-.87 1.32-1.76.82l-4.86-3.58-2.35 2.26c-.26.26-.48.48-.98.48l.35-4.94 9-8.13c.39-.35-.09-.54-.6-.19L5.9 13.5l-4.8-1.5c-1.04-.32-1.06-1.04.22-1.54l18.8-7.24c.87-.32 1.63.19 1.35 1.42z" />
                </svg>
                Join Telegram
              </a>
            </div>

            {/* Site links */}
            <div>
              <h4 className="mb-3 font-display font-bold text-ink">Site</h4>
              <ul className="space-y-2.5 text-gray-500">
                <li><Link href="/" className="transition-colors hover:text-brand">Home</Link></li>
                <li><Link href="/categories" className="transition-colors hover:text-brand">Categories</Link></li>
                <li><Link href="/stores" className="transition-colors hover:text-brand">Stores</Link></li>
                <li><Link href="/coupons" className="transition-colors hover:text-brand">Coupons</Link></li>
                <li><Link href="/blog" className="transition-colors hover:text-brand">Blog</Link></li>
                <li><a href={absUrl("/feed.xml")} className="transition-colors hover:text-brand">RSS Feed</a></li>
              </ul>
            </div>

            {/* Legal / company */}
            <div>
              <h4 className="mb-3 font-display font-bold text-ink">Company</h4>
              <ul className="space-y-2.5 text-gray-500">
                <li><Link href="/about" className="transition-colors hover:text-brand">About Us</Link></li>
                <li><Link href="/privacy" className="transition-colors hover:text-brand">Privacy Policy</Link></li>
                <li><Link href="/terms" className="transition-colors hover:text-brand">Terms of Use</Link></li>
                <li><Link href="/disclosure" className="transition-colors hover:text-brand">Affiliate Disclosure</Link></li>
                <li><Link href="/sitemap.xml" className="transition-colors hover:text-brand">Sitemap</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 py-5 text-center text-xs leading-relaxed text-gray-400">
            © {new Date().getFullYear()} {SITE_NAME}. All prices &amp; offers are subject to change and were accurate at the time of publishing.
            <br className="sm:hidden" /> As an affiliate we may earn a commission on qualifying purchases.
          </div>
        </footer>
      </body>
    </html>
  );
}
