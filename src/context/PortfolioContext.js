import React, { createContext, useState, useContext } from 'react';

// Bonus Part 1: LocalStorage persistence for portfolio
const PortfolioContext = createContext();

export function PortfolioProvider({ children }) {
  // Load from localStorage if available
  const saved = localStorage.getItem('portfolio');
  const initial = saved ? JSON.parse(saved) : [];

  const [items, setItems] = useState(initial);

  // Save to localStorage whenever items change
  function saveToStorage(newItems) {
    localStorage.setItem('portfolio', JSON.stringify(newItems));
    setItems(newItems);
  }

  function addToPortfolio(product) {
    const exists = items.find(i => i.id === product.id);
    if (!exists) {
      const newItems = [...items, { ...product, allocatedAmount: product.minInvestment }];
      saveToStorage(newItems);
    }
  }

  function removeFromPortfolio(productId) {
    const newItems = items.filter(i => i.id !== productId);
    saveToStorage(newItems);
  }

  function updateAmount(productId, amount) {
    const newItems = items.map(i =>
      i.id === productId ? { ...i, allocatedAmount: Number(amount) } : i
    );
    saveToStorage(newItems);
  }

  // Calculate total invested
  const totalInvested = items.reduce((sum, i) => sum + i.allocatedAmount, 0);

  // Calculate weighted return
  let weightedReturn = 0;
  if (totalInvested > 0) {
    weightedReturn = items.reduce((sum, i) => {
      return sum + (i.allocatedAmount / totalInvested) * i.expectedReturn;
    }, 0);
  }

  // Risk distribution
  const riskDistribution = { low: 0, medium: 0, high: 0 };
  if (totalInvested > 0) {
    items.forEach(i => {
      riskDistribution[i.riskLevel] += (i.allocatedAmount / totalInvested) * 100;
    });
  }

  return (
    <PortfolioContext.Provider value={{
      items,
      addToPortfolio,
      removeFromPortfolio,
      updateAmount,
      totalInvested,
      weightedReturn: weightedReturn.toFixed(2),
      riskDistribution
    }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  return useContext(PortfolioContext);
}
