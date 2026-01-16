"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Wifi, DollarSign, ArrowRight } from "lucide-react";
import { City } from "@/types/city";
import { getAllCities } from "@/data/cities";

interface SimilarCitiesProps {
  currentCity: City;
  maxCities?: number;
}

export default function SimilarCities({ currentCity, maxCities = 4 }: SimilarCitiesProps) {
  const allCities = getAllCities();
  
  // Find similar cities based on:
  // 1. Same continent (highest priority)
  // 2. Similar cost of living (within 30%)
  // 3. Similar nomad score
  const similarCities = allCities
    .filter((city) => city.id !== currentCity.id)
    .map((city) => {
      let score = 0;
      
      // Same continent: +50 points
      if (city.continent === currentCity.continent) {
        score += 50;
      }
      
      // Same country: +30 points
      if (city.country === currentCity.country) {
        score += 30;
      }
      
      // Similar cost (within 30%): up to +20 points
      const costDiff = Math.abs(city.monthlyCost - currentCity.monthlyCost) / currentCity.monthlyCost;
      if (costDiff < 0.3) {
        score += 20 * (1 - costDiff);
      }
      
      // Similar internet speed (within 50 Mbps): up to +10 points
      const speedDiff = Math.abs(city.internetSpeed - currentCity.internetSpeed);
      if (speedDiff < 50) {
        score += 10 * (1 - speedDiff / 50);
      }
      
      // Similar safety score: up to +10 points
      const safetyDiff = Math.abs(city.safetyScore - currentCity.safetyScore);
      score += 10 * (1 - safetyDiff / 5);
      
      return { city, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, maxCities)
    .map((item) => item.city);

  if (similarCities.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Similar Destinations
        </h2>
        <Link
          href={`/compare?cities=${currentCity.slug}`}
          className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1"
        >
          Compare all
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {similarCities.map((city) => (
          <Link
            key={city.id}
            href={`/cities/${city.slug}`}
            className="group flex gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100"
          >
            {/* City Image */}
            <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
              <Image
                src={city.heroImage}
                alt={city.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
                sizes="80px"
              />
            </div>

            {/* City Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors truncate">
                {city.name}
              </h3>
              <p className="text-sm text-gray-500 flex items-center gap-1 mb-2">
                <MapPin className="w-3 h-3" />
                {city.country}
              </p>
              <div className="flex items-center gap-3 text-xs text-gray-600">
                <span className="flex items-center gap-1">
                  <Wifi className="w-3 h-3 text-green-500" />
                  {city.internetSpeed} Mbps
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="w-3 h-3 text-amber-500" />
                  ${city.monthlyCost.toLocaleString("en-US")}/mo
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Internal linking text for SEO */}
      <p className="mt-4 text-sm text-gray-500">
        Looking for alternatives to {currentCity.name}? Explore other{" "}
        <Link href={`/?continent=${encodeURIComponent(currentCity.continent)}`} className="text-primary hover:underline">
          {currentCity.continent} destinations
        </Link>
        {" "}or{" "}
        <Link href="/" className="text-primary hover:underline">
          browse all cities
        </Link>
        .
      </p>
    </div>
  );
}

