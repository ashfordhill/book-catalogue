import { Link } from 'react-router-dom';
import type { BookWithId } from '../types';
import '../styles/shared.css';

interface ReviewsProps {
  books: BookWithId[];
}

export function Reviews({ books }: ReviewsProps) {
  const reviewedBooks = books.filter(book => book.reviewFile && book.reviewFile.length > 0);
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="font-mono text-3xl font-bold uppercase tracking-wider mb-2 text-[#00d9ff]">
          &gt; REVIEWS
        </h1>
        <p className="font-mono text-sm text-[#2dffc4]/80">
          In-depth thoughts on books that left a mark
        </p>
      </div>
      
      {reviewedBooks.length === 0 ? (
        <div className="text-center py-20 border-2 border-purple-500/50">
          <p className="text-xl font-mono font-bold tracking-wider uppercase text-purple-400">
            &gt; NO_REVIEWS_YET
          </p>
          <p className="font-mono text-sm text-purple-400/70 mt-2">
            Check back later for detailed reviews
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviewedBooks.map(book => (
            <Link
              key={book.id}
              to={`/review/${book.reviewFile.replace('/reviews/', '')}`}
              className="block border-2 border-purple-500/50 p-6 hover:border-purple-500 transition-all group rounded-lg"
            >
              <div className="flex gap-6">
                <div className="w-32 h-48 flex-shrink-0 border-2 border-purple-500 overflow-hidden rounded-lg">
                  <img
                    src={book.coverUrl}
                    alt={`${book.title} cover`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                
                <div className="flex-1">
                  <h2 className="font-mono text-xl font-bold text-white uppercase tracking-wider mb-2 group-hover:text-[#00d9ff] transition-colors">
                    {book.title}
                  </h2>
                  <p className="font-mono text-sm text-[#2dffc4]/90 mb-4">
                    BY {book.author.toUpperCase()}
                  </p>
                  
                  <p className="font-mono text-sm text-purple-300/80 line-clamp-3">
                    {book.synopsis}
                  </p>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    {book.tags.map((tag, idx) => {
                      const accentClasses = ['tag-neon-pink', 'tag-mint', 'tag-orange', 'tag-cyan', 'tag-purple', 'tag-yellow'];
                      const c = accentClasses[idx % accentClasses.length];
                      return (
                        <span key={tag} className={`tag ${c}`}>
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                  
                  <div className="mt-3 font-mono text-xs text-purple-400 group-hover:text-purple-300 uppercase">
                    &gt; READ_MORE
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
