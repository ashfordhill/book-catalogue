import type { BookWithId } from '../types';

interface QuoteTerminalProps {
  book: BookWithId;
}

export function QuoteTerminal({ book }: QuoteTerminalProps) {
  const quotes = book.quotes && book.quotes.length > 0 ? book.quotes : ['No highlights saved.'];

  return (
    <div
      className="h-full flex flex-col bg-[#0d1117] border-r-2 border-[#30363d] rounded-l-lg overflow-hidden"
      style={{ minHeight: '320px' }}
    >
      {/* Terminal title bar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-[#30363d] bg-[#161b22]">
        <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
        <span className="font-mono text-xs text-[#8b949e] uppercase tracking-wider ml-2">
          {book.title.replace(/ /g, '_')}.quotes
        </span>
      </div>

      {/* Terminal content */}
      <div className="flex-1 p-4 font-mono text-sm overflow-y-auto">
        <div className="text-[#7ee787] mb-2">
          $ cat quotes.txt
        </div>
        <div className="space-y-4 text-[#c9d1d9]">
          {quotes.map((quote, index) => (
            <div key={index} className="pl-0">
              <span className="text-[#7ee787] select-none">&gt; </span>
              <span className="text-[#c9d1d9] italic leading-relaxed">
                &ldquo;{quote}&rdquo;
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-1 text-[#8b949e]">
          <span className="text-[#7ee787]">$</span>
          <span className="inline-block w-2 h-4 bg-[#7ee787] animate-pulse" aria-hidden />
        </div>
      </div>
    </div>
  );
}
