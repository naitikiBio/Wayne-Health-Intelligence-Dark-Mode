// —— BUSINESSES (expanded, Wayne County) ——
export const businesses = [
  { id: 1, name: "Detroit Manufacturing Inc", address: "1400 Rosa Parks Blvd, Detroit, MI 48216", employeeCount: 230, lat: 42.3314, lng: -83.0659, industry: "Manufacturing" },
  { id: 2, name: "Wayne State University", address: "42 W Warren Ave, Detroit, MI 48202", employeeCount: 1200, lat: 42.3591, lng: -83.0665, industry: "Education" },
  { id: 3, name: "Henry Ford Hospital", address: "2799 W Grand Blvd, Detroit, MI 48202", employeeCount: 950, lat: 42.3691, lng: -83.0889, industry: "Healthcare" },
  { id: 4, name: "Dearborn Tech Solutions", address: "15050 Michigan Ave, Dearborn, MI 48126", employeeCount: 185, lat: 42.3223, lng: -83.1763, industry: "Technology" },
  { id: 5, name: "Great Lakes Shipping Co", address: "1340 Atwater St, Detroit, MI 48207", employeeCount: 320, lat: 42.3295, lng: -83.0203, industry: "Logistics" },
  { id: 6, name: "Ford Motor Company HQ", address: "1 American Rd, Dearborn, MI 48126", employeeCount: 4800, lat: 42.3226, lng: -83.2130, industry: "Automotive" },
  { id: 7, name: "Rocket Mortgage", address: "1050 Woodward Ave, Detroit, MI 48226", employeeCount: 4300, lat: 42.3349, lng: -83.0485, industry: "Finance" },
  { id: 8, name: "Detroit Medical Center", address: "4201 St Antoine, Detroit, MI 48201", employeeCount: 5200, lat: 42.3525, lng: -83.0553, industry: "Healthcare" },
  { id: 9, name: "GM Renaissance Center", address: "400 Renaissance Center, Detroit, MI 48243", employeeCount: 6000, lat: 42.3292, lng: -83.0396, industry: "Automotive" },
  { id:10, name: "Detroit Public Schools HQ", address: "3011 W Grand Blvd, Detroit, MI 48202", employeeCount: 1200, lat: 42.3756, lng: -83.0792, industry: "Education" },
  { id:11, name: "Beaumont Hospital Wayne", address: "33155 Annapolis St, Wayne, MI 48184", employeeCount: 900, lat: 42.2717, lng: -83.3666, industry: "Healthcare" },
  { id:12, name: "Detroit Metro Airport", address: "11050 W G Rogell Dr, Romulus, MI 48242", employeeCount: 15000, lat: 42.2125, lng: -83.3534, industry: "Transport" },
  { id:13, name: "Blue Cross Blue Shield MI", address: "600 E Lafayette Blvd, Detroit, MI 48226", employeeCount: 3500, lat: 42.3341, lng: -83.0436, industry: "Insurance" },
  { id:14, name: "Livonia City Hall", address: "33000 Civic Center Dr, Livonia, MI 48154", employeeCount: 400, lat: 42.4250, lng: -83.3733, industry: "Public" },
  { id:15, name: "Trinity Health HQ", address: "20555 Victor Pkwy, Livonia, MI 48152", employeeCount: 2100, lat: 42.4243, lng: -83.4152, industry: "Healthcare" },
];

// —— DISEASES ——
export const diseases = [
  { id: 1, name: "Hypertension", description: "High blood pressure condition" },
  { id: 2, name: "Diabetes", description: "Blood sugar regulation disorder" },
  { id: 3, name: "Opioid Use", description: "Opioid addiction and misuse" },
  { id: 4, name: "Depression", description: "Major depressive disorder" },
  { id: 5, name: "Obesity", description: "Excessive body fat accumulation" },
  { id: 6, name: "Asthma", description: "Chronic respiratory condition" },
];

// —— hand-crafted neighborhood tiles (keep a few for “hot spots”) ——
export const hexbinData = [
  {
    location: "Downtown Detroit",
    coordinates: [[42.3314, -83.0659],[42.3360, -83.0558],[42.3450, -83.0565],[42.3514, -83.0659],[42.3444,-83.0785],[42.3366,-83.0760]],
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
    coordinates: [[42.3591,-83.0665],[42.3660,-83.0570],[42.3770,-83.0580],[42.3791,-83.0665],[42.3725,-83.0760],[42.3630,-83.0740]],
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
    location: "East Side",
    coordinates: [[42.3691,-83.0089],[42.3760,-82.9999],[42.3870,-83.0020],[42.3891,-83.0289],[42.3800,-83.0385],[42.3725,-83.0300]],
    diseases: [
      { name: "Hypertension", prevalence: 41 },
      { name: "Diabetes", prevalence: 34 },
      { name: "Depression", prevalence: 31 },
      { name: "Obesity", prevalence: 38 },
    ],
    articleCount: 26,
    googleTrendsScore: 59,
  },
];

// —— Wayne land polygon (very light simplification just for clipping) ——
export const WAYNE_LAND_SIMPLIFIED = [
  [42.46,-83.60],[42.46,-83.05],[42.45,-82.93],[42.42,-82.90],[42.35,-82.91],[42.20,-82.95],
  [42.10,-83.10],[42.10,-83.50],[42.18,-83.60],[42.32,-83.60],[42.42,-83.58]
]; // not exact; good enough to keep hexes off Lake St. Clair/Detroit River

// —— social media (unchanged from your sample) ——
export const socialMediaData = [
  { platform: "Twitter", content: "Detroit Health Department offering free blood pressure screenings this weekend at Eastern Market. #DetroitHealth #Hypertension", date: "2 hours ago", sentiment: "positive", topics: ["Hypertension","Screening"] },
  { platform: "Facebook", content: "Living with diabetes in Wayne County is challenging with limited access to affordable medication. Something needs to change.", date: "5 hours ago", sentiment: "negative", topics: ["Diabetes","Healthcare Access"] },
  { platform: "Twitter", content: "Just read that opioid overdoses in Detroit increased 30% since last year. This crisis is getting worse, not better.", date: "Yesterday", sentiment: "negative", topics: ["Opioid","Crisis"] },
  { platform: "Instagram", content: "My workplace started offering mental health days and it's made such a difference for managing my depression. More companies need to do this! #MentalHealthMatters", date: "2 days ago", sentiment: "positive", topics: ["Depression","Workplace"] },
  { platform: "Facebook", content: "New community garden in Southwest Detroit is helping families access fresh produce. Great initiative to combat obesity and diabetes!", date: "3 days ago", sentiment: "positive", topics: ["Obesity","Nutrition"] },
  { platform: "Twitter", content: "Air quality alert for Wayne County today. Those with asthma should limit outdoor activities. #DetroitAir", date: "4 days ago", sentiment: "neutral", topics: ["Asthma","Air Quality"] },
  { platform: "Instagram", content: "Started my journey to manage hypertension today. Doctor says 30% of adults in our area have high blood pressure. We need more awareness.", date: "5 days ago", sentiment: "neutral", topics: ["Hypertension","Awareness"] },
];

// —— uniform hex grid generator ——
export function generateUniformHexGrid(hexSize = 0.002) {
  // bounds around Wayne County
  const north = 42.50, south = 42.10, west = -83.60, east = -82.90;
  const height = hexSize * Math.sqrt(3);
  const width = hexSize * 2;

  const grid = [];
  let row = 0;
  for (let lat = south; lat <= north; lat += height * 0.75) {
    const offset = (row % 2 === 0) ? 0 : width / 2;
    for (let lng = west; lng <= east; lng += width) {
      const cLat = lat;
      const cLng = lng + offset;
      const verts = hexVerts(cLat, cLng, hexSize);
      const diseases = randomDiseaseSet();
      grid.push({
        location: determineLocation(cLat, cLng),
        coordinates: verts,
        diseases,
        articleCount: Math.floor(Math.random() * 30) + 12,
        googleTrendsScore: Math.floor(Math.random() * 50) + 35,
      });
    }
    row++;
  }
  return grid;
}

function hexVerts(lat, lng, r) {
  const v = [];
  for (let i = 0; i < 6; i++) {
    const ang = (Math.PI / 3) * i;
    v.push([lat + r * Math.cos(ang), lng + r * Math.sin(ang)]);
  }
  return v;
}
function randomDiseaseSet() {
  const pool = ["Hypertension","Diabetes","Obesity","Depression","Asthma","Opioid Use"];
  const n = Math.floor(Math.random() * 3) + 3; // 3–5 diseases
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n).map((name) => ({ name, prevalence: Math.floor(Math.random() * 35) + 25 }));
}
function determineLocation(lat, lng) {
  const places = [
    { name: "Detroit", lat: 42.3314, lng: -83.0458 },
    { name: "Dearborn", lat: 42.3223, lng: -83.1763 },
    { name: "Livonia", lat: 42.3678, lng: -83.3527 },
    { name: "Canton", lat: 42.3095, lng: -83.4822 },
    { name: "Westland", lat: 42.3239, lng: -83.4005 },
    { name: "Taylor", lat: 42.2405, lng: -83.2696 },
    { name: "Hamtramck", lat: 42.3928, lng: -83.0478 },
    { name: "Grosse Pointe", lat: 42.3861, lng: -82.9116 },
    { name: "Romulus", lat: 42.2228, lng: -83.3966 },
    { name: "Highland Park", lat: 42.4053, lng: -83.0968 },
  ];
  let best = places[0];
  let dmin = dist(lat, lng, best.lat, best.lng);
  for (let i = 1; i < places.length; i++) {
    const d = dist(lat, lng, places[i].lat, places[i].lng);
    if (d < dmin) { dmin = d; best = places[i]; }
  }
  return best.name;
}
function dist(a, b, c, d) {
  const dx = a - c, dy = b - d;
  return Math.sqrt(dx * dx + dy * dy);
}
