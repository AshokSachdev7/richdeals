/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "m.media-amazon.com" },
      { protocol: "https", hostname: "images-na.ssl-images-amazon.com" },
      { protocol: "https", hostname: "images-eu.ssl-images-amazon.com" },
      { protocol: "https", hostname: "**.amazon.com" },
      { protocol: "https", hostname: "**.flixcart.com" },
      { protocol: "https", hostname: "images.indiafreestuff.in" },
      { protocol: "https", hostname: "**.digitaloceanspaces.com" },
      { protocol: "https", hostname: "**.cdn.digitaloceanspaces.com" },
      { protocol: "https", hostname: "**.myntassets.com" },
      { protocol: "https", hostname: "**.ajio.com" },
      { protocol: "https", hostname: "**.nykaa.com" },
      { protocol: "https", hostname: "**.cuelinks.com" },
      { protocol: "https", hostname: "**.jiomartjcp.com" },
      { protocol: "https", hostname: "**.jiomart.com" },
      { protocol: "https", hostname: "**.freekaamaal.com" },
      { protocol: "https", hostname: "**.snapdeal.com" },
      { protocol: "https", hostname: "**.croma.com" },
      { protocol: "https", hostname: "**.tatacliq.com" },
      { protocol: "https", hostname: "**.meesho.com" },
      { protocol: "https", hostname: "**.paytmmall.com" },
    ],
  },
  // Web talks to the API over HTTP only; transpile the shared workspace.
  transpilePackages: ["@deals/shared"],
  // SEO: consolidate the thin BBD duplicate into the richer keeper. Both target
  // the "big billion days 2026" cluster; GSC query×page showed them splitting
  // equity (pos 21 vs 11, both 0 clicks). 308 passes link equity to the keeper.
  async redirects() {
    return [
      {
        source: "/blog/flipkart-big-billion-days-2026-guide",
        destination: "/blog/flipkart-big-billion-days-2026-lowest-price-guide",
        permanent: true,
      },
      // SEO: same cannibalization on the "free sample websites india" head term.
      // GSC winner = free-sample-websites-india-2026 (87/98 cluster clicks,
      // pos 6.9); the "-in-india" twin self-canonicals and splits equity. 308
      // folds it into the keeper.
      {
        source: "/blog/free-sample-websites-in-india-2026",
        destination: "/blog/free-sample-websites-india-2026",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
