import { City } from "@/types/city";

export const africaCities: City[] = [
  {
    id: "cape-town",
    slug: "digital-nomad-guide-cape-town",
    name: "Cape Town",
    country: "South Africa",
    continent: "Africa",
    heroImage: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1920&q=80",
    images: {
      hero: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1920&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80",
        "https://images.unsplash.com/photo-1562932831-afcfe48b5786?w=800&q=80",
      ],
    },
    internetSpeed: 50,
    monthlyCost: 1600,
    safetyScore: 3,
    nomadScore: 82,
    visaAvailable: true,
    visa: {
      hasNomadVisa: false,
      visaName: "Tourist Visa / Business Visa",
      mainRequirement: "90 days visa-free for many nationalities; longer stays require business visa",
      maxStayDays: 90,
    },
    costBreakdown: {
      accommodation: 700,
      food: 350,
      transport: 150,
      coworking: 200,
      entertainment: 200,
    },
    coworkingSpaces: [
      {
        name: "Workshop17",
        neighborhood: "V&A Waterfront",
        priceRange: "$150-280/month",
        rating: 4.7,
        features: ["Premium location", "Ocean views", "Events", "Startup ecosystem"],
        url: "https://workshop17.co.za/",
      },
      {
        name: "Spin Street House",
        neighborhood: "City Bowl",
        priceRange: "$100-200/month",
        rating: 4.6,
        features: ["Historic building", "Good community", "Central location"],
      },
      {
        name: "The Woodstock Exchange",
        neighborhood: "Woodstock",
        priceRange: "$80-150/month",
        rating: 4.5,
        features: ["Creative hub", "Affordable", "Artsy neighborhood"],
      },
    ],
    neighborhoods: [
      {
        name: "Sea Point",
        vibe: "beachside",
        priceLevel: "premium",
        bestFor: ["Ocean lovers", "Runners", "Sunset watchers"],
        description: "Atlantic seaboard with promenade, pools, and ocean views.",
      },
      {
        name: "City Bowl / Gardens",
        vibe: "modern",
        priceLevel: "mid",
        bestFor: ["Central access", "Nightlife", "Mountain views"],
        description: "Central Cape Town beneath Table Mountain.",
      },
      {
        name: "Woodstock",
        vibe: "artistic",
        priceLevel: "budget",
        bestFor: ["Creatives", "Budget nomads", "Foodies"],
        description: "Gentrifying industrial area with street art and markets.",
      },
      {
        name: "Camps Bay",
        vibe: "beachside",
        priceLevel: "premium",
        bestFor: ["Beach lovers", "Luxury seekers", "Instagram"],
        description: "Stunning beach with mountain backdrop and upscale restaurants.",
      },
    ],
    bestMonths: ["November", "December", "January", "February", "March", "April"],
    climate: {
      summer: "Warm & Dry (Nov-Mar, 20-28°C)",
      winter: "Cool & Rainy (Jun-Aug, 8-16°C)",
    },
    communityLinks: {
      facebook: "https://www.facebook.com/search/groups/?q=cape%20town%20digital%20nomads",
      reddit: "https://www.reddit.com/r/capetown/",
      meetup: "https://www.meetup.com/find/?keywords=digital%20nomads&location=Cape%20Town",
    },
    shortDescription: "Stunning natural beauty with Table Mountain, wine country, and African adventure at your doorstep.",
    longDescription: `
      <h2>Why Cape Town for Digital Nomads?</h2>
      <p>Cape Town is one of the world's most beautiful cities - a place where mountain meets ocean in dramatic fashion. Table Mountain provides a stunning backdrop to daily life, while nearby wine country offers weekend escapes. The city has developed a strong startup and nomad community, with excellent coworking spaces and a creative energy that attracts entrepreneurs from around the world.</p>
      
      <h3>Best Neighborhood: City Bowl / Gardens</h3>
      <p>The City Bowl, nestled between Table Mountain and Signal Hill, is Cape Town's urban heart. Gardens and Tamboerskloof within this area offer a mix of historic homes, trendy restaurants, and easy access to both the city center and mountain hikes. You're walking distance to Long Street's nightlife, Kloof Street's cafes, and the cable car to Table Mountain.</p>
      
      <h3>The Vibe</h3>
      <p>Cape Town is outdoorsy, creative, and increasingly tech-focused. Sunrise hikes up Lion's Head, beach sundowners at Camps Bay, wine tasting in Stellenbosch - adventure is part of daily life. The city attracts a diverse community of locals, expats, and nomads. Social inequality is visible and complex, but the creative and entrepreneurial energy is undeniable.</p>
      
      <h3>Digital Nomad Visa</h3>
      <p>South Africa offers 90-day visa-free entry for many nationalities. For longer stays, a business visa or work permit is required, which can be complex. Many nomads do border hops to neighboring countries to reset their 90 days. The government has discussed a nomad visa but hasn't implemented one yet.</p>
      
      <h3>Pro Tip</h3>
      <p>Load shedding (scheduled power outages) is a reality - choose accommodation with backup power or work from coworking spaces with generators. Visit in summer (Nov-Mar) for the best weather. Rent a car if you want to explore beyond the city - Uber works but is limited. The winelands (Stellenbosch, Franschhoek) are must-visits. Be aware of safety - certain areas require caution, especially at night.</p>
    `,
    cityVibe: "Naturally stunning, outdoorsy, creative, wine culture, adventure lifestyle",
    proTip: "Be prepared for load shedding - choose places with backup power. Visit in summer (Nov-Mar). Rent a car to explore. Winelands are a must. Be safety-aware especially at night.",
    lastUpdated: "2026-01-15",
    dataSource: ["Nomad List", "Local research"],
    foodAndWorkspace: {
      bigMacPrice: 3.20,
      bigMacIndex: "Cheaper",
      cappuccinoPrice: 2.50,
      localMealPrice: 8.00,
      mustTryDish: "Braai (South African BBQ)",
      foodScene: "World-class wine, diverse cuisines, Cape Malay cooking",
      budgetMealSpots: ["Old Biscuit Mill Market", "Mzoli's", "Marco's African Place"],
      laptopFriendlyCafes: [
        {
          name: "Truth Coffee Roasting",
          neighborhood: "CBD",
          wifiSpeed: "Fast",
          powerOutlets: true,
          specialty: "Steampunk themed, award-winning, world-famous",
        },
        {
          name: "Origin Coffee Roasting",
          neighborhood: "De Waterkant",
          wifiSpeed: "Fast",
          powerOutlets: true,
          specialty: "Local pioneers, excellent beans, spacious",
        },
      ],
    },
    reviews: [
      {
        id: "capetown-fan-1",
        user: "Thabo M.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ThaboM",
        date: "4 days ago",
        rating: 5,
        text: "Table Mountain views from my desk, wine tasting on weekends, and braai sunsets! 🍷 Cape Town is the most beautiful city I've worked from. Lion's Head sunrise hikes are addictive.",
        type: "fan"
      },
      {
        id: "capetown-realist-1",
        user: "Sarah J.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SarahJ2",
        date: "2 weeks ago",
        rating: 4,
        text: "Load shedding is REAL - always have backup power plans. Safety requires awareness, especially at night. Winter (Jun-Aug) is rainy and cold. But the lifestyle is incredible if you adapt.",
        type: "realist"
      },
      {
        id: "capetown-worker-1",
        user: "David N.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DavidN",
        date: "1 week ago",
        rating: 5,
        text: "Truth Coffee is steampunk heaven with world-class WiFi! ☕ Workshop17 at the Waterfront has ocean views and backup generators. Origin Coffee for serious focus work.",
        type: "worker"
      }
    ],
  },
  {
    id: "marrakech",
    slug: "digital-nomad-guide-marrakech",
    name: "Marrakech",
    country: "Morocco",
    continent: "Africa",
    heroImage: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1920&q=80",
    images: {
      hero: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1920&q=80",
      gallery: [],
    },
    internetSpeed: 30,
    monthlyCost: 1200,
    safetyScore: 4,
    nomadScore: 75,
    visaAvailable: true,
    visa: {
      hasNomadVisa: false,
      visaName: "Tourist Visa",
      mainRequirement: "90 days visa-free for many nationalities",
      maxStayDays: 90,
    },
    costBreakdown: {
      accommodation: 500,
      food: 300,
      transport: 100,
      coworking: 150,
      entertainment: 150,
    },
    coworkingSpaces: [
      {
        name: "The Spot Coworking",
        neighborhood: "Guéliz",
        priceRange: "$80-150/month",
        rating: 4.5,
        features: ["Modern facilities", "Good internet", "AC"],
      },
      {
        name: "Coworking7",
        neighborhood: "Guéliz",
        priceRange: "$60-120/month",
        rating: 4.4,
        features: ["Affordable", "Nomad community", "Events"],
      },
    ],
    neighborhoods: [
      {
        name: "Medina",
        vibe: "historic",
        priceLevel: "budget",
        bestFor: ["Culture seekers", "Photographers", "Adventure"],
        description: "The ancient walled city with souks, riads, and sensory overload.",
      },
      {
        name: "Guéliz",
        vibe: "modern",
        priceLevel: "mid",
        bestFor: ["Modern amenities", "Coworking access", "Western comfort"],
        description: "French-built new town with cafes, restaurants, and easier navigation.",
      },
    ],
    bestMonths: ["March", "April", "May", "October", "November"],
    climate: {
      summer: "Very Hot (Jun-Aug, 35-45°C)",
      winter: "Mild (Dec-Feb, 10-20°C)",
    },
    communityLinks: {
      facebook: "https://www.facebook.com/search/groups/?q=marrakech%20digital%20nomads",
      reddit: "https://www.reddit.com/r/Morocco/",
      meetup: "https://www.meetup.com/find/?keywords=digital%20nomads&location=Marrakech",
    },
    shortDescription: "Exotic North African city with ancient medina, desert adventures, and affordable living.",
    longDescription: `
      <h2>Why Marrakech for Digital Nomads?</h2>
      <p>Marrakech offers an exotic experience unlike anywhere else in the nomad world. The ancient medina's labyrinthine streets, vibrant souks, and stunning riads create an atmosphere of constant discovery. For nomads seeking adventure, culture shock, and affordable living in a unique setting, Marrakech delivers an unforgettable base.</p>
      
      <h3>Best Neighborhood: Guéliz (with Medina visits)</h3>
      <p>For productive remote work, Guéliz (the French-built new town) offers modern amenities, reliable internet, and easier daily life. Coworking spaces, western-style cafes, and comfortable apartments are readily available. But don't skip the Medina - regular visits for food, shopping, and atmosphere are essential to the Marrakech experience.</p>
      
      <h3>The Vibe</h3>
      <p>Marrakech is sensory overload - calls to prayer, spice-scented air, artisan workshops, motorbikes weaving through crowds. It's challenging and rewarding in equal measure. The expat and nomad community is smaller but tight-knit. Weekend trips to the Atlas Mountains, Sahara Desert, or Atlantic coast expand the adventure.</p>
      
      <h3>Digital Nomad Visa</h3>
      <p>Morocco offers 90 days visa-free for many nationalities. Extensions are possible but can be bureaucratic. Many nomads do border hops to Spain (short ferry from Tangier) to reset their stay.</p>
      
      <h3>Pro Tip</h3>
      <p>Avoid summer - temperatures above 40°C make outdoor life unbearable. Learn to negotiate - prices in souks are rarely fixed. Riads in the Medina are beautiful but internet can be unreliable for work. Carry cash - cards aren't widely accepted in traditional areas. Learn French or Arabic basics - English is limited outside tourist zones.</p>
    `,
    cityVibe: "Exotic, sensory overload, ancient meets modern, adventurous, cultural immersion",
    proTip: "Avoid summer heat (40°C+). Learn to negotiate in souks. Stay in Guéliz for reliable internet. Carry cash. French or Arabic basics help.",
    lastUpdated: "2026-01-15",
    dataSource: ["Nomad List", "Local research"],
    foodAndWorkspace: {
      bigMacPrice: 4.50,
      bigMacIndex: "Cheaper",
      cappuccinoPrice: 2.00,
      localMealPrice: 5.00,
      mustTryDish: "Tagine (Slow-cooked Moroccan Stew)",
      foodScene: "Moroccan spices, street food, rooftop dining",
      budgetMealSpots: ["Jemaa el-Fnaa Food Stalls", "Cafe des Epices", "Nomad"],
      laptopFriendlyCafes: [
        {
          name: "Cafe des Epices",
          neighborhood: "Medina",
          wifiSpeed: "Moderate",
          powerOutlets: true,
          specialty: "Rooftop terrace, medina views, Moroccan coffee",
        },
        {
          name: "Bacha Coffee",
          neighborhood: "Gueliz",
          wifiSpeed: "Fast",
          powerOutlets: true,
          specialty: "Modern neighborhood, reliable WiFi, AC",
        },
      ],
    },
    reviews: [
      {
        id: "marrakech-fan-1",
        user: "Yasmine H.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=YasmineH",
        date: "1 week ago",
        rating: 5,
        text: "Tagine for dinner, rooftop terraces at sunset, souks full of treasures! 🕌 Marrakech is sensory overload in the best way. The riads are Instagram dreams come true.",
        type: "fan"
      },
      {
        id: "marrakech-realist-1",
        user: "Tom B.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=TomB",
        date: "3 weeks ago",
        rating: 4,
        text: "Summer is UNBEARABLE (45°C+). Medina internet is unreliable for work - stay in Guéliz. Learn to negotiate everything. Cultural adjustment takes time. But the experience is unmatched.",
        type: "realist"
      },
      {
        id: "marrakech-worker-1",
        user: "Karim L.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=KarimL",
        date: "2 weeks ago",
        rating: 5,
        text: "The Spot Coworking in Guéliz has AC and fast WiFi - essential! ☕ Cafe des Epices for atmospheric work sessions. Visit Medina for inspiration, Guéliz for productivity.",
        type: "worker"
      }
    ],
  },
];

