import apiClient from '@/lib/api/api-axios';
import { Book } from '@/types/book.types';

export const BookService = {
  getBooks: async (): Promise<Book[]> => apiClient.get('/books').then(res => res.data),

  getBookById: async (id: number): Promise<Book> =>
    apiClient.get(`/books/${id}`).then(res => res.data),

  createBook: async (data: { title: string; author: string }): Promise<Book> =>
    apiClient.post('/books', data).then(res => res.data)
};