"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";

const LOCAL_STORAGE_KEY = "nomadpoint_favorites";

export function useFavorites() {
  const { data: session, status } = useSession();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthedWithId = !!session?.user?.id;

  // Load favorites from localStorage or API
  useEffect(() => {
    const loadFavorites = async () => {
      setIsLoading(true);
      
      if (status === "loading") return;
      
      if (isAuthedWithId) {
        // Load from API for authenticated users
        try {
          const response = await fetch("/api/favorites");
          if (!response.ok) {
            // Fallback to local favorites if server is unavailable
            setFavorites(getLocalFavorites());
            setIsLoading(false);
            return;
          }
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
            if (refreshed.ok) {
              const refreshedData = await refreshed.json();
              setFavorites(refreshedData.favorites || []);
            } else {
              // If refresh fails, keep what we have and don't block UX
              saveLocalFavorites(localFavorites);
            }
          }
        } catch (error) {
          console.error("Error loading favorites:", error);
          // Fallback to local favorites if server fetch fails
          setFavorites(getLocalFavorites());
        }
      } else {
        // Load from localStorage for guests
        setFavorites(getLocalFavorites());
      }
      
      setIsLoading(false);
    };

    loadFavorites();
  }, [isAuthedWithId, status]);

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
    const previousFavorites = favorites;
    const isFavorited = previousFavorites.includes(citySlug);
    
    // Optimistic update
    const newFavorites = isFavorited
      ? previousFavorites.filter((slug) => slug !== citySlug)
      : [...previousFavorites, citySlug];
    setFavorites(newFavorites);

    if (isAuthedWithId) {
      // Update server
      try {
        const response = await fetch("/api/favorites", {
          method: isFavorited ? "DELETE" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ citySlug }),
        });
        
        if (!response.ok) {
          // Keep UX responsive even if server fails; fallback to localStorage
          console.error("Favorites API request failed:", response.status);
          saveLocalFavorites(newFavorites);
        }
      } catch (error) {
        console.error("Error toggling favorite:", error);
        // Keep UX responsive even if server fails; fallback to localStorage
        saveLocalFavorites(newFavorites);
      }
    } else {
      // Save to localStorage for guests
      saveLocalFavorites(newFavorites);
    }
  }, [favorites, isAuthedWithId]);

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
    isAuthenticated: isAuthedWithId,
  };
}

