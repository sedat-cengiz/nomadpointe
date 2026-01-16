import { renderHook, act } from "@testing-library/react";
import { useCompare } from "@/hooks/useCompare";

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

describe("useCompare Hook", () => {
  beforeEach(() => {
    mockLocalStorage.clear();
    jest.clearAllMocks();
  });

  it("should initialize with empty selection", () => {
    const { result } = renderHook(() => useCompare());

    expect(result.current.selectedCities).toEqual([]);
    expect(result.current.count).toBe(0);
    expect(result.current.canAdd).toBe(true);
  });

  it("should add a city", () => {
    const { result } = renderHook(() => useCompare());

    act(() => {
      result.current.addCity("lisbon");
    });

    expect(result.current.selectedCities).toContain("lisbon");
    expect(result.current.count).toBe(1);
  });

  it("should not add duplicate cities", () => {
    const { result } = renderHook(() => useCompare());

    act(() => {
      result.current.addCity("lisbon");
      result.current.addCity("lisbon");
    });

    expect(result.current.selectedCities).toEqual(["lisbon"]);
    expect(result.current.count).toBe(1);
  });

  it("should remove a city", () => {
    const { result } = renderHook(() => useCompare());

    act(() => {
      result.current.addCity("lisbon");
      result.current.addCity("barcelona");
    });

    act(() => {
      result.current.removeCity("lisbon");
    });

    expect(result.current.selectedCities).toEqual(["barcelona"]);
    expect(result.current.count).toBe(1);
  });

  it("should toggle city selection", () => {
    const { result } = renderHook(() => useCompare());

    // Add via toggle
    act(() => {
      result.current.toggleCity("lisbon");
    });
    expect(result.current.selectedCities).toContain("lisbon");

    // Remove via toggle
    act(() => {
      result.current.toggleCity("lisbon");
    });
    expect(result.current.selectedCities).not.toContain("lisbon");
  });

  it("should respect max cities limit (3)", () => {
    const { result } = renderHook(() => useCompare());

    act(() => {
      result.current.addCity("lisbon");
      result.current.addCity("barcelona");
      result.current.addCity("berlin");
    });

    expect(result.current.count).toBe(3);
    expect(result.current.canAdd).toBe(false);

    // Try to add a 4th city directly - should not add
    act(() => {
      result.current.addCity("prague");
    });

    expect(result.current.count).toBe(3);
    expect(result.current.selectedCities).not.toContain("prague");
  });

  it("should replace first city when toggling beyond max", () => {
    const { result } = renderHook(() => useCompare());

    act(() => {
      result.current.addCity("lisbon");
      result.current.addCity("barcelona");
      result.current.addCity("berlin");
    });

    // Toggle should remove first and add new
    act(() => {
      result.current.toggleCity("prague");
    });

    expect(result.current.count).toBe(3);
    expect(result.current.selectedCities).not.toContain("lisbon");
    expect(result.current.selectedCities).toContain("prague");
  });

  it("should clear all cities", () => {
    const { result } = renderHook(() => useCompare());

    act(() => {
      result.current.addCity("lisbon");
      result.current.addCity("barcelona");
    });

    act(() => {
      result.current.clearAll();
    });

    expect(result.current.selectedCities).toEqual([]);
    expect(result.current.count).toBe(0);
  });

  it("should check if city is selected", () => {
    const { result } = renderHook(() => useCompare());

    act(() => {
      result.current.addCity("lisbon");
    });

    expect(result.current.isSelected("lisbon")).toBe(true);
    expect(result.current.isSelected("barcelona")).toBe(false);
  });

  it("should expose maxCities constant", () => {
    const { result } = renderHook(() => useCompare());
    expect(result.current.maxCities).toBe(3);
  });
});

