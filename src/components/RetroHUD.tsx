interface RetroHUDProps {
  totalBooks: number;
  fiveStarBooks: number;
}

export function RetroHUD({ totalBooks, fiveStarBooks }: RetroHUDProps) {
  const percentage = Math.round((fiveStarBooks / totalBooks) * 100);
  
  return (
    <div className="fixed top-4 left-4 right-4 z-30 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <svg width="40" height="40" viewBox="0 0 40 40">
            <rect x="2" y="2" width="36" height="36" fill="#ff006e" stroke="#000" strokeWidth="3" rx="2"/>
            <rect x="10" y="10" width="8" height="8" fill="#000"/>
            <rect x="22" y="10" width="8" height="8" fill="#000"/>
            <rect x="10" y="22" width="20" height="4" fill="#000"/>
          </svg>
          
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-48 h-4 border-3 border-black bg-zinc-900 shadow-[0_0_10px_rgba(0,255,255,0.3)]">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-400 to-cyan-500 border-r-2 border-black transition-all duration-1000"
                  style={{ width: `${percentage}%` }}
                >
                  <div className="h-full flex items-center justify-end pr-1">
                    {Array.from({ length: Math.floor(percentage / 10) }).map((_, i) => (
                      <div key={i} className="w-1 h-2 bg-black/30 mx-0.5" />
                    ))}
                  </div>
                </div>
              </div>
              <span className="text-cyan-400 font-mono text-sm font-bold drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]">
                {fiveStarBooks}/{totalBooks}
              </span>
            </div>
            
            <div className="flex gap-1">
              {Array.from({ length: 8 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`w-5 h-3 border-2 border-black ${
                    i < Math.floor(percentage / 12.5) ? 'bg-pink-500' : 'bg-zinc-800'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <rect x="2" y="2" width="20" height="20" fill="#b537f2" stroke="#000" strokeWidth="2"/>
            <circle cx="12" cy="12" r="4" fill="#000"/>
          </svg>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <polygon points="12,4 16,8 14,8 14,16 10,16 10,8 8,8" fill="#ff006e" stroke="#000" strokeWidth="2"/>
          </svg>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <rect x="4" y="6" width="16" height="3" fill="#00ffff" stroke="#000" strokeWidth="2"/>
            <rect x="4" y="11" width="12" height="3" fill="#00ffff" stroke="#000" strokeWidth="2"/>
            <rect x="4" y="16" width="14" height="3" fill="#00ffff" stroke="#000" strokeWidth="2"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
