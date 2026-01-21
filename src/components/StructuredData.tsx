"use client";

import { City } from "@/types/city";

interface StructuredDataProps {
  city: City;
  breadcrumbs?: { name: string; url: string }[];
  faqs?: { question: string; answer: string }[];
}

export default function StructuredData({ city, breadcrumbs, faqs }: StructuredDataProps) {
  const currentYear = new Date().getFullYear();
  const baseUrl = "https://nomadpoint.com";

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
    url: `${baseUrl}/cities/${city.slug}`,
  };

  // TouristDestination Schema - Enhanced city info for nomads
  const touristDestinationSchema = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: `${city.name} - Digital Nomad Destination`,
    description: city.shortDescription,
    touristType: ["Digital Nomad", "Remote Worker", "Freelancer"],
    includesAttraction: city.coworkingSpaces?.map((space) => ({
      "@type": "TouristAttraction",
      name: space.name,
      description: `Coworking space in ${space.neighborhood}`,
    })) || [],
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = breadcrumbs ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  } : null;

  // FAQPage Schema
  const faqSchema = faqs && faqs.length > 0 ? {
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
  } : null;

  // Article Schema - For the guide content
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${city.name} Digital Nomad Guide ${currentYear}`,
    description: city.shortDescription,
    image: city.heroImage,
    author: {
      "@type": "Organization",
      name: "NomadPoint",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "NomadPoint",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/images/logo.svg`,
      },
    },
    datePublished: city.lastUpdated || new Date().toISOString(),
    dateModified: city.lastUpdated || new Date().toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/cities/${city.slug}`,
    },
  };

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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(placeSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(touristDestinationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ratingSchema) }}
      />
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
}

