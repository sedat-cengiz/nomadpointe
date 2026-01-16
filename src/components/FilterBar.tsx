"use client";

import { useState } from "react";
import {
  Wifi,
  DollarSign,
  X,
  Shield,
  FileCheck,
  Globe,
  ArrowUpDown,
  Search,
  ChevronDown,
  SlidersHorizontal,
} from "lucide-react";

export type SortOption = "nomadScore" | "cost" | "internetSpeed" | "safety";
export type ContinentFilter = "all" | "Asia" | "Europe" | "Americas" | "Africa" | "Oceania";

interface FilterBarProps {
  // Toggle filters
  highSpeedFilter: boolean;
  budgetFilter: boolean;
  visaFilter: boolean;
  safetyFilter: boolean;
  onHighSpeedChange: (value: boolean) => void;
  onBudgetChange: (value: boolean) => void;
  onVisaChange: (value: boolean) => void;
  onSafetyChange: (value: boolean) => void;
  // Continent filter
  continentFilter: ContinentFilter;
  onContinentChange: (value: ContinentFilter) => void;
  // Sort
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
  // Search
  searchQuery: string;
  onSearchChange: (value: string) => void;
  // Counts
  filteredCount: number;
  totalCount: number;
}

const CONTINENTS: { value: ContinentFilter; label: string }[] = [
  { value: "all", label: "All Continents" },
  { value: "Asia", label: "Asia" },
  { value: "Europe", label: "Europe" },
  { value: "Americas", label: "Americas" },
  { value: "Africa", label: "Africa" },
  { value: "Oceania", label: "Oceania" },
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "nomadScore", label: "Nomad Score" },
  { value: "cost", label: "Lowest Cost" },
  { value: "internetSpeed", label: "Fastest Internet" },
  { value: "safety", label: "Safest" },
];

export default function FilterBar({
  highSpeedFilter,
  budgetFilter,
  visaFilter,
  safetyFilter,
  onHighSpeedChange,
  onBudgetChange,
  onVisaChange,
  onSafetyChange,
  continentFilter,
  onContinentChange,
  sortBy,
  onSortChange,
  searchQuery,
  onSearchChange,
  filteredCount,
  totalCount,
}: FilterBarProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const hasActiveFilters =
    highSpeedFilter ||
    budgetFilter ||
    visaFilter ||
    safetyFilter ||
    continentFilter !== "all" ||
    searchQuery !== "";

  const clearAllFilters = () => {
    onHighSpeedChange(false);
    onBudgetChange(false);
    onVisaChange(false);
    onSafetyChange(false);
    onContinentChange("all");
    onSearchChange("");
  };

  const activeFilterCount = [
    highSpeedFilter,
    budgetFilter,
    visaFilter,
    safetyFilter,
    continentFilter !== "all",
  ].filter(Boolean).length;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8">
      {/* Search and Sort Row */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search cities or countries..."
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Continent Dropdown */}
        <div className="relative">
          <select
            value={continentFilter}
            onChange={(e) => onContinentChange(e.target.value as ContinentFilter)}
            className="appearance-none w-full md:w-48 px-4 py-3 pr-10 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
          >
            {CONTINENTS.map((continent) => (
              <option key={continent.value} value={continent.value}>
                {continent.label}
              </option>
            ))}
          </select>
          <Globe className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="appearance-none w-full md:w-48 px-4 py-3 pr-10 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                Sort: {option.label}
              </option>
            ))}
          </select>
          <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Filter Buttons Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {/* Toggle Advanced */}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              showAdvanced || activeFilterCount > 0
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="bg-white text-primary w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold">
                {activeFilterCount}
              </span>
            )}
            <ChevronDown
              className={`w-4 h-4 transition-transform ${showAdvanced ? "rotate-180" : ""}`}
            />
          </button>

          {/* Quick Filters (always visible) */}
          <button
            onClick={() => onHighSpeedChange(!highSpeedFilter)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              highSpeedFilter
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Wifi className="w-4 h-4" />
            Fast WiFi
          </button>

          <button
            onClick={() => onBudgetChange(!budgetFilter)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              budgetFilter
                ? "bg-green-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <DollarSign className="w-4 h-4" />
            Budget
          </button>

          {/* Clear All */}
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1 px-3 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-4 h-4" />
              Clear all
            </button>
          )}
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-500">
          Showing{" "}
          <span className="font-semibold text-gray-900">{filteredCount}</span> of{" "}
          <span className="font-semibold text-gray-900">{totalCount}</span> cities
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {showAdvanced && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onVisaChange(!visaFilter)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                visaFilter
                  ? "bg-amber-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FileCheck className="w-4 h-4" />
              Nomad Visa Available
            </button>

            <button
              onClick={() => onSafetyChange(!safetyFilter)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                safetyFilter
                  ? "bg-purple-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Shield className="w-4 h-4" />
              High Safety (4+)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
