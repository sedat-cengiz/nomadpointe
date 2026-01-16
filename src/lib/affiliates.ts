/**
 * Affiliate Link Configuration
 * 
 * This file contains all affiliate links and configurations.
 * Replace placeholder IDs with your actual affiliate IDs.
 * 
 * SafetyWing Affiliate Program:
 * - Sign up at: https://www.safetywing.com/affiliates
 * - Once approved, replace YOUR_SAFETYWING_AFFILIATE_ID with your actual ID
 */

// ============================================
// AFFILIATE IDS - Replace with your actual IDs
// ============================================

// SafetyWing: Sign up at https://www.safetywing.com/affiliates
export const SAFETYWING_AFFILIATE_ID = "YOUR_SAFETYWING_AFFILIATE_ID";

// Booking.com: Sign up at https://www.booking.com/affiliate-program/
export const BOOKING_AFFILIATE_ID = "YOUR_BOOKING_AFFILIATE_ID";

// NordVPN: Sign up at https://nordvpn.com/affiliate/
export const NORDVPN_AFFILIATE_ID = "YOUR_NORDVPN_AFFILIATE_ID";

// Wise (TransferWise): Sign up at https://wise.com/invite/
export const WISE_AFFILIATE_ID = "YOUR_WISE_AFFILIATE_ID";

// ============================================
// AFFILIATE URLS
// ============================================

/**
 * SafetyWing Nomad Insurance
 * Their affiliate program offers:
 * - $10 per sale
 * - 30-day cookie duration
 * - Real-time tracking
 */
export const SAFETYWING_URLS = {
  // Main insurance page with affiliate tracking
  nomadInsurance: `https://safetywing.com/nomad-insurance?referenceID=${SAFETYWING_AFFILIATE_ID}`,
  
  // Remote health insurance
  remoteHealth: `https://safetywing.com/remote-health?referenceID=${SAFETYWING_AFFILIATE_ID}`,
  
  // Remote doctor
  remoteDoctor: `https://safetywing.com/remote-doctor?referenceID=${SAFETYWING_AFFILIATE_ID}`,
  
  // Main affiliate signup page (for reference)
  affiliateSignup: "https://www.safetywing.com/affiliates",
};

/**
 * Generate SafetyWing URL with optional parameters
 */
export function getSafetyWingUrl(
  product: "nomadInsurance" | "remoteHealth" | "remoteDoctor" = "nomadInsurance",
  utmParams?: {
    source?: string;
    medium?: string;
    campaign?: string;
  }
): string {
  let url = SAFETYWING_URLS[product];
  
  if (utmParams) {
    const params = new URLSearchParams();
    if (utmParams.source) params.append("utm_source", utmParams.source);
    if (utmParams.medium) params.append("utm_medium", utmParams.medium);
    if (utmParams.campaign) params.append("utm_campaign", utmParams.campaign);
    
    if (params.toString()) {
      url += `&${params.toString()}`;
    }
  }
  
  return url;
}

/**
 * Booking.com URL generator
 */
export function getBookingUrl(cityName: string, countryName?: string): string {
  const destination = countryName ? `${cityName}, ${countryName}` : cityName;
  const baseUrl = "https://www.booking.com/searchresults.html";
  const params = new URLSearchParams({
    ss: destination,
    aid: BOOKING_AFFILIATE_ID, // Booking.com uses 'aid' for affiliate ID
  });
  
  return `${baseUrl}?${params.toString()}`;
}

/**
 * NordVPN URL
 */
export function getNordVpnUrl(): string {
  return `https://nordvpn.com/?ref=${NORDVPN_AFFILIATE_ID}`;
}

/**
 * Wise (formerly TransferWise) URL
 */
export function getWiseUrl(): string {
  return `https://wise.com/invite/${WISE_AFFILIATE_ID}`;
}

// ============================================
// AFFILIATE WIDGET CONFIGURATION
// ============================================

export interface AffiliateConfig {
  id: string;
  title: string;
  description: string;
  cta: string;
  getUrl: (cityName?: string, countryName?: string) => string;
  icon: string; // Icon name from lucide-react
  bgColor: string;
  iconColor: string;
  ctaColor: string;
  priority: number; // Lower is higher priority
}

export const AFFILIATE_CONFIGS: AffiliateConfig[] = [
  {
    id: "safetywing",
    title: "Nomad Health Insurance",
    description: "Stay protected with insurance designed for digital nomads",
    cta: "Get SafetyWing Coverage",
    getUrl: () => getSafetyWingUrl("nomadInsurance", { source: "nomadpoint", medium: "widget" }),
    icon: "Shield",
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
    ctaColor: "bg-emerald-600 hover:bg-emerald-700",
    priority: 1,
  },
  {
    id: "booking",
    title: "Accommodation",
    description: "Find apartments and hotels perfect for remote work",
    cta: "Browse on Booking.com",
    getUrl: (cityName = "", countryName = "") => getBookingUrl(cityName, countryName),
    icon: "Home",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    ctaColor: "bg-blue-600 hover:bg-blue-700",
    priority: 2,
  },
  {
    id: "nordvpn",
    title: "VPN Service",
    description: "Secure your connection and access content worldwide",
    cta: "Get NordVPN",
    getUrl: () => getNordVpnUrl(),
    icon: "Lock",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
    ctaColor: "bg-purple-600 hover:bg-purple-700",
    priority: 3,
  },
  {
    id: "wise",
    title: "International Transfers",
    description: "Send and receive money with low fees worldwide",
    cta: "Try Wise",
    getUrl: () => getWiseUrl(),
    icon: "ArrowLeftRight",
    bgColor: "bg-cyan-50",
    iconColor: "text-cyan-600",
    ctaColor: "bg-cyan-600 hover:bg-cyan-700",
    priority: 4,
  },
];

/**
 * Get affiliate configs sorted by priority
 */
export function getAffiliateConfigs(limit?: number): AffiliateConfig[] {
  const sorted = [...AFFILIATE_CONFIGS].sort((a, b) => a.priority - b.priority);
  return limit ? sorted.slice(0, limit) : sorted;
}

/**
 * Check if affiliate IDs are configured (not placeholder)
 */
export function isAffiliateConfigured(affiliateId: string): boolean {
  switch (affiliateId) {
    case "safetywing":
      return !SAFETYWING_AFFILIATE_ID.includes("YOUR_");
    case "booking":
      return !BOOKING_AFFILIATE_ID.includes("YOUR_");
    case "nordvpn":
      return !NORDVPN_AFFILIATE_ID.includes("YOUR_");
    case "wise":
      return !WISE_AFFILIATE_ID.includes("YOUR_");
    default:
      return false;
  }
}

