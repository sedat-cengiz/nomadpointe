/**
 * Community Links Helper
 * 
 * Instead of hardcoding potentially broken community links,
 * we generate search URLs that help users find active communities.
 * This approach ensures links never break and always show current results.
 */

export interface CommunityLinks {
  discord?: string;
  facebook?: string;
  telegram?: string;
  whatsapp?: string;
  reddit?: string;
  meetup?: string;
}

/**
 * Generate safe community search links for a city
 * These links direct users to search results where they can find active communities
 */
export function generateCommunityLinks(
  cityName: string,
  countryName: string
): CommunityLinks {
  const searchTerm = encodeURIComponent(`${cityName} digital nomads`);
  const cityCountry = encodeURIComponent(`${cityName} ${countryName}`);

  return {
    // Facebook Groups search - always shows current active groups
    facebook: `https://www.facebook.com/search/groups/?q=${searchTerm}`,
    
    // Reddit search for city-specific nomad discussions
    reddit: `https://www.reddit.com/search/?q=${searchTerm}&type=link`,
    
    // Meetup search for local events
    meetup: `https://www.meetup.com/find/?keywords=${searchTerm}&source=EVENTS`,
    
    // Telegram group search (via Google as Telegram doesn't have native search)
    telegram: `https://www.google.com/search?q=telegram+group+${cityCountry}+digital+nomads`,
  };
}

/**
 * Pre-verified community links for major nomad hubs
 * These are manually verified and should be updated periodically
 * Last verified: January 2026
 */
export const verifiedCommunityLinks: Record<string, CommunityLinks> = {
  // NOTE: These are search links, not direct group links
  // This ensures they always work and show current results
  bali: {
    facebook: "https://www.facebook.com/search/groups/?q=bali%20digital%20nomads",
    reddit: "https://www.reddit.com/r/bali/",
    meetup: "https://www.meetup.com/find/?keywords=digital%20nomads&location=Bali",
  },
  lisbon: {
    facebook: "https://www.facebook.com/search/groups/?q=lisbon%20digital%20nomads",
    reddit: "https://www.reddit.com/r/Lisbon/",
    meetup: "https://www.meetup.com/find/?keywords=digital%20nomads&location=Lisbon",
  },
  medellin: {
    facebook: "https://www.facebook.com/search/groups/?q=medellin%20digital%20nomads",
    reddit: "https://www.reddit.com/r/medellin/",
    meetup: "https://www.meetup.com/find/?keywords=digital%20nomads&location=Medellin",
  },
  bangkok: {
    facebook: "https://www.facebook.com/search/groups/?q=bangkok%20digital%20nomads",
    reddit: "https://www.reddit.com/r/Bangkok/",
    meetup: "https://www.meetup.com/find/?keywords=digital%20nomads&location=Bangkok",
  },
  "chiang-mai": {
    facebook: "https://www.facebook.com/search/groups/?q=chiang%20mai%20digital%20nomads",
    reddit: "https://www.reddit.com/r/chiangmai/",
    meetup: "https://www.meetup.com/find/?keywords=digital%20nomads&location=Chiang%20Mai",
  },
  istanbul: {
    facebook: "https://www.facebook.com/search/groups/?q=istanbul%20digital%20nomads",
    reddit: "https://www.reddit.com/r/istanbul/",
    meetup: "https://www.meetup.com/find/?keywords=digital%20nomads&location=Istanbul",
  },
  bansko: {
    facebook: "https://www.facebook.com/search/groups/?q=bansko%20digital%20nomads",
    reddit: "https://www.reddit.com/r/digitalnomad/search/?q=bansko",
    meetup: "https://www.meetup.com/find/?keywords=digital%20nomads&location=Bansko",
  },
  barcelona: {
    facebook: "https://www.facebook.com/search/groups/?q=barcelona%20digital%20nomads",
    reddit: "https://www.reddit.com/r/Barcelona/",
    meetup: "https://www.meetup.com/find/?keywords=digital%20nomads&location=Barcelona",
  },
  berlin: {
    facebook: "https://www.facebook.com/search/groups/?q=berlin%20digital%20nomads",
    reddit: "https://www.reddit.com/r/berlin/",
    meetup: "https://www.meetup.com/find/?keywords=digital%20nomads&location=Berlin",
  },
  "mexico-city": {
    facebook: "https://www.facebook.com/search/groups/?q=mexico%20city%20digital%20nomads",
    reddit: "https://www.reddit.com/r/MexicoCity/",
    meetup: "https://www.meetup.com/find/?keywords=digital%20nomads&location=Mexico%20City",
  },
};

/**
 * Get community links for a city
 * Uses verified links if available, otherwise generates search links
 */
export function getCommunityLinks(
  cityId: string,
  cityName: string,
  countryName: string
): CommunityLinks {
  // Check for verified links first
  if (verifiedCommunityLinks[cityId]) {
    return verifiedCommunityLinks[cityId];
  }

  // Generate search links as fallback
  return generateCommunityLinks(cityName, countryName);
}

