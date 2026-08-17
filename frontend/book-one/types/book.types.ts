export interface Book {
  id: number;
  title: string;
  author: string;
  chapters: Chapter[]
}

export interface Chapter {
  id: number;
  bookId: number;
  title: string;
  pages: Page[];
}

export interface Page {
    id: number;
    chapterId: number;
    number: number;
    note: string;
    lines: Line[]
}

export interface Line {
    id: number;
    pageId: number;
    lineId: number;
    content: string;
    lines: Line[];
}