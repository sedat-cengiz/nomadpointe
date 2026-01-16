import { City } from "@/types/city";
import { asiaCities } from "./asia";
import { europeCities } from "./europe";
import { americasCities } from "./americas";
import { africaCities } from "./africa";
import { oceaniaCities } from "./oceania";

// Combine all cities from regional files
export const cities: City[] = [
  ...asiaCities,
  ...europeCities,
  ...americasCities,
  ...africaCities,
  ...oceaniaCities,
];

// Export regional arrays for filtered views
export { asiaCities, europeCities, americasCities, africaCities, oceaniaCities };

// Helper function to get city by slug
export function getCityBySlug(slug: string): City | undefined {
  return cities.find((city) => city.slug === slug);
}

// Helper function to get all city slugs (for static generation)
export function getAllCitySlugs(): string[] {
  return cities.map((city) => city.slug);
}

// Filter cities by various criteria
export function filterCities(options: {
  minSpeed?: number;
  maxCost?: number;
  continent?: string;
  hasNomadVisa?: boolean;
  minSafetyScore?: number;
}): City[] {
  return cities.filter((city) => {
    if (options.minSpeed && city.internetSpeed < options.minSpeed) return false;
    if (options.maxCost && city.monthlyCost > options.maxCost) return false;
    if (options.continent && city.continent !== options.continent) return false;
    if (options.hasNomadVisa !== undefined && city.visa?.hasNomadVisa !== options.hasNomadVisa) return false;
    if (options.minSafetyScore && city.safetyScore < options.minSafetyScore) return false;
    return true;
  });
}

// Get cities sorted by nomad score
export function getCitiesByNomadScore(): City[] {
  return [...cities].sort((a, b) => (b.nomadScore || 0) - (a.nomadScore || 0));
}

// Get cities by continent
export function getCitiesByContinent(continent: string): City[] {
  return cities.filter((city) => city.continent === continent);
}

// Get featured cities (top rated)
export function getFeaturedCities(limit: number = 6): City[] {
  return getCitiesByNomadScore().slice(0, limit);
}

// Get affordable cities
export function getAffordableCities(maxCost: number = 1500): City[] {
  return cities
    .filter((city) => city.monthlyCost <= maxCost)
    .sort((a, b) => a.monthlyCost - b.monthlyCost);
}

// Get cities with fast internet
export function getFastInternetCities(minSpeed: number = 100): City[] {
  return cities
    .filter((city) => city.internetSpeed >= minSpeed)
    .sort((a, b) => b.internetSpeed - a.internetSpeed);
}

// Get cities with nomad visas
export function getCitiesWithNomadVisa(): City[] {
  return cities.filter((city) => city.visa?.hasNomadVisa === true);
}

// Search cities by name or country
export function searchCities(query: string): City[] {
  const lowerQuery = query.toLowerCase();
  return cities.filter(
    (city) =>
      city.name.toLowerCase().includes(lowerQuery) ||
      city.country.toLowerCase().includes(lowerQuery)
  );
}

// Get related cities (same continent, similar cost)
export function getRelatedCities(city: City, limit: number = 4): City[] {
  return cities
    .filter((c) => c.id !== city.id)
    .filter((c) => c.continent === city.continent || Math.abs(c.monthlyCost - city.monthlyCost) < 500)
    .sort((a, b) => (b.nomadScore || 0) - (a.nomadScore || 0))
    .slice(0, limit);
}

// City statistics
export function getCityStats() {
  const continentSet = new Set(cities.map((c) => c.continent));
  const countrySet = new Set(cities.map((c) => c.country));
  
  return {
    totalCities: cities.length,
    continents: Array.from(continentSet).length,
    countries: Array.from(countrySet).length,
    avgCost: Math.round(cities.reduce((sum, c) => sum + c.monthlyCost, 0) / cities.length),
    avgInternetSpeed: Math.round(cities.reduce((sum, c) => sum + c.internetSpeed, 0) / cities.length),
    citiesWithNomadVisa: cities.filter((c) => c.visa?.hasNomadVisa).length,
  };
}

