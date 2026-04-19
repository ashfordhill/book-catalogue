import { useMemo } from 'react';
import type { BookWithId } from '../types';
import { BookGrid } from '../components/BookGrid';

interface HomeProps {
  books: BookWithId[];
  searchQuery: string;
}

export function Home({ books, searchQuery }: HomeProps) {
  const filteredBooks = useMemo(() => {
    let filtered = books;
    
    if (searchQuery) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [books, searchQuery]);
  
  return (
    <div>
      {filteredBooks.length > 0 ? (
        <BookGrid 
          books={filteredBooks} 
        />
      ) : (
        <div className="text-center py-20">
          <p className="text-2xl font-mono font-bold tracking-wider uppercase text-[#ff9f43]">
            &gt; NO_BOOKS_FOUND
          </p>
        </div>
      )}
    </div>
  );
}
