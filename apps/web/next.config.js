const POST_REDIRECTS = require('./post-redirects.json');

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
  // Baseline security headers on every route. No CSP here — AdSense/GTM/marketplace
  // CDNs would need a hand-tuned allowlist and a wrong one blanks the page; these
  // five are safe sitewide. HSTS is 2y+preload (DO terminates TLS, always https).
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=()" },
        ],
      },
    ];
  },
  // SEO: fold cannibalizing blog duplicates into their keeper. The dead->keeper
  // map lives in post-redirects.json so sitemap.ts and llms.txt can filter the
  // same dead slugs out of what we submit (a 308'd URL in a sitemap is a
  // crawl-budget tax, and we were submitting two of them). Keeper chosen on GSC
  // impressions where rows existed, else body depth + sibling slug convention.
  async redirects() {
    return Object.entries(POST_REDIRECTS).map(([from, to]) => ({
      source: `/blog/${from}`,
      destination: `/blog/${to}`,
      permanent: true,
    }));
  },
};

module.exports = nextConfig;
