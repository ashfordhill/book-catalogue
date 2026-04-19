import { useState, useMemo, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { BottomNav } from './components/BottomNav'
import { Home } from './pages/Home'
import type { Book, BookWithId } from './types'

function App() {
  const [searchQuery, setSearchQuery] = useState('');
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
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-mono text-purple-400 text-lg uppercase">Loading...</p>
      </div>
    );
  }
  
  return (
    <Router>
      <div className="h-screen flex flex-col relative z-10">
        <main className="flex-1 overflow-y-auto pt-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto pb-6">
            <Routes>
              <Route path="/" element={<Home books={uniqueBooks} searchQuery={searchQuery} />} />
            </Routes>
          </div>
        </main>

        <footer className="shrink-0">
          <BottomNav onSearch={setSearchQuery} />
        </footer>
      </div>
    </Router>
  )
}

export default App
