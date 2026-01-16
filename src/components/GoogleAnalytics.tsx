"use client";

import Script from "next/script";

// Google Analytics 4 Measurement ID
// Replace with your actual GA4 Measurement ID or set via environment variable
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-XXXXXXXXXX";

// Check if GA is configured (not placeholder)
const isGAConfigured = GA_MEASUREMENT_ID && !GA_MEASUREMENT_ID.includes("XXXXXXXXXX");

export default function GoogleAnalytics() {
  // Don't render anything if GA is not configured
  if (!isGAConfigured) {
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
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  );
}

// Analytics event tracking helper
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (typeof window !== "undefined" && isGAConfigured) {
    // eslint-disable-next-line
    const gtag = (window as unknown as Record<string, ((...args: unknown[]) => void) | undefined>).gtag;
    if (gtag) {
      gtag("event", action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  }
}

// Specific event trackers for common actions
export const analyticsEvents = {
  // City page views
  viewCity: (cityName: string, citySlug: string) => {
    trackEvent("view_city", "City", cityName);
  },

  // Affiliate link clicks
  clickAffiliate: (affiliateName: string, cityName?: string) => {
    trackEvent("click_affiliate", "Affiliate", `${affiliateName}${cityName ? ` - ${cityName}` : ""}`);
  },

  // Compare cities
  compareCities: (cities: string[]) => {
    trackEvent("compare_cities", "Compare", cities.join(" vs "));
  },

  // Newsletter signup
  newsletterSignup: () => {
    trackEvent("newsletter_signup", "Newsletter", "Footer Signup");
  },

  // External link clicks
  clickExternalLink: (linkType: string, url: string) => {
    trackEvent("click_external", "External Link", `${linkType}: ${url}`);
  },
};

// Extend the Window interface for gtag
// Note: gtag types are declared via @types/gtag.js if needed
