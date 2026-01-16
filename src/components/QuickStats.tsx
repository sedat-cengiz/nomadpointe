import { Wifi, DollarSign, Shield, FileCheck, MapPin } from "lucide-react";
import { City } from "@/types/city";

interface QuickStatsProps {
  city: City;
}

export default function QuickStats({ city }: QuickStatsProps) {
  const getSpeedColor = (speed: number) => {
    if (speed >= 80) return "text-green-500";
    if (speed >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  const getCostColor = (cost: number) => {
    if (cost <= 1200) return "text-green-500";
    if (cost <= 1800) return "text-yellow-500";
    return "text-red-500";
  };

  const getSafetyColor = (score: number) => {
    if (score >= 4) return "text-green-500";
    if (score >= 3) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Stats</h3>

      <div className="space-y-5">
        {/* Location */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
            <MapPin className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <div className="text-sm text-gray-500">Location</div>
            <div className="font-semibold text-gray-900">
              {city.country}, {city.continent}
            </div>
          </div>
        </div>

        {/* Internet Speed */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
            <Wifi className={`w-5 h-5 ${getSpeedColor(city.internetSpeed)}`} />
          </div>
          <div className="flex-1">
            <div className="text-sm text-gray-500">Internet Speed</div>
            <div className="font-semibold text-gray-900">
              {city.internetSpeed} Mbps
            </div>
          </div>
          <div
            className={`text-sm font-medium ${getSpeedColor(city.internetSpeed)}`}
          >
            {city.internetSpeed >= 80
              ? "Excellent"
              : city.internetSpeed >= 50
                ? "Good"
                : "Fair"}
          </div>
        </div>

        {/* Monthly Cost */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
            <DollarSign className={`w-5 h-5 ${getCostColor(city.monthlyCost)}`} />
          </div>
          <div className="flex-1">
            <div className="text-sm text-gray-500">Monthly Cost</div>
            <div className="font-semibold text-gray-900">
              ${city.monthlyCost.toLocaleString()}
            </div>
          </div>
          <div
            className={`text-sm font-medium ${getCostColor(city.monthlyCost)}`}
          >
            {city.monthlyCost <= 1200
              ? "Budget"
              : city.monthlyCost <= 1800
                ? "Moderate"
                : "Premium"}
          </div>
        </div>

        {/* Safety Score */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
            <Shield className={`w-5 h-5 ${getSafetyColor(city.safetyScore)}`} />
          </div>
          <div className="flex-1">
            <div className="text-sm text-gray-500">Safety Score</div>
            <div className="font-semibold text-gray-900">
              {city.safetyScore} / 5
            </div>
          </div>
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
        </div>

        {/* Visa Status */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
            <FileCheck
              className={`w-5 h-5 ${city.visaAvailable ? "text-green-500" : "text-gray-400"}`}
            />
          </div>
          <div className="flex-1">
            <div className="text-sm text-gray-500">Nomad Visa</div>
            <div className="font-semibold text-gray-900">
              {city.visaAvailable ? "Available" : "Not Available"}
            </div>
          </div>
          {city.visaAvailable && (
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
              ✓
            </span>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 my-6" />

      {/* Cost Breakdown */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-4">
          Cost Breakdown (USD/month)
        </h4>
        <div className="space-y-3">
          {Object.entries(city.costBreakdown).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-sm text-gray-600 capitalize">{key}</span>
              <span className="text-sm font-medium text-gray-900">
                ${value}
              </span>
            </div>
          ))}
          <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-900">Total</span>
            <span className="text-sm font-bold text-primary">
              ${Object.values(city.costBreakdown).reduce((a, b) => a + b, 0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

