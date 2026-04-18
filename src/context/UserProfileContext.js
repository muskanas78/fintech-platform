import React, { createContext, useState, useContext } from 'react';

// Bonus Part 1: LocalStorage persistence for user profile
const UserProfileContext = createContext();

export function UserProfileProvider({ children }) {
  // Load profile from localStorage
  const saved = localStorage.getItem('userProfile');
  const initial = saved ? JSON.parse(saved) : null;

  const [profile, setProfile] = useState(initial);

  function updateProfile(newProfile) {
    localStorage.setItem('userProfile', JSON.stringify(newProfile));
    setProfile(newProfile);
  }

  function isProfileComplete() {
    if (!profile) return false;
    return (
      profile.riskTolerance &&
      profile.investmentHorizon &&
      profile.monthlyCapacity > 0 &&
      profile.liquidityPreference &&
      profile.investmentGoal
    );
  }

  return (
    <UserProfileContext.Provider value={{ profile, updateProfile, isProfileComplete }}>
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  return useContext(UserProfileContext);
}
