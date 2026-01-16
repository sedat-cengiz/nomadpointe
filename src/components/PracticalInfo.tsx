"use client";

import {
  Globe,
  Plug,
  Languages,
  Phone,
  Smartphone,
  Clock,
  Wifi,
  Signal,
  CheckCircle,
} from "lucide-react";
import { City, SimOption } from "@/types/city";

interface PracticalInfoProps {
  city: City;
}

function SimCard({ sim }: { sim: SimOption }) {
  const coverageColor = {
    Excellent: "bg-green-100 text-green-700",
    Good: "bg-blue-100 text-blue-700",
    Fair: "bg-amber-100 text-amber-700",
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h4 className="font-semibold text-gray-900">{sim.provider}</h4>
          <p className="text-sm text-gray-600 mt-1">{sim.dataPrice}</p>
        </div>
        <span
          className={`px-2 py-0.5 rounded-full text-xs font-medium ${coverageColor[sim.coverage]}`}
        >
          {sim.coverage}
        </span>
      </div>
      {sim.esimAvailable && (
        <div className="flex items-center gap-1 mt-2 text-xs text-purple-600">
          <Smartphone className="w-3 h-3" />
          eSIM Available
        </div>
      )}
    </div>
  );
}

export default function PracticalInfo({ city }: PracticalInfoProps) {
  const info = city.practicalInfo;

  if (!info) {
    return null;
  }

  const languageBarrierColor = {
    Low: "bg-green-100 text-green-700",
    Medium: "bg-amber-100 text-amber-700",
    High: "bg-red-100 text-red-700",
  };

  const englishColor = {
    High: "bg-green-100 text-green-700",
    Medium: "bg-amber-100 text-amber-700",
    Low: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-600" />
          Practical Information
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Essential daily info for living in {city.name}
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Key Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* Timezone */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Timezone</span>
            </div>
            <p className="text-lg font-bold text-gray-900">{info.timezone}</p>
            <p className="text-xs text-gray-500">
              {info.timezoneOffset >= 0 ? "+" : ""}
              {info.timezoneOffset}h from UTC
            </p>
          </div>

          {/* Plug Type */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Plug className="w-4 h-4" />
              <span className="text-sm">Plug Type</span>
            </div>
            <p className="text-lg font-bold text-gray-900">{info.plugType}</p>
            <p className="text-xs text-gray-500">{info.voltage}</p>
          </div>

          {/* Emergency Number */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Phone className="w-4 h-4" />
              <span className="text-sm">Emergency</span>
            </div>
            <p className="text-lg font-bold text-gray-900">
              {info.emergencyNumber}
            </p>
            <p className="text-xs text-gray-500">Police/Ambulance/Fire</p>
          </div>
        </div>

        {/* Language Section */}
        <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
          <div className="flex items-center gap-2 mb-3">
            <Languages className="w-5 h-5 text-indigo-600" />
            <span className="font-semibold text-indigo-900">
              Language & Communication
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-indigo-700">Primary Language</p>
              <p className="font-semibold text-indigo-900">
                {info.primaryLanguage}
              </p>
            </div>
            <div>
              <p className="text-sm text-indigo-700 mb-1">English Level</p>
              <span
                className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${englishColor[info.englishProficiency]}`}
              >
                {info.englishProficiency}
              </span>
            </div>
            <div>
              <p className="text-sm text-indigo-700 mb-1">Language Barrier</p>
              <span
                className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${languageBarrierColor[info.languageBarrier]}`}
              >
                {info.languageBarrier}
              </span>
            </div>
          </div>
        </div>

        {/* SIM Options */}
        {info.simOptions && info.simOptions.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Signal className="w-4 h-4" />
              SIM Card & Mobile Data Options
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {info.simOptions.map((sim, index) => (
                <SimCard key={index} sim={sim} />
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3">
              💡 Tip: eSIM is convenient for short stays. For longer stays,
              local SIM cards offer better value.
            </p>
          </div>
        )}

        {/* Quick Tips */}
        <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
          <h4 className="font-semibold text-amber-900 mb-2">💡 Pro Tips</h4>
          <ul className="space-y-2 text-sm text-amber-800">
            {info.timezoneOffset >= 5 && info.timezoneOffset <= 8 && (
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                Great for European clients (5-8h overlap) or US async work
              </li>
            )}
            {info.timezoneOffset >= -1 && info.timezoneOffset <= 3 && (
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                Perfect timezone for European companies
              </li>
            )}
            {info.englishProficiency === "High" && (
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                Easy to navigate without learning local language
              </li>
            )}
            {info.plugType.includes("A") && info.plugType.includes("B") && (
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                US-style plugs work here - no adapter needed for Americans
              </li>
            )}
            {info.plugType.includes("C") && (
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                European plugs (Type C) work here
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

