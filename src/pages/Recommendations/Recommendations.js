import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserProfile } from '../../context/UserProfileContext';
import products from '../../utils/products';
import getRecommendations from '../../utils/recommendations';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Recommendations.css';

function Recommendations() {
  const { profile, isProfileComplete } = useUserProfile();
  const navigate = useNavigate();

  // If no profile, ask user to create one
  if (!isProfileComplete()) {
    return (
      <div className="page">
        <div className="no-profile-box">
          <h2>No Profile Found</h2>
          <p>You need to fill out your financial profile first to get recommendations.</p>
          <button onClick={() => navigate('/profile')}>Create My Profile →</button>
        </div>
      </div>
    );
  }

  const recommended = getRecommendations(products, profile);

  return (
    <div className="page">
      <h2>Your Recommendations</h2>
      <div className="rec-profile-summary">
        <p>Based on your profile:</p>
        <span>Risk: <strong>{profile.riskTolerance}</strong></span>
        <span>Horizon: <strong>{profile.investmentHorizon}</strong></span>
        <span>Capacity: <strong>Rs. {Number(profile.monthlyCapacity).toLocaleString()}</strong></span>
        <span>Liquidity: <strong>{profile.liquidityPreference}</strong></span>
      </div>

      {recommended.length === 0 ? (
        <div className="no-results-box">
          <p>No products match your current profile. Try updating your preferences.</p>
          <button onClick={() => navigate('/profile')}>Update Profile</button>
        </div>
      ) : (
        <>
          <p className="rec-count">✅ {recommended.length} products found for you</p>
          <div className="products-grid">
            {recommended.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </>
      )}
    </div>
  );
}

export default Recommendations;
