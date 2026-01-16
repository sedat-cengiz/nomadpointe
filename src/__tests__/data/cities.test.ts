import {
  cities,
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
  getCityStats,
} from "@/data/cities";

describe("Cities Data", () => {
  describe("cities array", () => {
    it("should have at least 30 cities", () => {
      expect(cities.length).toBeGreaterThanOrEqual(30);
    });

    it("should have cities from multiple continents", () => {
      const continents = [...new Set(cities.map((c) => c.continent))];
      expect(continents.length).toBeGreaterThanOrEqual(4);
    });

    it("should have required fields for each city", () => {
      cities.forEach((city) => {
        expect(city.id).toBeDefined();
        expect(city.slug).toBeDefined();
        expect(city.name).toBeDefined();
        expect(city.country).toBeDefined();
        expect(city.continent).toBeDefined();
        expect(city.internetSpeed).toBeGreaterThanOrEqual(0);
        expect(city.monthlyCost).toBeGreaterThan(0);
        expect(city.safetyScore).toBeGreaterThanOrEqual(1);
        expect(city.safetyScore).toBeLessThanOrEqual(5);
      });
    });

    it("should have unique slugs", () => {
      const slugs = cities.map((c) => c.slug);
      const uniqueSlugs = [...new Set(slugs)];
      expect(slugs.length).toBe(uniqueSlugs.length);
    });
  });

  describe("getCityBySlug", () => {
    it("should find city by slug", () => {
      // Get first city's slug for testing
      const firstCity = cities[0];
      const found = getCityBySlug(firstCity.slug);

      expect(found).toBeDefined();
      expect(found?.slug).toBe(firstCity.slug);
      expect(found?.name).toBe(firstCity.name);
    });

    it("should return undefined for non-existent slug", () => {
      const found = getCityBySlug("non-existent-city-slug-12345");
      expect(found).toBeUndefined();
    });
  });

  describe("getAllCitySlugs", () => {
    it("should return all city slugs", () => {
      const slugs = getAllCitySlugs();

      expect(slugs.length).toBe(cities.length);
      expect(slugs).toContain(cities[0].slug);
    });

    it("should return array of strings", () => {
      const slugs = getAllCitySlugs();

      slugs.forEach((slug) => {
        expect(typeof slug).toBe("string");
        expect(slug.length).toBeGreaterThan(0);
      });
    });
  });

  describe("filterCities", () => {
    it("should filter by minimum internet speed", () => {
      const filtered = filterCities({ minSpeed: 100 });

      filtered.forEach((city) => {
        expect(city.internetSpeed).toBeGreaterThanOrEqual(100);
      });
    });

    it("should filter by maximum cost", () => {
      const filtered = filterCities({ maxCost: 1500 });

      filtered.forEach((city) => {
        expect(city.monthlyCost).toBeLessThanOrEqual(1500);
      });
    });

    it("should filter by continent", () => {
      const filtered = filterCities({ continent: "Europe" });

      filtered.forEach((city) => {
        expect(city.continent).toBe("Europe");
      });
    });

    it("should filter by nomad visa availability", () => {
      const filtered = filterCities({ hasNomadVisa: true });

      filtered.forEach((city) => {
        expect(city.visa?.hasNomadVisa).toBe(true);
      });
    });

    it("should filter by minimum safety score", () => {
      const filtered = filterCities({ minSafetyScore: 4 });

      filtered.forEach((city) => {
        expect(city.safetyScore).toBeGreaterThanOrEqual(4);
      });
    });

    it("should combine multiple filters", () => {
      const filtered = filterCities({
        minSpeed: 50,
        maxCost: 2000,
        minSafetyScore: 4,
      });

      filtered.forEach((city) => {
        expect(city.internetSpeed).toBeGreaterThanOrEqual(50);
        expect(city.monthlyCost).toBeLessThanOrEqual(2000);
        expect(city.safetyScore).toBeGreaterThanOrEqual(4);
      });
    });
  });

  describe("getCitiesByNomadScore", () => {
    it("should return cities sorted by nomad score (descending)", () => {
      const sorted = getCitiesByNomadScore();

      for (let i = 0; i < sorted.length - 1; i++) {
        const scoreA = sorted[i].nomadScore || 0;
        const scoreB = sorted[i + 1].nomadScore || 0;
        expect(scoreA).toBeGreaterThanOrEqual(scoreB);
      }
    });
  });

  describe("getCitiesByContinent", () => {
    it("should return only cities from specified continent", () => {
      const europeanCities = getCitiesByContinent("Europe");

      expect(europeanCities.length).toBeGreaterThan(0);
      europeanCities.forEach((city) => {
        expect(city.continent).toBe("Europe");
      });
    });

    it("should return empty array for non-existent continent", () => {
      const cities = getCitiesByContinent("Atlantis");
      expect(cities).toEqual([]);
    });
  });

  describe("getFeaturedCities", () => {
    it("should return specified number of cities", () => {
      const featured6 = getFeaturedCities(6);
      const featured3 = getFeaturedCities(3);

      expect(featured6.length).toBe(6);
      expect(featured3.length).toBe(3);
    });

    it("should return top rated cities", () => {
      const featured = getFeaturedCities(5);
      const allSorted = getCitiesByNomadScore();

      // Featured should be top 5 from sorted
      featured.forEach((city, index) => {
        expect(city.id).toBe(allSorted[index].id);
      });
    });
  });

  describe("getAffordableCities", () => {
    it("should return cities under default cost ($1500)", () => {
      const affordable = getAffordableCities();

      affordable.forEach((city) => {
        expect(city.monthlyCost).toBeLessThanOrEqual(1500);
      });
    });

    it("should return cities under specified cost", () => {
      const affordable = getAffordableCities(1000);

      affordable.forEach((city) => {
        expect(city.monthlyCost).toBeLessThanOrEqual(1000);
      });
    });

    it("should be sorted by cost (ascending)", () => {
      const affordable = getAffordableCities(2000);

      for (let i = 0; i < affordable.length - 1; i++) {
        expect(affordable[i].monthlyCost).toBeLessThanOrEqual(
          affordable[i + 1].monthlyCost
        );
      }
    });
  });

  describe("getFastInternetCities", () => {
    it("should return cities with fast internet (100+ Mbps default)", () => {
      const fastCities = getFastInternetCities();

      fastCities.forEach((city) => {
        expect(city.internetSpeed).toBeGreaterThanOrEqual(100);
      });
    });

    it("should be sorted by speed (descending)", () => {
      const fastCities = getFastInternetCities(50);

      for (let i = 0; i < fastCities.length - 1; i++) {
        expect(fastCities[i].internetSpeed).toBeGreaterThanOrEqual(
          fastCities[i + 1].internetSpeed
        );
      }
    });
  });

  describe("getCitiesWithNomadVisa", () => {
    it("should return only cities with nomad visa", () => {
      const visaCities = getCitiesWithNomadVisa();

      expect(visaCities.length).toBeGreaterThan(0);
      visaCities.forEach((city) => {
        expect(city.visa?.hasNomadVisa).toBe(true);
      });
    });
  });

  describe("searchCities", () => {
    it("should find cities by name", () => {
      // Search for a partial name from first city
      const firstCity = cities[0];
      const searchTerm = firstCity.name.substring(0, 3).toLowerCase();
      const results = searchCities(searchTerm);

      expect(results.length).toBeGreaterThan(0);
      expect(
        results.some((c) => c.name.toLowerCase().includes(searchTerm))
      ).toBe(true);
    });

    it("should find cities by country", () => {
      // Get a country from the data
      const country = cities[0].country;
      const results = searchCities(country);

      expect(results.length).toBeGreaterThan(0);
      results.forEach((city) => {
        expect(
          city.country.toLowerCase().includes(country.toLowerCase()) ||
            city.name.toLowerCase().includes(country.toLowerCase())
        ).toBe(true);
      });
    });

    it("should be case-insensitive", () => {
      const firstCity = cities[0];
      const upperResults = searchCities(firstCity.name.toUpperCase());
      const lowerResults = searchCities(firstCity.name.toLowerCase());

      expect(upperResults.length).toBe(lowerResults.length);
    });

    it("should return empty array for no matches", () => {
      const results = searchCities("xyznonexistentcity123");
      expect(results).toEqual([]);
    });
  });

  describe("getCityStats", () => {
    it("should return statistics object", () => {
      const stats = getCityStats();

      expect(stats).toHaveProperty("totalCities");
      expect(stats).toHaveProperty("continents");
      expect(stats).toHaveProperty("countries");
      expect(stats).toHaveProperty("avgCost");
      expect(stats).toHaveProperty("avgInternetSpeed");
      expect(stats).toHaveProperty("citiesWithNomadVisa");
    });

    it("should return correct total cities count", () => {
      const stats = getCityStats();
      expect(stats.totalCities).toBe(cities.length);
    });

    it("should return reasonable average values", () => {
      const stats = getCityStats();

      expect(stats.avgCost).toBeGreaterThan(0);
      expect(stats.avgCost).toBeLessThan(10000);
      expect(stats.avgInternetSpeed).toBeGreaterThan(0);
      expect(stats.avgInternetSpeed).toBeLessThan(500);
    });
  });
});

