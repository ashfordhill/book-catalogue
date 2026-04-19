import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { SearchBox } from './SearchBox';

interface BottomNavProps {
  onSearch: (query: string) => void;
}

export function BottomNav({ onSearch }: BottomNavProps) {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t-2 border-purple-500 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <SearchBox onSearch={onSearch} />
          </div>
        </div>
      </div>
    </div>
  );
}
