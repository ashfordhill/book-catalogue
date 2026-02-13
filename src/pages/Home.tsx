import { useMemo, useState } from 'react';
import type { BookWithId } from '../types';
import { BookGrid } from '../components/BookGrid';
import { ReviewModal } from '../components/ReviewModal';

interface HomeProps {
  books: BookWithId[];
  searchQuery: string;
  selectedTags: string[];
}

export function Home({ books, searchQuery, selectedTags }: HomeProps) {
  const [selectedBook, setSelectedBook] = useState<BookWithId | null>(null);
  
  const filteredBooks = useMemo(() => {
    let filtered = books;
    
    if (selectedTags.length > 0) {
      filtered = filtered.filter(book => 
        selectedTags.every(tag => book.tags.includes(tag))
      );
    }
    
    if (searchQuery) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    return filtered;
  }, [books, searchQuery, selectedTags]);
  
  return (
    <>
      <div>
        {filteredBooks.length > 0 ? (
          <BookGrid 
            books={filteredBooks} 
            onBookClick={setSelectedBook}
          />
        ) : (
          <div className="text-center py-20">
            <p className="text-2xl font-mono font-bold tracking-wider uppercase text-[#ff9f43]">
              &gt; NO_BOOKS_FOUND
            </p>
          </div>
        )}
      </div>
      
      <ReviewModal
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
      />
    </>
  );
}
