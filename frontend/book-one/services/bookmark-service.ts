import { Bookmark } from '@/types/bookmark.types';
import { BaseHttpService } from '@/services/service';

export class BookmarkService extends BaseHttpService<Bookmark> {

  constructor() {
    super('bookmarks');
  }

  // Overriding to explicitly disallow this method
  override getById(..._: unknown[]): never {
    throw new Error("API method not supported.");
  }

  override update(..._: unknown[]): never {
    throw new Error("API method not supported.");
  }

};