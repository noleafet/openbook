package com.leafnote.openbook.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.leafnote.openbook.dto.BookmarkRequestDTO;
import com.leafnote.openbook.dto.BookmarkResponseDTO;
import com.leafnote.openbook.mapper.BookmarkMapper;
import com.leafnote.openbook.model.Bookmark;
import com.leafnote.openbook.repository.BookmarkRepository;
import com.leafnote.openbook.service.BookmarkService;

import jakarta.transaction.Transactional;

@Service
public class BookmarkServiceImpl implements BookmarkService {

    private final BookmarkRepository bookmarkRepository;

    private final BookmarkMapper bookmarkMapper;

    public BookmarkServiceImpl(BookmarkRepository bookmarkRepository, BookmarkMapper bookmarkMapper) {
        this.bookmarkRepository = bookmarkRepository;
        this.bookmarkMapper = bookmarkMapper;
    }

    @Override
    public List<BookmarkResponseDTO> getAllBookmarks() {

        return bookmarkRepository.findAll().stream()
                .map(bookmarkMapper::toDTO)
                .collect(Collectors.toList());

    }

    @Override
    public BookmarkResponseDTO addBookmark(BookmarkRequestDTO bookmarkDTO) {
        Bookmark savedBookmark = bookmarkRepository.save(bookmarkMapper.toEntity(bookmarkDTO));
        return bookmarkMapper.toDTO(savedBookmark);
    }

    @Transactional
    @Override
    public void deleteBookmarkById(long id) {
        bookmarkRepository.deleteById(id);
    }

}
