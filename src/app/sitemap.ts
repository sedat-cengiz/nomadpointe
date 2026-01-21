import { MetadataRoute } from "next";
import { getAllCitySlugs } from "@/data/cities";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();
  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXTAUTH_URL ||
    "https://nomadpointe.com"
  ).replace(/\/$/, "");

  // Get all city slugs
  const citySlugs = getAllCitySlugs();

  // Exclude areas that are intentionally non-indexable (auth/protected/planner flows)
  // Note: we keep the sitemap strict to avoid GSC "URL not allowed" / "redirect page" noise.
  const excludedPathPrefixes = ["/trips", "/dashboard", "/profile", "/login"];

  // Static pages - Main navigation
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  // Tool pages
  const toolPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/tools/currency`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools/timezone`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Legal/Info pages
  const legalPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/affiliate-disclosure`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/methodology`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/nomadpointe-vs-numbeo`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/how-to-interpret-cost-of-living-data`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  // City pages - highest priority content
  const cityPages: MetadataRoute.Sitemap = citySlugs.map((slug) => ({
    url: `${baseUrl}/cities/${slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const all = [...staticPages, ...toolPages, ...legalPages, ...cityPages];

  return all.filter(
    (entry) =>
      !excludedPathPrefixes.some((prefix) =>
        new URL(entry.url).pathname.startsWith(prefix)
      )
  );
}

