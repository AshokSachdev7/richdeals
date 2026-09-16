import type { DealDTO } from "@deals/shared";
import JsonLd from "./JsonLd";

// E-GEO patterns 3 + 4: labelled bullets and a visible buyer-question FAQ, so hub
// pages carry quotable passages instead of one prose paragraph. No fabricated facts —
// every line here is traceable to how the site actually works.

export type Faq = { q: string; a: string };
export type Bullet = { label: string; text: string };

// Recency signal derived from real rows only, never a hardcoded month stamp.
export function newestUpdated(items: DealDTO[]): string | null {
  const newest = items.reduce((m, d) => (d.createdAt > m ? d.createdAt : m), "");
  if (!newest) return null;
  return new Date(newest).toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function HubBullets({ bullets, updated }: { bullets: Bullet[]; updated: string | null }) {
  return (
    <>
      <ul className="mb-3 max-w-2xl space-y-1.5 text-sm leading-relaxed text-gray-700">
        {bullets.map((b) => (
          <li key={b.label}>
            <span className="font-semibold text-gray-900">{b.label}:</span> {b.text}
          </li>
        ))}
      </ul>
      {updated && <p className="mb-4 text-xs text-gray-500">Newest listing on this page added {updated} (IST).</p>}
    </>
  );
}

export function HubFaq({ faq }: { faq: Faq[] }) {
  if (!faq.length) return null;
  return (
    <section className="mt-10 border-t border-gray-200 pt-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <h2 className="mb-4 text-lg font-bold">Frequently asked questions</h2>
      <dl className="max-w-2xl space-y-4">
        {faq.map((f) => (
          <div key={f.q}>
            <dt className="text-sm font-semibold text-gray-900">{f.q}</dt>
            <dd className="mt-1 text-sm leading-relaxed text-gray-600">{f.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
