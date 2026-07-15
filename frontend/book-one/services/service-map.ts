import { Service } from '@/services/service';
import { Book, Chapter, Page, Line } from '@/types/book.types';
import { BookService, ChapterService, LineService, PageService } from './book-service';

export type BookTypeMapping = Book | Chapter | Page | Line;

export const ServiceMap = {

  getServiceByKey: (key: string): Service<BookTypeMapping> => {

    const map: Record<string, Service<BookTypeMapping>> = {
      'b': new BookService(),
      'c': new ChapterService(),
      'p': new PageService(),
      'l': new LineService()
    };

    return map[key];
  }
}