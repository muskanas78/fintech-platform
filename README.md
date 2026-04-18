# 💜 FinTech Product Discovery Platform

A React-based financial product discovery platform built for FAST University Web Programming Assignment.

## 🌐 Live Demo

🚀 **View the app here:** [https://muskanas78.github.io/fintech-platform/](https://muskanas78.github.io/fintech-platform/)

---

## 🚀 How to Run

1. Open this folder in VS Code
2. Open Terminal (Ctrl + `)
3. Run:

```
npm install
npm start
```

4. App opens at http://localhost:3000

## 📁 Folder Structure

```
src/
├── components/
│   ├── Navbar/          ← Navbar.js + Navbar.css
│   ├── ProductCard/     ← ProductCard.js + ProductCard.css
│   ├── FilterPanel/     ← FilterPanel.js + FilterPanel.css
│   ├── RiskBadge/       ← RiskBadge.js + RiskBadge.css
│   └── SearchBar/       ← SearchBar.js + SearchBar.css
├── pages/
│   ├── Home/            ← Home.js + Home.css
│   ├── ProductListing/  ← ProductListing.js + ProductListing.css
│   ├── ProductDetail/   ← ProductDetail.js + ProductDetail.css
│   ├── UserProfile/     ← UserProfile.js + UserProfile.css
│   ├── Portfolio/       ← Portfolio.js + Portfolio.css
│   ├── Recommendations/ ← Recommendations.js + Recommendations.css
│   └── NotFound/        ← NotFound.js + NotFound.css
├── context/
│   ├── PortfolioContext.js
│   └── UserProfileContext.js
└── utils/
    ├── products.js       ← All 12 financial products
    └── recommendations.js ← Recommendation engine
```

## ✅ Features

- **7 Pages** with React Router
- **Filtering** with AND logic (risk, category, return, liquidity, horizon, budget)
- **Recommendation Engine** based on user profile
- **Portfolio System** with weighted return & risk distribution
- **Context API** for global state (Portfolio + UserProfile)

## 🎁 Bonus Features

1. LocalStorage persistence (profile + portfolio saved between sessions)
2. Sorting options (by return, by investment amount)
3. Return Calculator with compound interest
4. Product Comparison (side by side)
5. Search with debouncing
6. Diversification Score
7. High-risk warning (>70% high risk)

## 🌐 Pages / Routes

| Route            | Page            |
| ---------------- | --------------- |
| /                | Home            |
| /products        | Product Listing |
| /product/:id     | Product Detail  |
| /profile         | User Profile    |
| /portfolio       | Portfolio       |
| /recommendations | Recommendations |
| \*               | 404 Not Found   |

## Deployment

This project is deployed using gh-pages. To update the live site:

```
npm run deploy
```

## 📤 GitHub Upload Commands

```bash
git init
git add .
git commit -m "Initial commit: FinTech Discovery Platform"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/fintech-platform.git
git push -u origin main
```

## 🎨 Theme

Light purple / pastel purple theme using CSS variables.
