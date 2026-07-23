// CPA / signup money offers — real INRDeals tracking links (id=inr678975705).
// `hook` = the USER-FACING benefit shown on the card (what the customer gets).
// NEVER put our INRDeals commission here — it's not what the visitor earns and
// it leaks our margin. `live:false` hides an offer; only `live && url!=='#'`
// render on /offers.
export type Offer = {
  slug: string;
  name: string;
  category: string;
  hook: string; // user-facing benefit shown as the card hero
  blurb: string;
  cta: string;
  url: string; // real affiliate tracking link
  color: string; // tailwind gradient classes
  live: boolean;
};

const T = (path: string) =>
  `https://inr.deals/track?id=inr678975705&src=merchant-backend&${path}`;

export const OFFERS: Offer[] = [
  // ── Insurance ──
  { slug: 'acko-health-insurance', name: 'Acko Health Insurance', category: 'Insurance', hook: 'Cashless health cover', blurb: 'Buy a health plan online in minutes — no agents, cashless claims, low premiums.', cta: 'Get Covered', url: T('campaign=cpa&url=https://www.acko.com/p/health/semBuyV3'), color: 'from-teal-500 to-teal-700', live: true },

  // ── Credit Cards ──
  { slug: 'hsbc-credit-card', name: 'HSBC Credit Card', category: 'Credit Cards', hook: 'Lifetime-free + rewards', blurb: 'Premium rewards & travel benefits with a lifetime-free HSBC card. Quick online approval.', cta: 'Apply Now', url: T('campaign=cpa&url=https://www.accountopening.hsbc.co.in/credit-cards/'), color: 'from-indigo-500 to-indigo-700', live: true },
  { slug: 'sbi-simplyclick-card', name: 'SBI SimplyCLICK Credit Card', category: 'Credit Cards', hook: '10X rewards online', blurb: 'Best card for online shoppers — 10X reward points on Amazon, BookMyShow & more.', cta: 'Apply Now', url: T('campaign=cpa_lead&url=https://www.sbicard.com'), color: 'from-blue-500 to-blue-700', live: true },
  { slug: 'axis-bank-credit-card', name: 'Axis Bank Credit Card', category: 'Credit Cards', hook: 'Cashback on every spend', blurb: 'Cashback and dining rewards on every spend — instant digital approval.', cta: 'Apply Now', url: T('campaign=cpl&url=https://web.axis.bank.in/DigitalChannel/WebForm/'), color: 'from-rose-500 to-rose-700', live: true },
  { slug: 'indusind-credit-card', name: 'IndusInd Credit Card', category: 'Credit Cards', hook: 'Lifetime-free + lounge access', blurb: 'Lifetime-free card with airport lounge access and fuel surcharge waiver.', cta: 'Apply Now', url: T('campaign=cpa&url=https://induseasycredit.indusind.bank.in/'), color: 'from-fuchsia-500 to-fuchsia-700', live: true },

  // ── Banking ──
  { slug: 'indusind-savings-account', name: 'IndusInd Savings Account', category: 'Banking', hook: 'Zero-balance, instant', blurb: 'Open a zero-balance digital savings account online — instant activation, high interest.', cta: 'Open Free', url: T('campaign=cpl&url=https://myaccount.indusind.bank.in/savingsaccount/index.aspx'), color: 'from-sky-500 to-sky-700', live: true },

  // ── Investing / Demat ──
  { slug: 'paytm-money-demat', name: 'Paytm Money Demat Account', category: 'Investing', hook: 'Zero-commission delivery', blurb: 'Start investing in stocks & mutual funds with zero-commission delivery trades.', cta: 'Open Free Account', url: T('campaign=cpa&url=https://www.paytmmoney.com/'), color: 'from-emerald-500 to-emerald-700', live: true },
  { slug: 'angel-one-demat', name: 'Angel One Demat Account', category: 'Investing', hook: 'Free demat account', blurb: 'Free demat + trading account with flat brokerage and a smart trading app.', cta: 'Open Free Account', url: T('campaign=cpl&url=https://www.angelone.in/register/'), color: 'from-green-500 to-green-700', live: true },

  // ── Loans ──
  { slug: 'moneyview-personal-loan', name: 'MoneyView Personal Loan', category: 'Loans', hook: 'Instant loan up to ₹10L', blurb: 'Instant personal loan up to ₹10 lakh — minimal paperwork, same-day disbursal.', cta: 'Check Eligibility', url: T('campaign=cpa&url=https://moneyview.in'), color: 'from-amber-500 to-amber-700', live: true },
];
