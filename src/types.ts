export interface Book {
  title: string;
  author: string;
  coverUrl: string;
  synopsis: string;
  tags: string[];
  quotes: string[];
  reviewFile: string;
}

export interface BookWithId extends Book {
  id: string;
}
