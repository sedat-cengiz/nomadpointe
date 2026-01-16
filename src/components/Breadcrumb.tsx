"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center flex-wrap gap-1 text-sm">
        {/* Home */}
        <li className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-1 text-gray-500 hover:text-primary transition-colors"
          >
            <Home className="w-4 h-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.url} className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              {isLast ? (
                <span className="text-gray-900 font-medium" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="text-gray-500 hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// Helper function to generate breadcrumbs for city pages
export function generateCityBreadcrumbs(city: {
  name: string;
  country: string;
  continent: string;
  slug: string;
}): BreadcrumbItem[] {
  return [
    { name: city.continent, url: `/?continent=${encodeURIComponent(city.continent)}` },
    { name: city.country, url: `/?country=${encodeURIComponent(city.country)}` },
    { name: city.name, url: `/cities/${city.slug}` },
  ];
}

// Helper to get full breadcrumb data for structured data
export function getBreadcrumbStructuredData(items: BreadcrumbItem[]): { name: string; url: string }[] {
  const baseUrl = "https://nomadpoint.com";
  return [
    { name: "Home", url: baseUrl },
    ...items.map((item) => ({
      name: item.name,
      url: `${baseUrl}${item.url}`,
    })),
  ];
}

