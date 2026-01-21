"use client";

import { useState, useEffect, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Clock,
  Plus,
  X,
  Sun,
  Moon,
  Sunrise,
  Globe,
  Users,
  Search,
} from "lucide-react";

interface TimezoneCity {
  id: string;
  name: string;
  country: string;
  timezone: string;
  offset: number; // Hours from UTC
  flag: string;
}

const TIMEZONE_CITIES: TimezoneCity[] = [
  { id: "nyc", name: "New York", country: "USA", timezone: "America/New_York", offset: -5, flag: "🇺🇸" },
  { id: "la", name: "Los Angeles", country: "USA", timezone: "America/Los_Angeles", offset: -8, flag: "🇺🇸" },
  { id: "london", name: "London", country: "UK", timezone: "Europe/London", offset: 0, flag: "🇬🇧" },
  { id: "paris", name: "Paris", country: "France", timezone: "Europe/Paris", offset: 1, flag: "🇫🇷" },
  { id: "berlin", name: "Berlin", country: "Germany", timezone: "Europe/Berlin", offset: 1, flag: "🇩🇪" },
  { id: "lisbon", name: "Lisbon", country: "Portugal", timezone: "Europe/Lisbon", offset: 0, flag: "🇵🇹" },
  { id: "dubai", name: "Dubai", country: "UAE", timezone: "Asia/Dubai", offset: 4, flag: "🇦🇪" },
  { id: "mumbai", name: "Mumbai", country: "India", timezone: "Asia/Kolkata", offset: 5.5, flag: "🇮🇳" },
  { id: "bangkok", name: "Bangkok", country: "Thailand", timezone: "Asia/Bangkok", offset: 7, flag: "🇹🇭" },
  { id: "bali", name: "Bali", country: "Indonesia", timezone: "Asia/Makassar", offset: 8, flag: "🇮🇩" },
  { id: "singapore", name: "Singapore", country: "Singapore", timezone: "Asia/Singapore", offset: 8, flag: "🇸🇬" },
  { id: "tokyo", name: "Tokyo", country: "Japan", timezone: "Asia/Tokyo", offset: 9, flag: "🇯🇵" },
  { id: "seoul", name: "Seoul", country: "South Korea", timezone: "Asia/Seoul", offset: 9, flag: "🇰🇷" },
  { id: "sydney", name: "Sydney", country: "Australia", timezone: "Australia/Sydney", offset: 11, flag: "🇦🇺" },
  { id: "mexico", name: "Mexico City", country: "Mexico", timezone: "America/Mexico_City", offset: -6, flag: "🇲🇽" },
  { id: "bogota", name: "Bogota", country: "Colombia", timezone: "America/Bogota", offset: -5, flag: "🇨🇴" },
  { id: "lima", name: "Lima", country: "Peru", timezone: "America/Lima", offset: -5, flag: "🇵🇪" },
  { id: "saopaulo", name: "São Paulo", country: "Brazil", timezone: "America/Sao_Paulo", offset: -3, flag: "🇧🇷" },
  { id: "cape", name: "Cape Town", country: "South Africa", timezone: "Africa/Johannesburg", offset: 2, flag: "🇿🇦" },
  { id: "budapest", name: "Budapest", country: "Hungary", timezone: "Europe/Budapest", offset: 1, flag: "🇭🇺" },
];

export default function TimezonePlannerPage() {
  const [selectedCities, setSelectedCities] = useState<TimezoneCity[]>([
    TIMEZONE_CITIES.find((c) => c.id === "nyc")!,
    TIMEZONE_CITIES.find((c) => c.id === "london")!,
    TIMEZONE_CITIES.find((c) => c.id === "bangkok")!,
  ]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [meetingHour, setMeetingHour] = useState(14); // 2 PM default

  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const filteredCities = useMemo(() => {
    if (!searchQuery) return TIMEZONE_CITIES.filter((c) => !selectedCities.some((s) => s.id === c.id));
    const query = searchQuery.toLowerCase();
    return TIMEZONE_CITIES.filter(
      (city) =>
        (city.name.toLowerCase().includes(query) ||
          city.country.toLowerCase().includes(query)) &&
        !selectedCities.some((s) => s.id === city.id)
    );
  }, [searchQuery, selectedCities]);

  const addCity = (city: TimezoneCity) => {
    setSelectedCities([...selectedCities, city]);
    setSearchQuery("");
    setIsSearchOpen(false);
  };

  const removeCity = (id: string) => {
    setSelectedCities(selectedCities.filter((c) => c.id !== id));
  };

  const getCityTime = (city: TimezoneCity) => {
    const utcTime = currentTime.getTime() + currentTime.getTimezoneOffset() * 60000;
    const cityTime = new Date(utcTime + city.offset * 3600000);
    return cityTime;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getTimeIcon = (hour: number) => {
    if (hour >= 6 && hour < 9) return <Sunrise className="w-5 h-5 text-amber-500" />;
    if (hour >= 9 && hour < 18) return <Sun className="w-5 h-5 text-yellow-500" />;
    return <Moon className="w-5 h-5 text-indigo-400" />;
  };

  const isWorkingHours = (hour: number) => hour >= 9 && hour < 18;

  // Find best meeting time (overlap of working hours)
  const findBestMeetingTimes = () => {
    const overlaps: number[] = [];
    
    for (let utcHour = 0; utcHour < 24; utcHour++) {
      const allWorking = selectedCities.every((city) => {
        const localHour = (utcHour + city.offset + 24) % 24;
        return isWorkingHours(localHour);
      });
      if (allWorking) {
        overlaps.push(utcHour);
      }
    }
    
    return overlaps;
  };

  const bestMeetingTimes = findBestMeetingTimes();

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-indigo-600 to-violet-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Clock className="w-4 h-4" />
                Nomad Productivity Tool
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                Timezone Planner
              </h1>
              <p className="text-lg text-white/80">
                Coordinate across timezones with ease. Find the perfect meeting
                time when your team is spread across the globe.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* GEO: cite-ready summary */}
            <div className="mb-8 bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Quick answer
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                This tool helps you coordinate across multiple time zones by showing current local times and highlighting overlapping working hours (9 AM–6 PM).
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Canonical URL: <span className="font-medium">nomadpoint.com/tools/timezone</span>. Methodology:{" "}
                <a className="text-primary hover:underline font-medium" href="/methodology">
                  Methodology & Data Sources
                </a>
                .
              </p>
            </div>

            {/* Selected Cities */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Your Timezones
                </h2>
                <div className="relative">
                  <button
                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add City
                  </button>

                  {isSearchOpen && (
                    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-20">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search cities..."
                          autoFocus
                          className="w-full pl-10 pr-10 py-3 border-b border-gray-100 focus:outline-none"
                        />
                        <button
                          onClick={() => {
                            setIsSearchOpen(false);
                            setSearchQuery("");
                          }}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {filteredCities.map((city) => (
                          <button
                            key={city.id}
                            onClick={() => addCity(city)}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                          >
                            <span className="text-xl">{city.flag}</span>
                            <div className="flex-1 text-left">
                              <div className="font-medium text-gray-900">
                                {city.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {city.country} • UTC
                                {city.offset >= 0 ? "+" : ""}
                                {city.offset}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* City Time Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedCities.map((city) => {
                  const cityTime = getCityTime(city);
                  const hour = cityTime.getHours();
                  const isWorking = isWorkingHours(hour);

                  return (
                    <div
                      key={city.id}
                      className={`relative rounded-2xl p-6 ${
                        isWorking
                          ? "bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-200"
                          : hour >= 18 || hour < 6
                            ? "bg-gradient-to-br from-indigo-50 to-violet-50 border-2 border-indigo-200"
                            : "bg-gray-50 border-2 border-gray-200"
                      }`}
                    >
                      <button
                        onClick={() => removeCity(city.id)}
                        className="absolute top-3 right-3 p-1 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl">{city.flag}</span>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {city.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            UTC{city.offset >= 0 ? "+" : ""}
                            {city.offset}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {getTimeIcon(hour)}
                        <span className="text-3xl font-bold text-gray-900">
                          {formatTime(cityTime)}
                        </span>
                      </div>

                      <div className="mt-3 text-sm">
                        {isWorking ? (
                          <span className="text-emerald-600 font-medium">
                            Working hours
                          </span>
                        ) : (
                          <span className="text-gray-500">
                            {hour >= 18 || hour < 6 ? "Night time" : "Early morning"}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Meeting Planner */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Best Meeting Times */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Best Meeting Times
                    </h2>
                    <p className="text-sm text-gray-500">
                      When everyone is working (9 AM - 6 PM)
                    </p>
                  </div>
                </div>

                {bestMeetingTimes.length > 0 ? (
                  <div className="space-y-3">
                    {bestMeetingTimes.slice(0, 5).map((utcHour) => (
                      <div
                        key={utcHour}
                        className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl"
                      >
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-emerald-600" />
                          <span className="font-medium text-gray-900">
                            {utcHour}:00 UTC
                          </span>
                        </div>
                        <div className="flex gap-2">
                          {selectedCities.map((city) => {
                            const localHour = (utcHour + city.offset + 24) % 24;
                            return (
                              <span
                                key={city.id}
                                className="text-sm text-gray-600"
                              >
                                {city.flag}{" "}
                                {localHour > 12 ? localHour - 12 : localHour || 12}
                                {localHour >= 12 ? "PM" : "AM"}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Globe className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">
                      No overlapping working hours found
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Consider async communication
                    </p>
                  </div>
                )}
              </div>

              {/* Time Comparison Grid */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  24-Hour Comparison
                </h2>
                <div className="overflow-x-auto">
                  <div className="min-w-[600px]">
                    {/* Header */}
                    <div className="flex gap-1 mb-2">
                      <div className="w-24 flex-shrink-0" />
                      {Array.from({ length: 24 }, (_, i) => (
                        <div
                          key={i}
                          className="flex-1 text-xs text-gray-400 text-center"
                        >
                          {i}
                        </div>
                      ))}
                    </div>

                    {/* City Rows */}
                    {selectedCities.map((city) => (
                      <div key={city.id} className="flex gap-1 mb-1">
                        <div className="w-24 flex-shrink-0 text-sm font-medium text-gray-700 flex items-center">
                          {city.flag} {city.name}
                        </div>
                        {Array.from({ length: 24 }, (_, utcHour) => {
                          const localHour = (utcHour + city.offset + 24) % 24;
                          const isWorking = isWorkingHours(localHour);
                          const isNight = localHour < 6 || localHour >= 22;
                          
                          return (
                            <div
                              key={utcHour}
                              className={`flex-1 h-6 rounded ${
                                isWorking
                                  ? "bg-emerald-400"
                                  : isNight
                                    ? "bg-indigo-200"
                                    : "bg-amber-200"
                              }`}
                              title={`${city.name}: ${localHour}:00`}
                            />
                          );
                        })}
                      </div>
                    ))}

                    {/* Legend */}
                    <div className="flex gap-4 mt-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-emerald-400 rounded" />
                        <span>Working (9-18)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-amber-200 rounded" />
                        <span>Early/Late</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-indigo-200 rounded" />
                        <span>Night</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                Remote Work Tips
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  Record meetings for team members in different timezones
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  Use async communication tools like Loom or Notion
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  Set core hours when everyone is available
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  Be mindful of local holidays and weekends
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

