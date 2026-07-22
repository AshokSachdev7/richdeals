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
};

module.exports = nextConfig;
