// CPA / signup offers — the high-payout money offers (₹100–2000 per signup).
// Swap `url` with your real affiliate link from INRDeals / Cuelinks / vCommission
// once approved. `live:false` hides an offer until its real link is in.
export type Offer = {
  slug: string;
  name: string;
  category: string;
  payout: string; // shown as the hook, e.g. "Earn ₹1,000"
  blurb: string;
  cta: string;
  url: string; // REAL affiliate link goes here
  color: string; // tailwind gradient classes
  live: boolean;
};

export const OFFERS: Offer[] = [
  { slug: 'best-credit-cards', name: 'Apply for a Credit Card', category: 'Credit Cards', payout: 'Up to ₹1,500 reward', blurb: 'Top lifetime-free & rewards credit cards in India — instant approval options.', cta: 'Apply Now', url: '#', color: 'from-indigo-500 to-indigo-700', live: false },
  { slug: 'demat-account', name: 'Open a Demat / Trading Account', category: 'Investing', payout: 'Free account + bonus', blurb: 'Start investing in stocks & mutual funds — zero-brokerage delivery options.', cta: 'Open Free Account', url: '#', color: 'from-emerald-500 to-emerald-700', live: false },
  { slug: 'savings-account', name: 'Open a Zero-Balance Savings Account', category: 'Banking', payout: 'Instant + cashback', blurb: 'Digital savings accounts with no minimum balance and instant activation.', cta: 'Open Now', url: '#', color: 'from-sky-500 to-sky-700', live: false },
  { slug: 'personal-loan', name: 'Instant Personal Loan', category: 'Loans', payout: 'Up to ₹2,000', blurb: 'Quick personal loans with instant approval and same-day disbursal.', cta: 'Check Eligibility', url: '#', color: 'from-rose-500 to-rose-700', live: false },
  { slug: 'amazon-prime', name: 'Amazon Prime Membership', category: 'Shopping', payout: 'Free trial', blurb: 'Free & fast delivery, Prime Video, and exclusive deal early access.', cta: 'Start Free Trial', url: '#', color: 'from-amber-500 to-amber-700', live: false },
  { slug: 'insurance', name: 'Compare & Buy Insurance', category: 'Insurance', payout: 'Up to ₹800', blurb: 'Health, term & car insurance — compare plans and save on premiums.', cta: 'Get Quotes', url: '#', color: 'from-teal-500 to-teal-700', live: false },
];
