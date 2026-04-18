import React from 'react';
import { useNavigate } from 'react-router-dom';
import products from '../../utils/products';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  // Featured: pick one from each category
  const featured = ['savings', 'investment', 'crypto', 'insurance'].map(cat =>
    products.find(p => p.category === cat)
  );

  const categories = [
    { name: 'Savings', icon: '🏦', color: '#4ade80' },
    { name: 'Investment', icon: '📈', color: '#c084fc' },
    { name: 'Insurance', icon: '🛡️', color: '#60a5fa' },
    { name: 'Crypto', icon: '₿', color: '#facc15' }
  ];

  return (
    <div className="page">
      {/* Hero Section */}
      <div className="hero">
        <h1>💜 Financial Product Discovery Platform</h1>
        <p>Find the right financial products based on your risk profile and goals.</p>
        <div className="hero-buttons">
          <button onClick={() => navigate('/products')} className="btn-primary">Browse Products</button>
          <button onClick={() => navigate('/profile')} className="btn-secondary">Create My Profile</button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="stats-row">
        <div className="stat-card">📦 <strong>{products.length}</strong> Products</div>
        <div className="stat-card">📂 <strong>4</strong> Categories</div>
        <div className="stat-card">📈 Up to <strong>25%</strong> Returns</div>
        <div className="stat-card">✅ <strong>100%</strong> Verified</div>
      </div>

      {/* Category Navigation */}
      <h2 className="section-title">Browse by Category</h2>
      <div className="category-grid">
        {categories.map(cat => (
          <div
            key={cat.name}
            className="category-card"
            style={{ borderTop: `4px solid ${cat.color}` }}
            onClick={() => navigate(`/products?category=${cat.name.toLowerCase()}`)}
          >
            <span className="cat-icon">{cat.icon}</span>
            <p>{cat.name}</p>
          </div>
        ))}
      </div>

      {/* Featured Products */}
      <h2 className="section-title">Featured Products</h2>
      <div className="products-grid">
        {featured.map(p => p && <ProductCard key={p.id} product={p} />)}
      </div>

      {/* CTA */}
      <div className="cta-box">
        <h3>Get Personalized Recommendations</h3>
        <p>Fill out your financial profile and we'll match the best products for you.</p>
        <button onClick={() => navigate('/profile')} className="btn-primary">
          Create Profile →
        </button>
      </div>
    </div>
  );
}

export default Home;
