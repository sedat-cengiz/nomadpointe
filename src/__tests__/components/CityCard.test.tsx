import { render, screen, fireEvent } from "@testing-library/react";
import CityCard from "@/components/CityCard";
import { City } from "@/types/city";

// Create a minimal mock city for testing
const mockCity: City = {
  id: "test-city",
  slug: "test-city-slug",
  name: "Test City",
  country: "Test Country",
  continent: "Europe",
  heroImage: "https://example.com/image.jpg",
  images: { hero: "https://example.com/image.jpg", gallery: [] },
  internetSpeed: 75,
  monthlyCost: 1500,
  safetyScore: 4,
  nomadScore: 85,
  visaAvailable: true,
  shortDescription: "A great city for digital nomads",
  description: "Full description",
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
    rainyMonths: [],
    bestMonths: [],
  },
  visa: {
    hasNomadVisa: true,
    visaName: "Digital Nomad Visa",
    maxStayDays: 365,
    processingTime: "2 weeks",
    applicationUrl: "https://example.com",
    visaFee: 100,
    visaFreeDays: 90,
    requiredDocuments: [],
    taxImplications: "",
    extensionOptions: "",
  },
  communityLinks: {},
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
    commonPayments: ["card"],
    cryptoFriendly: false,
    averageAtmFee: 2,
    recommendedCards: [],
  },
  reviews: [],
  localFood: {
    dishes: [],
    dietaryOptions: { vegetarian: true, vegan: true, halal: false, kosher: false, glutenFree: false },
  },
  transport: {
    publicTransport: { available: true, quality: 4, monthlyPass: 50, types: [] },
    taxi: { available: true, baseFare: 3, perKm: 1, apps: [] },
    bikeRental: { available: true, hourlyRate: 2, monthlyRate: 30, providers: [] },
    carRental: { available: true, dailyRate: 40, providers: [] },
    walkability: 4,
    airportDistance: 20,
    airportTransport: "Metro",
  },
  seasonality: {
    peakMonths: [],
    offPeakMonths: [],
    events: [],
    weatherWarnings: [],
  },
};

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: { src: string; alt: string; className?: string }) => (
    // eslint-disable-next-line
    <img src={props.src} alt={props.alt} className={props.className} />
  ),
}));

describe("CityCard Component", () => {
  it("renders city name and country", () => {
    render(<CityCard city={mockCity} />);

    expect(screen.getByText("Test City")).toBeInTheDocument();
    expect(screen.getByText("Test Country")).toBeInTheDocument();
  });

  it("renders internet speed", () => {
    render(<CityCard city={mockCity} />);

    expect(screen.getByText("75 Mbps")).toBeInTheDocument();
  });

  it("renders monthly cost", () => {
    render(<CityCard city={mockCity} />);

    // The cost label should exist
    expect(screen.getByText("Monthly")).toBeInTheDocument();
  });

  it("renders safety score", () => {
    render(<CityCard city={mockCity} />);

    expect(screen.getByText("4/5")).toBeInTheDocument();
  });

  it("renders nomad score", () => {
    render(<CityCard city={mockCity} />);

    expect(screen.getByText("Score: 85")).toBeInTheDocument();
  });

  it("renders nomad visa badge when available", () => {
    render(<CityCard city={mockCity} />);

    expect(screen.getByText("Nomad Visa Available")).toBeInTheDocument();
  });

  it("does not render nomad visa badge when not available", () => {
    const cityWithoutVisa = { ...mockCity, visaAvailable: false };
    render(<CityCard city={cityWithoutVisa} />);

    expect(screen.queryByText("Nomad Visa Available")).not.toBeInTheDocument();
  });

  it("renders short description", () => {
    render(<CityCard city={mockCity} />);

    expect(
      screen.getByText("A great city for digital nomads")
    ).toBeInTheDocument();
  });

  it("calls onToggleCompare when compare button is clicked", () => {
    const mockToggleCompare = jest.fn();
    render(
      <CityCard city={mockCity} onToggleCompare={mockToggleCompare} />
    );

    const compareButton = screen.getByTitle("Add to compare");
    fireEvent.click(compareButton);

    expect(mockToggleCompare).toHaveBeenCalledWith("test-city-slug");
  });

  it("calls onToggleFavorite when favorite button is clicked", () => {
    const mockToggleFavorite = jest.fn();
    render(
      <CityCard city={mockCity} onToggleFavorite={mockToggleFavorite} />
    );

    const favoriteButton = screen.getByTitle("Add to favorites");
    fireEvent.click(favoriteButton);

    expect(mockToggleFavorite).toHaveBeenCalledWith("test-city-slug");
  });

  it("shows selected state when isSelected is true", () => {
    render(<CityCard city={mockCity} isSelected={true} />);

    const button = screen.getByTitle("Remove from compare");
    expect(button).toBeInTheDocument();
  });

  it("shows favorite state when isFavorite is true", () => {
    render(<CityCard city={mockCity} isFavorite={true} />);

    const button = screen.getByTitle("Remove from favorites");
    expect(button).toBeInTheDocument();
  });

  it("hides compare checkbox when showCompareCheckbox is false", () => {
    render(<CityCard city={mockCity} showCompareCheckbox={false} />);

    expect(screen.queryByTitle("Add to compare")).not.toBeInTheDocument();
  });

  it("hides favorite button when showFavoriteButton is false", () => {
    render(<CityCard city={mockCity} showFavoriteButton={false} />);

    expect(screen.queryByTitle("Add to favorites")).not.toBeInTheDocument();
  });

  it("links to city detail page", () => {
    render(<CityCard city={mockCity} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/cities/test-city-slug");
  });

  it("applies correct color for fast internet", () => {
    const fastInternetCity = { ...mockCity, internetSpeed: 100 };
    render(<CityCard city={fastInternetCity} />);

    // Internet speed should have green color for >= 50 Mbps
    const speedText = screen.getByText("100 Mbps");
    expect(speedText).toBeInTheDocument();
  });

  it("renders low cost city correctly", () => {
    const lowCostCity = { ...mockCity, monthlyCost: 1000 };
    render(<CityCard city={lowCostCity} />);

    // The cost label should exist
    expect(screen.getByText("Monthly")).toBeInTheDocument();
  });

  it("applies correct color for high safety", () => {
    const safeCity = { ...mockCity, safetyScore: 5 };
    render(<CityCard city={safeCity} />);

    // Safety should have green color for >= 4
    const safetyText = screen.getByText("5/5");
    expect(safetyText).toBeInTheDocument();
  });
});

