// Evergreen SEO/AEO/GEO copy for the store hub pages (/stores/[slug]).
// This is the content vehicle that replaces per-store blog posts: a keyword-tuned
// intro at the top and store-specific "people also ask" FAQs at the bottom, tuned
// to the head terms DataForSEO confirmed (flipkart offers today 40.5k, amazon
// coupons today 12.1k). Keyed by the real DB store slugs. Facts are evergreen and
// honest — no fabricated prices; live numbers still come from the deals on the page.

import { SITE_NAME } from "@/lib/site";

export type StoreSeo = {
  domain: string; // for the favicon mark
  seoTitle: string; // <= 60 chars
  seoDesc: string; // 150-160 chars
  intro: string[]; // GEO answer-first paragraphs, rendered above the deal grid
  faqs: { q: string; a: string }[]; // store-specific searched questions (AEO)
};

export const STORE_SEO: Record<string, StoreSeo> = {
  amazon: {
    domain: "amazon.in",
    seoTitle: "Amazon Offers & Coupons Today — Deals Live Now",
    seoDesc:
      "Amazon offers and coupon codes today, hand-picked and verified daily. See the biggest live Amazon India discounts, deal of the day picks and how to stack bank offers.",
    intro: [
      "Amazon India offers today are gathered here in one place: every deal on this page is a live, verified Amazon listing with the current price and discount pulled straight from the product page, refreshed through the day. Instead of scrolling endless category pages, you get the biggest genuine markdowns — Deal of the Day, Lightning Deals and coupon-linked prices — filtered so you skip the padded MRPs.",
      "The fastest way to save more on Amazon is to stack: apply any on-page coupon, then pay with a card running a bank offer or use Amazon Pay for cashback. Prices move fast and stock on the sharpest deals sells out, so treat the price you see as today's price — check back tomorrow for a fresh set.",
    ],
    faqs: [
      { q: "What are the best Amazon offers today?", a: "The best Amazon offers today are the ones with a real discount off the genuine market price, not an inflated MRP. This page lists the top live Amazon India deals ranked by verified discount, updated daily, so the highest-value markdowns are surfaced first." },
      { q: "How do I get Amazon coupons today?", a: "Many Amazon products show a clip-on coupon on the product page that applies at checkout. On top of that, look for card and bank offers and Amazon Pay cashback. The deals here already reflect the live price, and any additional coupon is shown on the store's product page." },
      { q: "Does Amazon have a deal of the day?", a: "Yes. Amazon runs Deal of the Day and time-limited Lightning Deals daily. Those short-window discounts are exactly the kind of live deal we track here, so you can catch them before they sell out." },
      { q: "How can I save more on Amazon India?", a: "Stack a product coupon with a bank or card offer, and pay via a rewarding method like Amazon Pay. Buying during a sale event (Great Indian Festival, Prime Day) adds another layer of discount on top of everyday deals." },
      { q: "Are the Amazon prices on this page live?", a: "Yes — each price is read from the live Amazon listing and refreshed through the day. Because Amazon prices change quickly, treat the shown price as current and confirm it on the product page before you buy." },
    ],
  },
  flipkart: {
    domain: "flipkart.com",
    seoTitle: "Flipkart Offers Today — Deals & Coupons Live Now",
    seoDesc:
      "Flipkart offers today, verified and updated daily. Browse the biggest live Flipkart deals, discount coupons and how to combine bank offers and SuperCoins to save more.",
    intro: [
      "Flipkart offers today are collected on this page so you see the genuine discounts first: every deal is a live Flipkart listing with the current price and percentage off read straight from the product page and refreshed through the day. You skip the inflated struck-through MRPs and get the markdowns that are actually worth buying right now.",
      "To squeeze the most out of a Flipkart deal, combine it with a running bank or card offer at checkout and redeem SuperCoins where they apply. The sharpest deals — flash prices and sale-event drops — go out of stock fast, so the price you see today is the one to act on.",
    ],
    faqs: [
      { q: "What are the best Flipkart offers today?", a: "The best Flipkart offers today are the deals with a real discount off the true selling price. This page ranks the top live Flipkart deals by verified discount and refreshes daily, so the biggest genuine markdowns show first." },
      { q: "How do I get a Flipkart discount coupon?", a: "Flipkart discounts usually come as on-page offers, bank and card offers at checkout, and SuperCoin redemptions rather than typed codes. The deals here already show the live discounted price, and any extra offer appears on the Flipkart product page." },
      { q: "Does Flipkart have offers every day?", a: "Yes. Flipkart runs daily deals plus larger sale events like the Big Billion Days and Flipkart Freedom Sale. We track the everyday live deals here so you don't have to wait for a sale to save." },
      { q: "How can I save more on Flipkart?", a: "Stack the deal price with a bank or card offer, redeem SuperCoins, and buy during a sale event when discounts are deepest. Checking daily catches flash prices before they sell out." },
      { q: "Are these Flipkart prices updated today?", a: "Yes — each price is pulled from the live Flipkart listing and refreshed through the day. Confirm the final price on the product page at checkout, since Flipkart prices can change quickly." },
    ],
  },
  myntra: {
    domain: "myntra.com",
    seoTitle: "Myntra Offers & Coupons Today — Fashion Deals",
    seoDesc:
      "Myntra offers and coupons today on fashion, footwear and beauty. Live verified Myntra deals updated daily, plus how to combine brand discounts with bank offers.",
    intro: [
      "Myntra offers today cover fashion, footwear, beauty and accessories, all on one page with live prices read from each Myntra listing and refreshed through the day. You see the genuine discounts — brand markdowns and end-of-season drops — without wading through the full catalogue.",
      "The best Myntra savings usually come from stacking a brand or coupon discount with a bank or card offer at checkout, and shopping during events like the End of Reason Sale. Sizes on the best-priced styles run out fast, so grab the deal while your size is in stock.",
    ],
    faqs: [
      { q: "What are the best Myntra offers today?", a: "The best Myntra offers today are the styles with the deepest genuine discount off MRP. This page lists live Myntra deals ranked by verified discount and updates daily, so the top fashion and beauty markdowns appear first." },
      { q: "How do I use a Myntra coupon code?", a: "Myntra discounts mostly apply automatically as brand offers and bank offers at checkout rather than typed codes. The deals here already reflect the live discounted price; any extra offer shows on the Myntra product or checkout page." },
      { q: "When does Myntra have its biggest sale?", a: "Myntra's largest event is the End of Reason Sale, with the steepest discounts of the year. Between events, the everyday live deals tracked here still offer strong fashion and beauty savings." },
      { q: "How can I save more on Myntra?", a: "Combine the deal price with a bank or card offer, apply eligible brand coupons, and shop during a sale event. Checking daily catches new markdowns before popular sizes sell out." },
    ],
  },
  jiomart: {
    domain: "jiomart.com",
    seoTitle: "JioMart Offers Today — Deals & Coupons Live Now",
    seoDesc:
      "JioMart offers today across groceries, electronics and home. Live verified JioMart deals updated daily, plus how to combine coupons with bank offers to save more.",
    intro: [
      "JioMart offers today span groceries, home, electronics and daily essentials, gathered on one page with live prices read from each JioMart listing and refreshed through the day. You get the genuine markdowns first instead of scrolling the full store.",
      "To save the most on JioMart, apply any on-page coupon and pay with a card carrying a running bank offer. Deal prices and stock change quickly on everyday essentials, so the price shown is today's price — worth acting on before it moves.",
    ],
    faqs: [
      { q: "What are the best JioMart offers today?", a: "The best JioMart offers today are the products with a real discount off the usual selling price. This page lists live JioMart deals ranked by verified discount and refreshes daily, so the biggest genuine savings show first." },
      { q: "How do I get a JioMart coupon?", a: "JioMart discounts appear as on-page offers and bank or card offers at checkout. The deals here already show the live discounted price, and any additional coupon is applied on the JioMart product or cart page." },
      { q: "Does JioMart have daily deals?", a: "Yes. JioMart runs regular deals on groceries, electronics and home essentials, plus larger sale events. The everyday live deals are tracked here and updated daily." },
      { q: "How can I save more on JioMart?", a: "Stack an on-page coupon with a bank or card offer at checkout, and buy during a sale event for deeper discounts. Checking daily catches fresh markdowns on fast-moving essentials." },
    ],
  },
  shopsy: {
    domain: "shopsy.in",
    seoTitle: "Shopsy Offers Today — Budget Deals & Coupons",
    seoDesc:
      "Shopsy offers today: budget-friendly deals on fashion, home and accessories from Flipkart's Shopsy. Live verified deals updated daily, plus tips to save even more.",
    intro: [
      "Shopsy offers today bring together the budget-friendly deals from Flipkart's Shopsy on fashion, home, accessories and daily-use products, all on one page with live prices refreshed through the day. It's built for value hunting — the lowest genuine prices surfaced first.",
      "Shopsy is already priced low, but you can still stack a bank or card offer at checkout to save more, and the deepest deals land during sale events. Popular low-price items sell out quickly, so the price you see today is the one to grab.",
    ],
    faqs: [
      { q: "What are the best Shopsy offers today?", a: "The best Shopsy offers today are the lowest genuine prices on everyday fashion and home products. This page ranks live Shopsy deals by verified discount and updates daily, so the top budget picks appear first." },
      { q: "Is Shopsy cheaper than Flipkart?", a: "Shopsy is Flipkart's value platform and often lists everyday and unbranded products at lower prices. For the same branded item, compare both — the deals here show the live Shopsy price so you can judge the saving." },
      { q: "How do I save more on Shopsy?", a: "Even on already-low Shopsy prices you can add a bank or card offer at checkout, and the biggest drops come during sale events. Checking daily catches new budget deals before they sell out." },
      { q: "Are Shopsy prices on this page live?", a: "Yes — each price is read from the live Shopsy listing and refreshed through the day. Confirm the final price at checkout, as budget deals can change or sell out quickly." },
    ],
  },
};

// Generic evergreen SEO/AEO/GEO copy for any store not in the hand-tuned map
// above. Store-name-templated, honest and fabrication-free (no prices/claims) so
// even a hub with zero live deals is a real, citable page instead of thin content.
const genericStoreSeo = (slug: string, name: string): StoreSeo => ({
  domain: `${slug}.com`,
  seoTitle: `${name} Offers & Coupons Today — Deals Live`.slice(0, 60),
  seoDesc:
    `${name} offers and coupon codes today, hand-picked and verified on ${SITE_NAME}. See live ${name} deals with current prices, refreshed daily, plus tips to save more.`.slice(
      0,
      160,
    ),
  intro: [
    `${name} offers today are gathered on this page so you can find the genuine discounts in one place. Every deal is a live ${name} listing with the current price read straight from the product page and refreshed through the day, so you skip the padded MRPs and see the markdowns actually worth buying right now.`,
    `To save the most on a ${name} deal, apply any on-page coupon and pay with a card carrying a running bank offer or a rewarding wallet. The sharpest prices sell out fast, so treat the price you see today as today's price — check back tomorrow for a fresh set of ${name} deals.`,
  ],
  faqs: [
    {
      q: `What are the best ${name} offers today?`,
      a: `The best ${name} offers today are the ones with a real discount off the genuine selling price, not an inflated MRP. This page lists live ${name} deals ranked by verified discount and updates daily, so the highest-value markdowns show first.`,
    },
    {
      q: `How do I get a ${name} coupon or discount?`,
      a: `${name} discounts usually apply as on-page offers and bank or card offers at checkout rather than typed codes. The deals here already reflect the live price, and any extra coupon appears on the ${name} product or checkout page.`,
    },
    {
      q: `Does ${name} have deals every day?`,
      a: `Yes. ${name} runs regular daily deals plus larger sale events through the year. We track the everyday live ${name} deals here and refresh them daily, so you don't have to wait for a sale to save.`,
    },
    {
      q: `How can I save more on ${name}?`,
      a: `Stack the deal price with a bank or card offer at checkout, apply any eligible coupon, and buy during a sale event when discounts are deepest. Checking daily catches fresh ${name} markdowns before they sell out.`,
    },
  ],
});

// name is used only to build the generic fallback for stores outside the
// hand-tuned map; the map entries win when present.
export const storeSeo = (slug: string, name?: string): StoreSeo | undefined =>
  STORE_SEO[slug] ?? (name ? genericStoreSeo(slug, name) : undefined);
