// CPA / signup money offers — real INRDeals tracking links (id=inr678975705).
// Payout = what INRDeals pays us per approved signup/sale. `live:false` hides
// an offer; only `live && url!=='#'` render on /offers.
export type Offer = {
  slug: string;
  name: string;
  category: string;
  payout: string; // hook shown on the card
  blurb: string;
  cta: string;
  url: string; // real affiliate tracking link
  color: string; // tailwind gradient classes
  live: boolean;
};

const T = (path: string) =>
  `https://inr.deals/track?id=inr678975705&src=merchant-backend&${path}`;

export const OFFERS: Offer[] = [
  // ── Insurance (highest payout) ──
  { slug: 'acko-health-insurance', name: 'Acko Health Insurance', category: 'Insurance', payout: 'Earn ₹5,000', blurb: 'Buy a health plan online in minutes — no agents, cashless claims, low premiums.', cta: 'Get Covered', url: T('campaign=cpa&url=https://www.acko.com/p/health/semBuyV3'), color: 'from-teal-500 to-teal-700', live: true },

  // ── Credit Cards ──
  { slug: 'hsbc-credit-card', name: 'HSBC Credit Card', category: 'Credit Cards', payout: 'Earn ₹2,400', blurb: 'Premium rewards & travel benefits with a lifetime-free HSBC card. Quick online approval.', cta: 'Apply Now', url: T('campaign=cpa&url=https://www.accountopening.hsbc.co.in/credit-cards/'), color: 'from-indigo-500 to-indigo-700', live: true },
  { slug: 'sbi-simplyclick-card', name: 'SBI SimplyCLICK Credit Card', category: 'Credit Cards', payout: 'Earn ₹2,160', blurb: 'Best card for online shoppers — 10X reward points on Amazon, BookMyShow & more.', cta: 'Apply Now', url: T('campaign=cpa_lead&url=https://www.sbicard.com'), color: 'from-blue-500 to-blue-700', live: true },
  { slug: 'axis-bank-credit-card', name: 'Axis Bank Credit Card', category: 'Credit Cards', payout: 'Earn ₹1,725', blurb: 'Cashback and dining rewards on every spend — instant digital approval.', cta: 'Apply Now', url: T('campaign=cpl&url=https://web.axis.bank.in/DigitalChannel/WebForm/'), color: 'from-rose-500 to-rose-700', live: true },
  { slug: 'indusind-credit-card', name: 'IndusInd Credit Card', category: 'Credit Cards', payout: 'Earn ₹1,520', blurb: 'Lifetime-free card with airport lounge access and fuel surcharge waiver.', cta: 'Apply Now', url: T('campaign=cpa&url=https://induseasycredit.indusind.bank.in/'), color: 'from-fuchsia-500 to-fuchsia-700', live: true },

  // ── Banking ──
  { slug: 'indusind-savings-account', name: 'IndusInd Savings Account', category: 'Banking', payout: 'Earn ₹720', blurb: 'Open a zero-balance digital savings account online — instant activation, high interest.', cta: 'Open Free', url: T('campaign=cpl&url=https://myaccount.indusind.bank.in/savingsaccount/index.aspx'), color: 'from-sky-500 to-sky-700', live: true },

  // ── Investing / Demat ──
  { slug: 'paytm-money-demat', name: 'Paytm Money Demat Account', category: 'Investing', payout: 'Earn ₹455', blurb: 'Start investing in stocks & mutual funds with zero-commission delivery trades.', cta: 'Open Free Account', url: T('campaign=cpa&url=https://www.paytmmoney.com/'), color: 'from-emerald-500 to-emerald-700', live: true },
  { slug: 'angel-one-demat', name: 'Angel One Demat Account', category: 'Investing', payout: 'Earn ₹288', blurb: 'Free demat + trading account with flat brokerage and a smart trading app.', cta: 'Open Free Account', url: T('campaign=cpl&url=https://www.angelone.in/register/'), color: 'from-green-500 to-green-700', live: true },

  // ── Loans ──
  { slug: 'moneyview-personal-loan', name: 'MoneyView Personal Loan', category: 'Loans', payout: 'Earn ₹512', blurb: 'Instant personal loan up to ₹10 lakh — minimal paperwork, same-day disbursal.', cta: 'Check Eligibility', url: T('campaign=cpa&url=https://moneyview.in'), color: 'from-amber-500 to-amber-700', live: true },
];
