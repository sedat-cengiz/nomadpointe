"use client";

import { createContext, useContext, ReactNode } from "react";
import { useFavorites } from "@/hooks/useFavorites";

interface FavoritesContextType {
  favorites: string[];
  isLoading: boolean;
  toggleFavorite: (citySlug: string) => Promise<void>;
  isFavorite: (citySlug: string) => boolean;
  count: number;
  isAuthenticated: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const favoritesData = useFavorites();

  return (
    <FavoritesContext.Provider value={favoritesData}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavoritesContext() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavoritesContext must be used within a FavoritesProvider");
  }
  return context;
}

