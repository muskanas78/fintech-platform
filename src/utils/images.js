// All images are inline SVGs — no external API, always works!

export const categoryImages = {
  savings: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'><rect width='400' height='200' fill='%23e0d4f7'/><text x='200' y='80' text-anchor='middle' font-size='48' fill='%236a4caa'>💰</text><text x='200' y='130' text-anchor='middle' font-size='22' fill='%236a4caa' font-family='Georgia'>Savings</text></svg>`,

  investment: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'><rect width='400' height='200' fill='%23d4eaf7'/><text x='200' y='80' text-anchor='middle' font-size='48' fill='%234c7aaa'>📈</text><text x='200' y='130' text-anchor='middle' font-size='22' fill='%234c7aaa' font-family='Georgia'>Investment</text></svg>`,

  insurance: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'><rect width='400' height='200' fill='%23d4f7e0'/><text x='200' y='80' text-anchor='middle' font-size='48' fill='%234caa6a'>🛡️</text><text x='200' y='130' text-anchor='middle' font-size='22' fill='%234caa6a' font-family='Georgia'>Insurance</text></svg>`,

  crypto: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'><rect width='400' height='200' fill='%23f7ead4'/><text x='200' y='80' text-anchor='middle' font-size='48' fill='%23aa8a4c'>₿</text><text x='200' y='130' text-anchor='middle' font-size='22' fill='%23aa8a4c' font-family='Georgia'>Crypto</text></svg>`,
};

// Get image for a product based on its category
export function getProductImage(category) {
  return categoryImages[category] || categoryImages['investment'];
}
