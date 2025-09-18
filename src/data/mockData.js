// ---------------- Businesses (Wayne County) ----------------
export const businesses = [
  { id: 1,  name: "Detroit Manufacturing Inc", address: "1400 Rosa Parks Blvd, Detroit, MI 48216", employeeCount: 230, lat: 42.3314, lng: -83.0659, industry: "Manufacturing" },
  { id: 2,  name: "Wayne State University", address: "42 W Warren Ave, Detroit, MI 48202", employeeCount: 1200, lat: 42.3591, lng: -83.0665, industry: "Education" },
  { id: 3,  name: "Henry Ford Hospital", address: "2799 W Grand Blvd, Detroit, MI 48202", employeeCount: 950, lat: 42.3691, lng: -83.0889, industry: "Healthcare" },
  { id: 4,  name: "Dearborn Tech Solutions", address: "15050 Michigan Ave, Dearborn, MI 48126", employeeCount: 185, lat: 42.3223, lng: -83.1763, industry: "Technology" },
  { id: 5,  name: "Great Lakes Shipping Co", address: "1340 Atwater St, Detroit, MI 48207", employeeCount: 320, lat: 42.3295, lng: -83.0203, industry: "Logistics" },
  { id: 6,  name: "Ford Rouge Complex", address: "3001 Miller Rd, Dearborn, MI 48120", employeeCount: 6100, lat: 42.3056, lng: -83.1670, industry: "Manufacturing" },
  { id: 7,  name: "DTE Energy HQ", address: "One Energy Plaza, Detroit, MI 48226", employeeCount: 2200, lat: 42.3336, lng: -83.0526, industry: "Utilities" },
  { id: 8,  name: "Rocket Mortgage", address: "1050 Woodward Ave, Detroit, MI 48226", employeeCount: 4000, lat: 42.3345, lng: -83.0485, industry: "Finance" },
  { id: 9,  name: "GM Factory ZERO", address: "2500 E Grand Blvd, Detroit, MI 48211", employeeCount: 1500, lat: 42.3911, lng: -83.0242, industry: "Manufacturing" },
  { id: 10, name: "Detroit Metro Airport (DTW)", address: "11050 W G Rogell Dr, Romulus, MI 48242", employeeCount: 8000, lat: 42.2124, lng: -83.3534, industry: "Transportation" },
  { id: 11, name: "Amazon Fulfillment ROM4", address: "37000 Ecorse Rd, Romulus, MI 48174", employeeCount: 2500, lat: 42.2232, lng: -83.379, industry: "Logistics" },
  { id: 12, name: "Beaumont Hospital, Dearborn", address: "18101 Oakwood Blvd, Dearborn, MI 48124", employeeCount: 3800, lat: 42.3002, lng: -83.2432, industry: "Healthcare" },
  { id: 13, name: "Detroit Public Schools HQ", address: "3011 W Grand Blvd, Detroit, MI 48202", employeeCount: 900, lat: 42.3696, lng: -83.0785, industry: "Education" },
  { id: 14, name: "Blue Cross Blue Shield of MI", address: "600 E Lafayette Blvd, Detroit, MI 48226", employeeCount: 4500, lat: 42.3348, lng: -83.0392, industry: "Insurance" },
  { id: 15, name: "U.S. Steel Great Lakes Works", address: "1 Quality Dr, Ecorse, MI 48229", employeeCount: 1900, lat: 42.255, lng: -83.149, industry: "Manufacturing" },
  { id: 16, name: "Detroit Water & Sewerage Dept", address: "735 Randolph St, Detroit, MI 48226", employeeCount: 1100, lat: 42.3327, lng: -83.0409, industry: "Utilities" },
  { id: 17, name: "University of Michigan – Dearborn", address: "4901 Evergreen Rd, Dearborn, MI 48128", employeeCount: 1400, lat: 42.322, lng: -83.233, industry: "Education" },
  { id: 18, name: "Carhartt HQ", address: "5750 Mercury Dr, Dearborn, MI 48126", employeeCount: 600, lat: 42.3319, lng: -83.2053, industry: "Apparel" },
  { id: 19, name: "Stellantis Mack Assembly", address: "4000 St Jean St, Detroit, MI 48214", employeeCount: 2500, lat: 42.3789, lng: -82.985, industry: "Manufacturing" },
  { id: 20, name: "Detroit Medical Center", address: "4201 St Antoine, Detroit, MI 48201", employeeCount: 6500, lat: 42.3528, lng: -83.0555, industry: "Healthcare" },
  { id: 21, name: "Meijer Supercenter (Livonia)", address: "13000 Middlebelt Rd, Livonia, MI 48150", employeeCount: 300, lat: 42.374, lng: -83.331, industry: "Retail" },
  { id: 22, name: "Southfield Free Press Print", address: "999 Fort St, Detroit, MI 48216", employeeCount: 120, lat: 42.318, lng: -83.073, industry: "Media" },
  { id: 23, name: "Penske Logistics (Taylor)", address: "21000 Eureka Rd, Taylor, MI 48180", employeeCount: 450, lat: 42.2105, lng: -83.232, industry: "Logistics" },
  { id: 24, name: "Trenton Engine Complex", address: "2000 Van Horn Rd, Trenton, MI 48183", employeeCount: 1400, lat: 42.136, lng: -83.192, industry: "Manufacturing" },
  { id: 25, name: "Quicken Technology Lab", address: "635 Woodward Ave, Detroit, MI 48226", employeeCount: 700, lat: 42.3319, lng: -83.0464, industry: "Technology" },
];

// ---------------- Diseases ----------------
export const diseases = [
  { id: 1, name: "Hypertension", description: "High blood pressure condition" },
  { id: 2, name: "Diabetes", description: "Blood sugar regulation disorder" },
  { id: 3, name: "Opioid Use", description: "Opioid addiction and misuse" },
  { id: 4, name: "Depression", description: "Major depressive disorder" },
  { id: 5, name: "Obesity", description: "Excessive body fat accumulation" },
  { id: 6, name: "Asthma", description: "Chronic respiratory condition" },
];

// ---------------- Curated hex clusters (seed) ----------------
export const hexbinData = [
  {
    location: "Downtown Detroit",
    coordinates: [
      [42.3314, -83.0459],
      [42.3314, -83.0659],
      [42.3414, -83.0759],
      [42.3514, -83.0659],
      [42.3514, -83.0459],
      [42.3414, -83.0359],
    ],
    diseases: [
      { name: "Hypertension", prevalence: 42 },
      { name: "Diabetes", prevalence: 28 },
      { name: "Depression", prevalence: 35 },
      { name: "Opioid Use", prevalence: 18 },
    ],
    articleCount: 45,
    googleTrendsScore: 72,
  },
  {
    location: "Midtown Detroit",
    coordinates: [
      [42.3591, -83.0465],
      [42.3591, -83.0665],
      [42.3691, -83.0765],
      [42.3791, -83.0665],
      [42.3791, -83.0465],
      [42.3691, -83.0365],
    ],
    diseases: [
      { name: "Depression", prevalence: 40 },
      { name: "Hypertension", prevalence: 38 },
      { name: "Asthma", prevalence: 32 },
      { name: "Obesity", prevalence: 36 },
    ],
    articleCount: 38,
    googleTrendsScore: 65,
  },
  {
    location: "Corktown",
    coordinates: [
      [42.3291, -83.0789],
      [42.3291, -83.0989],
      [42.3391, -83.1089],
      [42.3491, -83.0989],
      [42.3491, -83.0789],
      [42.3391, -83.0689],
    ],
    diseases: [
      { name: "Opioid Use", prevalence: 25 },
      { name: "Depression", prevalence: 33 },
      { name: "Hypertension", prevalence: 30 },
      { name: "Diabetes", prevalence: 24 },
    ],
    articleCount: 32,
    googleTrendsScore: 58,
  },
  {
    location: "Dearborn",
    coordinates: [
      [42.3223, -83.1563],
      [42.3223, -83.1763],
      [42.3323, -83.1863],
      [42.3423, -83.1763],
      [42.3423, -83.1563],
      [42.3323, -83.1463],
    ],
    diseases: [
      { name: "Diabetes", prevalence: 35 },
      { name: "Obesity", prevalence: 42 },
      { name: "Hypertension", prevalence: 40 },
      { name: "Asthma", prevalence: 28 },
    ],
    articleCount: 27,
    googleTrendsScore: 61,
  },
  {
    location: "Hamtramck",
    coordinates: [
      [42.3989, -83.0489],
      [42.3989, -83.0689],
      [42.4089, -83.0789],
      [42.4189, -83.0689],
      [42.4189, -83.0489],
      [42.4089, -83.0389],
    ],
    diseases: [
      { name: "Asthma", prevalence: 38 },
      { name: "Hypertension", prevalence: 36 },
      { name: "Diabetes", prevalence: 33 },
      { name: "Depression", prevalence: 29 },
    ],
    articleCount: 23,
    googleTrendsScore: 55,
  },
  // ... (kept a few more from your list; the grid below fills the rest)
];

// ---------------- Social media snippets (mock) ----------------
export const socialMediaData = [
  {
    platform: "Twitter",
    content:
      "Detroit Health Department offering free blood pressure screenings this weekend at Eastern Market. #DetroitHealth #Hypertension",
    date: "2 hours ago",
    sentiment: "positive",
    topics: ["Hypertension", "Screening"],
  },
  {
    platform: "Facebook",
    content:
      "Living with diabetes in Wayne County is challenging with limited access to affordable medication. Something needs to change.",
    date: "5 hours ago",
    sentiment: "negative",
    topics: ["Diabetes", "Healthcare Access"],
  },
  {
    platform: "Twitter",
    content:
      "Opioid overdoses in Detroit rose again year over year. Community response teams need support.",
    date: "Yesterday",
    sentiment: "negative",
    topics: ["Opioid Use", "Crisis"],
  },
  {
    platform: "Instagram",
    content:
      "Workplace mental health days helped me manage depression. More companies please! #MentalHealthMatters",
    date: "2 days ago",
    sentiment: "positive",
    topics: ["Depression", "Workplace"],
  },
  {
    platform: "Facebook",
    content:
      "New community garden in Southwest Detroit = more fresh produce. Big win vs obesity & diabetes!",
    date: "3 days ago",
    sentiment: "positive",
    topics: ["Obesity", "Nutrition"],
  },
  {
    platform: "Twitter",
    content:
      "Air quality alert in Wayne County today. Folks with asthma take it easy. #DetroitAir",
    date: "4 days ago",
    sentiment: "neutral",
    topics: ["Asthma", "Air Quality"],
  },
  {
    platform: "Reddit",
    content:
      "Anyone know free BP screening sites near Dearborn? Trying to get my dad checked.",
    date: "5 days ago",
    sentiment: "neutral",
    topics: ["Hypertension", "Screening"],
  },
  {
    platform: "Instagram",
    content:
      "Couch to 5K group in Livonia helping with weight loss journeys. Great vibes!",
    date: "6 days ago",
    sentiment: "positive",
    topics: ["Obesity", "Exercise"],
  },
  {
    platform: "Twitter",
    content:
      "Pharmacies in Hamtramck running out of inhalers again? Anyone else?",
    date: "1 week ago",
    sentiment: "negative",
    topics: ["Asthma", "Access"],
  },
  {
    platform: "Facebook",
    content:
      "Naloxone training event this weekend in Corktown. Free kits available.",
    date: "1 week ago",
    sentiment: "positive",
    topics: ["Opioid Use", "Harm Reduction"],
  },
];

// ---------------- Uniform hex grid generator (tight/compact) ----------------
// Bounds approximate Wayne County (prevents “into the lake” where possible).
export function generateUniformHexGrid() {
  const boundaries = { north: 42.48, south: 42.14, east: -82.95, west: -83.60 };
  const hexSize = 0.0022; // ~240m radius (smaller hexes)
  const hexHeight = hexSize * Math.sqrt(3);
  const hexWidth = hexSize * 2;

  const grid = [];
  let row = 0;

  for (let lat = boundaries.south; lat <= boundaries.north; lat += hexHeight * 0.75) {
    const offset = row % 2 === 0 ? 0 : hexWidth / 2;
    row++;
    for (let lng = boundaries.west; lng <= boundaries.east; lng += hexWidth) {
      const centerLat = lat;
      const centerLng = lng + offset;

      // quick mask to avoid obvious open water east/northeast
      if (centerLng > -83.02 && centerLat > 42.35) continue;
      if (centerLng > -82.97) continue;

      const vertices = [];
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const vlat = centerLat + hexSize * Math.cos(angle);
        const vlng = centerLng + hexSize * Math.sin(angle);
        vertices.push([vlat, vlng]);
      }

      grid.push({
        location: determineLocation(centerLat, centerLng),
        coordinates: vertices,
        diseases: generateRandomDiseaseData(),
        articleCount: Math.floor(Math.random() * 25) + 8,
        googleTrendsScore: Math.floor(Math.random() * 55) + 30,
      });
    }
  }
  return grid;
}

function generateRandomDiseaseData() {
  const possible = ["Hypertension", "Diabetes", "Obesity", "Depression", "Asthma", "Opioid Use"];
  const n = Math.floor(Math.random() * 3) + 3; // 3–5
  const shuffled = [...possible].sort(() => 0.5 - Math.random()).slice(0, n);
  return shuffled.map((name) => ({
    name,
    prevalence: Math.floor(Math.random() * 28) + 22, // 22–50%
  }));
}

function determineLocation(lat, lng) {
  const pts = [
    { name: "Detroit", lat: 42.3314, lng: -83.0458 },
    { name: "Dearborn", lat: 42.3223, lng: -83.1763 },
    { name: "Livonia", lat: 42.3678, lng: -83.3527 },
    { name: "Canton", lat: 42.3095, lng: -83.4822 },
    { name: "Westland", lat: 42.3239, lng: -83.4005 },
    { name: "Taylor", lat: 42.2405, lng: -83.2696 },
    { name: "Southgate", lat: 42.2133, lng: -83.1938 },
    { name: "Wyandotte", lat: 42.2142, lng: -83.1499 },
    { name: "Hamtramck", lat: 42.3928, lng: -83.0478 },
    { name: "Grosse Pointe", lat: 42.3861, lng: -82.9116 },
    { name: "Harper Woods", lat: 42.4442, lng: -82.9277 },
    { name: "Romulus", lat: 42.2228, lng: -83.3966 },
    { name: "Inkster", lat: 42.2936, lng: -83.3099 },
    { name: "Wayne", lat: 42.2817, lng: -83.3863 },
    { name: "Plymouth", lat: 42.3714, lng: -83.4703 },
    { name: "Northville", lat: 42.4306, lng: -83.4833 },
    { name: "Trenton", lat: 42.1406, lng: -83.1785 },
    { name: "Ecorse", lat: 42.2517, lng: -83.1499 },
    { name: "River Rouge", lat: 42.2739, lng: -83.1338 },
    { name: "Highland Park", lat: 42.4053, lng: -83.0968 },
  ];
  let best = pts[0];
  let md = Number.MAX_VALUE;
  pts.forEach((p) => {
    const d = Math.hypot(lat - p.lat, lng - p.lng);
    if (d < md) {
      md = d;
      best = p;
    }
  });
  const ang = Math.atan2(lng - best.lng, lat - best.lat);
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const idx = Math.round((ang + Math.PI) / (Math.PI / 4)) % 8;
  const suffix = md > 0.01 ? dirs[idx] : "Central";
  return `${best.name} ${suffix}`;
}
