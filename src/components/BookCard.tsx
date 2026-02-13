import { motion } from 'framer-motion';
import { useState } from 'react';
import type { BookWithId } from '../types';

interface BookCardProps {
  book: BookWithId;
  onClick: () => void;
}

export function BookCard({ book, onClick }: BookCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={onClick}
      className="cursor-pointer group"
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
          {book.reviewFile && book.reviewFile.length > 0 && (
            <div className="absolute top-2 right-2 bg-[#ff2d9a] text-black font-mono text-xs px-2 py-1 font-bold rounded border border-[#ff2d9a] shadow-[0_0_10px_rgba(255,45,154,0.6)]">
              REVIEW
            </div>
          )}
        </div>
        <div className="bg-black border-t-2 border-purple-500/50 px-3 py-2 h-14">
          <h3 className="font-mono font-bold text-sm line-clamp-2 tracking-wider uppercase text-white">
            {book.title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}
