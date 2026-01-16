"use client";

import {
  Plane,
  Car,
  Train,
  Bike,
  Footprints,
  MapPin,
  CreditCard,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { City } from "@/types/city";

interface TransportInfoProps {
  city: City;
}

export default function TransportInfo({ city }: TransportInfoProps) {
  const transport = city.transportInfo;

  if (!transport) {
    return null;
  }

  const walkabilityConfig = {
    Excellent: {
      bg: "bg-green-100",
      text: "text-green-700",
      emoji: "🚶‍♂️",
    },
    Good: {
      bg: "bg-blue-100",
      text: "text-blue-700",
      emoji: "🚶",
    },
    Fair: {
      bg: "bg-amber-100",
      text: "text-amber-700",
      emoji: "🚗",
    },
    Poor: {
      bg: "bg-red-100",
      text: "text-red-700",
      emoji: "🚕",
    },
  };

  const trafficConfig = {
    Low: {
      bg: "bg-green-100",
      text: "text-green-700",
    },
    Medium: {
      bg: "bg-blue-100",
      text: "text-blue-700",
    },
    High: {
      bg: "bg-amber-100",
      text: "text-amber-700",
    },
    Extreme: {
      bg: "bg-red-100",
      text: "text-red-700",
    },
  };

  const transitQualityConfig = {
    Excellent: "bg-green-100 text-green-700",
    Good: "bg-blue-100 text-blue-700",
    Fair: "bg-amber-100 text-amber-700",
    Poor: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-50 to-sky-50 px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Car className="w-5 h-5 text-cyan-600" />
          Getting Around
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Transportation options in {city.name}
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Airport Info */}
        <div className="bg-sky-50 rounded-xl p-4 border border-sky-100">
          <div className="flex items-start gap-3">
            <div className="bg-sky-100 rounded-xl p-3">
              <Plane className="w-6 h-6 text-sky-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-sky-900">
                  {transport.mainAirport}
                </h4>
                <span className="bg-sky-100 text-sky-700 px-2 py-0.5 rounded text-sm font-mono">
                  {transport.airportCode}
                </span>
              </div>
              <p className="text-sm text-sky-700 mt-1">
                {transport.airportToCenter}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          {/* Walkability */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <Footprints className="w-4 h-4" />
              <span className="text-sm">Walkability</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">
                {walkabilityConfig[transport.walkability].emoji}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${walkabilityConfig[transport.walkability].bg} ${walkabilityConfig[transport.walkability].text}`}
              >
                {transport.walkability}
              </span>
            </div>
          </div>

          {/* Traffic */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm">Traffic Level</span>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${trafficConfig[transport.trafficLevel].bg} ${trafficConfig[transport.trafficLevel].text}`}
            >
              {transport.trafficLevel}
            </span>
          </div>
        </div>

        {/* Public Transit */}
        {transport.publicTransit.available && (
          <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
            <div className="flex items-center gap-2 mb-3">
              <Train className="w-5 h-5 text-indigo-600" />
              <span className="font-semibold text-indigo-900">
                Public Transportation
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${transitQualityConfig[transport.publicTransit.quality]}`}
              >
                {transport.publicTransit.quality}
              </span>
            </div>

            {/* Transit Types */}
            <div className="flex flex-wrap gap-2 mb-3">
              {transport.publicTransit.types.map((type, index) => (
                <span
                  key={index}
                  className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
                >
                  {type}
                </span>
              ))}
            </div>

            {/* Pass Info */}
            {transport.publicTransit.passName && (
              <div className="bg-white/60 rounded-lg p-3 mt-3">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="w-4 h-4 text-indigo-600" />
                  <span className="font-medium text-indigo-900">
                    {transport.publicTransit.passName}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {transport.publicTransit.monthlyPassCost !== undefined && (
                    <div>
                      <span className="text-indigo-600">Monthly Pass:</span>
                      <span className="font-semibold text-indigo-900 ml-1">
                        ${transport.publicTransit.monthlyPassCost}
                      </span>
                    </div>
                  )}
                  {transport.publicTransit.singleTripCost !== undefined && (
                    <div>
                      <span className="text-indigo-600">Single Trip:</span>
                      <span className="font-semibold text-indigo-900 ml-1">
                        ${transport.publicTransit.singleTripCost.toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Rideshare Apps */}
        {transport.rideshareApps && transport.rideshareApps.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Car className="w-4 h-4" />
              Rideshare Apps Available
            </h4>
            <div className="flex flex-wrap gap-2">
              {transport.rideshareApps.map((app, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  {app}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Rental Options */}
        {(transport.scooterRental || transport.bikeRental) && (
          <div className="grid grid-cols-2 gap-4">
            {/* Scooter */}
            {transport.scooterRental && (
              <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                <div className="flex items-center gap-2 text-orange-700 mb-2">
                  <span className="text-xl">🛵</span>
                  <span className="font-semibold">Scooter Rental</span>
                </div>
                <p className="text-orange-900 font-bold">
                  {transport.scooterRental}
                </p>
              </div>
            )}

            {/* Bike */}
            {transport.bikeRental && (
              <div className="bg-lime-50 rounded-xl p-4 border border-lime-100">
                <div className="flex items-center gap-2 text-lime-700 mb-2">
                  <Bike className="w-5 h-5" />
                  <span className="font-semibold">Bike Rental</span>
                </div>
                <p className="text-lime-900 font-bold">{transport.bikeRental}</p>
              </div>
            )}
          </div>
        )}

        {/* Pro Tips */}
        <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
          <h4 className="font-semibold text-amber-900 mb-2">
            💡 Transport Tips
          </h4>
          <ul className="space-y-2 text-sm text-amber-800">
            {transport.trafficLevel === "Extreme" && (
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-600" />
                Avoid rush hour (7-9 AM, 5-8 PM) - traffic can double travel
                time
              </li>
            )}
            {transport.rideshareApps?.includes("Grab") && (
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                Grab is the dominant app in Southeast Asia - download before
                arriving
              </li>
            )}
            {transport.publicTransit.available &&
              transport.publicTransit.quality === "Excellent" && (
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  Public transport is excellent - you may not need rideshare at
                  all
                </li>
              )}
            {transport.scooterRental && (
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-600" />
                Always wear a helmet and check insurance coverage for scooter
                rentals
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

