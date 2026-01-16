"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { GA_MEASUREMENT_ID, isGAConfigured, pageview } from "@/lib/analytics";

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const enabled = isGAConfigured();

  useEffect(() => {
    if (!enabled) return;
    const qs = typeof window !== "undefined" ? window.location.search : "";
    const url = qs ? `${pathname}${qs}` : pathname;
    pageview(url);
  }, [enabled, pathname]);

  // Don't render anything if GA is not configured
  if (!enabled) {
    return null;
  }

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}
