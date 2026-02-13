interface RetroShelfProps {
  label: string;
  color: 'cyan' | 'pink' | 'purple';
  children: React.ReactNode;
}

export function RetroShelf({ label, children }: RetroShelfProps) {
  return (
    <div className="relative mb-8">
      <div className="mb-2">
        <span className="font-mono text-sm font-bold text-purple-400 uppercase tracking-wider">
          &gt; {label}
        </span>
      </div>
      
      <div className="relative border-2 border-purple-500/50 p-6">
        {children}
      </div>
    </div>
  );
}
