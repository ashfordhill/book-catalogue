import { useState } from 'react';

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

export function SearchBox({ onSearch }: SearchBoxProps) {
  const [query, setQuery] = useState('');

  return (
    <div className="relative w-full">
      <div className="relative">
        <div className="border-2 border-purple-500 bg-black">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              onSearch(e.target.value);
            }}
            placeholder="SEARCH BY TITLE..."
            className="w-full bg-black text-purple-400 font-mono text-sm font-bold px-4 py-3 outline-none placeholder-purple-400/80 tracking-wider uppercase"
          />
        </div>
        
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg width="18" height="18" viewBox="0 0 24 24">
            <circle cx="10" cy="10" r="6" fill="none" stroke="#a78bfa" strokeWidth="3"/>
            <line x1="14" y1="14" x2="20" y2="20" stroke="#a78bfa" strokeWidth="3"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
