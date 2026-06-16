import { bookService } from '@/services/book-service';

import mockApiClient from '@/lib/api/mock-api-axios';

const expectedBook = { id: 1, title: 'Meme', author: 'system' };
const expectedNewBook = { id: 1, title: 'Meme', author: 'system' };
const expectedUpdatedBook = { id: 1, title: 'Social Media', author: 'system' };

describe('BookService', () => {

  beforeAll(() => {

    // Flag-based condition
    if (process.env.USE_MOCK === 'true') {

      mockApiClient.onGet('/books').reply(200, {
        data: [expectedBook],
      });

      mockApiClient.onGet('/books/1').reply(200, {
        'data': expectedBook
      });

      mockApiClient.onPost('/books/').reply(201, {
        'data': expectedNewBook
      });

      mockApiClient.onPut('/books/1', { 'data': expectedUpdatedBook }).reply(200);

      mockApiClient.onDelete('/books/1').reply(204);

      mockApiClient.onGet('/error').networkError();
    } else {
      // Restore original axios behavior for real network calls
      mockApiClient.restore();
    }
  });

  afterAll(() => {
    mockApiClient.reset();
  });

  it('should fetch a book successfully', async () => {

    const book = await bookService.getBookById(1);
    //console.log(book);
    expect(book).toEqual(expectedBook);
  });
});