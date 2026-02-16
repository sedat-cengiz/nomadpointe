"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GitCompare, ChevronDown, Search } from "lucide-react";
import { City } from "@/types/city";
import { getAllCities } from "@/data/cities";

interface CityCompareDropdownProps {
  currentCity: City;
}

export default function CityCompareDropdown({ currentCity }: CityCompareDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const allCities = getAllCities().filter((c) => c.id !== currentCity.id);

  const filteredCities = search
    ? allCities.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.country.toLowerCase().includes(search.toLowerCase())
      )
    : allCities.slice(0, 8);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (city: City) => {
    setIsOpen(false);
    setSearch("");
    router.push(`/compare?cities=${currentCity.slug},${city.slug}`);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-5 py-3 rounded-xl transition-colors text-sm font-medium"
      >
        <GitCompare className="w-4 h-4" />
        Compare with...
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden animate-fade-in">
          {/* Search */}
          <div className="p-3 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search cities..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-gray-900"
                autoFocus
              />
            </div>
          </div>

          {/* City List */}
          <div className="max-h-60 overflow-y-auto">
            {filteredCities.length > 0 ? (
              filteredCities.map((city) => (
                <button
                  key={city.id}
                  onClick={() => handleSelect(city)}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                >
                  <div>
                    <div className="text-sm font-medium text-gray-900">{city.name}</div>
                    <div className="text-xs text-gray-500">{city.country}</div>
                  </div>
                  <div className="text-xs text-gray-400">${city.monthlyCost.toLocaleString("en-US")}/mo</div>
                </button>
              ))
            ) : (
              <div className="px-4 py-6 text-center text-sm text-gray-500">
                No cities found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
