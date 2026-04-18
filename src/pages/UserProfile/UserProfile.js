import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserProfile } from '../../context/UserProfileContext';
import products from '../../utils/products';
import getRecommendations from '../../utils/recommendations';
import './UserProfile.css';

function UserProfile() {
  const { profile, updateProfile } = useUserProfile();
  const navigate = useNavigate();

  const [form, setForm] = useState(profile || {
    riskTolerance: '',
    investmentHorizon: '',
    monthlyCapacity: '',
    liquidityPreference: '',
    investmentGoal: ''
  });

  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSaved(false);
  }

  function validate() {
    const newErrors = {};
    if (!form.riskTolerance) newErrors.riskTolerance = 'Please select risk tolerance';
    if (!form.investmentHorizon) newErrors.investmentHorizon = 'Please select investment horizon';
    if (!form.monthlyCapacity || form.monthlyCapacity < 1000)
      newErrors.monthlyCapacity = 'Minimum capacity is Rs. 1000';
    if (!form.liquidityPreference) newErrors.liquidityPreference = 'Please select liquidity preference';
    if (!form.investmentGoal) newErrors.investmentGoal = 'Please select a goal';
    return newErrors;
  }

  function handleSubmit() {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    updateProfile({ ...form, monthlyCapacity: Number(form.monthlyCapacity) });
    setErrors({});
    setSaved(true);
  }

  // Preview how many products match this profile
  const matchCount = form.riskTolerance && form.investmentHorizon && form.monthlyCapacity && form.liquidityPreference
    ? getRecommendations(products, { ...form, monthlyCapacity: Number(form.monthlyCapacity) }).length
    : null;

  return (
    <div className="page">
      <h2>My Financial Profile</h2>
      <p className="subtitle">Fill in your details to get personalized product recommendations.</p>

      <div className="profile-layout">
        <div className="profile-form">
          {/* Risk Tolerance */}
          <div className="form-group">
            <label>Risk Tolerance *</label>
            <select name="riskTolerance" value={form.riskTolerance} onChange={handleChange}>
              <option value="">-- Select --</option>
              <option value="conservative">Conservative (Low Risk)</option>
              <option value="moderate">Moderate (Medium Risk)</option>
              <option value="aggressive">Aggressive (High Risk)</option>
            </select>
            {errors.riskTolerance && <span className="error">{errors.riskTolerance}</span>}
          </div>

          {/* Investment Horizon */}
          <div className="form-group">
            <label>Investment Horizon *</label>
            <select name="investmentHorizon" value={form.investmentHorizon} onChange={handleChange}>
              <option value="">-- Select --</option>
              <option value="short">Short Term (1-2 years)</option>
              <option value="medium">Medium Term (3-5 years)</option>
              <option value="long">Long Term (5+ years)</option>
            </select>
            {errors.investmentHorizon && <span className="error">{errors.investmentHorizon}</span>}
          </div>

          {/* Monthly Capacity */}
          <div className="form-group">
            <label>Monthly Investment Capacity (Rs.) *</label>
            <input
              type="number"
              name="monthlyCapacity"
              value={form.monthlyCapacity}
              onChange={handleChange}
              placeholder="e.g. 50000"
              min="1000"
            />
            {errors.monthlyCapacity && <span className="error">{errors.monthlyCapacity}</span>}
          </div>

          {/* Liquidity Preference */}
          <div className="form-group">
            <label>Liquidity Preference *</label>
            <div className="radio-group">
              {[
                { value: 'easy', label: '💧 Need Quick Access' },
                { value: 'moderate', label: '⚖️ Some Flexibility' },
                { value: 'locked', label: '🔒 Can Lock Funds' }
              ].map(opt => (
                <label key={opt.value} className="radio-label">
                  <input
                    type="radio"
                    name="liquidityPreference"
                    value={opt.value}
                    checked={form.liquidityPreference === opt.value}
                    onChange={handleChange}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
            {errors.liquidityPreference && <span className="error">{errors.liquidityPreference}</span>}
          </div>

          {/* Investment Goal */}
          <div className="form-group">
            <label>Investment Goal *</label>
            <select name="investmentGoal" value={form.investmentGoal} onChange={handleChange}>
              <option value="">-- Select --</option>
              <option value="wealth">Wealth Building</option>
              <option value="retirement">Retirement</option>
              <option value="emergency">Emergency Fund</option>
              <option value="purchase">Specific Purchase</option>
            </select>
            {errors.investmentGoal && <span className="error">{errors.investmentGoal}</span>}
          </div>

          {/* Match preview */}
          {matchCount !== null && (
            <div className="match-preview">
              ✅ {matchCount} products match your current profile
            </div>
          )}

          <button className="btn-save" onClick={handleSubmit}>
            {saved ? '✓ Profile Saved!' : 'Save Profile'}
          </button>

          {saved && (
            <button className="btn-go" onClick={() => navigate('/recommendations')}>
              See My Recommendations →
            </button>
          )}
        </div>

        {/* Profile Summary (if already saved) */}
        {profile && (
          <div className="profile-summary">
            <h3>Current Profile</h3>
            <p><strong>Risk:</strong> {profile.riskTolerance}</p>
            <p><strong>Horizon:</strong> {profile.investmentHorizon}</p>
            <p><strong>Capacity:</strong> Rs. {Number(profile.monthlyCapacity).toLocaleString()}</p>
            <p><strong>Liquidity:</strong> {profile.liquidityPreference}</p>
            <p><strong>Goal:</strong> {profile.investmentGoal}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
