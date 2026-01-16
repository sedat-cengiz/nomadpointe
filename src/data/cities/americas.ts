import { City } from "@/types/city";

export const americasCities: City[] = [
  // Tier 1 Cities
  {
    id: "medellin",
    slug: "digital-nomad-guide-medellin",
    name: "Medellín",
    country: "Colombia",
    continent: "South America",
    heroImage: "https://images.unsplash.com/photo-1577587230708-187fdbef4d91?w=1920&q=80",
    images: {
      hero: "https://images.unsplash.com/photo-1577587230708-187fdbef4d91?w=1920&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1577587230708-187fdbef4d91?w=800&q=80",
        "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80",
      ],
    },
    internetSpeed: 130,
    monthlyCost: 1500,
    safetyScore: 3,
    nomadScore: 87,
    visaAvailable: true,
    visa: {
      hasNomadVisa: true,
      visaName: "Visa V Digital Nomads",
      mainRequirement: "Proof of remote work and monthly income of at least 3x Colombian minimum wage (~$700)",
      maxStayDays: 730,
      applicationUrl: "https://www.cancilleria.gov.co/",
    },
    costBreakdown: {
      accommodation: 700,
      food: 350,
      transport: 100,
      coworking: 180,
      entertainment: 170,
    },
    coworkingSpaces: [
      {
        name: "Selina",
        neighborhood: "El Poblado",
        priceRange: "$150-250/month",
        rating: 4.6,
        features: ["Coliving + coworking", "Events", "Pool", "Restaurant"],
        url: "https://www.selina.com/",
      },
      {
        name: "NOI Coworking",
        neighborhood: "El Poblado",
        priceRange: "$120-200/month",
        rating: 4.7,
        features: ["Modern facilities", "24/7 access", "Great community"],
      },
      {
        name: "Tinkko",
        neighborhood: "Laureles",
        priceRange: "$100-180/month",
        rating: 4.5,
        features: ["Local startup scene", "Affordable", "Events"],
      },
    ],
    neighborhoods: [
      {
        name: "El Poblado",
        vibe: "modern",
        priceLevel: "premium",
        bestFor: ["First-time visitors", "Safety-conscious", "Nightlife"],
        description: "Upscale neighborhood with restaurants, bars, and expat community.",
      },
      {
        name: "Laureles",
        vibe: "quiet",
        priceLevel: "mid",
        bestFor: ["Long-term stayers", "Spanish learners", "Local experience"],
        description: "Authentic Colombian neighborhood with excellent value.",
      },
      {
        name: "Envigado",
        vibe: "family-friendly",
        priceLevel: "mid",
        bestFor: ["Families", "Quiet workers", "Local life"],
        description: "Separate municipality with small-town feel and good amenities.",
      },
      {
        name: "La Floresta",
        vibe: "artistic",
        priceLevel: "budget",
        bestFor: ["Budget nomads", "Artists", "Adventure seekers"],
        description: "Up-and-coming neighborhood with street art and local character.",
      },
    ],
    bestMonths: ["December", "January", "February", "July", "August"],
    climate: {
      summer: "Eternal Spring (Year-round 18-28°C)",
      winter: "Eternal Spring (Year-round 18-28°C)",
    },
    communityLinks: {
      facebook: "https://www.facebook.com/search/groups/?q=medellin%20digital%20nomads",
      reddit: "https://www.reddit.com/r/medellin/",
      meetup: "https://www.meetup.com/find/?keywords=digital%20nomads&location=Medellin",
    },
    shortDescription: "City of Eternal Spring with perfect weather year-round, growing tech scene, and affordable lifestyle.",
    longDescription: `
      <h2>Why Medellín for Digital Nomads?</h2>
      <p>Medellín's transformation from its troubled past to thriving innovation hub is one of the world's great urban renewal stories. Today, the "City of Eternal Spring" offers year-round perfect weather (18-28°C), a booming tech scene, excellent infrastructure, and costs that let you live well on a modest budget. The city has become a Latin American nomad capital, with a large international community and well-developed digital nomad ecosystem.</p>
      
      <h3>Best Neighborhood: Laureles</h3>
      <p>While El Poblado is where most newcomers land, Laureles offers a more authentic and affordable experience. This residential neighborhood has tree-lined streets, local restaurants, excellent coffee shops, and a genuine Colombian atmosphere. You'll find more Spanish spoken here, which helps language learning. Coworking options like Tinkko cater to the growing nomad community.</p>
      
      <h3>The Vibe</h3>
      <p>Medellín pulses with Latin energy. Paisas (locals) are famously friendly and proud of their city. Salsa and reggaeton provide the soundtrack, fresh fruit juices are everywhere, and the mountains create stunning backdrops. The transformation of the city is visible - innovative public spaces, efficient metro system, and a culture of entrepreneurship. The nightlife in El Poblado is legendary, while Laureles offers a more laid-back scene.</p>
      
      <h3>Digital Nomad Visa</h3>
      <p>Colombia's Visa V Digital Nomads is valid for up to 2 years. Requirements include proof of remote work for foreign companies, monthly income of at least 3x Colombian minimum wage (~$700 USD), and health insurance. The application can be done at Colombian consulates or in some cases within Colombia. The low income requirement makes this visa highly accessible.</p>
      
      <h3>Pro Tip</h3>
      <p>Start in El Poblado for a week to get oriented, then move to Laureles or Envigado for better value. Learn basic Spanish - it transforms your experience and shows respect. Take the metro and cable cars (metrocables) to see the city's innovative urban planning. Be street-smart, especially at night - petty crime exists. The weather is perfect year-round, but avoid the rainy seasons (April-May, September-November) if you want more sunshine.</p>
    `,
    cityVibe: "Eternal spring, Latin energy, innovative, entrepreneurial, transformed",
    proTip: "Start in El Poblado, then move to Laureles for value. Learn basic Spanish. Use metro and metrocables. Be street-smart especially at night.",
    lastUpdated: "2026-01-15",
    dataSource: ["Nomad List", "Speedtest Global Index", "Local research"],
    foodAndWorkspace: {
      bigMacPrice: 3.80,
      bigMacIndex: "Cheaper",
      cappuccinoPrice: 2.00,
      localMealPrice: 4.00,
      mustTryDish: "Bandeja Paisa (Colombian Platter)",
      foodScene: "Colombian comfort food, excellent coffee, innovative restaurants",
      budgetMealSpots: ["Mercado del Rio", "El Rancherito", "Hatoviejo"],
      laptopFriendlyCafes: [
        {
          name: "Pergamino Cafe",
          neighborhood: "El Poblado",
          wifiSpeed: "Fast",
          powerOutlets: true,
          specialty: "Best specialty coffee in Medellin, work-friendly",
        },
        {
          name: "Al Alma Cafe",
          neighborhood: "Laureles",
          wifiSpeed: "Fast",
          powerOutlets: true,
          specialty: "Local favorite, quiet, excellent coffee",
        },
        {
          name: "Cafe Velvet",
          neighborhood: "El Poblado",
          wifiSpeed: "Fast",
          powerOutlets: true,
          specialty: "Third-wave coffee, multiple locations",
        },
      ],
    },
    reviews: [
      {
        id: "medellin-fan-1",
        user: "Juan P.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=JuanP",
        date: "1 week ago",
        rating: 5,
        text: "Eternal spring weather is NO joke - 75°F every single day! 🌸 Paisas are the warmest people, and Bandeja Paisa at 4am after salsa dancing hits different.",
        type: "fan"
      },
      {
        id: "medellin-realist-1",
        user: "Rachel F.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=RachelF",
        date: "2 weeks ago",
        rating: 4,
        text: "Love it but be street-smart - petty theft happens. El Poblado is expat bubbled, try Laureles for real Colombia. Spanish is essential for authentic experience.",
        type: "realist"
      },
      {
        id: "medellin-worker-1",
        user: "Carlos G.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CarlosG",
        date: "3 weeks ago",
        rating: 5,
        text: "Pergamino Cafe has the best Colombian coffee I've ever tasted! ☕ Selina for the community vibes, NOI for serious focus work. Internet surprisingly fast.",
        type: "worker"
      }
    ],
  },
  {
    id: "mexico-city",
    slug: "digital-nomad-guide-mexico-city",
    name: "Mexico City",
    country: "Mexico",
    continent: "North America",
    heroImage: "https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?w=1920&q=80",
    images: {
      hero: "https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?w=1920&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1518659526054-190340b32735?w=800&q=80",
      ],
    },
    internetSpeed: 70,
    monthlyCost: 1800,
    safetyScore: 3,
    nomadScore: 86,
    visaAvailable: true,
    visa: {
      hasNomadVisa: false,
      visaName: "Tourist Visa / Temporary Resident",
      mainRequirement: "180 days visa-free for many nationalities, extendable to Temporary Resident",
      maxStayDays: 180,
    },
    costBreakdown: {
      accommodation: 900,
      food: 400,
      transport: 100,
      coworking: 200,
      entertainment: 200,
    },
    coworkingSpaces: [
      {
        name: "WeWork",
        neighborhood: "Multiple locations",
        priceRange: "$200-400/month",
        rating: 4.5,
        features: ["Premium facilities", "Many locations", "Global network"],
      },
      {
        name: "Homework",
        neighborhood: "Roma Norte",
        priceRange: "$150-250/month",
        rating: 4.7,
        features: ["Local favorite", "Great design", "Community events"],
      },
      {
        name: "Público Cowork",
        neighborhood: "Roma/Condesa",
        priceRange: "$100-180/month",
        rating: 4.6,
        features: ["Affordable", "Good community", "Central locations"],
      },
    ],
    neighborhoods: [
      {
        name: "Roma Norte",
        vibe: "artistic",
        priceLevel: "mid",
        bestFor: ["Foodies", "Creatives", "Nightlife lovers"],
        description: "Hipster heaven with Art Deco buildings, cafes, and restaurants.",
      },
      {
        name: "Condesa",
        vibe: "quiet",
        priceLevel: "premium",
        bestFor: ["Park lovers", "Dog owners", "Quiet workers"],
        description: "Leafy neighborhood with parks, cafes, and European feel.",
      },
      {
        name: "Coyoacán",
        vibe: "artistic",
        priceLevel: "mid",
        bestFor: ["Culture seekers", "Artists", "History buffs"],
        description: "Colonial neighborhood with Frida Kahlo's house and bohemian vibe.",
      },
      {
        name: "Polanco",
        vibe: "modern",
        priceLevel: "premium",
        bestFor: ["Luxury seekers", "Business travelers", "Museum lovers"],
        description: "Upscale district with high-end shopping and dining.",
      },
    ],
    bestMonths: ["March", "April", "May", "November"],
    climate: {
      summer: "Warm with afternoon rain (Jun-Sep, 20-26°C)",
      winter: "Dry and mild (Nov-Feb, 12-22°C)",
    },
    communityLinks: {
      facebook: "https://www.facebook.com/search/groups/?q=mexico%20city%20digital%20nomads",
      reddit: "https://www.reddit.com/r/MexicoCity/",
      meetup: "https://www.meetup.com/find/?keywords=digital%20nomads&location=Mexico%20City",
    },
    shortDescription: "Massive megacity with world-class food, rich culture, and increasingly popular among digital nomads.",
    longDescription: `
      <h2>Why Mexico City for Digital Nomads?</h2>
      <p>Mexico City (CDMX) has exploded in popularity among digital nomads, and for good reason. This sprawling metropolis of 21 million offers world-class museums, some of the world's best food, vibrant neighborhoods, and a cost of living that's remarkably affordable given the quality available. The city's favorable timezone (Central Time) makes it ideal for remote workers serving US clients.</p>
      
      <h3>Best Neighborhood: Roma Norte</h3>
      <p>This hipster paradise has become the default nomad neighborhood. Art Deco buildings line leafy streets filled with cafes, restaurants, and boutique shops. The food scene is extraordinary - from street tacos to haute Mexican cuisine. Coworking spaces abound, and you're never far from excellent coffee. Neighboring Condesa offers a slightly quieter alternative with beautiful parks.</p>
      
      <h3>The Vibe</h3>
      <p>CDMX is intense, cultured, and endlessly fascinating. The city's scale can be overwhelming, but individual colonias (neighborhoods) feel like villages. Mexican culture celebrates life - street food, music, art, and conversation are woven into daily existence. The expat and nomad community is massive and welcoming, with countless events and meetups. Traffic is brutal, but the metro is efficient and cheap.</p>
      
      <h3>Digital Nomad Visa</h3>
      <p>Mexico doesn't have a specific nomad visa, but offers 180-day visa-free stays for many nationalities. For longer stays, the Temporary Resident visa requires proof of income (~$2,500/month) or significant savings. Many nomads do border runs to reset their tourist visa, though this is becoming less reliable.</p>
      
      <h3>Pro Tip</h3>
      <p>Live in Roma or Condesa for the best nomad experience. Use the metro - it's incredibly cheap and efficient. Learn Spanish - English is less common than you might expect. Don't drink tap water, but street food is generally safe if it looks busy. The altitude (2,240m) can cause mild symptoms initially - stay hydrated. Uber works well here and is safer than random taxis.</p>
    `,
    cityVibe: "Massive, cultural, foodie paradise, artistic, vibrant",
    proTip: "Live in Roma or Condesa. Use metro - cheap and efficient. Learn Spanish. Don't drink tap water. Altitude may affect you initially - stay hydrated.",
    lastUpdated: "2026-01-15",
    dataSource: ["Nomad List", "Speedtest Global Index", "Local research"],
    foodAndWorkspace: {
      bigMacPrice: 4.20,
      bigMacIndex: "Cheaper",
      cappuccinoPrice: 3.00,
      localMealPrice: 5.00,
      mustTryDish: "Tacos al Pastor (Spit-roasted Pork Tacos)",
      foodScene: "World-class street food, mezcal bars, innovative Mexican cuisine",
      budgetMealSpots: ["Mercado Roma", "El Huequito", "Taqueria Orinoco"],
      laptopFriendlyCafes: [
        {
          name: "Cafe Nin",
          neighborhood: "Roma Norte",
          wifiSpeed: "Fast",
          powerOutlets: true,
          specialty: "Beautiful courtyard, Mediterranean food, work-friendly",
        },
        {
          name: "Chiquitito Cafe",
          neighborhood: "Condesa",
          wifiSpeed: "Fast",
          powerOutlets: true,
          specialty: "Specialty coffee, cozy atmosphere",
        },
        {
          name: "Blend Station",
          neighborhood: "Roma Norte",
          wifiSpeed: "Fast",
          powerOutlets: true,
          specialty: "Third-wave coffee, digital nomad favorite",
        },
      ],
    },
    reviews: [
      {
        id: "cdmx-fan-1",
        user: "Miguel R.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MiguelR",
        date: "5 days ago",
        rating: 5,
        text: "Tacos al pastor at midnight, Frida Kahlo's house, mezcal bars - CDMX is magical! 🌮 Roma Norte has the most incredible food scene. Every meal is an adventure.",
        type: "fan"
      },
      {
        id: "cdmx-realist-1",
        user: "Amanda S.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AmandaS",
        date: "2 weeks ago",
        rating: 4,
        text: "The city is MASSIVE - traffic is brutal. Altitude affects some people initially. Don't drink tap water. Learn Spanish - English isn't as common as expected. Still worth it.",
        type: "realist"
      },
      {
        id: "cdmx-worker-1",
        user: "Diego T.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DiegoT",
        date: "1 week ago",
        rating: 5,
        text: "Cafe Nin's courtyard is Instagram perfection AND has great WiFi! ☕ Homework coworking has the best community. Blend Station for serious coffee lovers.",
        type: "worker"
      }
    ],
  },
  {
    id: "buenos-aires",
    slug: "digital-nomad-guide-buenos-aires",
    name: "Buenos Aires",
    country: "Argentina",
    continent: "South America",
    heroImage: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=1920&q=80",
    images: {
      hero: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=1920&q=80",
      gallery: [],
    },
    internetSpeed: 60,
    monthlyCost: 1200,
    safetyScore: 3,
    nomadScore: 84,
    visaAvailable: true,
    visa: {
      hasNomadVisa: false,
      visaName: "Tourist Visa / Rentista",
      mainRequirement: "90-day visa-free entry, extendable; Rentista visa for longer stays with proof of income",
      maxStayDays: 90,
    },
    costBreakdown: {
      accommodation: 500,
      food: 300,
      transport: 80,
      coworking: 150,
      entertainment: 170,
    },
    coworkingSpaces: [
      {
        name: "AreaTres",
        neighborhood: "Palermo",
        priceRange: "$80-150/month",
        rating: 4.7,
        features: ["Great community", "Events", "Multiple locations"],
      },
      {
        name: "Urban Station",
        neighborhood: "Multiple locations",
        priceRange: "$100-180/month",
        rating: 4.5,
        features: ["Chain with consistency", "24/7 some locations"],
      },
      {
        name: "La Maquinita",
        neighborhood: "Palermo",
        priceRange: "$60-120/month",
        rating: 4.6,
        features: ["Affordable", "Creative vibe", "Good for freelancers"],
      },
    ],
    neighborhoods: [
      {
        name: "Palermo",
        vibe: "artistic",
        priceLevel: "mid",
        bestFor: ["Nomads", "Foodies", "Nightlife lovers"],
        description: "The nomad hub divided into Soho and Hollywood areas with distinct vibes.",
      },
      {
        name: "Recoleta",
        vibe: "historic",
        priceLevel: "premium",
        bestFor: ["Culture seekers", "History buffs", "Quiet workers"],
        description: "Elegant neighborhood with French architecture and famous cemetery.",
      },
      {
        name: "San Telmo",
        vibe: "artistic",
        priceLevel: "mid",
        bestFor: ["Tango lovers", "Antique hunters", "Bohemians"],
        description: "Historic district with cobblestone streets and Sunday market.",
      },
    ],
    bestMonths: ["March", "April", "May", "September", "October", "November"],
    climate: {
      summer: "Hot & Humid (Dec-Feb, 28-35°C)",
      winter: "Mild (Jun-Aug, 8-16°C)",
    },
    communityLinks: {
      facebook: "https://www.facebook.com/search/groups/?q=buenos%20aires%20digital%20nomads",
      reddit: "https://www.reddit.com/r/BuenosAires/",
      meetup: "https://www.meetup.com/find/?keywords=digital%20nomads&location=Buenos%20Aires",
    },
    shortDescription: "Paris of South America offering European elegance, incredible steaks, and tango culture at bargain prices.",
    longDescription: `
      <h2>Why Buenos Aires for Digital Nomads?</h2>
      <p>Buenos Aires offers a European lifestyle at South American prices. This elegant city has world-class architecture, legendary food (especially beef and wine), passionate tango culture, and a sophisticated arts scene. Currency fluctuations have made it incredibly affordable for foreign earners, while the quality of life remains high. The city has a strong cafe culture perfect for remote work.</p>
      
      <h3>Best Neighborhood: Palermo</h3>
      <p>This massive neighborhood is actually several distinct areas. Palermo Soho has boutiques, cafes, and a hipster vibe. Palermo Hollywood has more nightlife and restaurants. The area is the clear center of expat and nomad life, with countless coworking options, excellent WiFi in cafes, and a walkable layout. You could spend months exploring Palermo's streets.</p>
      
      <h3>The Vibe</h3>
      <p>Buenos Aires feels like stepping into another era. Grand European buildings line wide avenues, neighborhood cafes fill with locals debating over coffee, and evenings come alive with dinner at 10 PM followed by drinks and dancing. The city has an intellectual, artistic energy - Argentines are famously passionate about literature, psychoanalysis, and football. Life moves at its own pace here.</p>
      
      <h3>Digital Nomad Visa</h3>
      <p>Argentina offers 90-day visa-free entry for many nationalities, extendable once. For longer stays, the Rentista visa requires proof of income from abroad. Many nomads simply take a ferry to Uruguay to reset their 90 days. The blue dollar rate (parallel exchange rate) makes earning in foreign currency extremely advantageous.</p>
      
      <h3>Pro Tip</h3>
      <p>Exchange money on the blue dollar market (legal parallel rate) for significantly better rates - Western Union is a common method. Start in Palermo Soho but explore San Telmo and Recoleta. Take a tango lesson - it's part of the BA experience. Dinner starts late (9-10 PM) and nightlife even later. The Subte (metro) is cheap but can be crowded. Learn some Spanish - it transforms your experience of this literary city.</p>
    `,
    cityVibe: "European elegance, tango culture, intellectual, foodie paradise, late nights",
    proTip: "Use blue dollar rate via Western Union. Dinner starts at 10 PM. Take a tango lesson. Subte is cheap but crowded. Learn Spanish for the full experience.",
    lastUpdated: "2026-01-15",
    dataSource: ["Nomad List", "Local research"],
    foodAndWorkspace: {
      bigMacPrice: 5.10,
      bigMacIndex: "Similar",
      cappuccinoPrice: 2.50,
      localMealPrice: 8.00,
      mustTryDish: "Asado (Argentine BBQ)",
      foodScene: "World-famous beef, Italian influence, wine culture",
      budgetMealSpots: ["Don Julio", "El Sanjuanino", "Mercado de San Telmo"],
      laptopFriendlyCafes: [
        {
          name: "LAB Tostadores de Cafe",
          neighborhood: "Palermo",
          wifiSpeed: "Fast",
          powerOutlets: true,
          specialty: "Best specialty coffee, serious work atmosphere",
        },
        {
          name: "Cuervo Cafe",
          neighborhood: "Palermo",
          wifiSpeed: "Fast",
          powerOutlets: true,
          specialty: "Hip atmosphere, good food, work-friendly",
        },
      ],
    },
    reviews: [
      {
        id: "buenosaires-fan-1",
        user: "Martin L.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MartinL",
        date: "3 days ago",
        rating: 5,
        text: "Asado with Malbec at midnight, tango lessons, San Telmo Sundays - BA is pure romance! 🥩 European elegance at South American prices. My heart lives here now.",
        type: "fan"
      },
      {
        id: "buenosaires-realist-1",
        user: "Sophie C.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SophieC",
        date: "2 weeks ago",
        rating: 4,
        text: "Blue dollar exchange rate is ESSENTIAL - use Western Union. Inflation is crazy. Dinner starts at 10pm - adjust your schedule. Some areas sketchy at night.",
        type: "realist"
      },
      {
        id: "buenosaires-worker-1",
        user: "Lucas F.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=LucasF",
        date: "1 week ago",
        rating: 5,
        text: "LAB Tostadores has the best specialty coffee in South America! ☕ AreaTres coworking events are legendary. Cuervo Cafe in Palermo for creative energy.",
        type: "worker"
      }
    ],
  },
  {
    id: "playa-del-carmen",
    slug: "digital-nomad-guide-playa-del-carmen",
    name: "Playa del Carmen",
    country: "Mexico",
    continent: "North America",
    heroImage: "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?w=1920&q=80",
    images: {
      hero: "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?w=1920&q=80",
      gallery: [],
    },
    internetSpeed: 50,
    monthlyCost: 1600,
    safetyScore: 3,
    nomadScore: 80,
    visaAvailable: true,
    visa: {
      hasNomadVisa: false,
      visaName: "Tourist Visa",
      mainRequirement: "180 days visa-free for many nationalities",
      maxStayDays: 180,
    },
    costBreakdown: {
      accommodation: 800,
      food: 350,
      transport: 100,
      coworking: 180,
      entertainment: 170,
    },
    coworkingSpaces: [
      {
        name: "Bunker Coworking",
        neighborhood: "Centro",
        priceRange: "$150-250/month",
        rating: 4.6,
        features: ["AC", "Fast internet", "Community events"],
      },
      {
        name: "Nest Coworking",
        neighborhood: "Centro",
        priceRange: "$120-200/month",
        rating: 4.5,
        features: ["Pool", "Rooftop", "Nomad community"],
      },
    ],
    neighborhoods: [
      {
        name: "Centro",
        vibe: "party",
        priceLevel: "mid",
        bestFor: ["First-time visitors", "Nightlife", "Beach access"],
        description: "The main area with 5th Avenue, beaches, and tourist infrastructure.",
      },
      {
        name: "Playacar",
        vibe: "quiet",
        priceLevel: "premium",
        bestFor: ["Families", "Quiet workers", "Golf lovers"],
        description: "Gated community south of centro with resorts and golf.",
      },
    ],
    bestMonths: ["November", "December", "January", "February", "March", "April"],
    climate: {
      summer: "Hot & Humid (May-Oct, 28-34°C)",
      winter: "Warm & Dry (Nov-Apr, 24-30°C)",
    },
    communityLinks: {
      facebook: "https://www.facebook.com/search/groups/?q=playa%20del%20carmen%20digital%20nomads",
      reddit: "https://www.reddit.com/r/PlayadelCarmen/",
      meetup: "https://www.meetup.com/find/?keywords=digital%20nomads&location=Playa%20del%20Carmen",
    },
    shortDescription: "Caribbean beach town on Mexico's Riviera Maya with growing nomad scene and cenote swimming.",
    longDescription: `
      <h2>Why Playa del Carmen for Digital Nomads?</h2>
      <p>Playa del Carmen offers the Caribbean beach lifestyle without leaving the Americas timezone. This former fishing village has grown into a popular nomad destination, balancing beach relaxation with productive work. The cenotes (natural swimming holes), ancient Mayan ruins, and proximity to Tulum create endless weekend adventure opportunities.</p>
      
      <h3>Best Neighborhood: Centro</h3>
      <p>The central area around 5th Avenue is where most nomads base themselves. While touristy, it offers the best combination of beach access, coworking options, restaurants, and social life. Walking distance to the beach and reliable infrastructure make it practical for remote work.</p>
      
      <h3>The Vibe</h3>
      <p>Playa is laid-back Caribbean meets international tourism. The beach is the center of life, with morning swims, afternoon work sessions, and sunset drinks. The town attracts a mix of tourists, expats, and digital nomads, creating a diverse but transient community. It's more relaxed than Cancun but more developed than Tulum.</p>
      
      <h3>Digital Nomad Visa</h3>
      <p>Mexico offers 180-day visa-free stays for many nationalities. Immigration officers at Cancun airport can grant anywhere from 7 to 180 days at their discretion - dress well and have a return flight or onward travel booked. For longer stays, Temporary Resident visa requires proof of income.</p>
      
      <h3>Pro Tip</h3>
      <p>Rent a bike or scooter - the town is flat and bikeable. Visit cenotes for swimming - Cenote Azul is nearby and beautiful. Hurricane season (June-November) brings rain and occasional storms. Internet in coworking is reliable, but cafe WiFi can be spotty. Tulum is 45 minutes south for day trips. Learn some Spanish - it helps significantly outside tourist areas.</p>
    `,
    cityVibe: "Beach life, Caribbean relaxed, cenotes, international mix, growing nomad scene",
    proTip: "Rent a bike - town is flat. Visit cenotes for swimming. Hurricane season June-November. Coworking has reliable internet, cafes less so.",
    lastUpdated: "2026-01-15",
    dataSource: ["Nomad List", "Local research"],
    foodAndWorkspace: {
      bigMacPrice: 4.20,
      bigMacIndex: "Cheaper",
      cappuccinoPrice: 3.50,
      localMealPrice: 6.00,
      mustTryDish: "Cochinita Pibil (Yucatan Slow-roasted Pork)",
      foodScene: "Yucatecan cuisine, fresh seafood, beachfront dining",
      budgetMealSpots: ["Tacos Raul", "El Fogon", "Antojitos La Chiapaneca"],
      laptopFriendlyCafes: [
        {
          name: "Ah Cacao",
          neighborhood: "5th Avenue",
          wifiSpeed: "Fast",
          powerOutlets: true,
          specialty: "Mayan chocolate cafe, AC, work-friendly",
        },
        {
          name: "La Cueva del Chango",
          neighborhood: "Centro",
          wifiSpeed: "Moderate",
          powerOutlets: true,
          specialty: "Jungle garden setting, breakfast favorite",
        },
      ],
    },
    reviews: [
      {
        id: "playadelcarmen-fan-1",
        user: "Ashley M.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AshleyM",
        date: "4 days ago",
        rating: 5,
        text: "Morning cenote swims, afternoon work, sunset on the beach - living the dream! 🏝️ Cochinita pibil is addictive. Caribbean vibes without leaving Mexico timezone.",
        type: "fan"
      },
      {
        id: "playadelcarmen-realist-1",
        user: "Rob T.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=RobT",
        date: "3 weeks ago",
        rating: 4,
        text: "5th Avenue is super touristy and pricey. Hurricane season (Jun-Nov) is risky. Cafe WiFi can be unreliable - coworking recommended. Can feel transient and party-focused.",
        type: "realist"
      },
      {
        id: "playadelcarmen-worker-1",
        user: "Sandra K.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SandraK",
        date: "2 weeks ago",
        rating: 5,
        text: "Nest Coworking has a pool AND rooftop! 🌴 Ah Cacao for Mayan chocolate breaks. Bunker has the most reliable AC and internet when you need serious focus.",
        type: "worker"
      }
    ],
  },
  {
    id: "lima",
    slug: "digital-nomad-guide-lima",
    name: "Lima",
    country: "Peru",
    continent: "South America",
    heroImage: "https://images.unsplash.com/photo-1531968455001-5c5272a41129?w=1920&q=80",
    images: {
      hero: "https://images.unsplash.com/photo-1531968455001-5c5272a41129?w=1920&q=80",
      gallery: [],
    },
    internetSpeed: 60,
    monthlyCost: 1400,
    safetyScore: 3,
    nomadScore: 78,
    visaAvailable: true,
    visa: {
      hasNomadVisa: true,
      visaName: "Digital Nomad Visa",
      mainRequirement: "Remote work proof and income of at least $2,000/month",
      maxStayDays: 365,
    },
    costBreakdown: {
      accommodation: 600,
      food: 350,
      transport: 100,
      coworking: 180,
      entertainment: 170,
    },
    coworkingSpaces: [
      {
        name: "Comunal",
        neighborhood: "Miraflores/San Isidro",
        priceRange: "$120-220/month",
        rating: 4.6,
        features: ["Premium facilities", "Multiple locations", "Events"],
      },
      {
        name: "WeWork",
        neighborhood: "San Isidro",
        priceRange: "$200-350/month",
        rating: 4.5,
        features: ["Global standard", "Professional environment"],
      },
    ],
    neighborhoods: [
      {
        name: "Miraflores",
        vibe: "modern",
        priceLevel: "premium",
        bestFor: ["First-time visitors", "Safety-conscious", "Ocean views"],
        description: "Upscale coastal district with parks, malls, and ocean cliffs.",
      },
      {
        name: "Barranco",
        vibe: "artistic",
        priceLevel: "mid",
        bestFor: ["Creatives", "Nightlife lovers", "Art enthusiasts"],
        description: "Bohemian neighborhood with galleries, bars, and street art.",
      },
      {
        name: "San Isidro",
        vibe: "modern",
        priceLevel: "premium",
        bestFor: ["Business travelers", "Quiet workers", "Parks"],
        description: "Business district with olive groves and excellent restaurants.",
      },
    ],
    bestMonths: ["December", "January", "February", "March"],
    climate: {
      summer: "Warm & Sunny (Dec-Mar, 23-28°C)",
      winter: "Cool & Overcast (Jun-Sep, 14-19°C)",
    },
    communityLinks: {
      facebook: "https://www.facebook.com/search/groups/?q=lima%20digital%20nomads",
      reddit: "https://www.reddit.com/r/PERU/",
      meetup: "https://www.meetup.com/find/?keywords=digital%20nomads&location=Lima",
    },
    shortDescription: "Culinary capital of South America with world-famous food, Pacific coast living, and growing tech scene.",
    longDescription: `
      <h2>Why Lima for Digital Nomads?</h2>
      <p>Lima is South America's culinary capital, and for food-loving nomads, that alone makes it worthwhile. But the city offers more - a sophisticated cultural scene, Pacific Ocean coastline, excellent infrastructure, and a growing tech ecosystem. The cost of living is reasonable, and the quality of restaurants rivals any world capital.</p>
      
      <h3>Best Neighborhood: Barranco</h3>
      <p>This bohemian district is Lima's creative heart. Street art covers walls, galleries showcase Peruvian artists, and bars and restaurants line the streets. The Bridge of Sighs is iconic, and the neighborhood's cliffside location offers Pacific views. It's more affordable than Miraflores with a stronger personality.</p>
      
      <h3>The Vibe</h3>
      <p>Lima surprises visitors expecting only Machu Picchu as Peru's highlight. The city is sophisticated, cosmopolitan, and food-obsessed. Ceviche restaurants range from humble to world-class, pisco sours flow freely, and the food scene is genuinely world-famous. The coast provides escape, and the historic center showcases colonial architecture.</p>
      
      <h3>Digital Nomad Visa</h3>
      <p>Peru launched its Digital Nomad Visa requiring proof of remote work and income of at least $2,000/month. The visa is valid for one year. For shorter stays, many nationalities get 183 days visa-free upon entry.</p>
      
      <h3>Pro Tip</h3>
      <p>Don't skip the food - Lima's restaurants are why many nomads come. Book Central or Maido well in advance for world-class dining. Winter (June-September) is gray and cool - time your visit for summer if possible. The historic center is worth exploring but requires extra safety awareness. Miraflores and Barranco are the safe zones for walking at night.</p>
    `,
    cityVibe: "Culinary capital, Pacific coast, sophisticated, food-obsessed, cultural",
    proTip: "Come for the food - Lima's restaurants are world-class. Book Central/Maido in advance. Visit in summer - winter is gray. Miraflores/Barranco safest at night.",
    lastUpdated: "2026-01-15",
    dataSource: ["Nomad List", "Local research"],
    foodAndWorkspace: {
      bigMacPrice: 3.90,
      bigMacIndex: "Cheaper",
      cappuccinoPrice: 3.00,
      localMealPrice: 5.00,
      mustTryDish: "Ceviche (Fresh Fish Citrus Marinade)",
      foodScene: "World's #1 food destination, ceviche perfection, Nikkei fusion",
      budgetMealSpots: ["La Lucha", "Punto Azul", "Mercado de Surquillo"],
      laptopFriendlyCafes: [
        {
          name: "Tostaduría Bisetti",
          neighborhood: "Barranco",
          wifiSpeed: "Fast",
          powerOutlets: true,
          specialty: "Best specialty coffee in Lima, artistic neighborhood",
        },
        {
          name: "Origen Tostadores",
          neighborhood: "Miraflores",
          wifiSpeed: "Fast",
          powerOutlets: true,
          specialty: "Local roasters, quiet atmosphere",
        },
      ],
    },
    reviews: [
      {
        id: "lima-fan-1",
        user: "Paolo M.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PaoloM",
        date: "1 week ago",
        rating: 5,
        text: "The ceviche alone is worth the flight! 🐟 Barranco's street art and Pacific sunsets are magical. Lima is the most underrated food capital in the world.",
        type: "fan"
      },
      {
        id: "lima-realist-1",
        user: "Nicole B.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=NicoleB",
        date: "2 weeks ago",
        rating: 4,
        text: "Winter (Jun-Sep) is gray and depressing - time your visit for summer. Historic center needs safety awareness. Miraflores/Barranco are the safe zones. Traffic is terrible.",
        type: "realist"
      },
      {
        id: "lima-worker-1",
        user: "Ricardo S.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=RicardoS",
        date: "3 weeks ago",
        rating: 5,
        text: "Tostaduría Bisetti in Barranco is specialty coffee perfection! ☕ Comunal coworking has ocean views. Book Central or Maido for celebrating big wins - world-class dining.",
        type: "worker"
      }
    ],
  },
  {
    id: "austin",
    slug: "digital-nomad-guide-austin",
    name: "Austin",
    country: "USA",
    continent: "North America",
    heroImage: "https://images.unsplash.com/photo-1531218150217-54595bc2b934?w=1920&q=80",
    images: {
      hero: "https://images.unsplash.com/photo-1531218150217-54595bc2b934?w=1920&q=80",
      gallery: [],
    },
    internetSpeed: 200,
    monthlyCost: 3500,
    safetyScore: 4,
    nomadScore: 75,
    visaAvailable: false,
    visa: {
      hasNomadVisa: false,
      visaName: "B-1/B-2 Tourist Visa",
      mainRequirement: "Tourist visa up to 90 days (ESTA) or B visa; no remote work visa",
      maxStayDays: 90,
    },
    costBreakdown: {
      accommodation: 2000,
      food: 600,
      transport: 300,
      coworking: 350,
      entertainment: 250,
    },
    coworkingSpaces: [
      {
        name: "Capital Factory",
        neighborhood: "Downtown",
        priceRange: "$300-500/month",
        rating: 4.7,
        features: ["Startup ecosystem", "Investor access", "Events"],
      },
      {
        name: "WeWork",
        neighborhood: "Multiple locations",
        priceRange: "$350-550/month",
        rating: 4.5,
        features: ["Premium facilities", "Global network"],
      },
    ],
    neighborhoods: [
      {
        name: "East Austin",
        vibe: "artistic",
        priceLevel: "mid",
        bestFor: ["Hipsters", "Foodies", "Music lovers"],
        description: "Gentrifying area with food trucks, breweries, and music venues.",
      },
      {
        name: "South Congress (SoCo)",
        vibe: "artistic",
        priceLevel: "premium",
        bestFor: ["Shopping", "Live music", "Tourist activities"],
        description: "Famous street with boutiques, restaurants, and Austin vibe.",
      },
      {
        name: "Downtown",
        vibe: "modern",
        priceLevel: "premium",
        bestFor: ["Business travelers", "Nightlife", "Walkability"],
        description: "High-rises, 6th Street bars, and corporate headquarters.",
      },
    ],
    bestMonths: ["March", "April", "October", "November"],
    climate: {
      summer: "Hot (Jun-Aug, 32-38°C)",
      winter: "Mild (Dec-Feb, 8-18°C)",
    },
    communityLinks: {
      facebook: "https://www.facebook.com/search/groups/?q=austin%20digital%20nomads",
      reddit: "https://www.reddit.com/r/Austin/",
      meetup: "https://www.meetup.com/find/?keywords=digital%20nomads&location=Austin",
    },
    shortDescription: "Keep Austin Weird - tech hub of Texas with live music, BBQ, and startup culture.",
    longDescription: `
      <h2>Why Austin for Digital Nomads?</h2>
      <p>Austin has transformed from a quirky college town into a major tech hub. Companies like Tesla, Oracle, and countless startups have made it their home. The city maintains its "Keep Austin Weird" identity with legendary live music, food trucks, and a creative spirit. For US-based nomads or those with legal work status, Austin offers an excellent quality of life.</p>
      
      <h3>Best Neighborhood: East Austin</h3>
      <p>This formerly industrial area has become Austin's coolest neighborhood. Food trucks, craft breweries, coffee roasters, and music venues have replaced warehouses. The vibe is creative and entrepreneurial, attracting tech workers and artists alike. More affordable than downtown while being close to everything.</p>
      
      <h3>The Vibe</h3>
      <p>Austin feels like a big city with a small-town soul. Live music plays somewhere every night (it's the "Live Music Capital of the World"). BBQ is religion. The tech scene is booming but hasn't erased the city's creative roots. Outdoor activities abound - Barton Springs, Lady Bird Lake, and green spaces throughout. The heat in summer is intense.</p>
      
      <h3>Digital Nomad Visa</h3>
      <p>The USA doesn't offer a Digital Nomad Visa. International visitors can stay up to 90 days on ESTA (Visa Waiver) or longer with B-1/B-2 visas, but working remotely in the US on tourist status exists in a legal gray area. Austin is best for US citizens or those with work authorization.</p>
      
      <h3>Pro Tip</h3>
      <p>Visit during SXSW (March) for the ultimate Austin experience - but book far in advance. Avoid July-August unless you love extreme heat. You'll need a car - Austin's public transit is limited. Franklin BBQ is famous but expect 3+ hour waits; try La Barbecue instead. 6th Street is touristy but Rainey Street has better bars.</p>
    `,
    cityVibe: "Tech hub, live music, BBQ culture, creative, outdoor lifestyle",
    proTip: "SXSW in March is amazing but book early. Avoid July-August heat. You'll need a car. Try La Barbecue instead of Franklin. Rainey Street better than 6th Street.",
    lastUpdated: "2026-01-15",
    dataSource: ["Nomad List", "Local research"],
    foodAndWorkspace: {
      bigMacPrice: 4.40,
      bigMacIndex: "Cheaper",
      cappuccinoPrice: 4.50,
      localMealPrice: 15.00,
      mustTryDish: "Texas BBQ Brisket",
      foodScene: "BBQ capital, Tex-Mex, food truck culture, craft beer",
      budgetMealSpots: ["Franklin BBQ", "Torchy's Tacos", "Veracruz All Natural"],
      laptopFriendlyCafes: [
        {
          name: "Houndstooth Coffee",
          neighborhood: "Downtown",
          wifiSpeed: "Fast",
          powerOutlets: true,
          specialty: "Third-wave coffee pioneer, work-friendly",
        },
        {
          name: "Fleet Coffee",
          neighborhood: "East Austin",
          wifiSpeed: "Fast",
          powerOutlets: true,
          specialty: "Trailer coffee, outdoor seating, Austin vibe",
        },
      ],
    },
    reviews: [
      {
        id: "austin-fan-1",
        user: "Jake R.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=JakeR2",
        date: "5 days ago",
        rating: 5,
        text: "Live music every night, breakfast tacos, and tech meetups galore! 🎸 East Austin food trucks are incredible. Keep Austin Weird is a real thing and I love it.",
        type: "fan"
      },
      {
        id: "austin-realist-1",
        user: "Emily W.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=EmilyW",
        date: "2 weeks ago",
        rating: 4,
        text: "Summer is BRUTAL - 100°F+ for months. You need a car, public transit is weak. Getting expensive fast as tech floods in. International nomads face visa challenges.",
        type: "realist"
      },
      {
        id: "austin-worker-1",
        user: "Brandon C.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=BrandonC",
        date: "1 week ago",
        rating: 5,
        text: "Capital Factory is the startup hub of Texas! 🚀 Houndstooth Coffee for serious third-wave. Fleet Coffee in East Austin has the best outdoor work vibes.",
        type: "worker"
      }
    ],
  },
  {
    id: "miami",
    slug: "digital-nomad-guide-miami",
    name: "Miami",
    country: "USA",
    continent: "North America",
    heroImage: "https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?w=1920&q=80",
    images: {
      hero: "https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?w=1920&q=80",
      gallery: [],
    },
    internetSpeed: 180,
    monthlyCost: 4000,
    safetyScore: 3,
    nomadScore: 72,
    visaAvailable: false,
    visa: {
      hasNomadVisa: false,
      visaName: "B-1/B-2 Tourist Visa",
      mainRequirement: "Tourist visa up to 90 days (ESTA) or B visa",
      maxStayDays: 90,
    },
    costBreakdown: {
      accommodation: 2400,
      food: 700,
      transport: 300,
      coworking: 350,
      entertainment: 250,
    },
    coworkingSpaces: [
      {
        name: "WeWork",
        neighborhood: "Brickell/Wynwood",
        priceRange: "$400-600/month",
        rating: 4.5,
        features: ["Premium facilities", "Multiple locations"],
      },
      {
        name: "The LAB Miami",
        neighborhood: "Wynwood",
        priceRange: "$250-400/month",
        rating: 4.6,
        features: ["Creative community", "Events", "Art district location"],
      },
    ],
    neighborhoods: [
      {
        name: "Brickell",
        vibe: "modern",
        priceLevel: "premium",
        bestFor: ["Finance professionals", "Luxury seekers", "Nightlife"],
        description: "Manhattan of the South with high-rises and rooftop bars.",
      },
      {
        name: "Wynwood",
        vibe: "artistic",
        priceLevel: "premium",
        bestFor: ["Art lovers", "Creatives", "Instagram influencers"],
        description: "Art district with murals, galleries, and trendy restaurants.",
      },
      {
        name: "Miami Beach",
        vibe: "beachside",
        priceLevel: "premium",
        bestFor: ["Beach lovers", "Party people", "Tourists"],
        description: "Iconic beach, Art Deco hotels, and South Beach nightlife.",
      },
    ],
    bestMonths: ["November", "December", "January", "February", "March", "April"],
    climate: {
      summer: "Hot & Humid (May-Oct, 28-33°C)",
      winter: "Warm & Perfect (Nov-Apr, 20-26°C)",
    },
    communityLinks: {
      facebook: "https://www.facebook.com/search/groups/?q=miami%20digital%20nomads",
      reddit: "https://www.reddit.com/r/Miami/",
      meetup: "https://www.meetup.com/find/?keywords=digital%20nomads&location=Miami",
    },
    shortDescription: "Gateway to Latin America with beaches, crypto scene, and year-round sunshine.",
    longDescription: `
      <h2>Why Miami for Digital Nomads?</h2>
      <p>Miami has reinvented itself as a tech and crypto hub, attracting entrepreneurs and remote workers from around the world. The city offers a unique blend of Latin American culture, beach lifestyle, and business sophistication. As a gateway between North and South America, it's ideal for those working across both regions.</p>
      
      <h3>Best Neighborhood: Brickell</h3>
      <p>Miami's financial district has transformed into a live-work-play neighborhood with gleaming towers, excellent restaurants, and easy access to both downtown and the beach. The area attracts young professionals and entrepreneurs, creating a dynamic networking environment. WeWork and other coworking spaces abound.</p>
      
      <h3>The Vibe</h3>
      <p>Miami is glamorous, international, and always warm. Spanish is spoken everywhere, Latin American influence is strong, and the party scene is legendary. The city attracts ambitious people from across the Americas. Art Basel has made it a cultural destination, and the tech/crypto community is growing rapidly. It's expensive but delivers a lifestyle to match.</p>
      
      <h3>Digital Nomad Visa</h3>
      <p>The USA doesn't offer a Digital Nomad Visa. ESTA allows 90-day stays for many nationalities. Miami is best for US citizens, those with work authorization, or Latin American nomads who can easily cross borders.</p>
      
      <h3>Pro Tip</h3>
      <p>You'll need a car - Miami's public transit is limited. Hurricane season (June-November) brings risk and humidity. Winter is perfect but peak season pricing. Brickell for work, Wynwood for art, Beach for relaxation - know which vibe you want. Spanish is helpful throughout the city. Expect everything to be expensive.</p>
    `,
    cityVibe: "Latin American gateway, beach glamour, crypto hub, international, expensive",
    proTip: "You'll need a car. Winter is perfect but expensive. Brickell for work, Wynwood for art, Beach for fun. Spanish is helpful. Expect high costs.",
    lastUpdated: "2026-01-15",
    dataSource: ["Nomad List", "Local research"],
    foodAndWorkspace: {
      bigMacPrice: 5.80,
      bigMacIndex: "Similar",
      cappuccinoPrice: 5.00,
      localMealPrice: 18.00,
      mustTryDish: "Cuban Sandwich",
      foodScene: "Latin American fusion, Cuban influence, celebrity chef restaurants",
      budgetMealSpots: ["Versailles", "La Carreta", "Calle Ocho restaurants"],
      laptopFriendlyCafes: [
        {
          name: "Panther Coffee",
          neighborhood: "Wynwood",
          wifiSpeed: "Fast",
          powerOutlets: true,
          specialty: "Local roasters, art district, creative vibe",
        },
        {
          name: "All Day",
          neighborhood: "Brickell",
          wifiSpeed: "Fast",
          powerOutlets: true,
          specialty: "Australian-style cafe, work-friendly, business crowd",
        },
      ],
    },
    reviews: [
      {
        id: "miami-fan-1",
        user: "Isabella G.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=IsabellaG",
        date: "3 days ago",
        rating: 5,
        text: "Latin American energy meets beach glamour! 🌴 Cuban sandwiches, Wynwood murals, and Brickell rooftop views. Crypto scene is booming. Miami is the new New York.",
        type: "fan"
      },
      {
        id: "miami-realist-1",
        user: "Chris D.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ChrisD",
        date: "2 weeks ago",
        rating: 4,
        text: "EXPENSIVE - budget at least $4k/month. You 100% need a car. Hurricane season is risky. Can feel superficial and status-obsessed. International nomads face visa issues.",
        type: "realist"
      },
      {
        id: "miami-worker-1",
        user: "Alex M.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlexM2",
        date: "1 week ago",
        rating: 5,
        text: "Panther Coffee in Wynwood is art district perfection! ☕ The LAB has great creative community. WeWork Brickell for serious business vibes and networking.",
        type: "worker"
      }
    ],
  },
];

