"use client";

import { useState, useMemo } from "react";
import { MapPin, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CityCard from "@/components/CityCard";
import FilterBar, { SortOption, ContinentFilter } from "@/components/FilterBar";
import { cities } from "@/data/cities";
import { useCompare } from "@/hooks/useCompare";
import { useFavorites } from "@/hooks/useFavorites";

export default function Home() {
  // Filter states
  const [highSpeedFilter, setHighSpeedFilter] = useState(false);
  const [budgetFilter, setBudgetFilter] = useState(false);
  const [visaFilter, setVisaFilter] = useState(false);
  const [safetyFilter, setSafetyFilter] = useState(false);
  const [continentFilter, setContinentFilter] = useState<ContinentFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("nomadScore");
  const [searchQuery, setSearchQuery] = useState("");

  const { selectedCities, toggleCity, isSelected, count } = useCompare();
  const { isFavorite, toggleFavorite } = useFavorites();

  const filteredAndSortedCities = useMemo(() => {
    // First filter
    let result = cities.filter((city) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (
          !city.name.toLowerCase().includes(query) &&
          !city.country.toLowerCase().includes(query)
        ) {
          return false;
        }
      }
      // Internet speed filter
      if (highSpeedFilter && city.internetSpeed < 50) return false;
      // Budget filter
      if (budgetFilter && city.monthlyCost > 1500) return false;
      // Visa filter
      if (visaFilter && !city.visaAvailable) return false;
      // Safety filter
      if (safetyFilter && city.safetyScore < 4) return false;
      // Continent filter
      if (continentFilter !== "all") {
        if (continentFilter === "Americas") {
          if (!["North America", "South America"].includes(city.continent)) {
            return false;
          }
        } else if (city.continent !== continentFilter) {
          return false;
        }
      }
      return true;
    });

    // Then sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "nomadScore":
          return (b.nomadScore || 0) - (a.nomadScore || 0);
        case "cost":
          return a.monthlyCost - b.monthlyCost;
        case "internetSpeed":
          return b.internetSpeed - a.internetSpeed;
        case "safety":
          return b.safetyScore - a.safetyScore;
        default:
          return 0;
      }
    });

    return result;
  }, [
    searchQuery,
    highSpeedFilter,
    budgetFilter,
    visaFilter,
    safetyFilter,
    continentFilter,
    sortBy,
  ]);

  const clearAllFilters = () => {
    setHighSpeedFilter(false);
    setBudgetFilter(false);
    setVisaFilter(false);
    setSafetyFilter(false);
    setContinentFilter("all");
    setSearchQuery("");
  };

  return (
    <>
      <Header compareCount={count} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-primary/20 text-primary-200 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
                <MapPin className="w-4 h-4" />
                <span className="text-blue-200">
                  {cities.length} Cities Worldwide
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-slide-up">
                Find Your Next
                <span className="text-primary block">Remote Work Hub</span>
              </h1>

              {/* Subtext */}
              <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl animate-slide-up delay-100">
                Compare cities based on real data. Internet speed, cost of
                living, safety scores, and visa information — everything you
                need to make the right choice.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 animate-slide-up delay-200">
                <a
                  href="#cities"
                  className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
                >
                  <Zap className="w-5 h-5" />
                  Explore Cities
                </a>
                <Link
                  href="/compare"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-colors border border-white/20"
                >
                  Compare Cities
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-xl animate-slide-up delay-300">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {cities.length}
                </div>
                <div className="text-gray-400 text-sm mt-1">Cities</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {cities.filter((c) => c.visaAvailable).length}
                </div>
                <div className="text-gray-400 text-sm mt-1">Nomad Visas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-gray-400 text-sm mt-1">Data Updates</div>
              </div>
            </div>
          </div>
        </section>

        {/* Cities Section */}
        <section id="cities" className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Top Digital Nomad Destinations
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Curated cities with the best combination of internet
                infrastructure, affordability, and quality of life for remote
                workers.
              </p>
            </div>

            {/* Filter Bar */}
            <FilterBar
              highSpeedFilter={highSpeedFilter}
              budgetFilter={budgetFilter}
              visaFilter={visaFilter}
              safetyFilter={safetyFilter}
              onHighSpeedChange={setHighSpeedFilter}
              onBudgetChange={setBudgetFilter}
              onVisaChange={setVisaFilter}
              onSafetyChange={setSafetyFilter}
              continentFilter={continentFilter}
              onContinentChange={setContinentFilter}
              sortBy={sortBy}
              onSortChange={setSortBy}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              filteredCount={filteredAndSortedCities.length}
              totalCount={cities.length}
            />

            {/* City Grid */}
            {filteredAndSortedCities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedCities.map((city, index) => (
                  <div
                    key={city.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${Math.min(index * 50, 500)}ms` }}
                  >
                    <CityCard
                      city={city}
                      isSelected={isSelected(city.slug)}
                      onToggleCompare={toggleCity}
                      isFavorite={isFavorite(city.slug)}
                      onToggleFavorite={toggleFavorite}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">
                  No cities match your current filters.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-4 text-primary hover:underline font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Compare Floating Button */}
            {count > 0 && (
              <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
                <Link
                  href={`/compare?cities=${selectedCities.join(",")}`}
                  className="flex items-center gap-3 bg-primary hover:bg-blue-700 text-white px-6 py-4 rounded-full shadow-lg shadow-primary/30 transition-all hover:scale-105"
                >
                  <span className="font-semibold">
                    Compare {count} {count === 1 ? "City" : "Cities"}
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
