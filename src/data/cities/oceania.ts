import { City } from "@/types/city";

export const oceaniaCities: City[] = [
  {
    id: "sydney",
    slug: "digital-nomad-guide-sydney",
    name: "Sydney",
    country: "Australia",
    continent: "Oceania",
    heroImage: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1920&q=80",
    images: {
      hero: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1920&q=80",
      gallery: [],
    },
    internetSpeed: 100,
    monthlyCost: 4000,
    safetyScore: 5,
    nomadScore: 72,
    visaAvailable: true,
    visa: {
      hasNomadVisa: false,
      visaName: "Working Holiday / Tourist Visa",
      mainRequirement: "Working Holiday Visa (18-30/35) or ETA tourist visa up to 90 days",
      maxStayDays: 90,
    },
    costBreakdown: {
      accommodation: 2200,
      food: 700,
      transport: 300,
      coworking: 450,
      entertainment: 350,
    },
    coworkingSpaces: [
      {
        name: "WeWork",
        neighborhood: "Multiple locations",
        priceRange: "$450-700/month",
        rating: 4.5,
        features: ["Premium facilities", "City views", "Global network"],
      },
      {
        name: "Hub Australia",
        neighborhood: "Multiple locations",
        priceRange: "$350-550/month",
        rating: 4.6,
        features: ["Social enterprise focus", "Impact community", "Events"],
      },
    ],
    neighborhoods: [
      {
        name: "Surry Hills",
        vibe: "artistic",
        priceLevel: "premium",
        bestFor: ["Creatives", "Foodies", "Cafe culture"],
        description: "Inner-city neighborhood with cafes, galleries, and creative energy.",
      },
      {
        name: "Bondi",
        vibe: "beachside",
        priceLevel: "premium",
        bestFor: ["Beach lovers", "Surfers", "Healthy lifestyle"],
        description: "Famous beach suburb with fitness culture and ocean vibes.",
      },
      {
        name: "Newtown",
        vibe: "artistic",
        priceLevel: "mid",
        bestFor: ["Students", "Artists", "Alternative scene"],
        description: "Eclectic inner-west suburb with live music and diverse dining.",
      },
    ],
    bestMonths: ["October", "November", "March", "April"],
    climate: {
      summer: "Hot (Dec-Feb, 25-32°C)",
      winter: "Mild (Jun-Aug, 10-18°C)",
    },
    communityLinks: {
      facebook: "https://www.facebook.com/search/groups/?q=sydney%20digital%20nomads",
      reddit: "https://www.reddit.com/r/sydney/",
      meetup: "https://www.meetup.com/find/?keywords=digital%20nomads&location=Sydney",
    },
    shortDescription: "Iconic harbor city with beaches, quality of life, and high costs to match.",
    longDescription: `
      <h2>Why Sydney for Digital Nomads?</h2>
      <p>Sydney offers world-class quality of life - iconic harbor, beautiful beaches, excellent infrastructure, and a diverse cultural scene. The city has a thriving startup ecosystem and professional coworking culture. However, it comes at a premium price, making it better suited for well-funded nomads or short-term stays.</p>
      
      <h3>Best Neighborhood: Surry Hills</h3>
      <p>This inner-city neighborhood perfectly balances work and lifestyle. Excellent cafes for working, diverse restaurants for eating, and an artsy vibe throughout. It's walkable to the CBD while maintaining character. Bondi is tempting but the commute to central coworking makes Surry Hills more practical.</p>
      
      <h3>The Vibe</h3>
      <p>Sydney is outdoor-focused and health-conscious. Morning beach swims, weekend hikes, rooftop bars at sunset - the lifestyle is enviable. The city is professional and cosmopolitan, with a large expat community. It's also spread out, so location choice matters for daily commute.</p>
      
      <h3>Digital Nomad Visa</h3>
      <p>Australia doesn't have a Digital Nomad Visa. Working Holiday Visas (for ages 18-30/35 depending on nationality) allow work. Tourist visas (ETA) offer up to 90 days but technically prohibit work. Sydney is best for Australian citizens/residents or those with working holiday eligibility.</p>
      
      <h3>Pro Tip</h3>
      <p>Budget at least $4,000/month for comfortable living. Bondi Beach is iconic but Coogee or Manly offer similar beaches with less crowds. The Opal card is essential for public transport. Avoid school holidays for cheaper flights and accommodation. The timezone works well for Asian business hours.</p>
    `,
    cityVibe: "Beach lifestyle, professional, outdoor-focused, expensive, high quality of life",
    proTip: "Budget $4,000+/month. Try Coogee or Manly instead of crowded Bondi. Get Opal card. Timezone suits Asian business hours.",
    lastUpdated: "2026-01-15",
    dataSource: ["Nomad List", "Local research"],
    foodAndWorkspace: {
      bigMacPrice: 5.90,
      bigMacIndex: "Similar",
      cappuccinoPrice: 4.50,
      localMealPrice: 18.00,
      mustTryDish: "Sydney Rock Oysters",
      foodScene: "World-class dining, multicultural food scene, harbor-side eating",
      budgetMealSpots: ["Chinatown food courts", "Bourke Street Bakery", "Fish Market"],
      laptopFriendlyCafes: [
        {
          name: "Single O Surry Hills",
          neighborhood: "Surry Hills",
          wifiSpeed: "Fast",
          powerOutlets: true,
          specialty: "Pioneering specialty coffee, work-friendly",
        },
        {
          name: "The Grounds of Alexandria",
          neighborhood: "Alexandria",
          wifiSpeed: "Fast",
          powerOutlets: true,
          specialty: "Stunning venue, garden setting, great food",
        },
      ],
    },
    reviews: [
      {
        id: "sydney-fan-1",
        user: "Matt P.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MattP",
        date: "1 week ago",
        rating: 5,
        text: "Morning swims at Bondi, Opera House views at sunset - Sydney is living the dream! 🏊 The harbor city lifestyle is unmatched. Every day feels like vacation.",
        type: "fan"
      },
      {
        id: "sydney-realist-1",
        user: "Emma T.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=EmmaT",
        date: "3 weeks ago",
        rating: 4,
        text: "Breathtaking but EXPENSIVE - budget $4k+/month. No proper nomad visa for most. City is spread out so location matters. Still worth a short stay to experience it.",
        type: "realist"
      },
      {
        id: "sydney-worker-1",
        user: "Luke H.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=LukeH",
        date: "2 weeks ago",
        rating: 5,
        text: "Single O in Surry Hills has Australia's best specialty coffee! ☕ The Grounds of Alexandria is Instagram gold with solid WiFi. Hub Australia for impact-focused community.",
        type: "worker"
      }
    ],
  },
  {
    id: "melbourne",
    slug: "digital-nomad-guide-melbourne",
    name: "Melbourne",
    country: "Australia",
    continent: "Oceania",
    heroImage: "https://images.unsplash.com/photo-1514395462725-fb4566210144?w=1920&q=80",
    images: {
      hero: "https://images.unsplash.com/photo-1514395462725-fb4566210144?w=1920&q=80",
      gallery: [],
    },
    internetSpeed: 95,
    monthlyCost: 3500,
    safetyScore: 5,
    nomadScore: 74,
    visaAvailable: true,
    visa: {
      hasNomadVisa: false,
      visaName: "Working Holiday / Tourist Visa",
      mainRequirement: "Working Holiday Visa (18-30/35) or ETA tourist visa up to 90 days",
      maxStayDays: 90,
    },
    costBreakdown: {
      accommodation: 1900,
      food: 650,
      transport: 280,
      coworking: 400,
      entertainment: 270,
    },
    coworkingSpaces: [
      {
        name: "Inspire9",
        neighborhood: "Richmond",
        priceRange: "$300-450/month",
        rating: 4.7,
        features: ["Startup community", "Events", "Good vibe"],
      },
      {
        name: "WeWork",
        neighborhood: "CBD/South Bank",
        priceRange: "$400-600/month",
        rating: 4.5,
        features: ["Premium facilities", "Multiple locations"],
      },
    ],
    neighborhoods: [
      {
        name: "Fitzroy",
        vibe: "artistic",
        priceLevel: "premium",
        bestFor: ["Hipsters", "Creatives", "Nightlife"],
        description: "Melbourne's original cool suburb with street art and bars.",
      },
      {
        name: "St Kilda",
        vibe: "beachside",
        priceLevel: "mid",
        bestFor: ["Beach lovers", "Backpackers", "Sunset views"],
        description: "Bayside suburb with beach, Luna Park, and diverse community.",
      },
      {
        name: "Carlton",
        vibe: "historic",
        priceLevel: "mid",
        bestFor: ["Coffee lovers", "Students", "Italian food"],
        description: "University area with Lygon Street's Italian restaurants.",
      },
    ],
    bestMonths: ["October", "November", "March", "April"],
    climate: {
      summer: "Hot but variable (Dec-Feb, 20-35°C)",
      winter: "Cool (Jun-Aug, 8-14°C)",
    },
    communityLinks: {
      facebook: "https://www.facebook.com/search/groups/?q=melbourne%20digital%20nomads",
      reddit: "https://www.reddit.com/r/melbourne/",
      meetup: "https://www.meetup.com/find/?keywords=digital%20nomads&location=Melbourne",
    },
    shortDescription: "Cultural capital of Australia with world-famous coffee, street art, and four seasons in one day.",
    longDescription: `
      <h2>Why Melbourne for Digital Nomads?</h2>
      <p>Melbourne is Australia's cultural capital, famous for its coffee culture, street art, live music, and diverse food scene. The city has a strong creative and startup community, with numerous coworking spaces catering to entrepreneurs and remote workers. Weather is famously unpredictable, but the urban culture compensates.</p>
      
      <h3>Best Neighborhood: Fitzroy</h3>
      <p>Melbourne's original hipster suburb remains the creative heart of the city. Brunswick Street is lined with vintage shops, galleries, and live music venues. Excellent cafes provide working spaces, and the nightlife is among the best in Australia. It's well-connected to the CBD by tram.</p>
      
      <h3>The Vibe</h3>
      <p>Melbourne is artsy, food-obsessed, and proudly alternative. The laneway culture - hidden bars, street art, specialty coffee - creates constant discovery. The city takes its coffee seriously (some say best in the world), and the food scene rivals any global city. Sports culture is huge, particularly Australian rules football.</p>
      
      <h3>Digital Nomad Visa</h3>
      <p>Same as Sydney - Australia lacks a nomad visa. Working Holiday Visas are the best option for extended stays with work rights. Tourist ETAs allow 90 days but technically no work.</p>
      
      <h3>Pro Tip</h3>
      <p>Melbourne's weather is notoriously changeable - "four seasons in one day" is real. Carry layers always. The coffee is world-class but expensive - discover your local roaster. Trams in the CBD are free. Explore the laneways - the best bars and cafes are hidden. AFL games at the MCG are a must-experience cultural event.</p>
    `,
    cityVibe: "Coffee culture, street art, creative, food-obsessed, unpredictable weather",
    proTip: "Always carry layers - weather changes constantly. Coffee is world-class but pricey. CBD trams are free. Explore laneways for hidden gems. See an AFL game.",
    lastUpdated: "2026-01-15",
    dataSource: ["Nomad List", "Local research"],
    foodAndWorkspace: {
      bigMacPrice: 5.90,
      bigMacIndex: "Similar",
      cappuccinoPrice: 4.20,
      localMealPrice: 16.00,
      mustTryDish: "Avocado Toast (Melbourne invented it!)",
      foodScene: "World coffee capital, laneway dining, multicultural food scene",
      budgetMealSpots: ["Queen Victoria Market", "Lygon Street", "Hardware Lane"],
      laptopFriendlyCafes: [
        {
          name: "Patricia Coffee Brewers",
          neighborhood: "CBD",
          wifiSpeed: "Fast",
          powerOutlets: true,
          specialty: "Standing room only, serious coffee, quick visits",
        },
        {
          name: "Brother Baba Budan",
          neighborhood: "CBD",
          wifiSpeed: "Fast",
          powerOutlets: true,
          specialty: "Legendary espresso, laneway vibes",
        },
        {
          name: "Industry Beans",
          neighborhood: "Fitzroy",
          wifiSpeed: "Fast",
          powerOutlets: true,
          specialty: "Specialty roasters, spacious, work-friendly",
        },
      ],
    },
    reviews: [
      {
        id: "melbourne-fan-1",
        user: "Zoe W.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ZoeW",
        date: "5 days ago",
        rating: 5,
        text: "World's best coffee culture, hidden laneway bars, and street art everywhere! 🎨 Fitzroy is creative heaven. Melbourne invented avocado toast - enough said.",
        type: "fan"
      },
      {
        id: "melbourne-realist-1",
        user: "James L.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=JamesL",
        date: "2 weeks ago",
        rating: 4,
        text: "Four seasons in one day is NO joke - always carry layers! Expensive like Sydney. No nomad visa makes long-term tough. But the culture is worth experiencing.",
        type: "realist"
      },
      {
        id: "melbourne-worker-1",
        user: "Chloe R.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ChloeR",
        date: "1 week ago",
        rating: 5,
        text: "Industry Beans in Fitzroy is spacious paradise for working! ☕ Brother Baba Budan for legendary espresso breaks. Inspire9 coworking has the best startup community.",
        type: "worker"
      }
    ],
  },
];

