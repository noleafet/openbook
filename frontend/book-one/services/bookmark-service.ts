import apiClient from '@/lib/api/api-axios';
import { Bookmark } from '@/types/bookmark.types';
import { BaseHttpService } from '@/services/service';

export class BookmarkService extends BaseHttpService<Bookmark> {

  constructor() {
    super('bookmarks');
  }

  async createByPageIdOrLineId(item:{pageId:number|null, lineId:number|null}): Promise<Bookmark> {
    return await apiClient.post(`/${this.resource}`, item).then(res => res.data);
  }

  // Overriding to explicitly disallow this method
  override getById(..._: unknown[]): never {
    throw new Error("API method not supported.");
  }

  override update(..._: unknown[]): never {
    throw new Error("API method not supported.");
  }

};