import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { BookWithId } from '../types';
import '../styles/shared.css';

interface ReviewDetailProps {
  books: BookWithId[];
}

export function ReviewDetail({ books }: ReviewDetailProps) {
  const { slug } = useParams<{ slug: string }>();
  const [markdown, setMarkdown] = useState<string>('');
  const [loading, setLoading] = useState(true);
  
  const book = books.find(b => b.reviewFile === `/reviews/${slug}`);
  
  useEffect(() => {
    if (!book || !book.reviewFile) {
      setLoading(false);
      return;
    }
    
    fetch(book.reviewFile)
      .then(res => res.text())
      .then(text => {
        setMarkdown(text);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading review:', err);
        setLoading(false);
      });
  }, [book]);
  
  if (!book) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <p className="text-2xl font-mono font-bold tracking-wider uppercase text-purple-400 mb-4">
          &gt; REVIEW_NOT_FOUND
        </p>
        <Link
          to="/reviews"
          className="font-mono text-sm text-purple-400 hover:text-purple-300 uppercase"
        >
          &lt; BACK_TO_REVIEWS
        </Link>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <Link
        to="/reviews"
        className="inline-block font-mono text-sm text-purple-400 hover:text-purple-300 mb-6 uppercase"
      >
        &lt; BACK_TO_REVIEWS
      </Link>
      
      <article className="border-2 border-purple-500 p-8 text-center">
        <div className="mb-8">
          <h1 className="font-mono text-6xl md:text-7xl font-bold text-white uppercase tracking-wider mb-4" style={{ fontFamily: "'Space Mono', monospace", letterSpacing: '0.1em' }}>
            {book.title}
          </h1>
          <p className="font-mono text-2xl text-[#2dffc4]/90 mb-6" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            BY {book.author.toUpperCase()}
          </p>
          
          <div className="flex flex-wrap gap-2 justify-center">
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
        </div>

        <div className="border-t-2 border-purple-500/50 pt-8">
          {loading ? (
            <p className="font-mono text-purple-400 text-center py-8">Loading review...</p>
          ) : (
            <div className="prose prose-invert prose-purple max-w-none font-mono">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold text-purple-400 uppercase tracking-wider mb-6 mt-0">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold text-purple-400 uppercase tracking-wider mb-4 mt-8">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-bold text-purple-400 uppercase tracking-wider mb-3 mt-6">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-purple-300/90 leading-relaxed mb-4">{children}</p>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-purple-500 pl-4 italic text-purple-300/80 my-4">
                      {children}
                    </blockquote>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside text-purple-300/90 mb-4 space-y-2">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside text-purple-300/90 mb-4 space-y-2">
                      {children}
                    </ol>
                  ),
                  strong: ({ children }) => (
                    <strong className="text-purple-400 font-bold">{children}</strong>
                  ),
                  em: ({ children }) => (
                    <em className="text-purple-300 italic">{children}</em>
                  ),
                  code: ({ children }) => (
                    <code className="bg-purple-500/10 px-1 py-0.5 rounded text-purple-300 font-mono text-sm">
                      {children}
                    </code>
                  ),
                  img: ({ src, alt }) => (
                    <img 
                      src={src} 
                      alt={alt || ''} 
                      className="rounded-lg border-2 border-purple-500/30 my-6 max-w-full"
                    />
                  ),
                }}
              >
                {markdown}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
