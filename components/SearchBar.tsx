
import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (location: string) => void;
  initialLocation: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialLocation }) => {
  const [query, setQuery] = useState(initialLocation);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city..."
          className="w-full pl-10 pr-4 py-3 bg-white/10 text-white rounded-full backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-300"
        />
        <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white">
          <Search size={20} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
