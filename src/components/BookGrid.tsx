import type { BookWithId } from '../types';
import { BookCard } from './BookCard';

interface BookGridProps {
  books: BookWithId[];
  horizontal?: boolean;
  onBookClick: (book: BookWithId) => void;
}

export function BookGrid({ books, horizontal = false, onBookClick }: BookGridProps) {
  if (horizontal) {
    return (
      <div className="flex gap-6 overflow-x-auto pb-4">
        {books.map((book) => (
          <div key={book.id} className="flex-shrink-0 w-48">
            <BookCard
              book={book}
              onClick={() => onBookClick(book)}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4 md:gap-6">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onClick={() => onBookClick(book)}
        />
      ))}
    </div>
  );
}
