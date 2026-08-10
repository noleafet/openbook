package com.leafnote.openbook.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.leafnote.openbook.dto.BookDTO;
import com.leafnote.openbook.exception.ResourceNotFoundException;
import com.leafnote.openbook.mapper.BookMapper;
import com.leafnote.openbook.model.Book;
import com.leafnote.openbook.repository.BookRepository;
import com.leafnote.openbook.service.BookService;

import jakarta.transaction.Transactional;

@Service
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;

    private final BookMapper bookMapper;

    public BookServiceImpl(BookRepository bookRepository, BookMapper bookMapper) {
        this.bookRepository = bookRepository;
        this.bookMapper = bookMapper;
    }

    @Override
    public List<BookDTO> getAllBooks() {

        return bookRepository.findAll(Sort.by("title")).stream()
                .map(bookMapper::toDTO)
                .collect(Collectors.toList());

    }

    @Override
    public BookDTO addBook(BookDTO bookDTO) {
        Book savedBook = bookRepository.save(bookMapper.toEntity(bookDTO));
        return bookMapper.toDTO(savedBook);
    }

    @Override
    public BookDTO getBookById(Long id) {
        return bookMapper.toDTO(bookRepository.findById(id)
                .orElseThrow((() -> new ResourceNotFoundException(Book.class, "id", id))));
    }

    @Override
    public BookDTO updateBook(Long id, BookDTO bookDTO) {

        Book existingBook = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(Book.class, "id", id));

        Optional.ofNullable(bookDTO.title()).ifPresent(existingBook::setTitle);
        Optional.ofNullable(bookDTO.author()).ifPresent(existingBook::setAuthor);

        bookRepository.save(existingBook);

        return bookMapper.toDTO(existingBook);

    }

    @Transactional
    @Override
    public void deleteBookById(Long id) {
        bookRepository.deleteById(id);
    }

}
