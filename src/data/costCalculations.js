// Cost calculation functions and data for absenteeism analysis
// Helper function to get local disease prevalence data based on location
export function getLocalDiseases(lat, lng) {
  // In a real app, this would query based on coordinates
  // For the mock, we'll return slightly different data based on rough location
  // Downtown Detroit area
  if (lat > 42.32 && lat < 42.34 && lng > -83.07 && lng < -83.04) {
    return [{
      name: "Hypertension",
      prevalence: 42,
      articlesCount: 45,
      daysLost: 3.2
    }, {
      name: "Diabetes",
      prevalence: 28,
      articlesCount: 32,
      daysLost: 4.5
    }, {
      name: "Depression",
      prevalence: 35,
      articlesCount: 38,
      daysLost: 6.3
    }, {
      name: "Opioid Use",
      prevalence: 18,
      articlesCount: 22,
      daysLost: 8.1
    }];
  }
  // Midtown area
  if (lat > 42.35 && lat < 42.38 && lng > -83.07 && lng < -83.03) {
    return [{
      name: "Depression",
      prevalence: 40,
      articlesCount: 42,
      daysLost: 6.5
    }, {
      name: "Hypertension",
      prevalence: 38,
      articlesCount: 36,
      daysLost: 3.0
    }, {
      name: "Asthma",
      prevalence: 32,
      articlesCount: 28,
      daysLost: 2.8
    }, {
      name: "Obesity",
      prevalence: 36,
      articlesCount: 34,
      daysLost: 3.5
    }];
  }
  // Dearborn area
  if (lat > 42.31 && lat < 42.34 && lng > -83.19 && lng < -83.15) {
    return [{
      name: "Diabetes",
      prevalence: 35,
      articlesCount: 38,
      daysLost: 4.8
    }, {
      name: "Obesity",
      prevalence: 42,
      articlesCount: 45,
      daysLost: 3.7
    }, {
      name: "Hypertension",
      prevalence: 40,
      articlesCount: 40,
      daysLost: 3.1
    }, {
      name: "Asthma",
      prevalence: 28,
      articlesCount: 25,
      daysLost: 2.6
    }];
  }
  // Default data for other areas
  return [{
    name: "Hypertension",
    prevalence: 38,
    articlesCount: 35,
    daysLost: 3.0
  }, {
    name: "Diabetes",
    prevalence: 31,
    articlesCount: 30,
    daysLost: 4.2
  }, {
    name: "Depression",
    prevalence: 33,
    articlesCount: 32,
    daysLost: 5.8
  }, {
    name: "Obesity",
    prevalence: 35,
    articlesCount: 33,
    daysLost: 3.3
  }, {
    name: "Asthma",
    prevalence: 26,
    articlesCount: 24,
    daysLost: 2.5
  }];
}
// Calculate absenteeism costs based on business and local disease data
export function calculateAbsenteeismCosts(business, localDiseases) {
  // Average daily wage calculation based on industry
  const avgDailyWage = getAverageDailyWage(business.industry);
  // Calculate costs for each disease
  const diseaseImpact = localDiseases.map(disease => {
    // Calculate how many employees might have this condition
    const affectedEmployees = Math.round(business.employeeCount * (disease.prevalence / 100));
    // Calculate total days lost per year for this disease
    const totalDaysLost = affectedEmployees * disease.daysLost;
    // Calculate cost
    const cost = totalDaysLost * avgDailyWage;
    return {
      name: disease.name,
      prevalence: disease.prevalence,
      affectedEmployees,
      daysLost: disease.daysLost,
      totalDaysLost,
      cost
    };
  });
  // Calculate totals
  const totalAnnualCost = diseaseImpact.reduce((sum, disease) => sum + disease.cost, 0);
  const costPerEmployee = Math.round(totalAnnualCost / business.employeeCount);
  // Calculate potential savings with health screenings (based on research)
  // Studies show 20-35% reduction in absenteeism with preventive screenings
  const potentialSavings = Math.round(totalAnnualCost * 0.28);
  return {
    businessName: business.name,
    employeeCount: business.employeeCount,
    diseaseImpact,
    totalAnnualCost,
    costPerEmployee,
    potentialSavings
  };
}
// Helper function to get average daily wage based on industry
function getAverageDailyWage(industry) {
  // These values are based on Bureau of Labor Statistics data
  switch (industry) {
    case 'Manufacturing':
      return 225;
    case 'Healthcare':
      return 275;
    case 'Technology':
      return 350;
    case 'Education':
      return 200;
    case 'Logistics':
      return 230;
    default:
      return 240;
  }
}
// Get commuting data for employees
export function getCommutingData(lat, lng) {
  // In a real app, this would use US Census commuting flow data
  // For the mock, we'll return slightly different data based on location
  // Downtown Detroit area
  if (lat > 42.32 && lat < 42.34 && lng > -83.07 && lng < -83.04) {
    return [{
      location: "Detroit (Local)",
      percentage: 45,
      topConcerns: ["Hypertension", "Depression"],
      riskLevel: "High"
    }, {
      location: "Dearborn",
      percentage: 18,
      topConcerns: ["Diabetes", "Obesity"],
      riskLevel: "Medium"
    }, {
      location: "Southfield",
      percentage: 12,
      topConcerns: ["Hypertension", "Asthma"],
      riskLevel: "Medium"
    }, {
      location: "Warren",
      percentage: 10,
      topConcerns: ["Depression", "Diabetes"],
      riskLevel: "Medium"
    }, {
      location: "Livonia",
      percentage: 8,
      topConcerns: ["Obesity", "Hypertension"],
      riskLevel: "Low"
    }, {
      location: "Other Areas",
      percentage: 7,
      topConcerns: ["Various"],
      riskLevel: "Low"
    }];
  }
  // Midtown area
  if (lat > 42.35 && lat < 42.38 && lng > -83.07 && lng < -83.03) {
    return [{
      location: "Detroit (Local)",
      percentage: 52,
      topConcerns: ["Depression", "Asthma"],
      riskLevel: "High"
    }, {
      location: "Ferndale",
      percentage: 15,
      topConcerns: ["Hypertension", "Depression"],
      riskLevel: "Medium"
    }, {
      location: "Royal Oak",
      percentage: 12,
      topConcerns: ["Obesity", "Diabetes"],
      riskLevel: "Medium"
    }, {
      location: "Dearborn",
      percentage: 8,
      topConcerns: ["Diabetes", "Hypertension"],
      riskLevel: "Medium"
    }, {
      location: "Troy",
      percentage: 7,
      topConcerns: ["Hypertension", "Obesity"],
      riskLevel: "Low"
    }, {
      location: "Other Areas",
      percentage: 6,
      topConcerns: ["Various"],
      riskLevel: "Low"
    }];
  }
  // Dearborn area
  if (lat > 42.31 && lat < 42.34 && lng > -83.19 && lng < -83.15) {
    return [{
      location: "Dearborn (Local)",
      percentage: 38,
      topConcerns: ["Diabetes", "Obesity"],
      riskLevel: "High"
    }, {
      location: "Detroit",
      percentage: 22,
      topConcerns: ["Hypertension", "Depression"],
      riskLevel: "High"
    }, {
      location: "Dearborn Heights",
      percentage: 15,
      topConcerns: ["Obesity", "Asthma"],
      riskLevel: "Medium"
    }, {
      location: "Taylor",
      percentage: 10,
      topConcerns: ["Hypertension", "Diabetes"],
      riskLevel: "Medium"
    }, {
      location: "Westland",
      percentage: 8,
      topConcerns: ["Obesity", "Hypertension"],
      riskLevel: "Medium"
    }, {
      location: "Other Areas",
      percentage: 7,
      topConcerns: ["Various"],
      riskLevel: "Low"
    }];
  }
  // Default commuting data
  return [{
    location: "Detroit",
    percentage: 35,
    topConcerns: ["Hypertension", "Depression"],
    riskLevel: "High"
  }, {
    location: "Dearborn",
    percentage: 15,
    topConcerns: ["Diabetes", "Obesity"],
    riskLevel: "Medium"
  }, {
    location: "Warren",
    percentage: 12,
    topConcerns: ["Depression", "Hypertension"],
    riskLevel: "Medium"
  }, {
    location: "Southfield",
    percentage: 10,
    topConcerns: ["Asthma", "Hypertension"],
    riskLevel: "Medium"
  }, {
    location: "Livonia",
    percentage: 8,
    topConcerns: ["Obesity", "Diabetes"],
    riskLevel: "Low"
  }, {
    location: "Other Areas",
    percentage: 20,
    topConcerns: ["Various"],
    riskLevel: "Low"
  }];
}