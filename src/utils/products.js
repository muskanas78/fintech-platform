// All financial product data - using real image URLs (no API needed)
const products = [
  {
    id: 1,
    name: "High-Yield Savings Account",
    category: "savings",
    description: "A safe savings account with competitive interest rates. Great for beginners who want to grow money without risk.",
    expectedReturn: 5.5,
    riskLevel: "low",
    liquidity: "easy",
    timeHorizon: "short",
    minInvestment: 10000,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop"
  },
  {
    id: 2,
    name: "Equity Growth Fund",
    category: "investment",
    description: "A mutual fund that invests in top Pakistani and global stocks. Medium risk with good long-term returns.",
    expectedReturn: 11.2,
    riskLevel: "medium",
    liquidity: "moderate",
    timeHorizon: "long",
    minInvestment: 50000,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop"
  },
  {
    id: 3,
    name: "Bitcoin Investment",
    category: "crypto",
    description: "Direct investment in Bitcoin. Very high risk but potential for very high returns. Only for risk-takers.",
    expectedReturn: 24.5,
    riskLevel: "high",
    liquidity: "easy",
    timeHorizon: "long",
    minInvestment: 5000,
    image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400&h=250&fit=crop"
  },
  {
    id: 4,
    name: "Term Life Insurance",
    category: "insurance",
    description: "Life insurance with an investment component. Provides coverage and grows your money safely over time.",
    expectedReturn: 6.5,
    riskLevel: "low",
    liquidity: "locked",
    timeHorizon: "long",
    minInvestment: 20000,
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=250&fit=crop"
  },
  {
    id: 5,
    name: "National Savings Bonds",
    category: "savings",
    description: "Government-backed savings bonds. Extremely safe with guaranteed returns. Best for conservative investors.",
    expectedReturn: 4.2,
    riskLevel: "low",
    liquidity: "locked",
    timeHorizon: "medium",
    minInvestment: 25000,
    image: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=400&h=250&fit=crop"
  },
  {
    id: 6,
    name: "Ethereum Fund",
    category: "crypto",
    description: "Invest in Ethereum, the second largest cryptocurrency. High risk, high reward potential.",
    expectedReturn: 20.0,
    riskLevel: "high",
    liquidity: "easy",
    timeHorizon: "long",
    minInvestment: 8000,
    image: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=400&h=250&fit=crop"
  },
  {
    id: 7,
    name: "Balanced Mutual Fund",
    category: "investment",
    description: "A mix of stocks and bonds. Balanced risk and reward. Good for medium-term goals.",
    expectedReturn: 9.0,
    riskLevel: "medium",
    liquidity: "moderate",
    timeHorizon: "medium",
    minInvestment: 30000,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop"
  },
  {
    id: 8,
    name: "Health Insurance Plan",
    category: "insurance",
    description: "Comprehensive health coverage with investment benefits. Low risk and provides peace of mind.",
    expectedReturn: 5.0,
    riskLevel: "low",
    liquidity: "moderate",
    timeHorizon: "medium",
    minInvestment: 15000,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=250&fit=crop"
  },
  {
    id: 9,
    name: "Aggressive Stock Portfolio",
    category: "investment",
    description: "A portfolio of high-growth stocks. High risk but very high potential returns for experienced investors.",
    expectedReturn: 18.5,
    riskLevel: "high",
    liquidity: "moderate",
    timeHorizon: "long",
    minInvestment: 100000,
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=250&fit=crop"
  },
  {
    id: 10,
    name: "Prize Bond",
    category: "savings",
    description: "Government prize bonds with lucky draw rewards. Very safe and highly liquid. Good for short-term.",
    expectedReturn: 3.5,
    riskLevel: "low",
    liquidity: "easy",
    timeHorizon: "short",
    minInvestment: 1000,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop"
  },
  {
    id: 11,
    name: "Crypto Index Fund",
    category: "crypto",
    description: "Invest in a basket of top cryptocurrencies. Spreads crypto risk across multiple coins.",
    expectedReturn: 16.0,
    riskLevel: "high",
    liquidity: "easy",
    timeHorizon: "medium",
    minInvestment: 10000,
    image: "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=400&h=250&fit=crop"
  },
  {
    id: 12,
    name: "Retirement Pension Plan",
    category: "insurance",
    description: "Long-term retirement savings plan. Low risk with tax benefits. Best for long-term security.",
    expectedReturn: 7.0,
    riskLevel: "low",
    liquidity: "locked",
    timeHorizon: "long",
    minInvestment: 50000,
    image: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=400&h=250&fit=crop"
  }
];

export default products;
