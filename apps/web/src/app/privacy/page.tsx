import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_NAME, absUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE_NAME} collects, uses and protects your information, including cookies and third-party advertising.`,
  alternates: { canonical: absUrl("/privacy") },
};

export default function PrivacyPage() {
  return (
    <div>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Privacy Policy", href: "/privacy" }]} />
      <article className="prose-deals mx-auto max-w-3xl">
        <h1 className="text-2xl font-extrabold text-ink">Privacy Policy</h1>
        <p className="mt-2 text-sm text-gray-500">Last updated: {new Date().getFullYear()}</p>

        <div className="mt-6 space-y-5 text-sm leading-relaxed text-gray-700">
          <p>
            {SITE_NAME} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) operates this website as a deals and coupons
            aggregator. This policy explains what information we collect and how it is used.
          </p>

          <div>
            <h2 className="mb-1 font-display text-lg font-bold text-ink">Information we collect</h2>
            <p>
              We do not require you to create an account or submit personal details to browse deals. We
              collect standard, non-identifying analytics — such as pages viewed, approximate region,
              browser type and referring site — to understand traffic and improve the site.
            </p>
          </div>

          <div>
            <h2 className="mb-1 font-display text-lg font-bold text-ink">Cookies &amp; advertising</h2>
            <p>
              We use cookies for analytics and to serve advertising. Third-party vendors, including Google,
              use cookies to serve ads based on your prior visits to this and other websites. Google&rsquo;s
              use of advertising cookies enables it and its partners to serve ads to you based on your visits.
              You can opt out of personalised advertising by visiting{" "}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener" className="text-brand hover:underline">Google Ads Settings</a>.
            </p>
          </div>

          <div>
            <h2 className="mb-1 font-display text-lg font-bold text-ink">Affiliate links</h2>
            <p>
              Many outbound links on {SITE_NAME} are affiliate links. If you buy through them we may earn a
              commission at no extra cost to you. We do not receive your payment or personal purchase data —
              transactions happen entirely on the retailer&rsquo;s site under their own privacy policy.
            </p>
          </div>

          <div>
            <h2 className="mb-1 font-display text-lg font-bold text-ink">Your choices</h2>
            <p>
              You can disable cookies in your browser settings. Doing so will not prevent you from browsing
              deals but may limit some analytics and personalised advertising.
            </p>
          </div>

          <div>
            <h2 className="mb-1 font-display text-lg font-bold text-ink">Contact</h2>
            <p>Questions about this policy? Reach us via our Telegram channel linked in the footer.</p>
          </div>
        </div>
      </article>
    </div>
  );
}
