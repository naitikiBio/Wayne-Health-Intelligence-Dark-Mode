// Mock data for the health visualization application
// Businesses in Wayne County
export const businesses = [{
  id: 1,
  name: "Detroit Manufacturing Inc",
  address: "1400 Rosa Parks Blvd, Detroit, MI 48216",
  employeeCount: 230,
  lat: 42.3314,
  lng: -83.0659,
  industry: "Manufacturing"
}, {
  id: 2,
  name: "Wayne State University",
  address: "42 W Warren Ave, Detroit, MI 48202",
  employeeCount: 1200,
  lat: 42.3591,
  lng: -83.0665,
  industry: "Education"
}, {
  id: 3,
  name: "Henry Ford Hospital",
  address: "2799 W Grand Blvd, Detroit, MI 48202",
  employeeCount: 950,
  lat: 42.3691,
  lng: -83.0889,
  industry: "Healthcare"
}, {
  id: 4,
  name: "Dearborn Tech Solutions",
  address: "15050 Michigan Ave, Dearborn, MI 48126",
  employeeCount: 185,
  lat: 42.3223,
  lng: -83.1763,
  industry: "Technology"
}, {
  id: 5,
  name: "Great Lakes Shipping Co",
  address: "1340 Atwater St, Detroit, MI 48207",
  employeeCount: 320,
  lat: 42.3295,
  lng: -83.0203,
  industry: "Logistics"
}];
// Disease data
export const diseases = [{
  id: 1,
  name: "Hypertension",
  description: "High blood pressure condition"
}, {
  id: 2,
  name: "Diabetes",
  description: "Blood sugar regulation disorder"
}, {
  id: 3,
  name: "Opioid Use",
  description: "Opioid addiction and misuse"
}, {
  id: 4,
  name: "Depression",
  description: "Major depressive disorder"
}, {
  id: 5,
  name: "Obesity",
  description: "Excessive body fat accumulation"
}, {
  id: 6,
  name: "Asthma",
  description: "Chronic respiratory condition"
}];
// Mock hexbin data for Wayne County map visualization
export const hexbinData = [{
  location: "Downtown Detroit",
  coordinates: [[42.3314, -83.0459], [42.3314, -83.0659], [42.3414, -83.0759], [42.3514, -83.0659], [42.3514, -83.0459], [42.3414, -83.0359]],
  diseases: [{
    name: "Hypertension",
    prevalence: 42
  }, {
    name: "Diabetes",
    prevalence: 28
  }, {
    name: "Depression",
    prevalence: 35
  }, {
    name: "Opioid Use",
    prevalence: 18
  }],
  articleCount: 45,
  googleTrendsScore: 72
}, {
  location: "Midtown Detroit",
  coordinates: [[42.3591, -83.0465], [42.3591, -83.0665], [42.3691, -83.0765], [42.3791, -83.0665], [42.3791, -83.0465], [42.3691, -83.0365]],
  diseases: [{
    name: "Depression",
    prevalence: 40
  }, {
    name: "Hypertension",
    prevalence: 38
  }, {
    name: "Asthma",
    prevalence: 32
  }, {
    name: "Obesity",
    prevalence: 36
  }],
  articleCount: 38,
  googleTrendsScore: 65
}, {
  location: "Corktown",
  coordinates: [[42.3291, -83.0789], [42.3291, -83.0989], [42.3391, -83.1089], [42.3491, -83.0989], [42.3491, -83.0789], [42.3391, -83.0689]],
  diseases: [{
    name: "Opioid Use",
    prevalence: 25
  }, {
    name: "Depression",
    prevalence: 33
  }, {
    name: "Hypertension",
    prevalence: 30
  }, {
    name: "Diabetes",
    prevalence: 24
  }],
  articleCount: 32,
  googleTrendsScore: 58
}, {
  location: "Dearborn",
  coordinates: [[42.3223, -83.1563], [42.3223, -83.1763], [42.3323, -83.1863], [42.3423, -83.1763], [42.3423, -83.1563], [42.3323, -83.1463]],
  diseases: [{
    name: "Diabetes",
    prevalence: 35
  }, {
    name: "Obesity",
    prevalence: 42
  }, {
    name: "Hypertension",
    prevalence: 40
  }, {
    name: "Asthma",
    prevalence: 28
  }],
  articleCount: 27,
  googleTrendsScore: 61
}, {
  location: "Hamtramck",
  coordinates: [[42.3989, -83.0489], [42.3989, -83.0689], [42.4089, -83.0789], [42.4189, -83.0689], [42.4189, -83.0489], [42.4089, -83.0389]],
  diseases: [{
    name: "Asthma",
    prevalence: 38
  }, {
    name: "Hypertension",
    prevalence: 36
  }, {
    name: "Diabetes",
    prevalence: 33
  }, {
    name: "Depression",
    prevalence: 29
  }],
  articleCount: 23,
  googleTrendsScore: 55
}, {
  location: "Highland Park",
  coordinates: [[42.4056, -83.0889], [42.4056, -83.1089], [42.4156, -83.1189], [42.4256, -83.1089], [42.4256, -83.0889], [42.4156, -83.0789]],
  diseases: [{
    name: "Hypertension",
    prevalence: 45
  }, {
    name: "Diabetes",
    prevalence: 38
  }, {
    name: "Obesity",
    prevalence: 43
  }, {
    name: "Opioid Use",
    prevalence: 22
  }],
  articleCount: 29,
  googleTrendsScore: 68
}, {
  location: "Greektown",
  coordinates: [[42.3351, -83.0389], [42.3351, -83.0589], [42.3451, -83.0689], [42.3551, -83.0589], [42.3551, -83.0389], [42.3451, -83.0289]],
  diseases: [{
    name: "Depression",
    prevalence: 32
  }, {
    name: "Hypertension",
    prevalence: 34
  }, {
    name: "Diabetes",
    prevalence: 27
  }, {
    name: "Asthma",
    prevalence: 25
  }],
  articleCount: 21,
  googleTrendsScore: 52
}, {
  location: "Southwest Detroit",
  coordinates: [[42.3123, -83.0989], [42.3123, -83.1189], [42.3223, -83.1289], [42.3323, -83.1189], [42.3323, -83.0989], [42.3223, -83.0889]],
  diseases: [{
    name: "Asthma",
    prevalence: 40
  }, {
    name: "Hypertension",
    prevalence: 38
  }, {
    name: "Diabetes",
    prevalence: 36
  }, {
    name: "Obesity",
    prevalence: 39
  }],
  articleCount: 35,
  googleTrendsScore: 63
}, {
  location: "East Detroit",
  coordinates: [[42.3691, -83.0089], [42.3691, -83.0289], [42.3791, -83.0389], [42.3891, -83.0289], [42.3891, -83.0089], [42.3791, -82.9989]],
  diseases: [{
    name: "Hypertension",
    prevalence: 41
  }, {
    name: "Diabetes",
    prevalence: 34
  }, {
    name: "Depression",
    prevalence: 31
  }, {
    name: "Obesity",
    prevalence: 38
  }],
  articleCount: 26,
  googleTrendsScore: 59
}, {
  location: "Livonia",
  coordinates: [[42.3691, -83.3489], [42.3691, -83.3689], [42.3791, -83.3789], [42.3891, -83.3689], [42.3891, -83.3489], [42.3791, -83.3389]],
  diseases: [{
    name: "Hypertension",
    prevalence: 37
  }, {
    name: "Diabetes",
    prevalence: 28
  }, {
    name: "Obesity",
    prevalence: 34
  }, {
    name: "Depression",
    prevalence: 27
  }],
  articleCount: 18,
  googleTrendsScore: 49
}, {
  location: "Westland",
  coordinates: [[42.3223, -83.3789], [42.3223, -83.3989], [42.3323, -83.4089], [42.3423, -83.3989], [42.3423, -83.3789], [42.3323, -83.3689]],
  diseases: [{
    name: "Obesity",
    prevalence: 36
  }, {
    name: "Hypertension",
    prevalence: 35
  }, {
    name: "Diabetes",
    prevalence: 30
  }, {
    name: "Asthma",
    prevalence: 26
  }],
  articleCount: 20,
  googleTrendsScore: 53
}, {
  location: "Taylor",
  coordinates: [[42.2389, -83.2489], [42.2389, -83.2689], [42.2489, -83.2789], [42.2589, -83.2689], [42.2589, -83.2489], [42.2489, -83.2389]],
  diseases: [{
    name: "Hypertension",
    prevalence: 39
  }, {
    name: "Diabetes",
    prevalence: 33
  }, {
    name: "Obesity",
    prevalence: 38
  }, {
    name: "Depression",
    prevalence: 29
  }],
  articleCount: 22,
  googleTrendsScore: 56
}];
// Mock social media data
export const socialMediaData = [{
  platform: "Twitter",
  content: "Detroit Health Department offering free blood pressure screenings this weekend at Eastern Market. #DetroitHealth #Hypertension",
  date: "2 hours ago",
  sentiment: "positive",
  topics: ["Hypertension", "Screening"]
}, {
  platform: "Facebook",
  content: "Living with diabetes in Wayne County is challenging with limited access to affordable medication. Something needs to change.",
  date: "5 hours ago",
  sentiment: "negative",
  topics: ["Diabetes", "Healthcare Access"]
}, {
  platform: "Twitter",
  content: "Just read that opioid overdoses in Detroit increased 30% since last year. This crisis is getting worse, not better.",
  date: "Yesterday",
  sentiment: "negative",
  topics: ["Opioid", "Crisis"]
}, {
  platform: "Instagram",
  content: "My workplace started offering mental health days and it's made such a difference for managing my depression. More companies need to do this! #MentalHealthMatters",
  date: "2 days ago",
  sentiment: "positive",
  topics: ["Depression", "Workplace"]
}, {
  platform: "Facebook",
  content: "New community garden in Southwest Detroit is helping families access fresh produce. Great initiative to combat obesity and diabetes!",
  date: "3 days ago",
  sentiment: "positive",
  topics: ["Obesity", "Nutrition"]
}, {
  platform: "Twitter",
  content: "Air quality alert for Wayne County today. Those with asthma should limit outdoor activities. #DetroitAir",
  date: "4 days ago",
  sentiment: "neutral",
  topics: ["Asthma", "Air Quality"]
}, {
  platform: "Instagram",
  content: "Started my journey to manage hypertension today. Doctor says 30% of adults in our area have high blood pressure. We need more awareness.",
  date: "5 days ago",
  sentiment: "neutral",
  topics: ["Hypertension", "Awareness"]
}];

// Function to generate a uniform hexagon grid covering Wayne County
export function generateUniformHexGrid() {
  // Define Wayne County boundaries (approximate)
  const boundaries = {
    north: 42.5,
    south: 42.1,
    east: -82.9,
    west: -83.6
  };
  // Size of hexagons - approximately 0.3km
  // Using a smaller size for the grid to ensure complete coverage
  const hexSize = 0.0025;
  // Calculate distance between rows (height of a hexagon)
  const hexHeight = hexSize * Math.sqrt(3);
  // Calculate distance between centers in the same row
  const hexWidth = hexSize * 2;
  const grid = [];
  let row = 0;
  // Generate grid from south to north
  for (let lat = boundaries.south; lat <= boundaries.north; lat += hexHeight * 0.75) {
    // Offset every other row for proper hexagonal packing
    const offset = row % 2 === 0 ? 0 : hexWidth / 2;
    row++;
    // Generate hexagons from west to east in this row
    for (let lng = boundaries.west; lng <= boundaries.east; lng += hexWidth) {
      // Calculate center point for this hexagon
      const centerLat = lat;
      const centerLng = lng + offset;
      // Generate the hexagon vertices
      const vertices = generateHexagonVertices(centerLat, centerLng, hexSize);
      // Generate random disease data for this hexagon
      const diseaseData = generateRandomDiseaseData();
      // Determine location name based on proximity
      const locationName = determineLocation(centerLat, centerLng);
      // Add hexagon to grid
      grid.push({
        location: locationName,
        coordinates: vertices,
        diseases: diseaseData,
        articleCount: Math.floor(Math.random() * 30) + 10,
        googleTrendsScore: Math.floor(Math.random() * 50) + 30
      });
    }
  }
  return grid;
}

// Helper function to generate vertices of a hexagon
function generateHexagonVertices(centerLat, centerLng, size) {
  const vertices = [];
  // Generate 6 vertices of a regular hexagon
  for (let i = 0; i < 6; i++) {
    // Angle in radians for each vertex (60 degree increments)
    const angle = Math.PI / 3 * i;
    // Calculate vertex coordinates
    const lat = centerLat + size * Math.cos(angle);
    const lng = centerLng + size * Math.sin(angle);
    vertices.push([lat, lng]);
  }
  return vertices;
}

// Helper function to generate random disease data
function generateRandomDiseaseData() {
  // Choose 2-4 diseases randomly
  const numDiseases = Math.floor(Math.random() * 3) + 2;
  const diseaseData = [];
  // Array of possible diseases
  const possibleDiseases = ["Hypertension", "Diabetes", "Obesity", "Depression", "Asthma", "Opioid Use"];
  // Shuffle and pick the first numDiseases elements
  const shuffled = [...possibleDiseases].sort(() => 0.5 - Math.random());
  for (let i = 0; i < numDiseases; i++) {
    diseaseData.push({
      name: shuffled[i],
      prevalence: Math.floor(Math.random() * 30) + 20 // 20-50% prevalence
    });
  }
  return diseaseData;
}

// Helper function to determine location name based on proximity
function determineLocation(lat, lng) {
  // Known locations in Wayne County
  const knownLocations = [{
    name: "Detroit",
    lat: 42.3314,
    lng: -83.0458
  }, {
    name: "Dearborn",
    lat: 42.3223,
    lng: -83.1763
  }, {
    name: "Livonia",
    lat: 42.3678,
    lng: -83.3527
  }, {
    name: "Canton",
    lat: 42.3095,
    lng: -83.4822
  }, {
    name: "Westland",
    lat: 42.3239,
    lng: -83.4005
  }, {
    name: "Taylor",
    lat: 42.2405,
    lng: -83.2696
  }, {
    name: "Southgate",
    lat: 42.2133,
    lng: -83.1938
  }, {
    name: "Wyandotte",
    lat: 42.2142,
    lng: -83.1499
  }, {
    name: "Hamtramck",
    lat: 42.3928,
    lng: -83.0478
  }, {
    name: "Grosse Pointe",
    lat: 42.3861,
    lng: -82.9116
  }, {
    name: "Harper Woods",
    lat: 42.4442,
    lng: -82.9277
  }, {
    name: "Romulus",
    lat: 42.2228,
    lng: -83.3966
  }, {
    name: "Inkster",
    lat: 42.2936,
    lng: -83.3099
  }, {
    name: "Wayne",
    lat: 42.2817,
    lng: -83.3863
  }, {
    name: "Plymouth",
    lat: 42.3714,
    lng: -83.4703
  }, {
    name: "Northville",
    lat: 42.4306,
    lng: -83.4833
  }, {
    name: "Trenton",
    lat: 42.1406,
    lng: -83.1785
  }, {
    name: "Flat Rock",
    lat: 42.0967,
    lng: -83.2927
  }, {
    name: "Ecorse",
    lat: 42.2517,
    lng: -83.1499
  }, {
    name: "River Rouge",
    lat: 42.2739,
    lng: -83.1338
  }, {
    name: "Highland Park",
    lat: 42.4053,
    lng: -83.0968
  }];
  // Find the closest known location
  let closestLocation = knownLocations[0];
  let minDistance = calculateDistance(lat, lng, closestLocation.lat, closestLocation.lng);
  for (let i = 1; i < knownLocations.length; i++) {
    const location = knownLocations[i];
    const distance = calculateDistance(lat, lng, location.lat, location.lng);
    if (distance < minDistance) {
      minDistance = distance;
      closestLocation = location;
    }
  }
  // Add a direction suffix for more specific location
  const directionSuffix = getDirectionSuffix(lat, lng, closestLocation.lat, closestLocation.lng);
  return `${closestLocation.name} ${directionSuffix}`;
}

// Helper function to calculate distance between two points
function calculateDistance(lat1, lng1, lat2, lng2) {
  const latDiff = lat1 - lat2;
  const lngDiff = lng1 - lng2;
  return Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
}

// Helper function to determine direction suffix
function getDirectionSuffix(lat, lng, centerLat, centerLng) {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const angle = Math.atan2(lng - centerLng, lat - centerLat);
  const index = Math.round((angle + Math.PI) / (Math.PI / 4)) % 8;
  // Only add direction if point is far enough from center
  if (calculateDistance(lat, lng, centerLat, centerLng) > 0.01) {
    return directions[index];
  }
  return "Central";
}