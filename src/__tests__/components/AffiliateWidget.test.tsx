import { fireEvent, render, screen } from "@testing-library/react";
import AffiliateWidget from "@/components/AffiliateWidget";

jest.mock("@/lib/analytics", () => ({
  trackAffiliateClick: jest.fn(),
}));

jest.mock("@/lib/affiliates", () => ({
  getAffiliateConfigs: () => [
    {
      id: "safetywing",
      title: "Nomad Health Insurance",
      description: "Test description",
      cta: "Get Coverage",
      getUrl: () => "https://example.com/safetywing",
      icon: "Shield",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
      ctaColor: "bg-emerald-600 hover:bg-emerald-700",
      priority: 1,
    },
  ],
  isAffiliateConfigured: () => true,
}));

describe("AffiliateWidget", () => {
  it("tracks affiliate click with placement and city", () => {
    const { trackAffiliateClick } = require("@/lib/analytics");

    render(
      <AffiliateWidget
        cityName="Lisbon"
        countryName="Portugal"
        placement="city_sidebar"
        limit={1}
      />
    );

    const link = screen.getByRole("link", { name: /get coverage/i });
    fireEvent.click(link);

    expect(trackAffiliateClick).toHaveBeenCalledWith(
      "safetywing:city_sidebar",
      "Lisbon"
    );
  });
});


