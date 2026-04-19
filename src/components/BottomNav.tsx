import { SearchBox } from './SearchBox';

interface BottomNavProps {
  onSearch: (query: string) => void;
}

export function BottomNav({ onSearch }: BottomNavProps) {
  
  return (
    <div className="bg-black border-t-2 border-purple-500">
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
