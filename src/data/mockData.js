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
  { id: 5, "name": "Obesity", description: "Excessive body fat accumulation" },
  { id: 6, name: "Asthma", description: "Chronic respiratory condition" },
];

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

// —— LARGE-SCALE HEXAGON DATA GENERATION ——

// Wayne County bounding box
const WAYNE_COUNTY_BOUNDS = {
    north: 42.451,
    south: 42.040,
    west: -83.560,
    east: -82.910,
};

// Simplified polygon for clipping land area (approximates Wayne County without water)
// Coordinates are [longitude, latitude]
const WAYNE_LAND_POLYGON = [
    [-83.56, 42.45], [-83.05, 42.45], [-82.92, 42.44], [-82.91, 42.35],
    [-83.00, 42.20], [-83.08, 42.10], [-83.20, 42.06], [-83.45, 42.04],
    [-83.54, 42.15], [-83.56, 42.30]
];

// Point-in-polygon test
function isPointInLand(lat, lon, polygon) {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i][0], yi = polygon[i][1];
        const xj = polygon[j][0], yj = polygon[j][1];

        const intersect = ((yi > lat) !== (yj > lat))
            && (lon < (xj - xi) * (lat - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}

// Generate vertices for a single hexagon
function getHexagonVertices(lat, lon, radius) {
    const vertices = [];
    // Correction for latitude distortion on map projection
    const latCorrection = 1 / Math.cos(lat * Math.PI / 180);
    for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 180) * (60 * i + 30);
        const vertexLon = lon + radius * Math.cos(angle) * latCorrection;
        const vertexLat = lat + radius * Math.sin(angle);
        vertices.push([vertexLon, vertexLat]);
    }
    return vertices;
}

// Main function to generate the large dataset
function generateHexbinData(rows = 10000) {
    const data = [];
    const hexRadiusDegrees = 0.0025; // Approximate radius in decimal degrees. Smaller value = more hexagons.
    
    // Hexagon geometric properties
    const hexHeight = hexRadiusDegrees * Math.sqrt(3);
    const hexWidth = hexRadiusDegrees * 2;
    const horizontalSpacing = hexWidth * 0.75;

    let idCounter = 0;

    // Loop through a grid of potential hexagon centers
    for (let lat = WAYNE_COUNTY_BOUNDS.south; lat < WAYNE_COUNTY_BOUNDS.north; lat += hexHeight / 2) {
        for (let lon = WAYNE_COUNTY_BOUNDS.west; lon < WAYNE_COUNTY_BOUNDS.east; lon += horizontalSpacing) {
            
            // Offset every other row
            const lonOffset = (Math.floor(lat / (hexHeight / 2)) % 2 === 0) ? 0 : hexWidth / 2;
            const currentLon = lon + lonOffset;

            // Check if the hexagon center is within the land polygon
            if (isPointInLand(lat, currentLon, WAYNE_LAND_POLYGON)) {

                // Generate deterministic but varied mock data
                const googleTrends = (Math.sin(lat * 50) * 50 + 50);
                const socialChatter = (Math.cos(currentLon * 50) * 400 + 600);
                const newsArticles = (Math.sin(lat * 20) * Math.cos(currentLon * 20) * 20 + 25);

                // Composite Health Signal Index (HSI)
                const hsi = (googleTrends * 0.5) + (socialChatter * 0.03) + (newsArticles * 0.2);

                data.push({
                    id: idCounter++,
                    coordinates: getHexagonVertices(lat, currentLon, hexRadiusDegrees),
                    googleTrends: Math.round(googleTrends),
                    socialMediaChatter: Math.round(socialChatter),
                    newsArticles: Math.round(newsArticles),
                    healthSignal: hsi,
                });

                if (data.length >= rows) {
                    return data;
                }
            }
        }
    }
    return data; // Return whatever was generated if rows limit not met
}

// Generate and export the data
export const healthHexbinData = generateHexbinData(10000);
