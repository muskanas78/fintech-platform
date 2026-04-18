import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useNavigate } from 'react-router-dom';
import './Portfolio.css';

function Portfolio() {
  const { items, removeFromPortfolio, updateAmount, totalInvested, weightedReturn, riskDistribution } = usePortfolio();
  const navigate = useNavigate();

  // Bonus Part 5: Diversification score
  // More categories = higher score (max 4 categories = 100 score)
  const categories = [...new Set(items.map(i => i.category))];
  const diversificationScore = Math.round((categories.length / 4) * 100);

  // Warning if high risk > 70%
  const highRiskPercent = riskDistribution.high || 0;

  if (items.length === 0) {
    return (
      <div className="page">
        <h2>My Portfolio</h2>
        <div className="empty-portfolio">
          <p>Your portfolio is empty.</p>
          <button onClick={() => navigate('/products')}>Browse Products →</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h2>My Portfolio</h2>

      {/* High risk warning */}
      {highRiskPercent > 70 && (
        <div className="warning-box">
          ⚠️ Warning: {highRiskPercent.toFixed(1)}% of your portfolio is in high-risk products. Consider diversifying.
        </div>
      )}

      {/* Portfolio Summary */}
      <div className="summary-grid">
        <div className="summary-card">
          <p>Total Invested</p>
          <h3>Rs. {totalInvested.toLocaleString()}</h3>
        </div>
        <div className="summary-card">
          <p>Weighted Return</p>
          <h3>{weightedReturn}%</h3>
        </div>
        <div className="summary-card">
          <p>Products</p>
          <h3>{items.length}</h3>
        </div>
        {/* Bonus Part 5: Diversification score */}
        <div className="summary-card">
          <p>Diversification Score</p>
          <h3>{diversificationScore}/100</h3>
        </div>
      </div>

      {/* Risk Distribution */}
      <div className="risk-dist">
        <h3>Risk Distribution</h3>
        <div className="dist-bars">
          {['low', 'medium', 'high'].map(r => (
            <div key={r} className="dist-bar-row">
              <span className="dist-label">{r}</span>
              <div className="dist-bar-bg">
                <div
                  className={`dist-bar-fill dist-${r}`}
                  style={{ width: `${riskDistribution[r] || 0}%` }}
                ></div>
              </div>
              <span className="dist-pct">{(riskDistribution[r] || 0).toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Portfolio Items */}
      <h3 className="items-title">Your Investments</h3>
      <div className="portfolio-items">
        {items.map(item => (
          <div key={item.id} className="portfolio-item">
            <img src={item.image} alt={item.name} className="item-img" />
            <div className="item-info">
              <strong>{item.name}</strong>
              <span className="item-cat">{item.category}</span>
              <span>{item.riskLevel} risk · {item.expectedReturn}% return</span>
            </div>
            <div className="item-controls">
              <label>Amount (Rs.)</label>
              <input
                type="number"
                value={item.allocatedAmount}
                min={item.minInvestment}
                onChange={e => updateAmount(item.id, e.target.value)}
              />
            </div>
            <button className="btn-remove" onClick={() => removeFromPortfolio(item.id)}>
              ✕ Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Portfolio;
