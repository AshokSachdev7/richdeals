"use client";

import Image from "next/image";
import { useState } from "react";

// next/image with a shimmer skeleton shown until the image finishes loading.
// Parent must be `relative` (the skeleton + image are absolutely filled).
export default function ProductImage({
  src,
  alt,
  sizes,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200"
        />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        // Deals come from ANY store CDN (PlayStation, brand D2C, Cuelinks
        // merchants, ...). The Next optimizer 400s every host not in
        // next.config remotePatterns, so arbitrary marketplace images break.
        // Marketplace CDNs already serve right-sized images — skip the
        // optimizer so any https host renders (no per-store allowlist churn,
        // no SSRF-via-optimizer surface).
        unoptimized
        // next/image's `priority` only preloads; it does NOT set fetchPriority
        fetchPriority={priority ? "high" : undefined}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={`${className} transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </>
  );
}
