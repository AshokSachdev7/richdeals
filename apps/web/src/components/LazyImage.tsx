"use client";

import { useState } from "react";

// Lazy-loaded CDN image with a shimmer skeleton shown until it loads.
// Self-contained: renders its own relative wrapper so the skeleton fills it.
// `className` sizes/shapes the wrapper (aspect, width, rounded); `imgClassName`
// adds effects to the <img> (e.g. hover scale).
export default function LazyImage({
  src,
  alt = "",
  className = "",
  imgClassName = "",
}: {
  src: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <span className={`relative block overflow-hidden bg-gray-100 ${className}`}>
      {!loaded && (
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200"
        />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-all duration-500 ${imgClassName} ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </span>
  );
}
