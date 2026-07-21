// Real brand logos (favicons) in /public/stores. Keyed by store slug.
// meesho/firstcry lack good favicons → text wordmark SVG fallback.
export const STORE_LOGOS: Record<string, string> = {
  amazon: "/stores/amazon.svg",
  flipkart: "/stores/flipkart.png",
  myntra: "/stores/myntra.png",
  ajio: "/stores/ajio.png",
  nykaa: "/stores/nykaa.png",
  tatacliq: "/stores/tatacliq.png",
  jiomart: "/stores/jiomart.png",
  croma: "/stores/croma.png",
  snapdeal: "/stores/snapdeal.png",
  pedigree: "/stores/pedigree.png",
  testbook: "/stores/testbook.png",
  meesho: "/stores/meesho.svg",
  firstcry: "/stores/firstcry.svg",
};

export const storeLogo = (slug: string) => STORE_LOGOS[slug?.toLowerCase()] ?? null;
