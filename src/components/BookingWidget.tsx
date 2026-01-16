"use client";

import { useState } from "react";
import {
  Calendar,
  Users,
  Search,
  Home,
  Hotel,
  Building,
  Star,
  ExternalLink,
  MapPin,
  Wifi,
  Coffee,
} from "lucide-react";
import { City } from "@/types/city";

interface BookingWidgetProps {
  city: City;
  variant?: "compact" | "full";
}

const ACCOMMODATION_TYPES = [
  { id: "all", label: "All", icon: Home },
  { id: "hotels", label: "Hotels", icon: Hotel },
  { id: "apartments", label: "Apartments", icon: Building },
];

export default function BookingWidget({ city, variant = "full" }: BookingWidgetProps) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [selectedType, setSelectedType] = useState("all");

  // Generate Booking.com affiliate URL
  const generateBookingUrl = () => {
    const baseUrl = "https://www.booking.com/searchresults.html";
    const params = new URLSearchParams({
      ss: `${city.name}, ${city.country}`,
      aid: process.env.NEXT_PUBLIC_BOOKING_AFFILIATE_ID || "YOUR_AFFILIATE_ID",
      no_rooms: "1",
      group_adults: guests.toString(),
      lang: "en-us",
      sb: "1",
    });
    
    if (checkIn) params.set("checkin", checkIn);
    if (checkOut) params.set("checkout", checkOut);
    
    return `${baseUrl}?${params.toString()}`;
  };

  if (variant === "compact") {
    return (
      <a
        href={generateBookingUrl()}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="flex items-center gap-4 bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all group"
      >
        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
          <Hotel className="w-6 h-6 text-blue-600" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">Find Accommodation</h4>
          <p className="text-sm text-gray-500">
            Hotels & apartments in {city.name}
          </p>
        </div>
        <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
      </a>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
        <div className="flex items-center gap-3">
          <Hotel className="w-6 h-6" />
          <div>
            <h3 className="font-bold">Find Your Stay</h3>
            <p className="text-sm text-white/80">Accommodation in {city.name}</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Accommodation Type */}
        <div className="flex gap-2">
          {ACCOMMODATION_TYPES.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedType === type.id
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                {type.label}
              </button>
            );
          })}
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Check-in
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Check-out
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                min={checkIn}
                className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Guests */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Guests
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
              className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none"
            >
              {[1, 2, 3, 4].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? "Guest" : "Guests"}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Button */}
        <a
          href={generateBookingUrl()}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-colors"
        >
          <Search className="w-5 h-5" />
          Search on Booking.com
        </a>

        {/* Nomad Features */}
        <div className="pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500 mb-3">
            Popular filters for remote workers:
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="flex items-center gap-1 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
              <Wifi className="w-3 h-3" /> High-speed WiFi
            </span>
            <span className="flex items-center gap-1 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
              <Coffee className="w-3 h-3" /> Work desk
            </span>
            <span className="flex items-center gap-1 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
              <Star className="w-3 h-3" /> 8+ rating
            </span>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
        <p className="text-xs text-gray-400">
          Affiliate link. We may earn a commission at no extra cost to you.
        </p>
      </div>
    </div>
  );
}

// Coworking Space Finder Component
export function CoworkingFinder({ city }: { city: City }) {
  if (!city.coworkingSpaces || city.coworkingSpaces.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
          <Building className="w-5 h-5 text-violet-600" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">Coworking Spaces</h3>
          <p className="text-sm text-gray-500">
            {city.coworkingSpaces.length} spaces in {city.name}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {city.coworkingSpaces.slice(0, 3).map((space, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
          >
            <div>
              <h4 className="font-medium text-gray-900">{space.name}</h4>
              <p className="text-sm text-gray-500">
                {space.neighborhood} • {space.priceRange}
              </p>
            </div>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-medium">{space.rating}</span>
            </div>
          </div>
        ))}
      </div>

      {city.coworkingSpaces.length > 3 && (
        <p className="text-sm text-gray-500 mt-3 text-center">
          +{city.coworkingSpaces.length - 3} more spaces
        </p>
      )}
    </div>
  );
}

