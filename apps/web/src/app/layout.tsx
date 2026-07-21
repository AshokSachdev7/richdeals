import type { Metadata } from "next";
import Link from "next/link";
import { Rubik, Nunito_Sans } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import SiteHeader from "@/components/SiteHeader";
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
        <JsonLd data={orgSchema} />
        <JsonLd data={websiteSchema} />

        <SiteHeader />

        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>

        <footer className="mt-16 border-t border-gray-200 bg-white">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 text-sm sm:grid-cols-3">
            <div>
              <div className="font-display text-xl font-bold text-brand">{SITE_NAME}</div>
              <p className="mt-3 max-w-xs leading-relaxed text-gray-500">
                {SITE_TAGLINE}. Verified deals, live prices, updated all day.
              </p>
            </div>
            <div>
              <h4 className="mb-3 font-display font-bold text-ink">Site</h4>
              <ul className="space-y-2 text-gray-500">
                <li><Link href="/about" className="transition-colors hover:text-brand">About</Link></li>
                <li><Link href="/privacy" className="transition-colors hover:text-brand">Privacy Policy</Link></li>
                <li><Link href="/terms" className="transition-colors hover:text-brand">Terms</Link></li>
                <li><Link href="/contact" className="transition-colors hover:text-brand">Contact</Link></li>
                <li><Link href="/sitemap.xml" className="transition-colors hover:text-brand">Sitemap</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 font-display font-bold text-ink">Follow</h4>
              <ul className="space-y-2 text-gray-500">
                <li>
                  <a href={`https://t.me/${SITE_NAME.toLowerCase()}`} target="_blank" rel="noopener" className="transition-colors hover:text-brand">
                    Telegram Channel
                  </a>
                </li>
                <li>
                  <a href={`https://twitter.com/${SITE_NAME.toLowerCase()}`} target="_blank" rel="noopener" className="transition-colors hover:text-brand">
                    Twitter / X
                  </a>
                </li>
                <li>
                  <a href={absUrl("/feed.xml")} className="transition-colors hover:text-brand">RSS Feed</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 py-5 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} {SITE_NAME}. All prices/offers subject to change. We may earn a commission on purchases.
          </div>
        </footer>
      </body>
    </html>
  );
}
