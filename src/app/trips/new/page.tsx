"use client";

import { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cities, getCityBySlug } from "@/data/cities";
import { City, lifestyleOptions, LifestyleType } from "@/types/city";
import {
  ArrowLeft,
  Plus,
  X,
  Search,
  Calendar,
  DollarSign,
  MapPin,
  Loader2,
  GripVertical,
  ChevronDown,
  ChevronUp,
  Clock,
  Globe,
  Save,
} from "lucide-react";

interface TripCityItem {
  id: string;
  city: City;
  startDate: string;
  endDate: string;
  nights: number;
  estimatedCost: number;
  notes: string;
  isExpanded: boolean;
}

export default function NewTripPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tripName, setTripName] = useState("");
  const [tripDescription, setTripDescription] = useState("");
  const [selectedCities, setSelectedCities] = useState<TripCityItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [lifestyle, setLifestyle] = useState<LifestyleType>("comfortable");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/trips/new");
    }
  }, [status, router]);

  const filteredCities = useMemo(() => {
    if (!searchQuery) return cities.slice(0, 10);
    const query = searchQuery.toLowerCase();
    return cities
      .filter(
        (city) =>
          city.name.toLowerCase().includes(query) ||
          city.country.toLowerCase().includes(query)
      )
      .slice(0, 10);
  }, [searchQuery]);

  const selectedLifestyle = lifestyleOptions.find((l) => l.id === lifestyle)!;

  const addCity = (city: City) => {
    if (selectedCities.some((sc) => sc.city.slug === city.slug)) return;

    const lastCity = selectedCities[selectedCities.length - 1];
    let startDate = "";
    if (lastCity && lastCity.endDate) {
      const nextDay = new Date(lastCity.endDate);
      nextDay.setDate(nextDay.getDate() + 1);
      startDate = nextDay.toISOString().split("T")[0];
    }

    const newItem: TripCityItem = {
      id: `${city.slug}-${Date.now()}`,
      city,
      startDate,
      endDate: "",
      nights: 7,
      estimatedCost: Math.round(city.monthlyCost * selectedLifestyle.multiplier / 30 * 7),
      notes: "",
      isExpanded: true,
    };

    setSelectedCities([...selectedCities, newItem]);
    setSearchQuery("");
    setIsSearchOpen(false);
  };

  const removeCity = (id: string) => {
    setSelectedCities(selectedCities.filter((sc) => sc.id !== id));
  };

  const updateCity = (id: string, updates: Partial<TripCityItem>) => {
    setSelectedCities(
      selectedCities.map((sc) => {
        if (sc.id !== id) return sc;
        const updated = { ...sc, ...updates };
        
        // Recalculate nights if dates changed
        if (updates.startDate || updates.endDate) {
          if (updated.startDate && updated.endDate) {
            const start = new Date(updated.startDate);
            const end = new Date(updated.endDate);
            updated.nights = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
          }
        }
        
        // Recalculate cost if nights changed
        if (updates.nights !== undefined || updates.startDate || updates.endDate) {
          updated.estimatedCost = Math.round(
            (sc.city.monthlyCost * selectedLifestyle.multiplier / 30) * updated.nights
          );
        }
        
        return updated;
      })
    );
  };

  const toggleExpanded = (id: string) => {
    setSelectedCities(
      selectedCities.map((sc) =>
        sc.id === id ? { ...sc, isExpanded: !sc.isExpanded } : sc
      )
    );
  };

  const moveCity = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= selectedCities.length) return;
    
    const newCities = [...selectedCities];
    [newCities[index], newCities[newIndex]] = [newCities[newIndex], newCities[index]];
    setSelectedCities(newCities);
  };

  const totalBudget = selectedCities.reduce((sum, sc) => sum + sc.estimatedCost, 0);
  const totalNights = selectedCities.reduce((sum, sc) => sum + sc.nights, 0);

  const handleSave = async () => {
    if (!tripName.trim()) {
      alert("Please enter a trip name");
      return;
    }

    if (selectedCities.length === 0) {
      alert("Please add at least one city");
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch("/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: tripName,
          description: tripDescription,
          cities: selectedCities.map((sc) => ({
            city_slug: sc.city.slug,
            start_date: sc.startDate || null,
            end_date: sc.endDate || null,
            nights: sc.nights,
            estimated_cost: sc.estimatedCost,
            notes: sc.notes || null,
          })),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/trips/${data.trip.id}`);
      } else {
        alert("Failed to create trip. Please try again.");
      }
    } catch (error) {
      console.error("Error creating trip:", error);
      alert("Failed to create trip. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50">
        {/* Header */}
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Link
              href="/trips"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Trips
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">
              Plan a New Trip
            </h1>
            <p className="text-gray-500 mt-1">
              Build your multi-city itinerary with automatic budget calculations
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Trip Details */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Trip Details
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Trip Name *
                      </label>
                      <input
                        type="text"
                        value={tripName}
                        onChange={(e) => setTripName(e.target.value)}
                        placeholder="e.g., Southeast Asia Adventure"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description (optional)
                      </label>
                      <textarea
                        value={tripDescription}
                        onChange={(e) => setTripDescription(e.target.value)}
                        placeholder="Brief description of your trip..."
                        rows={2}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Lifestyle Selector */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Travel Style
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {lifestyleOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setLifestyle(option.id)}
                        className={`p-4 rounded-xl border-2 transition-all text-left ${
                          lifestyle === option.id
                            ? "border-primary bg-primary/5"
                            : "border-gray-100 hover:border-gray-200"
                        }`}
                      >
                        <div
                          className={`font-medium ${
                            lifestyle === option.id
                              ? "text-primary"
                              : "text-gray-900"
                          }`}
                        >
                          {option.label}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {option.multiplier}x budget
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cities */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Destinations
                    </h2>
                    <span className="text-sm text-gray-500">
                      {selectedCities.length} {selectedCities.length === 1 ? "city" : "cities"}
                    </span>
                  </div>

                  {/* Selected Cities */}
                  {selectedCities.length > 0 && (
                    <div className="space-y-3 mb-4">
                      {selectedCities.map((item, index) => (
                        <div
                          key={item.id}
                          className="border border-gray-200 rounded-xl overflow-hidden"
                        >
                          {/* City Header */}
                          <div className="flex items-center gap-3 p-4 bg-gray-50">
                            <div className="flex flex-col gap-1">
                              <button
                                onClick={() => moveCity(index, "up")}
                                disabled={index === 0}
                                className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                              >
                                <ChevronUp className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => moveCity(index, "down")}
                                disabled={index === selectedCities.length - 1}
                                className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                              >
                                <ChevronDown className="w-4 h-4" />
                              </button>
                            </div>
                            
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={item.city.heroImage}
                                alt={item.city.name}
                                fill
                                className="object-cover"
                                sizes="48px"
                              />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900">
                                {item.city.name}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {item.city.country}
                              </p>
                            </div>

                            <div className="text-right mr-2">
                              <div className="font-semibold text-gray-900">
                                ${item.estimatedCost.toLocaleString()}
                              </div>
                              <div className="text-sm text-gray-500">
                                {item.nights} nights
                              </div>
                            </div>

                            <button
                              onClick={() => toggleExpanded(item.id)}
                              className="p-2 text-gray-400 hover:text-gray-600"
                            >
                              {item.isExpanded ? (
                                <ChevronUp className="w-5 h-5" />
                              ) : (
                                <ChevronDown className="w-5 h-5" />
                              )}
                            </button>

                            <button
                              onClick={() => removeCity(item.id)}
                              className="p-2 text-gray-400 hover:text-red-500"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>

                          {/* City Details (Expanded) */}
                          {item.isExpanded && (
                            <div className="p-4 space-y-4 border-t border-gray-100">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Arrival Date
                                  </label>
                                  <input
                                    type="date"
                                    value={item.startDate}
                                    onChange={(e) =>
                                      updateCity(item.id, { startDate: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Departure Date
                                  </label>
                                  <input
                                    type="date"
                                    value={item.endDate}
                                    onChange={(e) =>
                                      updateCity(item.id, { endDate: e.target.value })
                                    }
                                    min={item.startDate}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Nights: {item.nights}
                                </label>
                                <input
                                  type="range"
                                  min="1"
                                  max="90"
                                  value={item.nights}
                                  onChange={(e) =>
                                    updateCity(item.id, { nights: parseInt(e.target.value) })
                                  }
                                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                                <div className="flex justify-between text-xs text-gray-400 mt-1">
                                  <span>1</span>
                                  <span>30</span>
                                  <span>60</span>
                                  <span>90</span>
                                </div>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Notes (optional)
                                </label>
                                <input
                                  type="text"
                                  value={item.notes}
                                  onChange={(e) =>
                                    updateCity(item.id, { notes: e.target.value })
                                  }
                                  placeholder="e.g., Book coworking space, visit temple..."
                                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                                />
                              </div>

                              {/* City Quick Stats */}
                              <div className="grid grid-cols-3 gap-3 pt-2">
                                <div className="bg-gray-50 rounded-lg p-3 text-center">
                                  <div className="text-xs text-gray-500 mb-1">
                                    Monthly Cost
                                  </div>
                                  <div className="font-semibold text-gray-900">
                                    ${item.city.monthlyCost}
                                  </div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-3 text-center">
                                  <div className="text-xs text-gray-500 mb-1">
                                    Internet
                                  </div>
                                  <div className="font-semibold text-gray-900">
                                    {item.city.internetSpeed} Mbps
                                  </div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-3 text-center">
                                  <div className="text-xs text-gray-500 mb-1">
                                    Safety
                                  </div>
                                  <div className="font-semibold text-gray-900">
                                    {item.city.safetyScore}/5
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add City Button/Search */}
                  <div className="relative">
                    {isSearchOpen ? (
                      <div className="border border-gray-200 rounded-xl overflow-hidden">
                        <div className="relative">
                          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search cities..."
                            autoFocus
                            className="w-full pl-12 pr-12 py-4 border-0 focus:ring-0"
                          />
                          <button
                            onClick={() => {
                              setIsSearchOpen(false);
                              setSearchQuery("");
                            }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="border-t border-gray-100 max-h-64 overflow-y-auto">
                          {filteredCities.map((city) => {
                            const isAdded = selectedCities.some(
                              (sc) => sc.city.slug === city.slug
                            );
                            return (
                              <button
                                key={city.slug}
                                onClick={() => !isAdded && addCity(city)}
                                disabled={isAdded}
                                className={`w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors ${
                                  isAdded ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                              >
                                <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                                  <Image
                                    src={city.heroImage}
                                    alt={city.name}
                                    fill
                                    className="object-cover"
                                    sizes="40px"
                                  />
                                </div>
                                <div className="flex-1 text-left">
                                  <div className="font-medium text-gray-900">
                                    {city.name}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {city.country} • ${city.monthlyCost}/mo
                                  </div>
                                </div>
                                {isAdded && (
                                  <span className="text-xs text-primary font-medium">
                                    Added
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setIsSearchOpen(true)}
                        className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-200 hover:border-primary rounded-xl text-gray-500 hover:text-primary transition-colors"
                      >
                        <Plus className="w-5 h-5" />
                        Add Destination
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Sidebar - Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Trip Summary
                  </h2>

                  {selectedCities.length > 0 ? (
                    <>
                      {/* Route Preview */}
                      <div className="flex items-center gap-2 flex-wrap mb-6">
                        {selectedCities.map((item, index) => (
                          <div key={item.id} className="flex items-center">
                            {index > 0 && (
                              <span className="text-gray-300 mx-1">→</span>
                            )}
                            <span className="text-sm font-medium text-gray-700">
                              {item.city.name}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="space-y-4 mb-6">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500 flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            Cities
                          </span>
                          <span className="font-semibold text-gray-900">
                            {selectedCities.length}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500 flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Total Nights
                          </span>
                          <span className="font-semibold text-gray-900">
                            {totalNights}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500 flex items-center gap-2">
                            <Globe className="w-4 h-4" />
                            Travel Style
                          </span>
                          <span className="font-semibold text-gray-900">
                            {selectedLifestyle.label}
                          </span>
                        </div>
                      </div>

                      {/* Budget Breakdown */}
                      <div className="border-t border-gray-100 pt-4 mb-6">
                        <h3 className="font-medium text-gray-900 mb-3">
                          Budget Breakdown
                        </h3>
                        <div className="space-y-2">
                          {selectedCities.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center justify-between text-sm"
                            >
                              <span className="text-gray-500">
                                {item.city.name} ({item.nights}n)
                              </span>
                              <span className="text-gray-700">
                                ${item.estimatedCost.toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Total */}
                      <div className="bg-primary/5 rounded-xl p-4 mb-6">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-gray-900">
                            Total Budget
                          </span>
                          <span className="text-2xl font-bold text-primary">
                            ${totalBudget.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Based on {selectedLifestyle.label.toLowerCase()} lifestyle
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MapPin className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-500">
                        Add cities to see your trip summary
                      </p>
                    </div>
                  )}

                  {/* Save Button */}
                  <button
                    onClick={handleSave}
                    disabled={isSaving || !tripName || selectedCities.length === 0}
                    className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-blue-700 text-white px-6 py-4 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Save className="w-5 h-5" />
                    )}
                    {isSaving ? "Saving..." : "Save Trip"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

