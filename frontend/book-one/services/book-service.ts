import { Book, Chapter, Page, Line } from '@/types/book.types';
import { BaseHttpService } from '@/services/service';

export class BookService extends BaseHttpService<Book> {

  constructor() {
    super('books');
  }

};

export class ChapterService extends BaseHttpService<Chapter> {

  constructor() {
    super('chapters');
  }

};

export class PageService extends BaseHttpService<Page> {

  constructor() {
    super('pages');
  }

};

export class LineService extends BaseHttpService<Line> {

  constructor() {
    super('lines');
  }

};