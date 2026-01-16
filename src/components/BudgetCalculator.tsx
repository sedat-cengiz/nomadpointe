"use client";

import { useState } from "react";
import { Calculator, User, Clock } from "lucide-react";
import { City, lifestyleOptions, LifestyleType } from "@/types/city";

interface BudgetCalculatorProps {
  city: City;
}

export default function BudgetCalculator({ city }: BudgetCalculatorProps) {
  const [lifestyle, setLifestyle] = useState<LifestyleType>("comfortable");
  const [duration, setDuration] = useState(1);

  const selectedLifestyle = lifestyleOptions.find((l) => l.id === lifestyle)!;
  const adjustedMonthlyCost = Math.round(
    city.monthlyCost * selectedLifestyle.multiplier
  );
  const totalCost = adjustedMonthlyCost * duration;

  const adjustedBreakdown = Object.entries(city.costBreakdown).reduce(
    (acc, [key, value]) => {
      acc[key] = Math.round(value * selectedLifestyle.multiplier);
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
          <Calculator className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">Budget Calculator</h3>
          <p className="text-sm text-gray-500">
            Estimate your monthly expenses
          </p>
        </div>
      </div>

      {/* Lifestyle Selection */}
      <div className="mb-6">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
          <User className="w-4 h-4" />
          Lifestyle
        </label>
        <div className="grid grid-cols-1 gap-2">
          {lifestyleOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setLifestyle(option.id)}
              className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all ${
                lifestyle === option.id
                  ? "border-primary bg-primary/5"
                  : "border-gray-100 hover:border-gray-200"
              }`}
            >
              <div className="text-left">
                <div
                  className={`font-medium ${
                    lifestyle === option.id ? "text-primary" : "text-gray-900"
                  }`}
                >
                  {option.label}
                </div>
                <div className="text-xs text-gray-500">{option.description}</div>
              </div>
              <div
                className={`text-sm font-semibold ${
                  lifestyle === option.id ? "text-primary" : "text-gray-400"
                }`}
              >
                {option.multiplier}x
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Duration Slider */}
      <div className="mb-6">
        <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-3">
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Duration
          </span>
          <span className="text-primary font-semibold">
            {duration} {duration === 1 ? "month" : "months"}
          </span>
        </label>
        <input
          type="range"
          min="1"
          max="12"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>1 mo</span>
          <span>6 mo</span>
          <span>12 mo</span>
        </div>
      </div>

      {/* Results */}
      <div className="bg-gray-50 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-600">Monthly Cost</span>
          <span className="text-lg font-bold text-gray-900">
            ${adjustedMonthlyCost.toLocaleString()}
          </span>
        </div>

        {/* Mini breakdown */}
        <div className="space-y-2 mb-4">
          {Object.entries(adjustedBreakdown).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between text-sm">
              <span className="text-gray-500 capitalize">{key}</span>
              <span className="text-gray-700">${value}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-900">
              Total ({duration} {duration === 1 ? "month" : "months"})
            </span>
            <span className="text-2xl font-bold text-primary">
              ${totalCost.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Comparison note */}
      <p className="text-xs text-gray-400 mt-4 text-center">
        Based on average costs for {city.name}. Actual expenses may vary.
      </p>
    </div>
  );
}

