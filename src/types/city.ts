export interface CostBreakdown {
  accommodation: number; // USD/month
  food: number; // USD/month
  transport: number; // USD/month
  coworking: number; // USD/month
  entertainment: number; // USD/month
}

export interface Climate {
  summer: string;
  winter: string;
}

export interface CommunityLinks {
  whatsapp?: string;
  discord?: string;
  facebook?: string;
  telegram?: string;
  reddit?: string;
  meetup?: string;
}

// NEW: Detailed visa information
export interface VisaInfo {
  hasNomadVisa: boolean;
  visaName?: string;
  mainRequirement?: string;
  maxStayDays?: number;
  applicationUrl?: string;
  // Extended visa details
  visaFee?: number; // USD
  extensionFee?: number; // USD
  processingTime?: string; // e.g., "2-4 weeks"
  visaFreeDays?: number; // Days allowed without visa
  requiredDocuments?: string[]; // List of required documents
  taxImplications?: string; // Tax info for nomads
  extensionOptions?: string; // Extension possibilities
}

// NEW: Practical daily information
export interface PracticalInfo {
  timezone: string; // e.g., "UTC+7" or "Asia/Bangkok"
  timezoneOffset: number; // Hours from UTC, e.g., 7 for UTC+7
  plugType: string; // e.g., "Type A, Type B"
  voltage: string; // e.g., "220V, 50Hz"
  languageBarrier: "Low" | "Medium" | "High";
  englishProficiency: "High" | "Medium" | "Low";
  primaryLanguage: string;
  emergencyNumber: string; // e.g., "911", "112"
  simOptions?: SimOption[];
}

export interface SimOption {
  provider: string;
  dataPrice: string; // e.g., "$10/30GB"
  coverage: "Excellent" | "Good" | "Fair";
  esimAvailable: boolean;
}

// NEW: Health and safety information
export interface HealthInfo {
  waterSafety: "Safe" | "Boil" | "Bottled Only";
  healthcareQuality: 1 | 2 | 3 | 4 | 5; // 1-5 scale
  hospitalCostPerVisit?: number; // USD, average private hospital
  requiredVaccinations?: string[];
  recommendedVaccinations?: string[];
  commonHealthRisks?: string[];
  pharmacyAvailability: "Excellent" | "Good" | "Limited";
  covidRestrictions?: string;
}

// NEW: Finance and banking information
export interface FinanceInfo {
  currency: string; // e.g., "THB", "EUR"
  currencySymbol: string; // e.g., "฿", "€"
  atmFees: string; // e.g., "$5-7 per withdrawal"
  cardAcceptance: "Excellent" | "Good" | "Cash Preferred";
  wiseAvailable: boolean;
  revolutAvailable: boolean;
  bankAccountPossible: boolean;
  bankAccountRequirements?: string;
  cryptoFriendly: "Yes" | "Regulated" | "No";
  cryptoNotes?: string;
  tippingCulture: string; // e.g., "10-15% expected", "Not common"
}

// NEW: Transportation information
export interface TransportInfo {
  mainAirport: string;
  airportCode: string;
  airportToCenter: string; // e.g., "30 min by taxi, $15"
  publicTransit: PublicTransitInfo;
  rideshareApps: string[]; // e.g., ["Uber", "Bolt", "Grab"]
  scooterRental?: string; // e.g., "$5-10/day"
  bikeRental?: string;
  walkability: "Excellent" | "Good" | "Fair" | "Poor";
  trafficLevel: "Low" | "Medium" | "High" | "Extreme";
}

export interface PublicTransitInfo {
  available: boolean;
  types: string[]; // e.g., ["Metro", "Bus", "Tram"]
  passName?: string; // e.g., "Navegante", "BTS Rabbit"
  monthlyPassCost?: number; // USD
  singleTripCost?: number; // USD
  quality: "Excellent" | "Good" | "Fair" | "Poor";
}

// NEW: Coworking space details
export interface CoworkingSpace {
  name: string;
  neighborhood: string;
  priceRange: string; // e.g., "$100-200/month"
  rating: number; // 1-5
  features: string[];
  url?: string;
}

// NEW: Neighborhood information
export type NeighborhoodVibe = "party" | "quiet" | "tech-hub" | "artistic" | "family-friendly" | "beachside" | "historic" | "modern";
export type PriceLevel = "budget" | "mid" | "premium";

export interface Neighborhood {
  name: string;
  vibe: NeighborhoodVibe;
  priceLevel: PriceLevel;
  bestFor: string[];
  description?: string;
}

// NEW: Image gallery
export interface CityImages {
  hero: string;
  gallery: string[];
}

// NEW: Laptop-friendly cafe information
export interface LaptopFriendlyCafe {
  name: string;
  neighborhood: string;
  wifiSpeed?: "Fast" | "Moderate" | "Slow";
  powerOutlets?: boolean;
  specialty?: string; // e.g., "Great coffee", "Quiet atmosphere"
}

// NEW: Community Reviews
export interface CityReview {
  id: string;
  user: string;
  avatar: string; // DiceBear avatar URL
  date: string;
  rating: 4 | 5;
  text: string;
  type: "fan" | "realist" | "worker";
}

// NEW: Food and Workspace information
export interface FoodAndWorkspace {
  // Big Mac Index - Global cost comparison
  bigMacPrice?: number; // USD - McDonald's Big Mac price
  bigMacIndex?: "Cheaper" | "Similar" | "Expensive"; // vs US price ($5.69)
  
  // Daily food costs
  cappuccinoPrice: number; // USD - Average cappuccino price
  localMealPrice: number; // USD - Local restaurant meal
  
  // Food culture
  mustTryDish: string; // Famous local dish
  foodScene?: string; // Brief description of food culture
  
  // Budget-friendly spots
  budgetMealSpots?: string[]; // Cheap eats recommendations
  
  // Work-friendly cafes
  laptopFriendlyCafes: LaptopFriendlyCafe[];
}

export interface City {
  // Basic Info
  id: string;
  slug: string; // SEO-friendly: "digital-nomad-guide-bali"
  name: string;
  country: string;
  continent: string;
  
  // Legacy field (kept for backwards compatibility)
  heroImage: string;
  
  // NEW: Multiple images
  images?: CityImages;

  // Metrics
  internetSpeed: number; // Mbps
  monthlyCost: number; // USD (average)
  safetyScore: number; // 1-5
  nomadScore?: number; // 1-100 (calculated)
  
  // Legacy field (kept for backwards compatibility)
  visaAvailable: boolean;
  
  // NEW: Detailed visa info
  visa?: VisaInfo;

  // Cost Details (for Budget Tool)
  costBreakdown: CostBreakdown;

  // NEW: Coworking spaces
  coworkingSpaces?: CoworkingSpace[];
  
  // NEW: Neighborhood information
  neighborhoods?: Neighborhood[];

  // Seasonality (for Seasonality Tracker)
  bestMonths: string[];
  climate: Climate;

  // Community (for Social Gateway)
  communityLinks: CommunityLinks;

  // Content
  shortDescription: string;
  longDescription: string;
  
  // NEW: Additional content fields
  cityVibe?: string;
  proTip?: string;
  
  // NEW: Meta information
  lastUpdated?: string;
  dataSource?: string[];
  
  // NEW: Food and workspace information
  foodAndWorkspace?: FoodAndWorkspace;
  
  // NEW: Community reviews
  reviews?: CityReview[];
  
  // NEW: Practical information
  practicalInfo?: PracticalInfo;
  
  // NEW: Health information
  healthInfo?: HealthInfo;
  
  // NEW: Finance information
  financeInfo?: FinanceInfo;
  
  // NEW: Transport information
  transportInfo?: TransportInfo;
}

export type LifestyleType = "budget" | "comfortable" | "executive";

export interface LifestyleOption {
  id: LifestyleType;
  label: string;
  multiplier: number;
  description: string;
}

export const lifestyleOptions: LifestyleOption[] = [
  {
    id: "budget",
    label: "Budget Backpacker",
    multiplier: 0.7,
    description: "Hostels, street food, public transport",
  },
  {
    id: "comfortable",
    label: "Comfortable Nomad",
    multiplier: 1.0,
    description: "Private apartment, eating out, occasional taxi",
  },
  {
    id: "executive",
    label: "Digital Executive",
    multiplier: 1.5,
    description: "Premium housing, fine dining, premium services",
  },
];

// Continent type for filtering
export type Continent = "Asia" | "Europe" | "North America" | "South America" | "Africa" | "Oceania" | "Europe/Asia";

// City tier for prioritization
export type CityTier = "tier1" | "tier2" | "tier3";
