"use client";

import Image from "next/image";
import Link from "next/link";
import { Wifi, DollarSign, Shield, Plus, Check, Heart } from "lucide-react";
import { City } from "@/types/city";

interface CityCardProps {
  city: City;
  isSelected?: boolean;
  onToggleCompare?: (slug: string) => void;
  showCompareCheckbox?: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: (slug: string) => void;
  showFavoriteButton?: boolean;
}

export default function CityCard({
  city,
  isSelected = false,
  onToggleCompare,
  showCompareCheckbox = true,
  isFavorite = false,
  onToggleFavorite,
  showFavoriteButton = true,
}: CityCardProps) {
  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleCompare?.(city.slug);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite?.(city.slug);
  };

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
      {/* Action Buttons */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
        {/* Favorite Button */}
        {showFavoriteButton && (
          <button
            onClick={handleFavoriteClick}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
              isFavorite
                ? "bg-red-500 text-white"
                : "bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white"
            }`}
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`}
            />
          </button>
        )}

        {/* Compare Checkbox */}
        {showCompareCheckbox && (
          <button
            onClick={handleCompareClick}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
              isSelected
                ? "bg-primary text-white"
                : "bg-white/90 text-gray-600 hover:bg-primary hover:text-white"
            }`}
            title={isSelected ? "Remove from compare" : "Add to compare"}
          >
            {isSelected ? (
              <Check className="w-4 h-4" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      <Link href={`/cities/${city.slug}`}>
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={city.heroImage}
            alt={`${city.name}, ${city.country}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          {/* Location Badge */}
          <div className="absolute bottom-3 left-3">
            <h3 className="text-white font-bold text-xl">{city.name}</h3>
            <p className="text-white/80 text-sm">{city.country}</p>
          </div>

          {/* Nomad Score Badge */}
          {city.nomadScore && (
            <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-bold">
              Score: {city.nomadScore}
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="p-4">
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {city.shortDescription}
          </p>

          <div className="grid grid-cols-3 gap-2">
            {/* Internet Speed */}
            <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
              <Wifi
                className={`w-5 h-5 mb-1 ${
                  city.internetSpeed >= 50 ? "text-green-500" : "text-yellow-500"
                }`}
              />
              <span className="text-xs text-gray-500">Internet</span>
              <span className="text-sm font-semibold text-gray-900">
                {city.internetSpeed} Mbps
              </span>
            </div>

            {/* Cost */}
            <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
              <DollarSign
                className={`w-5 h-5 mb-1 ${
                  city.monthlyCost <= 1500 ? "text-green-500" : "text-yellow-500"
                }`}
              />
              <span className="text-xs text-gray-500">Monthly</span>
              <span className="text-sm font-semibold text-gray-900">
                ${city.monthlyCost.toLocaleString("en-US")}
              </span>
            </div>

            {/* Safety */}
            <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
              <Shield
                className={`w-5 h-5 mb-1 ${
                  city.safetyScore >= 4 ? "text-green-500" : "text-yellow-500"
                }`}
              />
              <span className="text-xs text-gray-500">Safety</span>
              <span className="text-sm font-semibold text-gray-900">
                {city.safetyScore}/5
              </span>
            </div>
          </div>

          {/* Visa Badge */}
          {city.visaAvailable && (
            <div className="mt-3 flex items-center justify-center">
              <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                Nomad Visa Available
              </span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
