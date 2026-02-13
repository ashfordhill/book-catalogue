import { useState, useMemo, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { BottomNav } from './components/BottomNav'
import { Home } from './pages/Home'
import { Reviews } from './pages/Reviews'
import { ReviewDetail } from './pages/ReviewDetail'
import type { Book, BookWithId } from './types'

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [books, setBooks] = useState<BookWithId[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch('/books.json')
      .then(res => res.json())
      .then((data: Book[]) => {
        const booksWithIds: BookWithId[] = data.map((book, index) => ({
          ...book,
          id: `book-${index}`
        }));
        setBooks(booksWithIds);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading books:', err);
        setLoading(false);
      });
  }, []);
  
  const uniqueBooks = useMemo(() => {
    const seen = new Set();
    return books.filter(book => {
      if (seen.has(book.title + book.author)) return false;
      seen.add(book.title + book.author);
      return true;
    });
  }, [books]);
  
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    uniqueBooks.forEach(book => {
      book.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  }, [uniqueBooks]);
  
  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-mono text-purple-400 text-lg uppercase">Loading...</p>
      </div>
    );
  }
  
  return (
    <Router>
      <div className="min-h-screen relative z-10 pt-8 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<Home books={uniqueBooks} searchQuery={searchQuery} selectedTags={selectedTags} />} />
            <Route path="/reviews" element={<Reviews books={uniqueBooks} />} />
            <Route path="/review/:slug" element={<ReviewDetail books={uniqueBooks} />} />
          </Routes>
        </div>
      </div>
      
      <BottomNav 
        onSearch={setSearchQuery}
        availableTags={allTags}
        selectedTags={selectedTags}
        onTagToggle={handleTagToggle}
      />
    </Router>
  )
}

export default App
