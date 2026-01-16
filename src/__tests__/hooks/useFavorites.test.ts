import { renderHook, act, waitFor } from "@testing-library/react";
import { useFavorites } from "@/hooks/useFavorites";
import { useSession } from "next-auth/react";

// Mock next-auth
jest.mock("next-auth/react");
const mockUseSession = useSession as jest.Mock;

// Mock fetch
global.fetch = jest.fn();

// Mock localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

describe("useFavorites Hook", () => {
  beforeEach(() => {
    mockLocalStorage.clear();
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockClear();
  });

  describe("Unauthenticated User", () => {
    beforeEach(() => {
      mockUseSession.mockReturnValue({
        data: null,
        status: "unauthenticated",
      });
    });

    it("should initialize with empty favorites", async () => {
      const { result } = renderHook(() => useFavorites());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.favorites).toEqual([]);
      expect(result.current.count).toBe(0);
      expect(result.current.isAuthenticated).toBe(false);
    });

    it("should toggle favorite and save to localStorage", async () => {
      const { result } = renderHook(() => useFavorites());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      act(() => {
        result.current.toggleFavorite("lisbon");
      });

      expect(result.current.favorites).toContain("lisbon");
      expect(mockLocalStorage.setItem).toHaveBeenCalled();
    });

    it("should check if city is favorite", async () => {
      const { result } = renderHook(() => useFavorites());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      act(() => {
        result.current.toggleFavorite("lisbon");
      });

      expect(result.current.isFavorite("lisbon")).toBe(true);
      expect(result.current.isFavorite("barcelona")).toBe(false);
    });

    it("should remove favorite when toggled again", async () => {
      const { result } = renderHook(() => useFavorites());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Add
      act(() => {
        result.current.toggleFavorite("lisbon");
      });
      expect(result.current.favorites).toContain("lisbon");

      // Remove
      act(() => {
        result.current.toggleFavorite("lisbon");
      });
      expect(result.current.favorites).not.toContain("lisbon");
    });

    it("should load from localStorage on mount", async () => {
      mockLocalStorage.getItem.mockReturnValueOnce(
        JSON.stringify(["lisbon", "barcelona"])
      );

      const { result } = renderHook(() => useFavorites());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.favorites).toEqual(["lisbon", "barcelona"]);
    });
  });

  describe("Authenticated User", () => {
    beforeEach(() => {
      mockUseSession.mockReturnValue({
        data: {
          user: {
            id: "test-user-id",
            name: "Test User",
            email: "test@example.com",
          },
        },
        status: "authenticated",
      });
    });

    it("should fetch favorites from API when authenticated", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ favorites: ["lisbon", "barcelona"] }),
      });

      const { result } = renderHook(() => useFavorites());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(global.fetch).toHaveBeenCalledWith("/api/favorites");
      expect(result.current.favorites).toEqual(["lisbon", "barcelona"]);
      expect(result.current.isAuthenticated).toBe(true);
    });

    it("should call API when toggling favorite", async () => {
      // Initial fetch
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ favorites: [] }),
      });

      const { result } = renderHook(() => useFavorites());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Mock POST request
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      });

      act(() => {
        result.current.toggleFavorite("lisbon");
      });

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ citySlug: "lisbon" }),
        });
      });
    });

    it("should call DELETE API when removing favorite", async () => {
      // Initial fetch with existing favorite
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ favorites: ["lisbon"] }),
      });

      const { result } = renderHook(() => useFavorites());

      await waitFor(() => {
        expect(result.current.favorites).toContain("lisbon");
      });

      // Mock DELETE request
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      });

      act(() => {
        result.current.toggleFavorite("lisbon");
      });

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith("/api/favorites", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ citySlug: "lisbon" }),
        });
      });
    });

    it("should revert on API error", async () => {
      // Initial fetch
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ favorites: [] }),
      });

      const { result } = renderHook(() => useFavorites());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Mock failed POST request
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      act(() => {
        result.current.toggleFavorite("lisbon");
      });

      // Optimistic update
      expect(result.current.favorites).toContain("lisbon");

      // After API failure, should revert
      await waitFor(() => {
        expect(result.current.favorites).not.toContain("lisbon");
      });
    });
  });

  describe("Loading State", () => {
    it("should show loading while fetching session", () => {
      mockUseSession.mockReturnValue({
        data: null,
        status: "loading",
      });

      const { result } = renderHook(() => useFavorites());

      expect(result.current.isLoading).toBe(true);
    });
  });
});

