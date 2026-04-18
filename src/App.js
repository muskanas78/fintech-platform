import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PortfolioProvider } from './context/PortfolioContext';
import { UserProfileProvider } from './context/UserProfileContext';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import ProductListing from './pages/ProductListing/ProductListing';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import UserProfile from './pages/UserProfile/UserProfile';
import Portfolio from './pages/Portfolio/Portfolio';
import Recommendations from './pages/Recommendations/Recommendations';
import NotFound from './pages/NotFound/NotFound';
import './App.css';

function App() {
  return (
    <UserProfileProvider>
      <PortfolioProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductListing />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </PortfolioProvider>
    </UserProfileProvider>
  );
}

export default App;
