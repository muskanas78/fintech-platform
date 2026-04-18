import React, { useState, useCallback } from 'react';
import products from '../../utils/products';
import ProductCard from '../../components/ProductCard/ProductCard';
import FilterPanel from '../../components/FilterPanel/FilterPanel';
import SearchBar from '../../components/SearchBar/SearchBar';
import './ProductListing.css';

function ProductListing() {
  const [filters, setFilters] = useState({
    riskLevels: [],
    categories: [],
    minReturn: 0,
    maxReturn: 30,
    liquidity: 'all',
    timeHorizon: 'all',
    budget: 9999999
  });

  const [searchQuery, setSearchQuery] = useState('');

  // Bonus Part 2: Sorting options
  const [sortBy, setSortBy] = useState('default');

  // useCallback to avoid re-creating on every render (for SearchBar debounce)
  const handleSearch = useCallback((q) => {
    setSearchQuery(q.toLowerCase());
  }, []);

  // Apply all filters with AND logic
  let filtered = products.filter(p => {
    return (
      (filters.riskLevels.length === 0 || filters.riskLevels.includes(p.riskLevel)) &&
      (filters.categories.length === 0 || filters.categories.includes(p.category)) &&
      (p.expectedReturn >= filters.minReturn && p.expectedReturn <= filters.maxReturn) &&
      (filters.liquidity === 'all' || p.liquidity === filters.liquidity) &&
      (filters.timeHorizon === 'all' || p.timeHorizon === filters.timeHorizon) &&
      (p.minInvestment <= filters.budget) &&
      (searchQuery === '' || p.name.toLowerCase().includes(searchQuery))
    );
  });

  // Apply sorting
  if (sortBy === 'return-high') {
    filtered = [...filtered].sort((a, b) => b.expectedReturn - a.expectedReturn);
  } else if (sortBy === 'return-low') {
    filtered = [...filtered].sort((a, b) => a.expectedReturn - b.expectedReturn);
  } else if (sortBy === 'investment-low') {
    filtered = [...filtered].sort((a, b) => a.minInvestment - b.minInvestment);
  } else if (sortBy === 'investment-high') {
    filtered = [...filtered].sort((a, b) => b.minInvestment - a.minInvestment);
  }

  return (
    <div className="page listing-page">
      <h2>All Products</h2>
      <div className="listing-layout">
        <FilterPanel filters={filters} onChange={setFilters} count={filtered.length} />
        <div className="listing-right">
          <SearchBar onSearch={handleSearch} />

          {/* Bonus Part 2: Sort dropdown */}
          <div className="sort-row">
            <label>Sort by: </label>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="default">Default</option>
              <option value="return-high">Return: High to Low</option>
              <option value="return-low">Return: Low to High</option>
              <option value="investment-low">Min Investment: Low to High</option>
              <option value="investment-high">Min Investment: High to Low</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <p className="no-results">No products match your filters. Try adjusting them.</p>
          ) : (
            <div className="products-grid">
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductListing;
