import { City } from "@/types/city";
import {
  calculateNomadScore,
  getScoreBreakdown,
  getScoreTier,
  compareCities,
} from "@/lib/nomadScore";

// Create a minimal city mock for testing
const createMockCity = (overrides: Partial<City> = {}): City => ({
  id: "test-city",
  slug: "test-city",
  name: "Test City",
  country: "Test Country",
  continent: "Europe",
  heroImage: "https://example.com/image.jpg",
  images: { hero: "https://example.com/image.jpg", gallery: [] },
  internetSpeed: 50,
  monthlyCost: 1500,
  safetyScore: 4,
  nomadScore: 80,
  visaAvailable: true,
  shortDescription: "A test city",
  description: "A test city description",
  costBreakdown: {
    accommodation: 800,
    food: 300,
    transport: 100,
    entertainment: 200,
    coworking: 100,
  },
  bestFor: ["remote work"],
  climate: {
    type: "temperate",
    averageTemp: { summer: 25, winter: 10 },
    rainyMonths: ["November", "December"],
    bestMonths: ["June", "July", "August"],
  },
  visa: {
    hasNomadVisa: true,
    visaName: "Test Visa",
    maxStayDays: 365,
    processingTime: "2 weeks",
    applicationUrl: "https://example.com",
    visaFee: 100,
    visaFreeDays: 90,
    requiredDocuments: [],
    taxImplications: "None",
    extensionOptions: "Available",
  },
  communityLinks: {
    facebook: "https://facebook.com/test",
    slack: "https://slack.com/test",
  },
  coworking: [],
  neighborhoods: [],
  practicalInfo: {
    timezone: "UTC+1",
    currency: { code: "EUR", symbol: "€", rate: 1 },
    language: "English",
    emergencyNumber: "112",
    plugType: "Type C",
    tapWater: true,
    simCards: [],
    publicTransport: "",
    bikeRental: true,
    walkability: 4,
  },
  health: {
    publicHealthcare: true,
    healthcareQuality: 4,
    pharmaciesAvailable: true,
    vaccinationsRecommended: [],
    commonIssues: [],
    insuranceNotes: "",
    hospitals: [],
  },
  finance: {
    bankingFriendly: true,
    atmAvailability: "high",
    commonPayments: ["card", "cash"],
    cryptoFriendly: false,
    averageAtmFee: 2,
    recommendedCards: [],
  },
  reviews: [],
  localFood: {
    dishes: [],
    dietaryOptions: { vegetarian: true, vegan: true, halal: true, kosher: false, glutenFree: true },
  },
  transport: {
    publicTransport: { available: true, quality: 4, monthlyPass: 50, types: ["metro", "bus"] },
    taxi: { available: true, baseFare: 3, perKm: 1.5, apps: ["Uber"] },
    bikeRental: { available: true, hourlyRate: 2, monthlyRate: 30, providers: [] },
    carRental: { available: true, dailyRate: 40, providers: [] },
    walkability: 4,
    airportDistance: 20,
    airportTransport: "Metro",
  },
  seasonality: {
    peakMonths: ["July", "August"],
    offPeakMonths: ["January", "February"],
    events: [],
    weatherWarnings: [],
  },
  ...overrides,
});

describe("calculateNomadScore", () => {
  it("should calculate score for a typical city", () => {
    const city = createMockCity({
      internetSpeed: 50,
      monthlyCost: 1500,
      safetyScore: 4,
      visa: { ...createMockCity().visa!, hasNomadVisa: true },
      communityLinks: { facebook: "url1", slack: "url2" },
    });

    const score = calculateNomadScore(city);

    // Expected:
    // Internet: 50/2 = 25
    // Cost: 25 - (1500-1000)/160 = 25 - 3.125 = 21.875
    // Safety: 4 * 5 = 20
    // Visa: 15 (has nomad visa)
    // Community: 2 * 2.5 = 5
    // Total: ~87

    expect(score).toBeGreaterThanOrEqual(85);
    expect(score).toBeLessThanOrEqual(90);
  });

  it("should return max 100", () => {
    const city = createMockCity({
      internetSpeed: 200,
      monthlyCost: 500,
      safetyScore: 5,
      visa: { ...createMockCity().visa!, hasNomadVisa: true },
      communityLinks: { a: "1", b: "2", c: "3", d: "4", e: "5" },
    });

    const score = calculateNomadScore(city);
    expect(score).toBeLessThanOrEqual(100);
  });

  it("should return min 0", () => {
    const city = createMockCity({
      internetSpeed: 0,
      monthlyCost: 10000,
      safetyScore: 0,
      visa: undefined,
      communityLinks: {},
    });

    const score = calculateNomadScore(city);
    expect(score).toBeGreaterThanOrEqual(0);
  });

  it("should give higher score to faster internet", () => {
    const slowCity = createMockCity({ internetSpeed: 20 });
    const fastCity = createMockCity({ internetSpeed: 100 });

    expect(calculateNomadScore(fastCity)).toBeGreaterThan(
      calculateNomadScore(slowCity)
    );
  });

  it("should give higher score to lower cost", () => {
    const expensiveCity = createMockCity({ monthlyCost: 4000 });
    const cheapCity = createMockCity({ monthlyCost: 1000 });

    expect(calculateNomadScore(cheapCity)).toBeGreaterThan(
      calculateNomadScore(expensiveCity)
    );
  });

  it("should give higher score to cities with nomad visa", () => {
    const noVisa = createMockCity({
      visa: { ...createMockCity().visa!, hasNomadVisa: false },
    });
    const hasVisa = createMockCity({
      visa: { ...createMockCity().visa!, hasNomadVisa: true },
    });

    expect(calculateNomadScore(hasVisa)).toBeGreaterThan(
      calculateNomadScore(noVisa)
    );
  });
});

describe("getScoreBreakdown", () => {
  it("should return breakdown with all categories", () => {
    const city = createMockCity();
    const breakdown = getScoreBreakdown(city);

    expect(breakdown).toHaveProperty("internet");
    expect(breakdown).toHaveProperty("cost");
    expect(breakdown).toHaveProperty("safety");
    expect(breakdown).toHaveProperty("visa");
    expect(breakdown).toHaveProperty("community");
    expect(breakdown).toHaveProperty("total");
  });

  it("should include max values", () => {
    const city = createMockCity();
    const breakdown = getScoreBreakdown(city);

    expect(breakdown.internet.max).toBe(25);
    expect(breakdown.cost.max).toBe(25);
    expect(breakdown.safety.max).toBe(25);
    expect(breakdown.visa.max).toBe(15);
    expect(breakdown.community.max).toBe(10);
  });

  it("should include descriptions", () => {
    const city = createMockCity({ internetSpeed: 75, monthlyCost: 2000 });
    const breakdown = getScoreBreakdown(city);

    expect(breakdown.internet.description).toContain("75 Mbps");
    expect(breakdown.cost.description).toContain("$2000/month");
  });
});

describe("getScoreTier", () => {
  it("should return excellent for score >= 85", () => {
    expect(getScoreTier(85).tier).toBe("excellent");
    expect(getScoreTier(90).tier).toBe("excellent");
    expect(getScoreTier(100).tier).toBe("excellent");
  });

  it("should return great for score >= 75", () => {
    expect(getScoreTier(75).tier).toBe("great");
    expect(getScoreTier(80).tier).toBe("great");
    expect(getScoreTier(84).tier).toBe("great");
  });

  it("should return good for score >= 65", () => {
    expect(getScoreTier(65).tier).toBe("good");
    expect(getScoreTier(70).tier).toBe("good");
    expect(getScoreTier(74).tier).toBe("good");
  });

  it("should return average for score >= 50", () => {
    expect(getScoreTier(50).tier).toBe("average");
    expect(getScoreTier(60).tier).toBe("average");
    expect(getScoreTier(64).tier).toBe("average");
  });

  it("should return below-average for score < 50", () => {
    expect(getScoreTier(49).tier).toBe("below-average");
    expect(getScoreTier(30).tier).toBe("below-average");
    expect(getScoreTier(0).tier).toBe("below-average");
  });
});

describe("compareCities", () => {
  it("should identify winner based on score difference", () => {
    const cityA = createMockCity({ internetSpeed: 100, monthlyCost: 1000 });
    const cityB = createMockCity({ internetSpeed: 30, monthlyCost: 3000 });

    const result = compareCities(cityA, cityB);

    expect(result.winner).toBe("A");
    expect(result.scoreA).toBeGreaterThan(result.scoreB);
  });

  it("should return tie for similar scores", () => {
    const cityA = createMockCity({ internetSpeed: 50, monthlyCost: 1500 });
    const cityB = createMockCity({ internetSpeed: 52, monthlyCost: 1480 });

    const result = compareCities(cityA, cityB);

    expect(result.winner).toBe("tie");
  });

  it("should identify advantages", () => {
    const cityA = createMockCity({
      internetSpeed: 100,
      monthlyCost: 2000,
      safetyScore: 5,
    });
    const cityB = createMockCity({
      internetSpeed: 50,
      monthlyCost: 1200,
      safetyScore: 3,
    });

    const result = compareCities(cityA, cityB);

    expect(result.advantages.cityA).toContain("Faster internet");
    expect(result.advantages.cityA).toContain("Higher safety rating");
    expect(result.advantages.cityB).toContain("Lower cost of living");
  });

  it("should identify nomad visa advantage", () => {
    const cityA = createMockCity({
      visa: { ...createMockCity().visa!, hasNomadVisa: true },
    });
    const cityB = createMockCity({
      visa: { ...createMockCity().visa!, hasNomadVisa: false },
    });

    const result = compareCities(cityA, cityB);

    expect(result.advantages.cityA).toContain("Digital Nomad Visa available");
  });
});

