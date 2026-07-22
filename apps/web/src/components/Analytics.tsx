import Script from "next/script";

// Analytics loaders, both env-gated (render nothing until configured):
//  - GA4:   set NEXT_PUBLIC_GA_ID = G-XXXXXXX
//  - Cloudflare Web Analytics: set NEXT_PUBLIC_CF_BEACON = <token>
export default function Analytics() {
  const ga = process.env.NEXT_PUBLIC_GA_ID;
  const cf = process.env.NEXT_PUBLIC_CF_BEACON;
  return (
    <>
      {ga && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}');`}
          </Script>
        </>
      )}
      {cf && (
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          strategy="afterInteractive"
          data-cf-beacon={`{"token": "${cf}"}`}
        />
      )}
    </>
  );
}
