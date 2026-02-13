import { useState } from 'react';

interface SearchBoxProps {
  onSearch: (query: string) => void;
  availableTags: string[];
}

export function SearchBox({ onSearch, availableTags }: SearchBoxProps) {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const filteredTags = availableTags.filter(tag => 
    tag.toLowerCase().includes(query.toLowerCase())
  );

  // Group tags by first letter
  const groupedTags = filteredTags.reduce((acc, tag) => {
    const firstLetter = tag[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(tag);
    return acc;
  }, {} as Record<string, string[]>);

  const sortedLetters = Object.keys(groupedTags).sort();

  const handleSelect = (tag: string) => {
    setQuery(tag);
    onSearch(tag);
    setShowSuggestions(false);
  };

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
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="SEARCH_TAGS..."
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

      {showSuggestions && filteredTags.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 border-2 border-purple-500 bg-black z-50 max-h-96 overflow-y-auto">
          {sortedLetters.map((letter) => (
            <div key={letter}>
              <div className="px-4 py-2 font-mono text-xs font-bold text-purple-500 uppercase bg-black/50 sticky top-0 border-b border-zinc-900">
                {letter}
              </div>
              <div className="grid grid-cols-2 gap-1 p-2">
                {groupedTags[letter].map((tag) => (
                  <button
                    key={tag}
                    onMouseDown={() => handleSelect(tag)}
                    className="text-left px-2 py-1 font-mono text-xs font-bold tracking-wider uppercase hover:bg-purple-500/20 transition-colors border border-zinc-800 rounded text-purple-400"
                  >
                    &gt; {tag}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
