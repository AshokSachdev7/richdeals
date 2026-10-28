"use client";

import { useState } from "react";

// CDN image over a shimmer skeleton (lazy unless `priority` — above-the-fold covers).
// Self-contained: renders its own relative wrapper so the skeleton fills it.
// `className` sizes/shapes the wrapper (aspect, width, rounded); `imgClassName`
// adds effects to the <img> (e.g. hover scale).
export default function LazyImage({
  src,
  alt = "",
  className = "",
  imgClassName = "",
  priority = false,
}: {
  src: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
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
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-transform duration-500 ${imgClassName}`}
      />
    </span>
  );
}
