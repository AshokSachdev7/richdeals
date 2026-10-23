// "Alternatives to X" pages for the big Indian deal sites. Competitor facts are
// limited to what each site says about itself on its own homepage (title/meta,
// checked 2026-10-23) plus features anyone can see without an account — no
// traffic numbers, no rankings we can't source. RichDeals is ours and the page
// says so.

export type Site = {
  key: string;
  name: string;
  url: string; // internal path for RichDeals, external homepage otherwise
  bestFor: string;
  pros: string[];
  cons: string[];
};

export const SITES: Record<string, Site> = {
  richdeals: {
    key: "richdeals",
    name: "RichDeals",
    url: "/",
    bestFor: "Price-checked deals from every Indian store, with nothing to sign up for",
    pros: [
      "Every price is re-read on the store's product page before the deal goes live",
      "Covers Amazon, Flipkart, Myntra, Ajio, Croma, Nykaa, Shopsy, brand stores and more",
      "Free to browse with no account; deals also go out on the RichDeals Telegram channel",
      "Expired deals stay online with an EXPIRED banner, so old links never break",
    ],
    cons: [
      "No cashback wallet — you get the store's own price, not extra cashback on top",
      "Newer and smaller community than the long-running forums",
    ],
  },
  desidime: {
    key: "desidime",
    name: "DesiDime",
    url: "https://www.desidime.com/",
    bestFor: "Community voting and discussion on deals",
    pros: [
      "Members post, vote on and discuss deals, so popular ones rise fast",
      "Says it lists coupons and offers from 1,500+ stores",
      "Forum threads on credit cards, bank offers and shopping questions",
    ],
    cons: [
      "Feed mixes product deals with gift-card, quiz and app-promo posts",
      "Community-posted prices can change before you open the deal",
    ],
  },
  freekaamaal: {
    key: "freekaamaal",
    name: "FreeKaaMaal",
    url: "https://freekaamaal.com/",
    bestFor: "Freebies plus cashback on top of deals",
    pros: [
      "Long-running Indian site for deals, freebies and coupons",
      "Cashback on purchases made through its store links",
    ],
    cons: [
      "Cashback needs an account and is confirmed only after the store's return window",
      "Freebie posts can close quickly once stock runs out",
    ],
  },
  indiafreestuff: {
    key: "indiafreestuff",
    name: "IndiaFreeStuff",
    url: "https://indiafreestuff.in/",
    bestFor: "Fast-moving loot deals and freebies",
    pros: [
      "High volume of Amazon and Flipkart loot deals posted through the day",
      "Freebies, JioMart coupons and Myntra/Ajio discounts in one feed",
      "Has a browser extension for deal alerts",
    ],
    cons: [
      "Loot prices move quickly, so the listed price is often gone by the time you click",
      "Heavy on Amazon and Flipkart compared with smaller stores",
    ],
  },
  dealsmagnet: {
    key: "dealsmagnet",
    name: "DealsMagnet",
    url: "https://www.dealsmagnet.com/",
    bestFor: "Hunting hidden Amazon price drops",
    pros: [
      "Amazon deal finder built for spotting hidden loot deals",
      "Deals, trending offers and discount coupons in one place",
    ],
    cons: [
      "Strongest on Amazon; thinner coverage of fashion and D2C brand stores",
    ],
  },
  cashkaro: {
    key: "cashkaro",
    name: "CashKaro",
    url: "https://cashkaro.com/",
    bestFor: "Earning cashback you can move to your bank account",
    pros: [
      "Says it covers 1,500+ sites with extra cashback",
      "Cashback can be transferred to a bank account",
    ],
    cons: [
      "Cashback, not deal-hunting: you still have to find the low price yourself",
      "Needs an account, and cashback takes weeks to confirm",
    ],
  },
  grabon: {
    key: "grabon",
    name: "GrabOn",
    url: "https://www.grabon.in/",
    bestFor: "Coupon and promo codes",
    pros: [
      "Large catalogue of coupon and promo codes across Indian stores",
      "Strong on food delivery, travel and service coupons",
    ],
    cons: [
      "Built around codes, not product price drops",
      "Some codes are new-user-only or bank-specific",
    ],
  },
  coupondunia: {
    key: "coupondunia",
    name: "CouponDunia",
    url: "https://www.coupondunia.in/",
    bestFor: "Coupons with cashback on top",
    pros: [
      "Coupons, promo codes and cashback on 1,500+ brands, by its own count",
      "Cashback can be moved to a bank account",
    ],
    cons: [
      "Cashback needs an account and a confirmation wait",
      "Fewer individual product deals than a deal feed",
    ],
  },
};

export type AlternativePage = {
  slug: string;
  competitor: string;
  seoTitle: string;
  seoDesc: string;
  h1: string;
  answer: string;
  about: string;
  picks: string[]; // keys into SITES, RichDeals first
  rows: { feature: string; us: string; them: string }[];
  sections: { h2: string; body: string }[];
  faqs: { q: string; a: string }[];
  updated: string;
};

const LINKS = [
  { href: "/offers", text: "Today's top deals" },
  { href: "/freebies", text: "Freebies & low-price finds" },
  { href: "/coupons", text: "Coupons" },
  { href: "/stores", text: "All stores" },
];
export { LINKS as ALT_LINKS };

export const ALTERNATIVES: AlternativePage[] = [
  {
    slug: "desidime",
    competitor: "DesiDime",
    seoTitle: "7 Best DesiDime Alternatives in India (2026)",
    seoDesc:
      "Looking for a site like DesiDime? Compare 7 DesiDime alternatives for deals, coupons and cashback in India, with honest pros and cons for each one (2026).",
    h1: "7 Best DesiDime Alternatives in India (2026)",
    answer:
      "The best DesiDime alternatives in India are RichDeals for price-checked deals from every store, IndiaFreeStuff and DealsMagnet for fast Amazon loot deals, FreeKaaMaal for freebies with cashback, CashKaro and CouponDunia for cashback, and GrabOn for coupon codes. Pick by what you use DesiDime for: deals, coupons or community.",
    about:
      "DesiDime describes itself as India's largest online shopping community. Members post deals, vote them up or down and discuss them in forum threads, and the site says it covers coupons and offers from 1,500+ stores. People look for an alternative when they want a cleaner feed of product deals, a second source to cross-check a price, or cashback on top.",
    picks: ["richdeals", "indiafreestuff", "freekaamaal", "dealsmagnet", "cashkaro", "grabon", "coupondunia"],
    rows: [
      { feature: "How deals are added", us: "Editors post deals after reading the product page", them: "Community members post and vote" },
      { feature: "Price check before listing", us: "Yes, every deal", them: "Depends on the member posting" },
      { feature: "Stores covered", us: "All Indian stores, incl. Myntra, Ajio, Shopsy, D2C brands", them: "1,500+ stores (its own figure)" },
      { feature: "Gift-card, quiz and app-promo posts", us: "Filtered out", them: "Mixed into the feed" },
      { feature: "Account needed to browse", us: "No", them: "No (needed to post or vote)" },
      { feature: "Cashback", us: "No", them: "No direct cashback wallet on deals" },
      { feature: "Community discussion", us: "Forum with deal votes and reports", them: "Large, active forum — its biggest strength" },
      { feature: "Telegram alerts", us: "Yes, t.me/richdealsindia", them: "Has an app and alerts" },
    ],
    sections: [
      {
        h2: "When DesiDime is still the right pick",
        body: "If you like reading what other buyers think before you order — whether a credit-card offer actually stacks, whether a seller is genuine, how a product held up — DesiDime's forum is hard to beat. Its voting also surfaces the most popular deals quickly. Keep it for discussion and use a second site to confirm the price.",
      },
      {
        h2: "Why people switch to RichDeals",
        body: "RichDeals is our own site, so weigh this accordingly. The difference is the price check: before a deal goes live we open the store's product page and confirm the price and stock, and we drop gift-card, quiz, recharge and app-promo posts that crowd community feeds. Deals come from every store we can find, not just Amazon and Flipkart, and there is nothing to sign up for.",
      },
      {
        h2: "Best DesiDime alternative for cashback",
        body: "DesiDime is a deal community, not a cashback site. If cashback is what you want, CashKaro and CouponDunia both pay cashback that can be moved to a bank account, and FreeKaaMaal adds cashback to its deals. A simple combination is to find the low price on a deal site, then check whether a cashback site adds anything for the same store.",
      },
    ],
    faqs: [
      {
        q: "What is the best alternative to DesiDime?",
        a: "For price-checked product deals from every store, RichDeals. For community discussion, DesiDime itself is still the strongest. For cashback, CashKaro or CouponDunia. For coupon codes, GrabOn.",
      },
      {
        q: "Is there a site like DesiDime without the junk posts?",
        a: "RichDeals filters out gift-card, quiz, recharge and app-promo posts and only lists single products whose price was confirmed on the store page.",
      },
      {
        q: "Does RichDeals give cashback like DesiDime or CashKaro?",
        a: "No. RichDeals lists the store's own deal price and links straight to the product. If you want cashback on top, use a cashback site such as CashKaro alongside it.",
      },
      {
        q: "Do I need an account to use RichDeals?",
        a: "No. All deals, freebies and coupons are free to browse without signing up. You can also follow the RichDeals Telegram channel for alerts.",
      },
    ],
    updated: "2026-10-23",
  },
  {
    slug: "freekaamaal",
    competitor: "FreeKaaMaal",
    seoTitle: "7 Best FreeKaaMaal Alternatives in India (2026)",
    seoDesc:
      "Sites like FreeKaaMaal for deals, freebies and cashback in India. Compare 7 FreeKaaMaal alternatives with honest pros, cons and who each site suits (2026).",
    h1: "7 Best FreeKaaMaal Alternatives in India (2026)",
    answer:
      "The best FreeKaaMaal alternatives are RichDeals for price-checked deals and low-price finds from every store, IndiaFreeStuff for loot deals and freebies, DesiDime for community-voted deals, CashKaro and CouponDunia for cashback, DealsMagnet for Amazon price drops and GrabOn for coupon codes.",
    about:
      "FreeKaaMaal is one of the older Indian deal sites, covering deals, freebies and coupons, with cashback paid on purchases made through its links. People look for an alternative when they want deals without creating a cashback account, a faster feed of live prices, or a second source to confirm a deal before buying.",
    picks: ["richdeals", "indiafreestuff", "desidime", "cashkaro", "coupondunia", "dealsmagnet", "grabon"],
    rows: [
      { feature: "Main focus", us: "Price-checked product deals", them: "Deals, freebies and cashback" },
      { feature: "Price check before listing", us: "Yes, every deal", them: "Not stated" },
      { feature: "Stores covered", us: "All Indian stores, incl. Myntra, Ajio, Shopsy, D2C brands", them: "Major Indian shopping sites" },
      { feature: "Account needed", us: "No", them: "Only for cashback" },
      { feature: "Cashback", us: "No", them: "Yes — its main extra" },
      { feature: "Freebies", us: "Freebies hub at /freebies", them: "Yes" },
      { feature: "Expired deals", us: "Stay online with an EXPIRED banner", them: "Not stated" },
      { feature: "Telegram alerts", us: "Yes, t.me/richdealsindia", them: "Has its own channels" },
    ],
    sections: [
      {
        h2: "When FreeKaaMaal is still the right pick",
        body: "If cashback matters to you, FreeKaaMaal pays it on purchases made through its links, which a pure deal site does not. Stick with it for stores where its cashback is generous, and remember cashback is confirmed only after the store's return window closes.",
      },
      {
        h2: "Why people use RichDeals alongside FreeKaaMaal",
        body: "RichDeals is our own site. We list the deal price you will actually see on the store page — each one is re-checked on the product page before it goes live — across Amazon, Flipkart, Myntra, Ajio, Shopsy, Nykaa and brand stores. There is no account, no wallet and no waiting period: you click through and pay the store's price.",
      },
      {
        h2: "Best FreeKaaMaal alternative for freebies",
        body: "For freebies and samples, IndiaFreeStuff posts a high volume of them, and RichDeals keeps a freebies and low-price hub. Free-sample offers in India usually close within hours once stock runs out, so following two sources and a Telegram channel catches more of them.",
      },
    ],
    faqs: [
      {
        q: "Which site is like FreeKaaMaal?",
        a: "RichDeals, IndiaFreeStuff and DesiDime cover similar deals and freebies. CashKaro and CouponDunia are the closest match for FreeKaaMaal's cashback side.",
      },
      {
        q: "Is there a FreeKaaMaal alternative without signup?",
        a: "Yes. RichDeals has no account at all — every deal, freebie and coupon is free to browse and links straight to the store.",
      },
      {
        q: "Which is better for cashback, FreeKaaMaal or CashKaro?",
        a: "Both pay cashback; rates differ by store and change often, so compare the rate for the specific store before you buy.",
      },
      {
        q: "Does RichDeals offer cashback?",
        a: "No. RichDeals shows the store's deal price and links to the product. You can still use a cashback site separately if you want extra savings.",
      },
    ],
    updated: "2026-10-23",
  },
  {
    slug: "indiafreestuff",
    competitor: "IndiaFreeStuff",
    seoTitle: "7 Best IndiaFreeStuff Alternatives in India (2026)",
    seoDesc:
      "Sites like IndiaFreeStuff for loot deals, freebies and coupons. Compare 7 IndiaFreeStuff alternatives in India with honest pros and cons for each (2026).",
    h1: "7 Best IndiaFreeStuff Alternatives in India (2026)",
    answer:
      "The best IndiaFreeStuff alternatives are RichDeals for loot deals whose price is re-checked on the product page, DealsMagnet for hidden Amazon price drops, DesiDime for community-voted deals, FreeKaaMaal for freebies with cashback, CashKaro and CouponDunia for cashback and GrabOn for coupon codes.",
    about:
      "IndiaFreeStuff posts Amazon and Flipkart loot deals, JioMart coupons, Myntra and Ajio discounts and freebies throughout the day, and offers a browser extension. People look for an alternative mainly because loot prices move fast: the price on a listing card is often no longer the price on the product page.",
    picks: ["richdeals", "dealsmagnet", "desidime", "freekaamaal", "cashkaro", "grabon", "coupondunia"],
    rows: [
      { feature: "Main focus", us: "Price-checked product deals", them: "Loot deals and freebies" },
      { feature: "Price check before listing", us: "Yes — deals with a drifted price are rejected", them: "Not stated" },
      { feature: "Stores covered", us: "All Indian stores, incl. Myntra, Ajio, Shopsy, Nykaa, D2C brands", them: "Mostly Amazon and Flipkart, plus JioMart, Myntra, Ajio" },
      { feature: "Posting speed", us: "Several batches an hour", them: "Very fast — its main strength" },
      { feature: "Account needed", us: "No", them: "No" },
      { feature: "Freebies", us: "Freebies hub at /freebies", them: "Yes" },
      { feature: "Expired deals", us: "Stay online with an EXPIRED banner", them: "Not stated" },
      { feature: "Alerts", us: "Telegram, t.me/richdealsindia", them: "Browser extension and channels" },
    ],
    sections: [
      {
        h2: "When IndiaFreeStuff is still the right pick",
        body: "For sheer speed on Amazon and Flipkart loot deals, IndiaFreeStuff is one of the quickest Indian feeds, and its extension is handy if you shop on desktop. If you are chasing a lightning deal, being first matters more than anything else.",
      },
      {
        h2: "Why people switch to RichDeals",
        body: "RichDeals is our own site. When we checked loot-deal listings against the live product page, the listed price was often already wrong, so we re-read every deal on the store page before it goes live and drop the ones where the price has moved or stock is gone. That makes RichDeals slightly slower than a raw loot feed, but the price you see is the price we found on the store.",
      },
      {
        h2: "Best IndiaFreeStuff alternative for Amazon price drops",
        body: "DealsMagnet is built around an Amazon deal finder for spotting hidden price drops. Pair it with RichDeals for stores beyond Amazon, such as Myntra, Ajio, Shopsy and brand websites.",
      },
    ],
    faqs: [
      {
        q: "What is the best alternative to IndiaFreeStuff?",
        a: "RichDeals for loot deals with a verified price, DealsMagnet for Amazon price drops, and DesiDime if you want community votes on each deal.",
      },
      {
        q: "Why is the price on a loot deal different when I open it?",
        a: "Loot prices on Amazon and Flipkart change within minutes and often depend on size, colour or a coupon. RichDeals re-checks the product page before listing to reduce this, but prices can still change after posting.",
      },
      {
        q: "Is there a site like IndiaFreeStuff for Myntra and Ajio deals?",
        a: "Yes. RichDeals lists deals from every store it can verify, including Myntra, Ajio, Shopsy, Nykaa, Croma and brand stores.",
      },
      {
        q: "Do I need an account to use RichDeals?",
        a: "No. Everything is free to browse. Follow the RichDeals Telegram channel if you want alerts.",
      },
    ],
    updated: "2026-10-23",
  },
  {
    slug: "dealsmagnet",
    competitor: "DealsMagnet",
    seoTitle: "7 Best DealsMagnet Alternatives in India (2026)",
    seoDesc:
      "Sites like DealsMagnet for Amazon loot deals and price drops. Compare 7 DealsMagnet alternatives in India with honest pros and cons for each site (2026).",
    h1: "7 Best DealsMagnet Alternatives in India (2026)",
    answer:
      "The best DealsMagnet alternatives are RichDeals for price-checked deals across every Indian store, IndiaFreeStuff for fast loot deals, DesiDime for community-voted deals, FreeKaaMaal for freebies with cashback, CashKaro and CouponDunia for cashback and GrabOn for coupon codes.",
    about:
      "DealsMagnet lists deals, trending offers and discount coupons, and is known for its Amazon deal finder for hidden loot deals. People look for an alternative when they shop beyond Amazon — fashion, beauty and brand stores — or want a second source to confirm a price.",
    picks: ["richdeals", "indiafreestuff", "desidime", "freekaamaal", "cashkaro", "grabon", "coupondunia"],
    rows: [
      { feature: "Main focus", us: "Price-checked deals from every store", them: "Amazon deal finding and loot deals" },
      { feature: "Price check before listing", us: "Yes, every deal", them: "Not stated" },
      { feature: "Stores covered", us: "All Indian stores, incl. Myntra, Ajio, Shopsy, Nykaa, D2C brands", them: "Strongest on Amazon" },
      { feature: "Account needed", us: "No", them: "No" },
      { feature: "Cashback", us: "No", them: "No" },
      { feature: "Expired deals", us: "Stay online with an EXPIRED banner", them: "Not stated" },
      { feature: "Telegram alerts", us: "Yes, t.me/richdealsindia", them: "Has its own channels" },
    ],
    sections: [
      {
        h2: "When DealsMagnet is still the right pick",
        body: "If almost everything you buy comes from Amazon, DealsMagnet's deal finder is a useful way to surface price drops that do not show up on Amazon's own deals page.",
      },
      {
        h2: "Why people use RichDeals alongside DealsMagnet",
        body: "RichDeals is our own site. We cover every store we can verify — Flipkart, Myntra, Ajio, Shopsy, Nykaa, Croma and brand websites as well as Amazon — and each deal's price and stock are re-read on the product page before it goes live.",
      },
    ],
    faqs: [
      {
        q: "What is a good alternative to DealsMagnet?",
        a: "RichDeals for deals across every Indian store, IndiaFreeStuff for fast loot deals, and DesiDime for community-voted deals.",
      },
      {
        q: "Is there a DealsMagnet alternative for fashion deals?",
        a: "Yes. RichDeals lists Myntra, Ajio and Shopsy deals alongside Amazon and Flipkart.",
      },
      {
        q: "Do I need an account to use RichDeals?",
        a: "No. All deals are free to browse without signing up.",
      },
    ],
    updated: "2026-10-23",
  },
];

export const alternativeBySlug = (slug: string) => ALTERNATIVES.find((a) => a.slug === slug);
