"use client";

import { useState } from "react";
import {
  Plane,
  Calendar,
  Users,
  Search,
  ArrowLeftRight,
  ExternalLink,
  MapPin,
} from "lucide-react";
import { City } from "@/types/city";
import { trackFlightSearchClick } from "@/lib/analytics";

interface FlightSearchWidgetProps {
  city: City;
  variant?: "compact" | "full";
}

const FLIGHT_PROVIDERS = [
  {
    id: "skyscanner",
    name: "Skyscanner",
    logo: "🔍",
    color: "bg-sky-600 hover:bg-sky-700",
    getUrl: (origin: string, destination: string, date: string) => {
      const params = new URLSearchParams({
        adults: "1",
        cabinclass: "economy",
        children: "0",
        infants: "0",
        preferdirects: "false",
        ref: "home",
        rtn: "0",
      });
      return `https://www.skyscanner.com/transport/flights/${origin}/${destination}/${date.replace(/-/g, "")}/?${params.toString()}`;
    },
  },
  {
    id: "kayak",
    name: "Kayak",
    logo: "🛫",
    color: "bg-orange-500 hover:bg-orange-600",
    getUrl: (origin: string, destination: string, date: string) => {
      return `https://www.kayak.com/flights/${origin}-${destination}/${date}?sort=bestflight_a`;
    },
  },
  {
    id: "google",
    name: "Google Flights",
    logo: "✈️",
    color: "bg-blue-500 hover:bg-blue-600",
    getUrl: (origin: string, destination: string, date: string) => {
      return `https://www.google.com/travel/flights?q=flights%20to%20${destination}%20from%20${origin}%20${date}`;
    },
  },
];

// Get airport code from city (simplified mapping)
const getAirportCode = (cityName: string): string => {
  const airportCodes: Record<string, string> = {
    "Bangkok": "BKK",
    "Bali": "DPS",
    "Lisbon": "LIS",
    "Medellin": "MDE",
    "Mexico City": "MEX",
    "Barcelona": "BCN",
    "Berlin": "BER",
    "Budapest": "BUD",
    "Chiang Mai": "CNX",
    "Ho Chi Minh City": "SGN",
    "Kuala Lumpur": "KUL",
    "Singapore": "SIN",
    "Tokyo": "TYO",
    "Seoul": "SEL",
    "Taipei": "TPE",
    "Dubai": "DXB",
    "Cape Town": "CPT",
    "Buenos Aires": "EZE",
    "Lima": "LIM",
    "Bogota": "BOG",
    "Prague": "PRG",
    "Warsaw": "WAW",
    "Split": "SPU",
    "Athens": "ATH",
    "Tbilisi": "TBS",
    "Playa del Carmen": "CUN",
  };
  return airportCodes[cityName] || cityName.substring(0, 3).toUpperCase();
};

export default function FlightSearchWidget({
  city,
  variant = "full",
}: FlightSearchWidgetProps) {
  const [origin, setOrigin] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [isRoundTrip, setIsRoundTrip] = useState(false);

  const destinationCode = city.transportInfo?.airportCode || getAirportCode(city.name);
  const placement = variant === "compact" ? "flight_widget_compact" : "flight_widget_full";

  if (variant === "compact") {
    return (
      <a
        href={`https://www.skyscanner.com/transport/flights/anywhere/${destinationCode}/`}
        onClick={() => trackFlightSearchClick(city.name, `skyscanner:${placement}`)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all group"
      >
        <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center group-hover:bg-sky-200 transition-colors">
          <Plane className="w-6 h-6 text-sky-600" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">Find Flights</h4>
          <p className="text-sm text-gray-500">
            Flights to {city.name} ({destinationCode})
          </p>
        </div>
        <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-sky-600 transition-colors" />
      </a>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-sky-500 to-blue-600 p-4 text-white">
        <div className="flex items-center gap-3">
          <Plane className="w-6 h-6" />
          <div>
            <h3 className="font-bold">Find Flights</h3>
            <p className="text-sm text-white/80">
              to {city.name} ({destinationCode})
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Trip Type */}
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={!isRoundTrip}
              onChange={() => setIsRoundTrip(false)}
              className="w-4 h-4 text-sky-600"
            />
            <span className="text-sm text-gray-700">One way</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={isRoundTrip}
              onChange={() => setIsRoundTrip(true)}
              className="w-4 h-4 text-sky-600"
            />
            <span className="text-sm text-gray-700">Round trip</span>
          </label>
        </div>

        {/* Origin */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            From (City or Airport)
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="e.g., New York or JFK"
              className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
            />
          </div>
        </div>

        {/* Destination (read-only) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            To
          </label>
          <div className="relative">
            <Plane className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={`${city.name} (${destinationCode})`}
              readOnly
              className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700"
            />
          </div>
        </div>

        {/* Dates */}
        <div className={`grid gap-3 ${isRoundTrip ? "grid-cols-2" : "grid-cols-1"}`}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Depart
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={departDate}
                onChange={(e) => setDepartDate(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
              />
            </div>
          </div>
          {isRoundTrip && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Return
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  min={departDate}
                  className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* Search Buttons */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Search on:</p>
          <div className="grid grid-cols-3 gap-2">
            {FLIGHT_PROVIDERS.map((provider) => (
              <a
                key={provider.id}
                href={provider.getUrl(
                  origin || "anywhere",
                  destinationCode,
                  departDate || new Date().toISOString().split("T")[0]
                )}
                onClick={() => trackFlightSearchClick(city.name, `${provider.id}:${placement}`)}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center gap-1 ${provider.color} text-white py-3 px-2 rounded-lg font-medium transition-colors text-center`}
              >
                <span className="text-lg">{provider.logo}</span>
                <span className="text-xs">{provider.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Airport Info */}
        {city.transportInfo && (
          <div className="pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-700">
              <span className="font-medium">{city.transportInfo.mainAirport}</span>
              <span className="text-gray-500">
                {" "}
                ({city.transportInfo.airportCode}) • {city.transportInfo.airportToCenter}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

