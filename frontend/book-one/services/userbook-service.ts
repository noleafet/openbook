import apiClient from '@/lib/api/api-axios';
import { Book } from '@/types/book.types';
import { UserBook } from '@/types/userbook.types';

export const UserBookService = {

  getBooksByUserId: async (userId: number): Promise<Book[]> =>
    apiClient.get(`/userbooks/users/${userId}/books`).then(res => res.data),

  createUserBook: async (data: { userId:number, bookId: number }): Promise<UserBook> =>
    apiClient.post('/userbooks', data).then(res => res.data)
};