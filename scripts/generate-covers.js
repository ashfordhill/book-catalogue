import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage, registerFont } from 'canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configPath = path.join(__dirname, '..', 'public', 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error('Error: OPENAI_API_KEY environment variable is not set');
  console.log('Usage: OPENAI_API_KEY=your-key-here node scripts/generate-covers.js');
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY
});

const COVER_WIDTH = 1024;
const COVER_HEIGHT = 1792;
const BORDER_RADIUS = 32;
const BORDER_WIDTH = 16;
const PADDING = 48;

function sanitizeFilename(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
}

function getBooksNeedingCovers() {
  const booksPath = path.join(__dirname, '..', 'public', 'books.json');

  if (!fs.existsSync(booksPath)) {
    console.error('Error: books.json not found at', booksPath);
    process.exit(1);
  }

  const booksData = fs.readFileSync(booksPath, 'utf-8');
  const allBooks = JSON.parse(booksData);

  const booksNeedingCovers = allBooks
    .filter(book => !book.coverUrl || book.coverUrl === '')
    .map(book => ({
      slug: sanitizeFilename(book.title),
      title: book.title,
      author: book.author
    }));

  return booksNeedingCovers;
}

const books = getBooksNeedingCovers();

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });

      fileStream.on('error', reject);
    }).on('error', reject);
  });
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function wrapText(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let current = '';

  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    const m = ctx.measureText(test);
    if (m.width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function getCoverFont() {
  const fontDir = path.join(__dirname, 'fonts');
  const fontPath = path.join(fontDir, 'SpaceMono-Bold.ttf');
  if (fs.existsSync(fontPath)) {
    try {
      registerFont(fontPath, { family: 'Space Mono' });
      return 'bold 56px "Space Mono"';
    } catch (e) {
      console.warn('Could not register font, using fallback:', e.message);
    }
  }
  return 'bold 56px sans-serif';
}

async function generateBackgroundArt(book, index, total) {
  const { backgroundStyleString, folderName } = config.coverStyle;
  const { style, quality, size } = config.dalleParams;

  const prompt = `Abstract background art only for a book cover. NO text, NO words, NO letters, NO typography.

Style: ${backgroundStyleString}

Theme: This book is "${book.title}" by ${book.author}. The image should suggest the book's subject through atmosphere, shapes, and color only—no written text.

Requirements:
- Flat 2D graphic style, face-on. No 3D, no mockups.
- Richer colors and geometric or digital textures that would sit behind title text.
- Must be suitable for a dark-themed, cyberpunk-style catalogue.`;

  console.log(`\n[${index + 1}/${total}] Generating background art: ${book.title}...`);

  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt,
    n: 1,
    size,
    quality,
    style
  });

  const imageUrl = response.data[0].url;
  const coversDir = path.join(__dirname, '..', 'public', 'covers', folderName);
  fs.mkdirSync(coversDir, { recursive: true });
  const rawPath = path.join(coversDir, `_raw_${book.slug}.png`);
  await downloadImage(imageUrl, rawPath);
  return rawPath;
}

async function compositeCover(book, rawArtPath) {
  const canvas = createCanvas(COVER_WIDTH, COVER_HEIGHT);
  const ctx = canvas.getContext('2d');

  const img = await loadImage(rawArtPath);
  const x = 0, y = 0, w = COVER_WIDTH, h = COVER_HEIGHT;

  ctx.save();
  roundRect(ctx, x, y, w, h, BORDER_RADIUS);
  ctx.clip();
  ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, w, h);
  ctx.restore();

  ctx.strokeStyle = '#000000';
  ctx.lineWidth = BORDER_WIDTH;
  roundRect(ctx, x, y, w, h, BORDER_RADIUS);
  ctx.stroke();

  const titleFont = getCoverFont();
  const authorFont = 'bold 28px sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const maxTextWidth = w - 2 * PADDING;
  ctx.font = titleFont;
  const titleLines = wrapText(ctx, book.title, maxTextWidth);
  const titleLineHeight = 68;
  const titleBlockHeight = titleLines.length * titleLineHeight;
  let titleY = h / 2 - titleBlockHeight / 2 - 20;

  for (const line of titleLines) {
    ctx.fillText(line, w / 2, titleY + titleLineHeight / 2);
    titleY += titleLineHeight;
  }

  ctx.font = authorFont;
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  ctx.fillText(book.author, w / 2, titleY + 20 + 18);
  ctx.fillStyle = '#ffffff';

  const filename = `${book.slug}.png`;
  const coversDir = path.join(__dirname, '..', 'public', 'covers', config.coverStyle.folderName);
  const filepath = path.join(coversDir, filename);
  const buf = canvas.toBuffer('image/png');
  fs.writeFileSync(filepath, buf);

  if (rawArtPath && fs.existsSync(rawArtPath)) {
    try { fs.unlinkSync(rawArtPath); } catch (_) {}
  }

  return filepath;
}

async function generateCover(book, index, total) {
  const { folderName } = config.coverStyle;

  try {
    const rawPath = await generateBackgroundArt(book, index, total);
    await compositeCover(book, rawPath);

    const filename = `${book.slug}.png`;
    console.log(`✓ Composite: ${folderName}/${filename}`);

    return {
      title: book.title,
      slug: book.slug,
      filename,
      path: `/covers/${folderName}/${filename}`
    };
  } catch (error) {
    console.error(`✗ Error for "${book.title}":`, error.message);
    return null;
  }
}

async function main() {
  if (books.length === 0) {
    console.log('No books need covers generated.');
    console.log('All books in books.json already have coverUrl values.');
    process.exit(0);
  }

  const useHybrid = config.coverStyle.hybrid !== false;
  console.log('Starting book cover generation (hybrid: background art + programmatic frame & text)...');
  console.log(`Found ${books.length} book(s) needing covers:`);
  books.forEach(book => {
    console.log(`  - ${book.slug}: "${book.title}" by ${book.author}`);
  });
  console.log(`\nSave folder: ${config.coverStyle.folderName}\n`);

  const results = [];

  for (let i = 0; i < books.length; i++) {
    const result = await generateCover(books[i], i, books.length);
    if (result) results.push(result);

    if (i < books.length - 1) {
      console.log('Waiting 5 seconds before next generation...');
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }

  console.log('\n=== GENERATION COMPLETE ===');
  console.log(`Successfully generated: ${results.length}/${books.length} covers`);

  if (results.length > 0) {
    console.log('\nGenerated covers:');
    results.forEach(r => {
      console.log(`  - ${r.title}: ${r.path}`);
    });
  }
}

main().catch(console.error);
