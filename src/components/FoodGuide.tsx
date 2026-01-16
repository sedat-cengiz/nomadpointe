"use client";

import { Coffee, UtensilsCrossed, MapPin, Wifi, Zap } from "lucide-react";
import { City, FoodAndWorkspace, LaptopFriendlyCafe } from "@/types/city";

interface FoodGuideProps {
  city: City;
}

// Big Mac emoji component
const BigMacIcon = () => (
  <span className="text-2xl" role="img" aria-label="Big Mac">🍔</span>
);

// US Big Mac price for comparison (2025 data)
const US_BIG_MAC_PRICE = 5.79;

function getBigMacComparison(localPrice: number): { text: string; color: string } {
  const diff = ((localPrice - US_BIG_MAC_PRICE) / US_BIG_MAC_PRICE) * 100;
  
  if (diff < -20) {
    return { text: `${Math.abs(Math.round(diff))}% cheaper than US`, color: "text-green-600" };
  } else if (diff > 20) {
    return { text: `${Math.round(diff)}% more expensive than US`, color: "text-red-600" };
  } else {
    return { text: "Similar to US prices", color: "text-amber-600" };
  }
}

function WifiSpeedBadge({ speed }: { speed?: "Fast" | "Moderate" | "Slow" }) {
  const colors = {
    Fast: "bg-green-100 text-green-700",
    Moderate: "bg-amber-100 text-amber-700",
    Slow: "bg-red-100 text-red-700",
  };
  
  if (!speed) return null;
  
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${colors[speed]}`}>
      <Wifi className="w-3 h-3" />
      {speed}
    </span>
  );
}

function CafeCard({ cafe }: { cafe: LaptopFriendlyCafe }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h4 className="font-semibold text-gray-900">{cafe.name}</h4>
          <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
            <MapPin className="w-3 h-3" />
            {cafe.neighborhood}
          </p>
        </div>
        <WifiSpeedBadge speed={cafe.wifiSpeed} />
      </div>
      {cafe.specialty && (
        <p className="text-sm text-gray-600 mt-2 italic">"{cafe.specialty}"</p>
      )}
      {cafe.powerOutlets && (
        <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
          <Zap className="w-3 h-3" />
          Power outlets available
        </div>
      )}
    </div>
  );
}

export default function FoodGuide({ city }: FoodGuideProps) {
  const food = city.foodAndWorkspace;
  
  if (!food) {
    return null;
  }

  const bigMacComparison = food.bigMacPrice 
    ? getBigMacComparison(food.bigMacPrice) 
    : null;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <UtensilsCrossed className="w-5 h-5 text-orange-500" />
          Food & Workspace Guide
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Local food prices and work-friendly cafes in {city.name}
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Big Mac Index */}
        {food.bigMacPrice && (
          <div className="bg-amber-50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <BigMacIcon />
              <div>
                <h4 className="font-semibold text-gray-900">Big Mac Index</h4>
                <p className="text-sm text-gray-600">Global cost comparison</p>
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">
                ${food.bigMacPrice.toFixed(2)}
              </span>
              {bigMacComparison && (
                <span className={`text-sm font-medium ${bigMacComparison.color}`}>
                  {bigMacComparison.text}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              US reference price: ${US_BIG_MAC_PRICE} (2025)
            </p>
          </div>
        )}

        {/* Price Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <Coffee className="w-4 h-4" />
              <span className="text-sm">Cappuccino</span>
            </div>
            <p className="text-xl font-bold text-gray-900">
              ${food.cappuccinoPrice.toFixed(2)}
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <UtensilsCrossed className="w-4 h-4" />
              <span className="text-sm">Local Meal</span>
            </div>
            <p className="text-xl font-bold text-gray-900">
              ${food.localMealPrice.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Must Try Dish */}
        <div className="border-l-4 border-orange-400 pl-4">
          <h4 className="font-semibold text-gray-900">🍽️ Must Try</h4>
          <p className="text-gray-700 mt-1">{food.mustTryDish}</p>
          {food.foodScene && (
            <p className="text-sm text-gray-500 mt-2">{food.foodScene}</p>
          )}
        </div>

        {/* Budget Meal Spots */}
        {food.budgetMealSpots && food.budgetMealSpots.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">💰 Budget Eats</h4>
            <div className="flex flex-wrap gap-2">
              {food.budgetMealSpots.map((spot, index) => (
                <span
                  key={index}
                  className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm"
                >
                  {spot}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Laptop-Friendly Cafes */}
        {food.laptopFriendlyCafes && food.laptopFriendlyCafes.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Wifi className="w-4 h-4" />
              Work-Friendly Cafes
            </h4>
            <div className="space-y-3">
              {food.laptopFriendlyCafes.map((cafe, index) => (
                <CafeCard key={index} cafe={cafe} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
