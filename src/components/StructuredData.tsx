"use client";

import { City } from "@/types/city";
import { getCityBestForTags } from "@/lib/cityBestFor";

interface StructuredDataProps {
  city: City;
  breadcrumbs?: { name: string; url: string }[];
  faqs?: { question: string; answer: string }[];
}

export default function StructuredData({ city, breadcrumbs, faqs }: StructuredDataProps) {
  const currentYear = new Date().getFullYear();
  const baseUrl = "https://nomadpointe.com";
  const cityUrl = `${baseUrl}/cities/${city.slug}`;
  const bestForTags = getCityBestForTags(city);

  // Place Schema - City information
  const placeSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: city.name,
    description: city.shortDescription,
    address: {
      "@type": "PostalAddress",
      addressCountry: city.country,
      addressRegion: city.continent,
    },
    image: city.heroImage,
    url: cityUrl,
  };

  // City Schema - Structured city metrics for LLMs and SEO
  const citySchema = {
    "@context": "https://schema.org",
    "@type": "City",
    name: city.name,
    url: cityUrl,
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "MonthlyCostOfLiving",
        value: city.monthlyCost,
        unitText: "USD",
      },
      {
        "@type": "PropertyValue",
        name: "AverageInternetSpeed",
        value: city.internetSpeed,
        unitText: "Mbps",
      },
      {
        "@type": "PropertyValue",
        name: "SafetyScore",
        value: city.safetyScore,
        maxValue: 5,
        minValue: 1,
      },
      ...(city.nomadScore
        ? [
            {
              "@type": "PropertyValue",
              name: "NomadScore",
              value: city.nomadScore,
              maxValue: 100,
              minValue: 0,
            },
          ]
        : []),
    ],
  };

  // Dataset Schema - AI-readable structured data points
  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `${city.name} Digital Nomad Cost of Living & Quality Data ${currentYear}`,
    description: `Structured cost-of-living, internet speed, safety, and nomad quality data for ${city.name}, ${city.country}. Updated ${city.lastUpdated || currentYear}.`,
    url: cityUrl,
    license: "https://creativecommons.org/licenses/by/4.0/",
    creator: {
      "@type": "Organization",
      name: "NomadPointe",
      url: baseUrl,
    },
    dateModified: city.lastUpdated || new Date().toISOString().split("T")[0],
    temporalCoverage: `${currentYear}`,
    spatialCoverage: {
      "@type": "Place",
      name: `${city.name}, ${city.country}`,
    },
    variableMeasured: [
      {
        "@type": "PropertyValue",
        name: "Monthly Cost of Living (USD)",
        value: city.monthlyCost,
      },
      {
        "@type": "PropertyValue",
        name: "Average Internet Speed (Mbps)",
        value: city.internetSpeed,
      },
      {
        "@type": "PropertyValue",
        name: "Safety Score (1-5)",
        value: city.safetyScore,
      },
      {
        "@type": "PropertyValue",
        name: "Accommodation (USD/month)",
        value: city.costBreakdown.accommodation,
      },
      {
        "@type": "PropertyValue",
        name: "Food (USD/month)",
        value: city.costBreakdown.food,
      },
      {
        "@type": "PropertyValue",
        name: "Transport (USD/month)",
        value: city.costBreakdown.transport,
      },
      {
        "@type": "PropertyValue",
        name: "Coworking (USD/month)",
        value: city.costBreakdown.coworking,
      },
      {
        "@type": "PropertyValue",
        name: "Entertainment (USD/month)",
        value: city.costBreakdown.entertainment,
      },
    ],
    ...(city.dataSource && city.dataSource.length > 0
      ? {
          isBasedOn: city.dataSource.map((source) => ({
            "@type": "CreativeWork",
            name: source,
          })),
        }
      : {}),
  };

  // TechArticle/Guide Schema - Represents the guide content for AI engines
  const guideSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: `${city.name} Digital Nomad Guide ${currentYear}`,
    alternativeHeadline: `Complete Remote Work Guide to ${city.name}, ${city.country}`,
    description: city.shortDescription,
    image: city.heroImage,
    author: {
      "@type": "Organization",
      name: "NomadPointe",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "NomadPointe",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/images/logo.svg`,
      },
    },
    datePublished: city.lastUpdated || new Date().toISOString(),
    dateModified: city.lastUpdated || new Date().toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": cityUrl,
    },
    about: [
      { "@type": "Thing", name: "Digital Nomad" },
      { "@type": "Thing", name: "Remote Work" },
      { "@type": "Thing", name: "Cost of Living" },
      { "@type": "Thing", name: city.name },
    ],
    keywords: [
      `${city.name} digital nomad`,
      `${city.name} cost of living ${currentYear}`,
      `${city.name} remote work`,
      `best coworking ${city.name}`,
      ...bestForTags.map((tag) => tag.label.toLowerCase()),
    ].join(", "),
    proficiencyLevel: "Beginner",
    articleSection: "Digital Nomad City Guides",
  };

  // TouristDestination Schema - Enhanced city info for nomads
  const touristDestinationSchema = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: `${city.name} - Digital Nomad Destination`,
    description: city.shortDescription,
    touristType: ["Digital Nomad", "Remote Worker", "Freelancer"],
    includesAttraction:
      city.coworkingSpaces?.map((space) => ({
        "@type": "TouristAttraction",
        name: space.name,
        description: `Coworking space in ${space.neighborhood}`,
      })) || [],
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = breadcrumbs
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }
    : null;

  // FAQPage Schema
  const faqSchema =
    faqs && faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  // AggregateRating Schema - City scores
  const ratingSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${city.name} for Digital Nomads`,
    description: `Digital nomad destination guide for ${city.name}, ${city.country}`,
    image: city.heroImage,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: city.nomadScore ? (city.nomadScore / 20).toFixed(1) : city.safetyScore,
      bestRating: "5",
      worstRating: "1",
      ratingCount: city.reviews?.length || 10,
    },
    offers: {
      "@type": "Offer",
      price: city.monthlyCost,
      priceCurrency: "USD",
      description: `Average monthly cost of living in ${city.name}`,
    },
  };

  const schemas = [
    placeSchema,
    citySchema,
    datasetSchema,
    guideSchema,
    touristDestinationSchema,
    ratingSchema,
    breadcrumbSchema,
    faqSchema,
  ].filter(Boolean);

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

