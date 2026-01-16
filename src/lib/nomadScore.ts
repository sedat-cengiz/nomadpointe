import { City } from "@/types/city";

/**
 * Calculate Nomad Score for a city (0-100)
 * 
 * The score is composed of:
 * - Internet Speed: max 25 points (50 Mbps = 25 points)
 * - Cost of Living: max 25 points (lower is better, $1000/month = 25 points)
 * - Safety: max 25 points (5 safety score = 25 points)
 * - Visa Accessibility: max 15 points (nomad visa = 15, no = 5)
 * - Community: max 10 points (based on community links available)
 */
export function calculateNomadScore(city: City): number {
  // Internet Speed Score (max 25)
  // 50+ Mbps = full points, scales linearly
  const internetScore = Math.min(city.internetSpeed / 2, 25);

  // Cost Score (max 25)
  // $1000/month = 25 points, $5000/month = 0 points
  // Formula: 25 - (cost - 1000) / 160
  const costScore = Math.max(0, Math.min(25, 25 - (city.monthlyCost - 1000) / 160));

  // Safety Score (max 25)
  // 5/5 safety = 25 points
  const safetyScore = city.safetyScore * 5;

  // Visa Score (max 15)
  // Nomad visa available = 15 points, otherwise 5 points
  const visaScore = city.visa?.hasNomadVisa ? 15 : 5;

  // Community Score (max 10)
  // Each community link adds 2.5 points
  const communityLinks = Object.keys(city.communityLinks || {}).length;
  const communityScore = Math.min(communityLinks * 2.5, 10);

  const totalScore = internetScore + costScore + safetyScore + visaScore + communityScore;

  return Math.round(Math.min(100, Math.max(0, totalScore)));
}

/**
 * Get score breakdown for display
 */
export function getScoreBreakdown(city: City): {
  internet: { score: number; max: number; description: string };
  cost: { score: number; max: number; description: string };
  safety: { score: number; max: number; description: string };
  visa: { score: number; max: number; description: string };
  community: { score: number; max: number; description: string };
  total: number;
} {
  const internetScore = Math.min(city.internetSpeed / 2, 25);
  const costScore = Math.max(0, Math.min(25, 25 - (city.monthlyCost - 1000) / 160));
  const safetyScore = city.safetyScore * 5;
  const visaScore = city.visa?.hasNomadVisa ? 15 : 5;
  const communityLinks = Object.keys(city.communityLinks || {}).length;
  const communityScore = Math.min(communityLinks * 2.5, 10);

  return {
    internet: {
      score: Math.round(internetScore),
      max: 25,
      description: `${city.internetSpeed} Mbps average`,
    },
    cost: {
      score: Math.round(costScore),
      max: 25,
      description: `$${city.monthlyCost}/month average`,
    },
    safety: {
      score: Math.round(safetyScore),
      max: 25,
      description: `${city.safetyScore}/5 safety rating`,
    },
    visa: {
      score: Math.round(visaScore),
      max: 15,
      description: city.visa?.hasNomadVisa ? "Digital Nomad Visa available" : "No dedicated nomad visa",
    },
    community: {
      score: Math.round(communityScore),
      max: 10,
      description: `${communityLinks} community channels`,
    },
    total: calculateNomadScore(city),
  };
}

/**
 * Get score tier based on total score
 */
export function getScoreTier(score: number): {
  tier: "excellent" | "great" | "good" | "average" | "below-average";
  label: string;
  color: string;
} {
  if (score >= 85) {
    return { tier: "excellent", label: "Excellent", color: "emerald" };
  } else if (score >= 75) {
    return { tier: "great", label: "Great", color: "green" };
  } else if (score >= 65) {
    return { tier: "good", label: "Good", color: "lime" };
  } else if (score >= 50) {
    return { tier: "average", label: "Average", color: "yellow" };
  } else {
    return { tier: "below-average", label: "Below Average", color: "orange" };
  }
}

/**
 * Compare two cities
 */
export function compareCities(cityA: City, cityB: City): {
  winner: "A" | "B" | "tie";
  scoreA: number;
  scoreB: number;
  advantages: {
    cityA: string[];
    cityB: string[];
  };
} {
  const scoreA = calculateNomadScore(cityA);
  const scoreB = calculateNomadScore(cityB);

  const advantagesA: string[] = [];
  const advantagesB: string[] = [];

  // Compare individual metrics
  if (cityA.internetSpeed > cityB.internetSpeed + 10) {
    advantagesA.push("Faster internet");
  } else if (cityB.internetSpeed > cityA.internetSpeed + 10) {
    advantagesB.push("Faster internet");
  }

  if (cityA.monthlyCost < cityB.monthlyCost - 200) {
    advantagesA.push("Lower cost of living");
  } else if (cityB.monthlyCost < cityA.monthlyCost - 200) {
    advantagesB.push("Lower cost of living");
  }

  if (cityA.safetyScore > cityB.safetyScore) {
    advantagesA.push("Higher safety rating");
  } else if (cityB.safetyScore > cityA.safetyScore) {
    advantagesB.push("Higher safety rating");
  }

  if (cityA.visa?.hasNomadVisa && !cityB.visa?.hasNomadVisa) {
    advantagesA.push("Digital Nomad Visa available");
  } else if (cityB.visa?.hasNomadVisa && !cityA.visa?.hasNomadVisa) {
    advantagesB.push("Digital Nomad Visa available");
  }

  let winner: "A" | "B" | "tie";
  if (scoreA > scoreB + 3) {
    winner = "A";
  } else if (scoreB > scoreA + 3) {
    winner = "B";
  } else {
    winner = "tie";
  }

  return {
    winner,
    scoreA,
    scoreB,
    advantages: {
      cityA: advantagesA,
      cityB: advantagesB,
    },
  };
}

