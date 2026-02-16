import { City } from "@/types/city";

export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Generate dynamic FAQs based on city data (server-safe).
 * These power both the visible FAQ accordion and the FAQPage schema markup.
 * AI search engines use these as direct answer sources.
 */
export function generateCityFAQs(city: City): FAQItem[] {
  const currentYear = new Date().getFullYear();
  const faqs: FAQItem[] = [];

  // Cost of living FAQ (primary query target)
  faqs.push({
    question: `What is the cost of living in ${city.name} for digital nomads in ${currentYear}?`,
    answer: `The average monthly cost of living in ${city.name}, ${city.country} is approximately $${city.monthlyCost.toLocaleString("en-US")} USD as of ${currentYear}. This includes accommodation ($${city.costBreakdown.accommodation}), food ($${city.costBreakdown.food}), transport ($${city.costBreakdown.transport}), coworking ($${city.costBreakdown.coworking}), and entertainment ($${city.costBreakdown.entertainment}). Data sourced from NomadPointe's methodology combining Numbeo, Speedtest, and local rental platforms.`,
  });

  // Internet speed FAQ
  faqs.push({
    question: `How fast is the internet in ${city.name} for remote work?`,
    answer: `${city.name} offers an average internet speed of ${city.internetSpeed} Mbps, which is ${
      city.internetSpeed >= 100
        ? "excellent"
        : city.internetSpeed >= 50
          ? "good"
          : "adequate"
    } for remote work, video calls, and streaming. ${
      city.coworkingSpaces && city.coworkingSpaces.length > 0
        ? `Coworking spaces like ${city.coworkingSpaces[0].name} typically offer faster dedicated connections.`
        : ""
    }`,
  });

  // Safety FAQ (high-intent AI query)
  faqs.push({
    question: `Is ${city.name} safe for digital nomads?`,
    answer: `${city.name} has a safety score of ${city.safetyScore}/5 on NomadPointe, making it ${
      city.safetyScore >= 4
        ? "very safe"
        : city.safetyScore >= 3
          ? "relatively safe"
          : "moderately safe"
    } for digital nomads. ${
      city.healthInfo
        ? `Healthcare quality is rated ${city.healthInfo.healthcareQuality}/5 and water is ${city.healthInfo.waterSafety === "Safe" ? "safe to drink" : "recommended to be filtered or bottled"}.`
        : ""
    } As with any destination, exercise normal precautions and stay aware of your surroundings.`,
  });

  // Visa FAQ
  if (city.visa) {
    faqs.push({
      question: `Does ${city.country} have a digital nomad visa in ${currentYear}?`,
      answer: city.visa.hasNomadVisa
        ? `Yes, ${city.country} offers the ${city.visa.visaName} as of ${currentYear}. ${
            city.visa.mainRequirement
              ? `The main requirement is: ${city.visa.mainRequirement}.`
              : ""
          } ${
            city.visa.maxStayDays
              ? `Maximum stay is ${city.visa.maxStayDays} days.`
              : ""
          } ${
            city.visa.visaFee
              ? `The visa fee is approximately $${city.visa.visaFee} USD.`
              : ""
          } ${
            city.visa.visaFreeDays
              ? `You can also stay visa-free for ${city.visa.visaFreeDays} days.`
              : ""
          }`
        : `${city.country} does not currently have a specific digital nomad visa as of ${currentYear}. ${
            city.visa.visaFreeDays
              ? `However, many nationalities can stay visa-free for ${city.visa.visaFreeDays} days.`
              : "Check the local embassy for tourist visa options."
          }`,
    });
  }

  // Best time to visit FAQ
  if (city.bestMonths.length > 0) {
    faqs.push({
      question: `What is the best time to visit ${city.name} as a digital nomad?`,
      answer: `The best months to visit ${city.name} are ${city.bestMonths.join(", ")}. ${city.climate.summer} ${city.climate.winter}`,
    });
  }

  // Coworking FAQ
  if (city.coworkingSpaces && city.coworkingSpaces.length > 0) {
    const topSpaces = city.coworkingSpaces
      .slice(0, 3)
      .map((s) => s.name)
      .join(", ");
    faqs.push({
      question: `What are the best coworking spaces in ${city.name}?`,
      answer: `${city.name} has ${city.coworkingSpaces.length}+ notable coworking spaces. Top options include ${topSpaces}. Prices typically range from $${city.costBreakdown.coworking - 50} to $${city.costBreakdown.coworking + 100} per month.`,
    });
  }

  // Language FAQ
  if (city.practicalInfo) {
    faqs.push({
      question: `Do people speak English in ${city.name}?`,
      answer: `English proficiency in ${city.name} is ${city.practicalInfo.englishProficiency.toLowerCase()}. The primary language is ${city.practicalInfo.primaryLanguage}. ${
        city.practicalInfo.languageBarrier === "Low"
          ? "You can get by easily with just English."
          : city.practicalInfo.languageBarrier === "Medium"
            ? "Learning a few local phrases is helpful."
            : "Learning some local language is recommended."
      }`,
    });
  }

  // Accommodation FAQ (AI-targeted)
  faqs.push({
    question: `How much does accommodation cost in ${city.name} for a digital nomad?`,
    answer: `A furnished apartment or Airbnb in ${city.name} costs approximately $${city.costBreakdown.accommodation} USD per month for a comfortable 1-bedroom in a central or nomad-friendly area. ${
      city.neighborhoods && city.neighborhoods.length > 0
        ? `Popular neighborhoods include ${city.neighborhoods.slice(0, 3).map((n) => n.name).join(", ")}.`
        : ""
    }`,
  });

  // "Is it worth it" FAQ (high-intent conversational query)
  faqs.push({
    question: `Is ${city.name} a good city for digital nomads in ${currentYear}?`,
    answer: `${city.name} ${
      city.nomadScore && city.nomadScore >= 70
        ? `is highly rated for digital nomads with a NomadPointe score of ${city.nomadScore}/100.`
        : `is a viable option for digital nomads.`
    } Key highlights: $${city.monthlyCost.toLocaleString("en-US")}/month cost of living, ${city.internetSpeed} Mbps internet, and a ${city.safetyScore}/5 safety rating. ${city.proTip || ""}`,
  });

  return faqs;
}


