package com.leafnote.openbook.service;

import java.util.List;

import com.leafnote.openbook.dto.BookDTO;

public interface BookService {

    public BookDTO addBook(BookDTO bookDTO);

    public BookDTO getBookById(Long id);

    public BookDTO updateBook(Long id, BookDTO bookDTO);
    
    public void deleteBookById(Long id);

    public List<BookDTO> getAllBooks();

}
