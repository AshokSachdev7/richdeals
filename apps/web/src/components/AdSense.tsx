"use client";

import Script from "next/script";
import { useEffect } from "react";

const PUB = "ca-pub-7298984420457042";

// ADS-PRIV-04 interim: no Google-certified CMP is wired yet, so we must not
// serve PERSONALISED ads to EEA/UK (needs consent). We fail SAFE — assume the
// visitor needs consent and request non-personalised ads by default, then flip
// to personalised only when Cloudflare confirms the visitor is in India (our
// primary market, outside GDPR/UK-GDPR scope). Country comes from Cloudflare's
// same-origin /cdn-cgi/trace (loc=XX), so every page stays statically rendered.
// ponytail: NPA-default + IN-flip, not a full CMP; wire funding-choices once the
// AdSense account is approved and this whole gate can go.
function setPersonalized(on: boolean) {
  const ads = ((window as unknown as { adsbygoogle?: unknown[] & { requestNonPersonalizedAds?: number } }).adsbygoogle ||= []);
  ads.requestNonPersonalizedAds = on ? 0 : 1;
}

export default function AdSense() {
  useEffect(() => {
    setPersonalized(false); // default: EEA/UK-safe (non-personalised)
    fetch("/cdn-cgi/trace")
      .then((r) => r.text())
      .then((t) => {
        if (/(^|\n)loc=IN(\n|$)/.test(t)) setPersonalized(true);
      })
      .catch(() => {}); // trace unreachable → stay non-personalised
  }, []);

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${PUB}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
