import { motion } from 'framer-motion';
import { useState } from 'react';
import type { BookWithId } from '../types';

interface BookCardProps {
  book: BookWithId;
}

export function BookCard({ book }: BookCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const displayTitle = book.title.split(':')[0].trim();

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="cursor-pointer group"
        onClick={() => setShowModal(true)}
      >
        <div className="border-2 border-purple-500 transition-all duration-300 hover:border-purple-400 overflow-hidden rounded-sm">
          <div className="aspect-[2/3] overflow-hidden bg-black relative">
            <img
              src={isHovered ? 'static-flipped-slower.webp' : book.coverUrl}
              alt=""
              className="w-full h-full object-cover"
              role="presentation"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
            {book.readingNow && (
              <div className="absolute top-2 right-2 bg-pink-500 text-white text-xs font-mono font-bold px-2 py-1 rounded shadow-lg">
                READING
              </div>
            )}
          </div>
          <div className="bg-black border-t-2 border-purple-500/50 px-3 py-2 h-14 flex items-end">
            <h3 className="font-mono font-bold text-sm line-clamp-2 tracking-wider uppercase text-white">
              {displayTitle}
            </h3>
          </div>
        </div>
      </motion.div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-gray-900 border-2 border-purple-500 p-8 rounded-sm max-w-2xl w-full mx-4 max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-mono font-bold text-2xl tracking-wider uppercase text-white mb-2">
              {book.title}
            </h2>
            <p className="font-mono text-base text-purple-300 mb-6">
              by {book.author}
            </p>
            
            {/* Terminal-style quotes */}
            <div className="bg-[#0d1117] border-2 border-[#30363d] rounded-lg shadow-lg overflow-hidden mb-4">
              {/* Terminal title bar */}
              <div className="flex items-center gap-2 px-4 py-2 border-b-2 border-[#30363d] bg-[#161b22]">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              
              {/* Terminal content */}
              <div className="p-6 font-sans text-base bg-[#0d1117]">
                <div className="text-[#7ee787] mb-2 font-mono">
                  $ cat quotes.txt
                </div>
                <div className="space-y-4 text-[#c9d1d9]">
                  {book.quotes.map((quote, index) => (
                    <div key={index} className="pl-0">
                      <span className="text-[#7ee787] select-none font-mono">&gt; </span>
                      <span className="text-[#c9d1d9]">
                        "{quote}"
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-1 text-[#8b949e]">
                  <span className="text-[#7ee787] font-mono">$</span>
                  <span className="inline-block w-2 h-4 bg-[#7ee787] animate-pulse" aria-hidden />
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {book.tags.map((tag) => {
                const colorPalette = [
                  'bg-red-600', 'bg-blue-600', 'bg-green-600', 'bg-yellow-600', 'bg-purple-600',
                  'bg-pink-600', 'bg-indigo-600', 'bg-teal-600', 'bg-orange-600', 'bg-cyan-600',
                  'bg-lime-600', 'bg-emerald-600', 'bg-violet-600', 'bg-fuchsia-600', 'bg-rose-600'
                ];
                // Simple hash function to get consistent color for each tag
                const hash = tag.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
                const colorIndex = hash % colorPalette.length;
                const color = colorPalette[colorIndex];
                return (
                  <span key={tag} className={`${color} text-white px-2 py-1 text-xs rounded font-mono`}>
                    {tag}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
