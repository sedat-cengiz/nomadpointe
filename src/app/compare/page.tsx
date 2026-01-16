"use client";

import { Suspense, useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  X,
  Wifi,
  DollarSign,
  Shield,
  FileCheck,
  Trophy,
  ChevronDown,
  Loader2,
  Coffee,
  UtensilsCrossed,
  Briefcase,
  Clock,
  Globe,
  Plane,
  Car,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AffiliateWidget from "@/components/AffiliateWidget";
import { cities, getCityBySlug } from "@/data/cities";
import { City } from "@/types/city";

function CompareContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Initialize from URL params
  useEffect(() => {
    const citiesParam = searchParams.get("cities");
    if (citiesParam) {
      const slugs = citiesParam.split(",").filter((s) => getCityBySlug(s));
      setSelectedSlugs(slugs.slice(0, 3));
    }
  }, [searchParams]);

  // Update URL when selection changes
  useEffect(() => {
    if (selectedSlugs.length > 0) {
      router.replace(`/compare?cities=${selectedSlugs.join(",")}`, {
        scroll: false,
      });
    } else {
      router.replace("/compare", { scroll: false });
    }
  }, [selectedSlugs, router]);

  const selectedCities = useMemo(
    () =>
      selectedSlugs
        .map((slug) => getCityBySlug(slug))
        .filter((c): c is City => c !== undefined),
    [selectedSlugs]
  );

  const availableCities = useMemo(
    () => cities.filter((city) => !selectedSlugs.includes(city.slug)),
    [selectedSlugs]
  );

  const addCity = (slug: string) => {
    if (selectedSlugs.length < 3 && !selectedSlugs.includes(slug)) {
      setSelectedSlugs([...selectedSlugs, slug]);
    }
    setIsDropdownOpen(false);
  };

  const removeCity = (slug: string) => {
    setSelectedSlugs(selectedSlugs.filter((s) => s !== slug));
  };

  // Calculate winners for each metric
  const getWinner = (
    metric: "internetSpeed" | "monthlyCost" | "safetyScore"
  ) => {
    if (selectedCities.length < 2) return null;

    if (metric === "monthlyCost") {
      const min = Math.min(...selectedCities.map((c) => c[metric]));
      return selectedCities.find((c) => c[metric] === min)?.slug;
    } else {
      const max = Math.max(...selectedCities.map((c) => c[metric]));
      return selectedCities.find((c) => c[metric] === max)?.slug;
    }
  };

  const speedWinner = getWinner("internetSpeed");
  const costWinner = getWinner("monthlyCost");
  const safetyWinner = getWinner("safetyScore");

  return (
    <>
      {/* City Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Selected Cities */}
        {selectedCities.map((city) => (
          <div
            key={city.slug}
            className="relative bg-white rounded-2xl border border-gray-200 overflow-hidden"
          >
            <button
              onClick={() => removeCity(city.slug)}
              className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 hover:bg-red-50 rounded-full flex items-center justify-center transition-colors group"
            >
              <X className="w-4 h-4 text-gray-500 group-hover:text-red-500" />
            </button>
            <div className="relative h-32">
              <Image
                src={city.heroImage}
                alt={city.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <h3 className="text-white font-bold text-lg">{city.name}</h3>
                <p className="text-white/80 text-sm">{city.country}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Add City Button(s) */}
        {selectedCities.length < 3 && (
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full h-32 bg-white border-2 border-dashed border-gray-200 hover:border-primary rounded-2xl flex flex-col items-center justify-center gap-2 transition-colors"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Plus className="w-5 h-5 text-gray-500" />
              </div>
              <span className="text-gray-500 font-medium">Add City</span>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 max-h-64 overflow-y-auto z-20">
                {availableCities.map((city) => (
                  <button
                    key={city.slug}
                    onClick={() => addCity(city.slug)}
                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={city.heroImage}
                        alt={city.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900">{city.name}</div>
                      <div className="text-sm text-gray-500">{city.country}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Comparison Table */}
      {selectedCities.length >= 2 && (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {/* Internet Speed */}
          <div className="grid grid-cols-4 border-b border-gray-100">
            <div className="p-4 bg-gray-50 flex items-center gap-3">
              <Wifi className="w-5 h-5 text-blue-500" />
              <span className="font-medium text-gray-700">Internet Speed</span>
            </div>
            {selectedCities.map((city) => (
              <div
                key={city.slug}
                className={`p-4 flex items-center justify-center gap-2 ${
                  speedWinner === city.slug ? "bg-green-50" : ""
                }`}
              >
                <span className="text-xl font-bold text-gray-900">
                  {city.internetSpeed}
                </span>
                <span className="text-gray-500">Mbps</span>
                {speedWinner === city.slug && (
                  <Trophy className="w-5 h-5 text-yellow-500" />
                )}
              </div>
            ))}
            {selectedCities.length < 3 && <div className="p-4" />}
          </div>

          {/* Monthly Cost */}
          <div className="grid grid-cols-4 border-b border-gray-100">
            <div className="p-4 bg-gray-50 flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-green-500" />
              <span className="font-medium text-gray-700">Monthly Cost</span>
            </div>
            {selectedCities.map((city) => (
              <div
                key={city.slug}
                className={`p-4 flex items-center justify-center gap-2 ${
                  costWinner === city.slug ? "bg-green-50" : ""
                }`}
              >
                <span className="text-xl font-bold text-gray-900">
                  ${city.monthlyCost.toLocaleString("en-US")}
                </span>
                {costWinner === city.slug && (
                  <Trophy className="w-5 h-5 text-yellow-500" />
                )}
              </div>
            ))}
            {selectedCities.length < 3 && <div className="p-4" />}
          </div>

          {/* Safety Score */}
          <div className="grid grid-cols-4 border-b border-gray-100">
            <div className="p-4 bg-gray-50 flex items-center gap-3">
              <Shield className="w-5 h-5 text-purple-500" />
              <span className="font-medium text-gray-700">Safety Score</span>
            </div>
            {selectedCities.map((city) => (
              <div
                key={city.slug}
                className={`p-4 flex items-center justify-center gap-2 ${
                  safetyWinner === city.slug ? "bg-green-50" : ""
                }`}
              >
                <span className="text-xl font-bold text-gray-900">
                  {city.safetyScore}/5
                </span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div
                      key={star}
                      className={`w-2 h-2 rounded-full ${
                        star <= city.safetyScore ? "bg-yellow-400" : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
                {safetyWinner === city.slug && (
                  <Trophy className="w-5 h-5 text-yellow-500" />
                )}
              </div>
            ))}
            {selectedCities.length < 3 && <div className="p-4" />}
          </div>

          {/* Visa Available */}
          <div className="grid grid-cols-4 border-b border-gray-100">
            <div className="p-4 bg-gray-50 flex items-center gap-3">
              <FileCheck className="w-5 h-5 text-orange-500" />
              <span className="font-medium text-gray-700">Nomad Visa</span>
            </div>
            {selectedCities.map((city) => (
              <div
                key={city.slug}
                className="p-4 flex items-center justify-center"
              >
                {city.visaAvailable ? (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    Available
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-sm font-medium">
                    Not Available
                  </span>
                )}
              </div>
            ))}
            {selectedCities.length < 3 && <div className="p-4" />}
          </div>

          {/* Cost Breakdown */}
          <div className="grid grid-cols-4 border-b border-gray-100">
            <div className="p-4 bg-gray-50">
              <span className="font-medium text-gray-700">Cost Breakdown</span>
            </div>
            {selectedCities.map((city) => (
              <div key={city.slug} className="p-4 space-y-2">
                {Object.entries(city.costBreakdown).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-gray-500 capitalize">{key}</span>
                    <span className="font-medium text-gray-700">${value}</span>
                  </div>
                ))}
              </div>
            ))}
            {selectedCities.length < 3 && <div className="p-4" />}
          </div>

          {/* Food Prices */}
          <div className="grid grid-cols-4 border-b border-gray-100">
            <div className="p-4 bg-gray-50 flex items-center gap-3">
              <UtensilsCrossed className="w-5 h-5 text-orange-500" />
              <span className="font-medium text-gray-700">Food Prices</span>
            </div>
            {selectedCities.map((city) => (
              <div key={city.slug} className="p-4 space-y-2">
                {city.foodAndWorkspace ? (
                  <>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 flex items-center gap-1">
                        <Coffee className="w-3 h-3" /> Cappuccino
                      </span>
                      <span className="font-medium text-gray-700">
                        ${city.foodAndWorkspace.cappuccinoPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Local Meal</span>
                      <span className="font-medium text-gray-700">
                        ${city.foodAndWorkspace.localMealPrice.toFixed(2)}
                      </span>
                    </div>
                    {city.foodAndWorkspace.bigMacPrice && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">🍔 Big Mac</span>
                        <span className="font-medium text-gray-700">
                          ${city.foodAndWorkspace.bigMacPrice.toFixed(2)}
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <span className="text-gray-400 text-sm">No data</span>
                )}
              </div>
            ))}
            {selectedCities.length < 3 && <div className="p-4" />}
          </div>

          {/* Coworking */}
          <div className="grid grid-cols-4 border-b border-gray-100">
            <div className="p-4 bg-gray-50 flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-indigo-500" />
              <span className="font-medium text-gray-700">Coworking</span>
            </div>
            {selectedCities.map((city) => (
              <div key={city.slug} className="p-4">
                {city.coworkingSpaces && city.coworkingSpaces.length > 0 ? (
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-900">
                      {city.coworkingSpaces[0].name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {city.coworkingSpaces[0].priceRange}
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <div
                          key={star}
                          className={`w-2 h-2 rounded-full ${
                            star <= Math.round(city.coworkingSpaces![0].rating)
                              ? "bg-yellow-400"
                              : "bg-gray-200"
                          }`}
                        />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">
                        {city.coworkingSpaces[0].rating}
                      </span>
                    </div>
                  </div>
                ) : (
                  <span className="text-gray-400 text-sm">No data</span>
                )}
              </div>
            ))}
            {selectedCities.length < 3 && <div className="p-4" />}
          </div>

          {/* Timezone */}
          <div className="grid grid-cols-4 border-b border-gray-100">
            <div className="p-4 bg-gray-50 flex items-center gap-3">
              <Clock className="w-5 h-5 text-cyan-500" />
              <span className="font-medium text-gray-700">Timezone</span>
            </div>
            {selectedCities.map((city) => (
              <div key={city.slug} className="p-4 flex items-center justify-center">
                {city.practicalInfo ? (
                  <div className="text-center">
                    <div className="font-medium text-gray-900">
                      {city.practicalInfo.timezone}
                    </div>
                    <div className="text-xs text-gray-500">
                      {city.practicalInfo.timezoneOffset >= 0 ? "+" : ""}
                      {city.practicalInfo.timezoneOffset}h UTC
                    </div>
                  </div>
                ) : (
                  <span className="text-gray-400 text-sm">-</span>
                )}
              </div>
            ))}
            {selectedCities.length < 3 && <div className="p-4" />}
          </div>

          {/* Language */}
          <div className="grid grid-cols-4 border-b border-gray-100">
            <div className="p-4 bg-gray-50 flex items-center gap-3">
              <Globe className="w-5 h-5 text-teal-500" />
              <span className="font-medium text-gray-700">English Level</span>
            </div>
            {selectedCities.map((city) => (
              <div key={city.slug} className="p-4 flex items-center justify-center">
                {city.practicalInfo ? (
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      city.practicalInfo.englishProficiency === "High"
                        ? "bg-green-100 text-green-700"
                        : city.practicalInfo.englishProficiency === "Medium"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {city.practicalInfo.englishProficiency}
                  </span>
                ) : (
                  <span className="text-gray-400 text-sm">-</span>
                )}
              </div>
            ))}
            {selectedCities.length < 3 && <div className="p-4" />}
          </div>

          {/* Transportation */}
          <div className="grid grid-cols-4 border-b border-gray-100">
            <div className="p-4 bg-gray-50 flex items-center gap-3">
              <Car className="w-5 h-5 text-rose-500" />
              <span className="font-medium text-gray-700">Transport</span>
            </div>
            {selectedCities.map((city) => (
              <div key={city.slug} className="p-4">
                {city.transportInfo ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          city.transportInfo.walkability === "Excellent" ||
                          city.transportInfo.walkability === "Good"
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {city.transportInfo.walkability} walkability
                      </span>
                    </div>
                    {city.transportInfo.rideshareApps.length > 0 && (
                      <div className="text-xs text-gray-500">
                        {city.transportInfo.rideshareApps.slice(0, 2).join(", ")}
                      </div>
                    )}
                  </div>
                ) : (
                  <span className="text-gray-400 text-sm">No data</span>
                )}
              </div>
            ))}
            {selectedCities.length < 3 && <div className="p-4" />}
          </div>

          {/* Best Months */}
          <div className="grid grid-cols-4 border-b border-gray-100">
            <div className="p-4 bg-gray-50">
              <span className="font-medium text-gray-700">Best Months</span>
            </div>
            {selectedCities.map((city) => (
              <div key={city.slug} className="p-4">
                <div className="flex flex-wrap gap-1">
                  {city.bestMonths.slice(0, 3).map((month) => (
                    <span
                      key={month}
                      className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium"
                    >
                      {month.slice(0, 3)}
                    </span>
                  ))}
                  {city.bestMonths.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs">
                      +{city.bestMonths.length - 3}
                    </span>
                  )}
                </div>
              </div>
            ))}
            {selectedCities.length < 3 && <div className="p-4" />}
          </div>

          {/* View Details Links */}
          <div className="grid grid-cols-4">
            <div className="p-4 bg-gray-50" />
            {selectedCities.map((city) => (
              <div key={city.slug} className="p-4 flex justify-center">
                <Link
                  href={`/cities/${city.slug}`}
                  className="px-4 py-2 bg-primary hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  View {city.name} Guide
                </Link>
              </div>
            ))}
            {selectedCities.length < 3 && <div className="p-4" />}
          </div>
        </div>
      )}

      {/* High-intent affiliate placement */}
      {selectedCities.length >= 1 && (
        <div className="mt-8">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Nomad Essentials for {selectedCities[0].name}
                </h2>
                <p className="text-sm text-gray-500">
                  Recommended services for planning your stay
                </p>
              </div>
              <Link
                href={`/cities/${selectedCities[0].slug}`}
                className="text-sm font-medium text-primary hover:text-blue-700"
              >
                View guide
              </Link>
            </div>
            <AffiliateWidget
              cityName={selectedCities[0].name}
              countryName={selectedCities[0].country}
              placement="compare_page"
            />
          </div>
        </div>
      )}

      {/* Empty State */}
      {selectedCities.length < 2 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Select cities to compare
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Add at least 2 cities to see a detailed comparison of internet speed,
            cost of living, safety, and more.
          </p>
        </div>
      )}
    </>
  );
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="w-8 h-8 text-primary animate-spin" />
    </div>
  );
}

export default function ComparePage() {
  return (
    <>
      <Header />

      <main className="flex-1 bg-background">
        {/* Header Section */}
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Cities
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Compare Cities
            </h1>
            <p className="text-gray-600 mt-2">
              Select up to 3 cities to compare side by side
            </p>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-8 lg:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Suspense fallback={<LoadingState />}>
              <CompareContent />
            </Suspense>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
