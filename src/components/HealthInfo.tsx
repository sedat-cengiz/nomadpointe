"use client";

import {
  Heart,
  Droplets,
  Syringe,
  AlertTriangle,
  Building2,
  CheckCircle,
  XCircle,
  ShieldCheck,
} from "lucide-react";
import { City } from "@/types/city";

interface HealthInfoProps {
  city: City;
}

export default function HealthInfo({ city }: HealthInfoProps) {
  const health = city.healthInfo;

  if (!health) {
    return null;
  }

  const waterSafetyConfig = {
    Safe: {
      icon: CheckCircle,
      bg: "bg-green-100",
      text: "text-green-700",
      label: "Tap Water Safe",
      description: "Tap water is safe to drink directly",
    },
    Boil: {
      icon: AlertTriangle,
      bg: "bg-amber-100",
      text: "text-amber-700",
      label: "Boil First",
      description: "Boil tap water before drinking",
    },
    "Bottled Only": {
      icon: XCircle,
      bg: "bg-red-100",
      text: "text-red-700",
      label: "Bottled Only",
      description: "Drink only bottled or filtered water",
    },
  };

  const pharmacyConfig = {
    Excellent: {
      bg: "bg-green-100",
      text: "text-green-700",
    },
    Good: {
      bg: "bg-blue-100",
      text: "text-blue-700",
    },
    Limited: {
      bg: "bg-amber-100",
      text: "text-amber-700",
    },
  };

  const waterConfig = waterSafetyConfig[health.waterSafety];
  const WaterIcon = waterConfig.icon;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-50 to-pink-50 px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Heart className="w-5 h-5 text-rose-500" />
          Health & Safety
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Healthcare quality and health considerations in {city.name}
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Key Health Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* Healthcare Quality */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <Building2 className="w-4 h-4" />
              <span className="text-sm">Healthcare Quality</span>
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <div
                  key={star}
                  className={`w-3 h-3 rounded-full ${
                    star <= health.healthcareQuality
                      ? "bg-rose-500"
                      : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm font-semibold text-gray-900 mt-1">
              {health.healthcareQuality >= 4
                ? "Excellent"
                : health.healthcareQuality >= 3
                  ? "Good"
                  : "Basic"}
            </p>
          </div>

          {/* Hospital Cost */}
          {health.hospitalCostPerVisit !== undefined && (
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Building2 className="w-4 h-4" />
                <span className="text-sm">Hospital Visit</span>
              </div>
              <p className="text-xl font-bold text-gray-900">
                ${health.hospitalCostPerVisit}
              </p>
              <p className="text-xs text-gray-500">Private hospital avg.</p>
            </div>
          )}

          {/* Pharmacy */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-sm">Pharmacies</span>
            </div>
            <span
              className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${pharmacyConfig[health.pharmacyAvailability].bg} ${pharmacyConfig[health.pharmacyAvailability].text}`}
            >
              {health.pharmacyAvailability}
            </span>
          </div>
        </div>

        {/* Water Safety */}
        <div
          className={`rounded-xl p-4 border ${waterConfig.bg} border-${waterConfig.text.replace("text-", "")}/20`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${waterConfig.bg}`}>
              <Droplets className={`w-6 h-6 ${waterConfig.text}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <WaterIcon className={`w-5 h-5 ${waterConfig.text}`} />
                <span className={`font-semibold ${waterConfig.text}`}>
                  {waterConfig.label}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {waterConfig.description}
              </p>
            </div>
          </div>
        </div>

        {/* Vaccinations */}
        {(health.requiredVaccinations?.length ||
          health.recommendedVaccinations?.length) && (
          <div className="space-y-4">
            {/* Required */}
            {health.requiredVaccinations &&
              health.requiredVaccinations.length > 0 && (
                <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                  <h4 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
                    <Syringe className="w-4 h-4" />
                    Required Vaccinations
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {health.requiredVaccinations.map((vax, index) => (
                      <span
                        key={index}
                        className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {vax}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            {/* Recommended */}
            {health.recommendedVaccinations &&
              health.recommendedVaccinations.length > 0 && (
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                  <h4 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
                    <Syringe className="w-4 h-4" />
                    Recommended Vaccinations
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {health.recommendedVaccinations.map((vax, index) => (
                      <span
                        key={index}
                        className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {vax}
                      </span>
                    ))}
                  </div>
                </div>
              )}
          </div>
        )}

        {/* Health Risks */}
        {health.commonHealthRisks && health.commonHealthRisks.length > 0 && (
          <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
            <h4 className="font-semibold text-orange-900 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Common Health Considerations
            </h4>
            <ul className="space-y-2">
              {health.commonHealthRisks.map((risk, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-orange-800"
                >
                  <span className="text-orange-400">•</span>
                  {risk}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* COVID Restrictions */}
        {health.covidRestrictions && (
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">
              COVID-19 Requirements
            </h4>
            <p className="text-sm text-gray-700">{health.covidRestrictions}</p>
          </div>
        )}

        {/* Insurance Reminder */}
        <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-emerald-900">
                Travel Insurance Recommended
              </h4>
              <p className="text-sm text-emerald-700 mt-1">
                We recommend SafetyWing or World Nomads for digital nomad
                coverage. Make sure your policy covers your activities and
                length of stay.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

