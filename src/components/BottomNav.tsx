import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SearchBox } from './SearchBox';
import { motion, AnimatePresence } from 'framer-motion';

interface BottomNavProps {
  onSearch: (query: string) => void;
  availableTags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
}

export function BottomNav({ onSearch, availableTags, selectedTags, onTagToggle }: BottomNavProps) {
  const location = useLocation();
  const [showFilters, setShowFilters] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;
  const isHomePage = location.pathname === '/';
  
  return (
    <>
      <AnimatePresence>
        {showFilters && isHomePage && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-20 left-0 right-0 bg-black border-t-2 border-b-2 border-purple-500 z-40 max-h-64 overflow-y-auto"
          >
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="mb-2">
                <span className="font-mono text-xs text-purple-400 uppercase tracking-wider">
                  Filter by Tags (select multiple)
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {availableTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => onTagToggle(tag)}
                    className={`font-mono text-xs px-3 py-1 border-2 transition-colors uppercase tracking-wider ${
                      selectedTags.includes(tag)
                        ? 'border-purple-500 bg-purple-500 text-black'
                        : 'border-purple-500/50 text-purple-400 hover:border-purple-500'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              {selectedTags.length > 0 && (
                <button
                  onClick={() => selectedTags.forEach(onTagToggle)}
                  className="mt-3 font-mono text-xs text-purple-400 hover:text-purple-300 uppercase"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t-2 border-purple-500 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <Link
                to="/"
                className={`font-mono text-sm font-bold px-4 py-2 border-2 transition-colors uppercase tracking-wider ${
                  isActive('/') 
                    ? 'border-purple-500 bg-purple-500 text-black' 
                    : 'border-purple-500 text-purple-400 hover:bg-purple-500/20'
                }`}
              >
                BOOKS
              </Link>
              <Link
                to="/reviews"
                className={`font-mono text-sm font-bold px-4 py-2 border-2 transition-colors uppercase tracking-wider ${
                  isActive('/reviews') 
                    ? 'border-purple-500 bg-purple-500 text-black' 
                    : 'border-purple-500 text-purple-400 hover:bg-purple-500/20'
                }`}
              >
                REVIEWS
              </Link>
              
              {isHomePage && (
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`font-mono text-sm font-bold px-4 py-2 border-2 transition-colors uppercase tracking-wider ${
                    showFilters || selectedTags.length > 0
                      ? 'border-purple-500 bg-purple-500 text-black' 
                      : 'border-purple-500 text-purple-400 hover:bg-purple-500/20'
                  }`}
                >
                  FILTERS {selectedTags.length > 0 && `(${selectedTags.length})`}
                </button>
              )}
            </div>
            
            <div className="flex-1">
              <SearchBox onSearch={onSearch} availableTags={availableTags} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
