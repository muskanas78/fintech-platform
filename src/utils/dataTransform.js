// Transforms raw API data into financial products

// Map API categories to our financial categories
const categoryMapping = {
  'electronics': 'investment',
  'jewelery': 'savings',
  "men's clothing": 'insurance',
  "women's clothing": 'crypto'
};

// Risk level per category (systematic, not random)
const riskMapping = {
  'investment': 'medium',
  'savings': 'low',
  'insurance': 'low',
  'crypto': 'high'
};

// Liquidity per category
function assignLiquidity(category) {
  if (category === 'savings') return 'easy';
  if (category === 'insurance') return 'locked';
  if (category === 'crypto') return 'easy';
  return 'moderate'; // investment
}

// Time horizon per risk level
function assignTimeHorizon(riskLevel) {
  if (riskLevel === 'low') return 'short';
  if (riskLevel === 'medium') return 'medium';
  return 'long'; // high risk
}

// Return range per risk (use product id as seed so same product = same return)
function assignReturn(riskLevel, id) {
  const seed = (id % 10) / 10; // 0.0 to 0.9, deterministic
  if (riskLevel === 'low') return parseFloat((3 + seed * 4).toFixed(1));      // 3-7%
  if (riskLevel === 'medium') return parseFloat((7 + seed * 5).toFixed(1));   // 7-12%
  return parseFloat((12 + seed * 15).toFixed(1));                             // 12-27%
}

// Main transform function
export function transformToFinancialProduct(apiProduct) {
  const category = categoryMapping[apiProduct.category] || 'investment';
  const riskLevel = riskMapping[category];
  const minInvestment = Math.round(apiProduct.price * 1000);

  return {
    id: apiProduct.id,
    name: apiProduct.title.substring(0, 40), // keep name short
    category: category,
    description: apiProduct.description,
    expectedReturn: assignReturn(riskLevel, apiProduct.id),
    riskLevel: riskLevel,
    liquidity: assignLiquidity(category),
    timeHorizon: assignTimeHorizon(riskLevel),
    minInvestment: minInvestment,
    image: null // we use SVG from images.js
  };
}
