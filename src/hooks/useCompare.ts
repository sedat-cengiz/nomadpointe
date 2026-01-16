"use client";

import { useState, useCallback, useEffect } from "react";

const MAX_COMPARE_CITIES = 3;
const STORAGE_KEY = "nomadpoint_compare_cities";

export function useCompare() {
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setSelectedCities(parsed.slice(0, MAX_COMPARE_CITIES));
          }
        } catch {
          // Ignore parse errors
        }
      }
      setIsInitialized(true);
    }
  }, []);

  // Save to localStorage when selection changes
  useEffect(() => {
    if (isInitialized && typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedCities));
    }
  }, [selectedCities, isInitialized]);

  const addCity = useCallback((slug: string) => {
    setSelectedCities((prev) => {
      if (prev.includes(slug)) return prev;
      if (prev.length >= MAX_COMPARE_CITIES) return prev;
      return [...prev, slug];
    });
  }, []);

  const removeCity = useCallback((slug: string) => {
    setSelectedCities((prev) => prev.filter((s) => s !== slug));
  }, []);

  const toggleCity = useCallback((slug: string) => {
    setSelectedCities((prev) => {
      if (prev.includes(slug)) {
        return prev.filter((s) => s !== slug);
      }
      if (prev.length >= MAX_COMPARE_CITIES) {
        // Remove first and add new one
        return [...prev.slice(1), slug];
      }
      return [...prev, slug];
    });
  }, []);

  const clearAll = useCallback(() => {
    setSelectedCities([]);
  }, []);

  const isSelected = useCallback(
    (slug: string) => selectedCities.includes(slug),
    [selectedCities]
  );

  const canAdd = selectedCities.length < MAX_COMPARE_CITIES;

  return {
    selectedCities,
    addCity,
    removeCity,
    toggleCity,
    clearAll,
    isSelected,
    canAdd,
    count: selectedCities.length,
    maxCities: MAX_COMPARE_CITIES,
    isInitialized,
  };
}

