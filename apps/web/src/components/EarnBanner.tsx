import Link from "next/link";

// Homepage strip for the member rewards programme. Copy must stay in step with
// POINTS in apps/api/src/auth/auth.service.ts and the /account page — every figure
// here is a real payout, not marketing.
// ponytail: static markup, no image, no client JS. The generated 1200x630 PNG
// (gen-earn-banner.mjs) is for Telegram/social, not for this slot.
const WAYS = [
  { label: "Sign up", when: "once" },
  { label: "Check in", when: "every day" },
  { label: "Send a deal", when: "when it goes live" },
  { label: "Refer a friend", when: "per friend" },
];

export default function EarnBanner() {
  return (
    <section
      aria-labelledby="earn-heading"
      className="overflow-hidden rounded-3xl bg-ink text-white ring-1 ring-inset ring-white/10"
    >
      <div className="relative grid gap-6 px-5 py-8 sm:px-9 sm:py-10 lg:grid-cols-[1.25fr_1fr] lg:items-center">
        {/* Oversized rupee glyph, clipped by the card — cheap depth, no image request */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-6 -top-14 select-none font-display text-[15rem] font-extrabold leading-none text-savings/10"
        >
          ₹
        </span>

        <div className="relative">
          <span className="inline-flex rounded-full bg-savings px-3 py-1 font-display text-[11px] font-extrabold uppercase tracking-widest text-ink">
            Member rewards
          </span>
          <h2 id="earn-heading" className="mt-4 font-display text-2xl font-extrabold sm:text-3xl">
            Earn money online — free, no investment.
          </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-white/70">
            Find a deal, earn ₹1. Daily check-in, refer and earn, deal submissions — 1 point = ₹1,
            no conversion maths. At 100 points you cash out for a free Amazon gift-card code, sent
            by hand within 3 working days. No fee to join, ever.
          </p>
          <Link
            href="/account"
            className="mt-6 inline-flex rounded-xl bg-brand px-6 py-3 font-display text-sm font-extrabold text-white shadow-lg shadow-brand/25 transition-colors hover:bg-brand-dark"
          >
            Join free → +1 point
          </Link>
        </div>

        <ul className="relative space-y-px">
          {WAYS.map((w) => (
            <li
              key={w.label}
              className="flex items-baseline gap-3 border-t border-white/10 py-3 first:border-t-0"
            >
              <span className="flex-1 text-sm font-bold">{w.label}</span>
              <span className="text-xs text-white/45">{w.when}</span>
              <span className="font-display text-lg font-extrabold tabular-nums text-savings">
                +₹1
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
