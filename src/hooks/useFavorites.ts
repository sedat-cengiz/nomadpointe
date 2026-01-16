"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";

const LOCAL_STORAGE_KEY = "nomadpoint_favorites";

export function useFavorites() {
  const { data: session, status } = useSession();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load favorites from localStorage or API
  useEffect(() => {
    const loadFavorites = async () => {
      setIsLoading(true);
      
      if (status === "loading") return;
      
      if (session?.user) {
        // Load from API for authenticated users
        try {
          const response = await fetch("/api/favorites");
          const data = await response.json();
          setFavorites(data.favorites || []);
          
          // Sync localStorage favorites to server if any
          const localFavorites = getLocalFavorites();
          if (localFavorites.length > 0) {
            // Add local favorites to server
            for (const citySlug of localFavorites) {
              if (!data.favorites?.includes(citySlug)) {
                await fetch("/api/favorites", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ citySlug }),
                });
              }
            }
            // Clear localStorage after sync
            localStorage.removeItem(LOCAL_STORAGE_KEY);
            // Reload favorites
            const refreshed = await fetch("/api/favorites");
            const refreshedData = await refreshed.json();
            setFavorites(refreshedData.favorites || []);
          }
        } catch (error) {
          console.error("Error loading favorites:", error);
          setFavorites([]);
        }
      } else {
        // Load from localStorage for guests
        setFavorites(getLocalFavorites());
      }
      
      setIsLoading(false);
    };

    loadFavorites();
  }, [session, status]);

  // Get favorites from localStorage
  const getLocalFavorites = (): string[] => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  // Save favorites to localStorage
  const saveLocalFavorites = (favs: string[]) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favs));
  };

  // Toggle favorite
  const toggleFavorite = useCallback(async (citySlug: string) => {
    const isFavorited = favorites.includes(citySlug);
    
    // Optimistic update
    const newFavorites = isFavorited
      ? favorites.filter((slug) => slug !== citySlug)
      : [...favorites, citySlug];
    setFavorites(newFavorites);

    if (session?.user) {
      // Update server
      try {
        const response = await fetch("/api/favorites", {
          method: isFavorited ? "DELETE" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ citySlug }),
        });
        
        if (!response.ok) {
          // Revert on error
          setFavorites(favorites);
        }
      } catch (error) {
        console.error("Error toggling favorite:", error);
        // Revert on error
        setFavorites(favorites);
      }
    } else {
      // Save to localStorage for guests
      saveLocalFavorites(newFavorites);
    }
  }, [favorites, session]);

  // Check if city is favorited
  const isFavorite = useCallback((citySlug: string) => {
    return favorites.includes(citySlug);
  }, [favorites]);

  return {
    favorites,
    isLoading,
    toggleFavorite,
    isFavorite,
    count: favorites.length,
    isAuthenticated: !!session?.user,
  };
}

