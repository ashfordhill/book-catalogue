export interface Book {
  title: string;
  author: string;
  coverUrl: string;
  tags: string[];
  quotes: string[];
  readingNow: boolean;
}

export interface BookWithId extends Book {
  id: string;
}
