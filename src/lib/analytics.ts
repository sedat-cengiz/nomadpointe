/**
 * Google Analytics 4 Helper Functions
 * Enhanced for NomadPoint with conversion tracking
 * 
 * Setup Instructions:
 * 1. Create a Google Analytics 4 property at https://analytics.google.com
 * 2. Get your Measurement ID (starts with G-)
 * 3. Add to .env.local: NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
 */

// Measurement ID from environment variable
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Check if GA is configured
export const isGAConfigured = (): boolean => {
  return Boolean(GA_MEASUREMENT_ID && !GA_MEASUREMENT_ID.includes("YOUR_"));
};

// Types for GA events
type GTagEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

// Page view tracking
export const pageview = (url: string): void => {
  if (!isGAConfigured()) return;
  
  window.gtag("config", GA_MEASUREMENT_ID!, {
    page_path: url,
  });
};

// Custom event tracking
export const event = ({ action, category, label, value }: GTagEvent): void => {
  if (!isGAConfigured()) return;
  
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// ==========================================
// USER AUTHENTICATION EVENTS
// ==========================================

export const trackSignUp = (provider: "google" | "github"): void => {
  event({
    action: "sign_up",
    category: "Authentication",
    label: provider,
  });
};

export const trackLogin = (provider: "google" | "github"): void => {
  event({
    action: "login",
    category: "Authentication",
    label: provider,
  });
};

// ==========================================
// CONTENT ENGAGEMENT EVENTS
// ==========================================

// City page view tracking
export const trackCityView = (cityName: string, country: string): void => {
  event({
    action: "city_view",
    category: "Content",
    label: `${cityName}, ${country}`,
  });
};

// Compare tool usage tracking
export const trackCompare = (cities: string[]): void => {
  event({
    action: "compare_cities",
    category: "Tools",
    label: cities.join(" vs "),
    value: cities.length,
  });
};

// Budget calculator usage tracking
export const trackBudgetCalculation = (
  cityName: string,
  lifestyle: string
): void => {
  event({
    action: "budget_calculation",
    category: "Tools",
    label: `${cityName} - ${lifestyle}`,
  });
};

// ==========================================
// FAVORITES EVENTS
// ==========================================

export const trackFavoriteAdd = (citySlug: string): void => {
  event({
    action: "favorite_add",
    category: "Engagement",
    label: citySlug,
  });
};

export const trackFavoriteRemove = (citySlug: string): void => {
  event({
    action: "favorite_remove",
    category: "Engagement",
    label: citySlug,
  });
};

// ==========================================
// TRIP PLANNER EVENTS
// ==========================================

export const trackTripCreate = (cityCount: number): void => {
  event({
    action: "trip_create",
    category: "Trip Planner",
    value: cityCount,
  });
};

export const trackTripView = (tripId: string): void => {
  event({
    action: "trip_view",
    category: "Trip Planner",
    label: tripId,
  });
};

export const trackTripShare = (tripId: string): void => {
  event({
    action: "trip_share",
    category: "Trip Planner",
    label: tripId,
  });
};

export const trackTripCityAdd = (citySlug: string): void => {
  event({
    action: "trip_city_add",
    category: "Trip Planner",
    label: citySlug,
  });
};

// ==========================================
// TOOLS EVENTS
// ==========================================

export const trackToolUse = (toolName: string): void => {
  event({
    action: "tool_use",
    category: "Tools",
    label: toolName,
  });
};

export const trackCurrencyConvert = (fromCurrency: string, toCurrency: string): void => {
  event({
    action: "currency_convert",
    category: "Tools",
    label: `${fromCurrency}_to_${toCurrency}`,
  });
};

export const trackTimezoneCompare = (cityCount: number): void => {
  event({
    action: "timezone_compare",
    category: "Tools",
    value: cityCount,
  });
};

export const trackChecklistComplete = (type: string, completedItems: number): void => {
  event({
    action: "checklist_complete",
    category: "Tools",
    label: type,
    value: completedItems,
  });
};

// ==========================================
// AFFILIATE & CONVERSION EVENTS
// ==========================================

// Affiliate link click tracking
export const trackAffiliateClick = (
  affiliateName: string,
  cityName?: string
): void => {
  event({
    action: "affiliate_click",
    category: "Affiliate",
    label: cityName ? `${affiliateName} - ${cityName}` : affiliateName,
  });

  // Also track as a conversion event
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "conversion", {
      send_to: GA_MEASUREMENT_ID,
      event_category: "Affiliate",
      event_label: affiliateName,
    });
  }
};

export const trackBookingClick = (cityName: string): void => {
  event({
    action: "booking_click",
    category: "Affiliate",
    label: cityName,
  });
};

export const trackFlightSearchClick = (cityName: string, provider: string): void => {
  event({
    action: "flight_search_click",
    category: "Affiliate",
    label: `${provider} - ${cityName}`,
  });
};

export const trackCoworkingClick = (spaceName: string, cityName: string): void => {
  event({
    action: "coworking_click",
    category: "Affiliate",
    label: `${spaceName} - ${cityName}`,
  });
};

// ==========================================
// USER JOURNEY TRACKING
// ==========================================

export const trackUserJourney = (step: string, details?: Record<string, unknown>): void => {
  event({
    action: "user_journey",
    category: "Journey",
    label: step,
  });
  
  // Log additional details if configured
  if (process.env.NODE_ENV === "development") {
    console.log("[Analytics] User journey:", step, details);
  }
};

// Funnel tracking
export const FUNNEL_STEPS = {
  VISIT_HOME: "visit_home",
  VIEW_CITY: "view_city",
  ADD_FAVORITE: "add_favorite",
  SIGN_UP: "sign_up",
  CREATE_TRIP: "create_trip",
  CLICK_AFFILIATE: "click_affiliate",
} as const;

export const trackFunnelStep = (step: keyof typeof FUNNEL_STEPS): void => {
  event({
    action: "funnel_step",
    category: "Funnel",
    label: FUNNEL_STEPS[step],
  });
};

// ==========================================
// PERFORMANCE TRACKING
// ==========================================

export const trackPageLoadTime = (pageName: string, loadTimeMs: number): void => {
  event({
    action: "page_load_time",
    category: "Performance",
    label: pageName,
    value: loadTimeMs,
  });
};

export const trackSearchTime = (searchType: string, timeMs: number): void => {
  event({
    action: "search_time",
    category: "Performance",
    label: searchType,
    value: timeMs,
  });
};

// ==========================================
// ERROR TRACKING
// ==========================================

export const trackError = (errorType: string, errorMessage: string): void => {
  event({
    action: "error",
    category: "Error",
    label: `${errorType}: ${errorMessage}`,
  });
};

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (
      command: "config" | "event" | "js",
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}
