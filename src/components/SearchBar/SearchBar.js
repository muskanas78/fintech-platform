import React, { useState, useEffect } from 'react';
import './SearchBar.css';

// Bonus Part 5: Search with debouncing
function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  // Debounce: wait 400ms after user stops typing before searching
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 400);
    return () => clearTimeout(timer);
  }, [query, onSearch]);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="🔍 Search products..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
