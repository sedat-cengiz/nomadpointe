/**
 * Unsplash API Integration for City Images
 * 
 * Note: For production use, you'll need to:
 * 1. Register at https://unsplash.com/developers
 * 2. Create an application to get an Access Key
 * 3. Set NEXT_PUBLIC_UNSPLASH_ACCESS_KEY in your environment
 */

const UNSPLASH_BASE_URL = "https://api.unsplash.com";

// Fallback to Source Unsplash for simple usage (no API key needed but limited)
const UNSPLASH_SOURCE_URL = "https://source.unsplash.com";

export interface UnsplashPhoto {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string | null;
  description: string | null;
  user: {
    name: string;
    username: string;
    links: {
      html: string;
    };
  };
  links: {
    html: string;
  };
}

export interface UnsplashSearchResult {
  total: number;
  total_pages: number;
  results: UnsplashPhoto[];
}

/**
 * Get the Unsplash Access Key from environment
 */
function getAccessKey(): string | undefined {
  return process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
}

/**
 * Search for photos on Unsplash using their API
 * Requires NEXT_PUBLIC_UNSPLASH_ACCESS_KEY to be set
 */
export async function searchUnsplashPhotos(
  query: string,
  options: {
    perPage?: number;
    page?: number;
    orientation?: "landscape" | "portrait" | "squarish";
  } = {}
): Promise<UnsplashSearchResult | null> {
  const accessKey = getAccessKey();
  
  if (!accessKey) {
    console.warn("Unsplash API key not configured. Using fallback URLs.");
    return null;
  }

  const { perPage = 10, page = 1, orientation = "landscape" } = options;

  try {
    const params = new URLSearchParams({
      query,
      per_page: perPage.toString(),
      page: page.toString(),
      orientation,
    });

    const response = await fetch(
      `${UNSPLASH_BASE_URL}/search/photos?${params}`,
      {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching from Unsplash:", error);
    return null;
  }
}

/**
 * Get photos for a specific city
 */
export async function getCityPhotos(
  cityName: string,
  countryName: string,
  count: number = 5
): Promise<UnsplashPhoto[]> {
  const result = await searchUnsplashPhotos(`${cityName} ${countryName} cityscape`, {
    perPage: count,
    orientation: "landscape",
  });

  return result?.results || [];
}

/**
 * Generate a fallback Unsplash URL for a city
 * Uses Unsplash Source API which doesn't require authentication
 * Note: This is deprecated by Unsplash but still works for simple use cases
 */
export function getCityImageUrl(
  cityName: string,
  options: {
    width?: number;
    height?: number;
    keywords?: string[];
  } = {}
): string {
  const { width = 1920, height = 1080, keywords = ["cityscape", "city"] } = options;
  const searchTerms = [cityName, ...keywords].join(",");
  
  return `${UNSPLASH_SOURCE_URL}/${width}x${height}/?${encodeURIComponent(searchTerms)}`;
}

/**
 * Generate multiple fallback image URLs for a city gallery
 */
export function getCityGalleryUrls(cityName: string, count: number = 5): string[] {
  const themes = ["cityscape", "street", "architecture", "landmark", "skyline"];
  
  return themes.slice(0, count).map((theme) => 
    getCityImageUrl(cityName, { 
      width: 800, 
      height: 600, 
      keywords: [theme] 
    })
  );
}

/**
 * Pre-defined high-quality Unsplash image IDs for popular cities
 * Using direct image URLs for reliability
 */
export const cityImageUrls: Record<string, { hero: string; gallery: string[] }> = {
  bali: {
    hero: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80",
      "https://images.unsplash.com/photo-1573790387438-4da905039392?w=800&q=80",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80",
    ],
  },
  lisbon: {
    hero: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=1920&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      "https://images.unsplash.com/photo-1548707309-dcebeab9ea9b?w=800&q=80",
    ],
  },
  bangkok: {
    hero: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=1920&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=800&q=80",
      "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=800&q=80",
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80",
    ],
  },
  medellin: {
    hero: "https://images.unsplash.com/photo-1599413987323-b2b8c0d7d9c8?w=1920&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1577587230708-187fdbef4d91?w=800&q=80",
      "https://images.unsplash.com/photo-1568736333610-eae6e0ab9d7f?w=800&q=80",
    ],
  },
  istanbul: {
    hero: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1920&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=800&q=80",
      "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&q=80",
    ],
  },
  berlin: {
    hero: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=1920&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?w=800&q=80",
    ],
  },
  tokyo: {
    hero: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1920&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&q=80",
    ],
  },
  "mexico-city": {
    hero: "https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?w=1920&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1518659526054-190340b32735?w=800&q=80",
    ],
  },
  "cape-town": {
    hero: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1920&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80",
      "https://images.unsplash.com/photo-1562932831-afcfe48b5786?w=800&q=80",
    ],
  },
  dubai: {
    hero: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80",
    gallery: [],
  },
  singapore: {
    hero: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1920&q=80",
    gallery: [],
  },
  barcelona: {
    hero: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=1920&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80",
    ],
  },
};

/**
 * Get images for a city, using pre-defined URLs or generating fallbacks
 */
export function getImagesForCity(
  cityId: string,
  cityName: string
): { hero: string; gallery: string[] } {
  // Check for pre-defined images
  if (cityImageUrls[cityId]) {
    return cityImageUrls[cityId];
  }

  // Generate fallback URLs
  return {
    hero: getCityImageUrl(cityName, { width: 1920, height: 1080 }),
    gallery: getCityGalleryUrls(cityName, 3),
  };
}

