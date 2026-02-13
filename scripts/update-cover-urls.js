import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configPath = path.join(__dirname, '..', 'public', 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

function sanitizeFilename(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
}

function main() {
  const booksPath = path.join(__dirname, '..', 'public', 'books.json');
  const folderName = config.coverStyle.folderName;
  const coversDir = path.join(__dirname, '..', 'public', 'covers', folderName);
  
  if (!fs.existsSync(booksPath)) {
    console.error('Error: books.json not found');
    process.exit(1);
  }
  
  const booksData = fs.readFileSync(booksPath, 'utf-8');
  const books = JSON.parse(booksData);
  
  let updated = false;
  
  books.forEach(book => {
    if (!book.coverUrl || book.coverUrl === '') {
      const slug = sanitizeFilename(book.title);
      const coverPath = path.join(coversDir, `${slug}.png`);
      
      if (fs.existsSync(coverPath)) {
        book.coverUrl = `/covers/${folderName}/${slug}.png`;
        console.log(`✓ Updated coverUrl for: ${book.title}`);
        updated = true;
      } else {
        console.log(`⚠ Cover not found for: ${book.title} (expected: ${folderName}/${slug}.png)`);
      }
    }
  });
  
  if (updated) {
    fs.writeFileSync(booksPath, JSON.stringify(books, null, 2));
    console.log('\n✓ books.json updated successfully');
  } else {
    console.log('\nNo updates needed');
  }
}

main();
