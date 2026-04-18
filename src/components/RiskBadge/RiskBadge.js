import React from 'react';
import './RiskBadge.css';

function RiskBadge({ riskLevel }) {
  return (
    <span className={`risk-badge risk-${riskLevel}`}>
      {riskLevel.toUpperCase()}
    </span>
  );
}

export default RiskBadge;
