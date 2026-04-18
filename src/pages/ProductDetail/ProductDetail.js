import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import products from '../../utils/products';
import { usePortfolio } from '../../context/PortfolioContext';
import RiskBadge from '../../components/RiskBadge/RiskBadge';
import './ProductDetail.css';

// Dynamically generates text about who should buy this product
function generateDecisionInsight(product) {
  const insights = [];
  if (product.riskLevel === 'low') {
    insights.push('Suitable for conservative investors who want to preserve their money.');
  } else if (product.riskLevel === 'medium') {
    insights.push('Good for moderate investors who can handle some ups and downs.');
  } else {
    insights.push('Best for aggressive investors comfortable with high volatility.');
  }
  if (product.liquidity === 'locked') {
    insights.push('Funds will be locked — early withdrawal may have penalties.');
  } else if (product.liquidity === 'easy') {
    insights.push('You can access your money easily at any time.');
  }
  if (product.timeHorizon === 'long') {
    insights.push('Best held for 5+ years to maximize returns.');
  } else if (product.timeHorizon === 'short') {
    insights.push('Suitable for short-term goals of 1-2 years.');
  }
  return insights;
}

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items, addToPortfolio } = usePortfolio();

  const product = products.find(p => p.id === Number(id));

  // Bonus Part 3: Return calculator
  const [amount, setAmount] = useState(10000);
  const [years, setYears] = useState(3);

  // Bonus Part 4: Comparison - pick a second product
  const [compareId, setCompareId] = useState('');
  const compareProduct = products.find(p => p.id === Number(compareId));

  if (!product) {
    return (
      <div className="page">
        <h2>Product not found!</h2>
        <button onClick={() => navigate('/products')}>← Back to Products</button>
      </div>
    );
  }

  const isInPortfolio = items.some(i => i.id === product.id);
  const insights = generateDecisionInsight(product);

  // Simple compound interest calculation
  const projectedReturn = (amount * Math.pow(1 + product.expectedReturn / 100, years)).toFixed(0);
  const profit = (projectedReturn - amount).toFixed(0);

  // Risk bar width
  const riskWidth = product.riskLevel === 'low' ? '30%' : product.riskLevel === 'medium' ? '60%' : '90%';
  const riskColor = product.riskLevel === 'low' ? '#4ade80' : product.riskLevel === 'medium' ? '#facc15' : '#f87171';

  return (
    <div className="page">
      <button className="back-btn" onClick={() => navigate('/products')}>← Back</button>

      <div className="detail-layout">
        {/* Left: main info */}
        <div className="detail-main">
          <img src={product.image} alt={product.name} className="detail-img" />
          <h2>{product.name}</h2>
          <p className="detail-category">{product.category}</p>
          <p className="detail-desc">{product.description}</p>

          <div className="detail-attrs">
            <div className="attr"><strong>Expected Return:</strong> {product.expectedReturn}%</div>
            <div className="attr"><strong>Risk Level:</strong> <RiskBadge riskLevel={product.riskLevel} /></div>
            <div className="attr"><strong>Liquidity:</strong> {product.liquidity}</div>
            <div className="attr"><strong>Time Horizon:</strong> {product.timeHorizon}</div>
            <div className="attr"><strong>Min Investment:</strong> Rs. {product.minInvestment.toLocaleString()}</div>
          </div>

          {/* Risk bar */}
          <div className="risk-bar-section">
            <p><strong>Risk Level Visualization:</strong></p>
            <div className="risk-bar-bg">
              <div className="risk-bar-fill" style={{ width: riskWidth, background: riskColor }}></div>
            </div>
            <p style={{ fontSize: '13px', color: '#888' }}>Low → Medium → High</p>
          </div>

          {/* Decision insights */}
          <div className="insight-box">
            <h3>💡 Decision Insights</h3>
            {insights.map((ins, i) => <p key={i}>• {ins}</p>)}
          </div>

          {/* Add to portfolio button */}
          <button
            className={`btn-portfolio ${isInPortfolio ? 'added' : ''}`}
            onClick={() => addToPortfolio(product)}
            disabled={isInPortfolio}
          >
            {isInPortfolio ? '✓ Added to Portfolio' : 'Add to Portfolio'}
          </button>
        </div>

        {/* Right: calculator + comparison */}
        <div className="detail-side">
          {/* Bonus Part 3: Return Calculator */}
          <div className="calculator-box">
            <h3>📊 Return Calculator</h3>
            <div className="calc-field">
              <label>Investment Amount (Rs.)</label>
              <input
                type="number"
                value={amount}
                min={product.minInvestment}
                onChange={e => setAmount(Number(e.target.value))}
              />
            </div>
            <div className="calc-field">
              <label>Years</label>
              <input
                type="number"
                value={years}
                min="1" max="30"
                onChange={e => setYears(Number(e.target.value))}
              />
            </div>
            <div className="calc-result">
              <p>Projected Value: <strong>Rs. {Number(projectedReturn).toLocaleString()}</strong></p>
              <p>Profit: <strong style={{ color: '#4ade80' }}>Rs. {Number(profit).toLocaleString()}</strong></p>
              <p style={{ fontSize: '12px', color: '#888' }}>
                At {product.expectedReturn}% annual return (compound interest)
              </p>
            </div>
          </div>

          {/* Bonus Part 4: Product Comparison */}
          <div className="compare-box">
            <h3>⚖️ Compare with Another</h3>
            <select value={compareId} onChange={e => setCompareId(e.target.value)}>
              <option value="">-- Select a product --</option>
              {products.filter(p => p.id !== product.id).map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>

            {compareProduct && (
              <div className="compare-table">
                <table>
                  <thead>
                    <tr>
                      <th>Attribute</th>
                      <th>{product.name}</th>
                      <th>{compareProduct.name}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Return</td>
                      <td>{product.expectedReturn}%</td>
                      <td>{compareProduct.expectedReturn}%</td>
                    </tr>
                    <tr>
                      <td>Risk</td>
                      <td>{product.riskLevel}</td>
                      <td>{compareProduct.riskLevel}</td>
                    </tr>
                    <tr>
                      <td>Liquidity</td>
                      <td>{product.liquidity}</td>
                      <td>{compareProduct.liquidity}</td>
                    </tr>
                    <tr>
                      <td>Horizon</td>
                      <td>{product.timeHorizon}</td>
                      <td>{compareProduct.timeHorizon}</td>
                    </tr>
                    <tr>
                      <td>Min Invest</td>
                      <td>Rs. {product.minInvestment.toLocaleString()}</td>
                      <td>Rs. {compareProduct.minInvestment.toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
