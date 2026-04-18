import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';
import RiskBadge from '../RiskBadge/RiskBadge';
import './ProductCard.css';

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { items, addToPortfolio } = usePortfolio();
  const [added, setAdded] = useState(false);

  const isInPortfolio = items.some(i => i.id === product.id);

  function handleAdd() {
    addToPortfolio(product);
    setAdded(true);
    // Reset button text after 2 seconds
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="product-card">
      {/* Image with hover overlay */}
      <div className="card-img-wrapper">
        <img src={product.image} alt={product.name} className="card-img" />
        <div className="details-overlay">
          <p>💧 Liquidity: {product.liquidity}</p>
          <p>⏳ Horizon: {product.timeHorizon}</p>
          <p>💰 Min: Rs. {product.minInvestment.toLocaleString()}</p>
        </div>
      </div>

      <div className="card-body">
        <h3>{product.name}</h3>
        <p className="category-tag">{product.category}</p>
        <p className="return-text">📈 {product.expectedReturn}% return</p>
        <RiskBadge riskLevel={product.riskLevel} />

        <div className="card-buttons">
          <button className="btn-view" onClick={() => navigate(`/product/${product.id}`)}>
            View Details
          </button>
          <button
            className={`btn-add ${isInPortfolio || added ? 'btn-added' : ''}`}
            onClick={handleAdd}
            disabled={isInPortfolio}
          >
            {isInPortfolio || added ? 'Added ✓' : 'Add to Portfolio'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;