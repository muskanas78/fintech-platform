// Recommendation engine - maps user profile to products

function getRecommendations(products, userProfile) {
  if (!userProfile) return [];

  // Risk mapping
  const riskMapping = {
    conservative: ['low'],
    moderate: ['low', 'medium'],
    aggressive: ['low', 'medium', 'high']
  };

  // Time horizon mapping
  const horizonMapping = {
    short: ['short'],
    medium: ['short', 'medium'],
    long: ['short', 'medium', 'long']
  };

  // Liquidity mapping
  const liquidityMapping = {
    easy: ['easy'],
    moderate: ['easy', 'moderate'],
    locked: ['easy', 'moderate', 'locked']
  };

  const allowedRisk = riskMapping[userProfile.riskTolerance] || ['low'];
  const allowedHorizon = horizonMapping[userProfile.investmentHorizon] || ['short'];
  const allowedLiquidity = liquidityMapping[userProfile.liquidityPreference] || ['easy'];

  // Filter products by profile
  const recommended = products.filter(p => {
    return (
      allowedRisk.includes(p.riskLevel) &&
      allowedHorizon.includes(p.timeHorizon) &&
      allowedLiquidity.includes(p.liquidity) &&
      p.minInvestment <= userProfile.monthlyCapacity
    );
  });

  // Sort: conservative = lowest risk first, aggressive = highest return first
  if (userProfile.riskTolerance === 'conservative') {
    return recommended.sort((a, b) => a.expectedReturn - b.expectedReturn);
  } else {
    return recommended.sort((a, b) => b.expectedReturn - a.expectedReturn);
  }
}

export default getRecommendations;
