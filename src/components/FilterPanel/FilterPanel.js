import React from 'react';
import './FilterPanel.css';

function FilterPanel({ filters, onChange, count }) {
  return (
    <div className="filter-panel">
      <h3>Filters <span className="count">({count} products)</span></h3>

      {/* Risk Level */}
      <div className="filter-group">
        <label>Risk Level</label>
        <div className="checkbox-group">
          {['low', 'medium', 'high'].map(r => (
            <label key={r}>
              <input
                type="checkbox"
                checked={filters.riskLevels.includes(r)}
                onChange={() => {
                  const updated = filters.riskLevels.includes(r)
                    ? filters.riskLevels.filter(x => x !== r)
                    : [...filters.riskLevels, r];
                  onChange({ ...filters, riskLevels: updated });
                }}
              />
              {r}
            </label>
          ))}
        </div>
      </div>

      {/* Category */}
      <div className="filter-group">
        <label>Category</label>
        <div className="checkbox-group">
          {['savings', 'investment', 'insurance', 'crypto'].map(c => (
            <label key={c}>
              <input
                type="checkbox"
                checked={filters.categories.includes(c)}
                onChange={() => {
                  const updated = filters.categories.includes(c)
                    ? filters.categories.filter(x => x !== c)
                    : [...filters.categories, c];
                  onChange({ ...filters, categories: updated });
                }}
              />
              {c}
            </label>
          ))}
        </div>
      </div>

      {/* Return Range */}
      <div className="filter-group">
        <label>Min Return (%)</label>
        <input
          type="number"
          value={filters.minReturn}
          min="0" max="30"
          onChange={e => onChange({ ...filters, minReturn: Number(e.target.value) })}
        />
      </div>

      <div className="filter-group">
        <label>Max Return (%)</label>
        <input
          type="number"
          value={filters.maxReturn}
          min="0" max="30"
          onChange={e => onChange({ ...filters, maxReturn: Number(e.target.value) })}
        />
      </div>

      {/* Liquidity */}
      <div className="filter-group">
        <label>Liquidity</label>
        <select value={filters.liquidity} onChange={e => onChange({ ...filters, liquidity: e.target.value })}>
          <option value="all">All</option>
          <option value="easy">Easy</option>
          <option value="moderate">Moderate</option>
          <option value="locked">Locked</option>
        </select>
      </div>

      {/* Time Horizon */}
      <div className="filter-group">
        <label>Time Horizon</label>
        <select value={filters.timeHorizon} onChange={e => onChange({ ...filters, timeHorizon: e.target.value })}>
          <option value="all">All</option>
          <option value="short">Short</option>
          <option value="medium">Medium</option>
          <option value="long">Long</option>
        </select>
      </div>

      {/* Min Investment Budget */}
      <div className="filter-group">
        <label>My Budget (Rs.)</label>
        <input
          type="number"
          value={filters.budget}
          min="0"
          onChange={e => onChange({ ...filters, budget: Number(e.target.value) })}
        />
      </div>

      {/* Reset */}
      <button className="btn-reset" onClick={() => onChange({
        riskLevels: [], categories: [], minReturn: 0, maxReturn: 30,
        liquidity: 'all', timeHorizon: 'all', budget: 9999999
      })}>
        Reset Filters
      </button>
    </div>
  );
}

export default FilterPanel;
