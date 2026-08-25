import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_NAME, absUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${SITE_NAME} — report a dead deal or a wrong price, ask about our affiliate disclosure, or send a partnership enquiry.`,
  alternates: { canonical: absUrl("/contact") },
};

const TELEGRAM = "https://t.me/richdealsindia";

export default function ContactPage() {
  return (
    <div>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }]} />
      <article className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-extrabold text-ink">Contact {SITE_NAME}</h1>
        <div className="mt-6 space-y-5 text-sm leading-relaxed text-gray-700">
          <p>
            We read everything that comes in. The fastest way to reach a human is our Telegram channel — deal
            corrections posted there usually get fixed the same day.
          </p>

          <div>
            <h2 className="mb-1 font-display text-lg font-bold text-ink">Telegram</h2>
            <p>
              <a
                href={TELEGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand hover:underline"
              >
                Join the {SITE_NAME} channel
              </a>{" "}
              and message us there. This is our primary support channel.
            </p>
          </div>

          <div>
            <h2 className="mb-1 font-display text-lg font-bold text-ink">What to contact us about</h2>
            <ul className="list-inside list-disc space-y-1">
              <li>A deal is dead, sold out, or the price no longer matches what we published.</li>
              <li>A product link points to the wrong item.</li>
              <li>Questions about our <a href="/disclosure" className="text-brand hover:underline">affiliate disclosure</a> or <a href="/privacy" className="text-brand hover:underline">privacy policy</a>.</li>
              <li>Brand, store or partnership enquiries.</li>
              <li>Copyright or content removal requests.</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-1 font-display text-lg font-bold text-ink">Reporting a wrong price</h2>
            <p>
              Prices on Indian marketplaces change through the day. Include the deal page URL and what the
              retailer is showing you now — that is enough for us to re-check and update or expire the page.
            </p>
          </div>

          <div>
            <h2 className="mb-1 font-display text-lg font-bold text-ink">Submitting a deal</h2>
            <p>
              Found something good? Post it yourself at{" "}
              <a href="/submit" className="text-brand hover:underline">/submit</a> — approved submissions go live
              on the site.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
