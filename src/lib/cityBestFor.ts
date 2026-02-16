import { City } from "@/types/city";

export interface BestForTag {
  key: string;
  label: string;
  emoji: string;
}

/**
 * Derive "Best for..." tags from city data.
 * AI search engines use these to surface the city for intent-based queries
 * like "best budget-friendly nomad cities" or "best cities for fast internet".
 */
export function getCityBestForTags(city: City): BestForTag[] {
  const tags: BestForTag[] = [];

  // Budget-conscious
  if (city.monthlyCost <= 1200) {
    tags.push({ key: "budget", label: "Budget-Friendly", emoji: "💰" });
  }

  // Fast internet
  if (city.internetSpeed >= 100) {
    tags.push({ key: "fast-wifi", label: "Fast Internet", emoji: "⚡" });
  }

  // Very safe
  if (city.safetyScore >= 4) {
    tags.push({ key: "safe", label: "Very Safe", emoji: "🛡️" });
  }

  // Has nomad visa
  if (city.visa?.hasNomadVisa) {
    tags.push({ key: "visa", label: "Nomad Visa Available", emoji: "🛂" });
  }

  // Beach lovers (check neighborhoods for beachside vibe)
  const hasBeach = city.neighborhoods?.some((n) => n.vibe === "beachside");
  if (hasBeach) {
    tags.push({ key: "beach", label: "Beach Lovers", emoji: "🏖️" });
  }

  // Great food scene
  if (city.foodAndWorkspace?.foodScene) {
    tags.push({ key: "food", label: "Great Food Scene", emoji: "🍜" });
  }

  // Strong community
  const communityCount = Object.values(city.communityLinks).filter(Boolean).length;
  if (communityCount >= 3) {
    tags.push({ key: "community", label: "Active Nomad Community", emoji: "👥" });
  }

  // Great coworking
  if (city.coworkingSpaces && city.coworkingSpaces.length >= 3) {
    tags.push({ key: "coworking", label: "Top Coworking Spaces", emoji: "💻" });
  }

  // Walkable
  if (city.transportInfo?.walkability === "Excellent" || city.transportInfo?.walkability === "Good") {
    tags.push({ key: "walkable", label: "Walkable City", emoji: "🚶" });
  }

  // Good healthcare
  if (city.healthInfo && city.healthInfo.healthcareQuality >= 4) {
    tags.push({ key: "healthcare", label: "Quality Healthcare", emoji: "🏥" });
  }

  // First-time nomads (safe + good english + low barrier)
  if (
    city.safetyScore >= 4 &&
    city.practicalInfo?.englishProficiency === "High" &&
    city.practicalInfo?.languageBarrier === "Low"
  ) {
    tags.push({ key: "first-timer", label: "First-Time Nomads", emoji: "🌟" });
  }

  return tags;
}
