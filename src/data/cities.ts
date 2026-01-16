// Re-export everything from the new modular structure
// This file maintains backwards compatibility with existing imports

export {
  cities,
  asiaCities,
  europeCities,
  americasCities,
  africaCities,
  oceaniaCities,
  getCityBySlug,
  getAllCitySlugs,
  filterCities,
  getCitiesByNomadScore,
  getCitiesByContinent,
  getFeaturedCities,
  getAffordableCities,
  getFastInternetCities,
  getCitiesWithNomadVisa,
  searchCities,
  getRelatedCities,
  getCityStats,
} from "./cities/index";
