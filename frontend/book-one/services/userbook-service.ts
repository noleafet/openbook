import apiClient from '@/lib/api/api-axios';
import { Book } from '@/types/book.types';
import { UserBook } from '@/types/userbook.types';
import { BaseHttpService } from '@/services/service';

export class UserBookService extends BaseHttpService<UserBook> {

  constructor() {
    super('userbooks');
  }

  async getBooksByUserId(userId: number): Promise<Book[]>{
    return apiClient.get(`/${this.resource}/users/${userId}/books`).then(res => res.data);
  }

};