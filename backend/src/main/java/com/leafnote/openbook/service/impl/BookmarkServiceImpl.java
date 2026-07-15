package com.leafnote.openbook.service.impl;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;

import com.leafnote.openbook.dto.BookDTO;
import com.leafnote.openbook.dto.BookmarkRequestDTO;
import com.leafnote.openbook.dto.BookmarkResponseDTO;
import com.leafnote.openbook.dto.PageResponseDTO;
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
    public void deleteBookmarkById(Long id) {
        bookmarkRepository.deleteById(id);
    }

    @Override
    public List<BookmarkResponseDTO> getAllBookmarksByBooks(List<BookDTO> bookDTOs) {

        bookDTOs.forEach(book -> book.chapters().forEach(chapter -> chapter.pages()));
        Stream<PageResponseDTO> pageResponseDTOs = bookDTOs.stream()
            .flatMap(book -> book.chapters().stream())
            .flatMap(chapter -> chapter.pages().stream());

        List<Bookmark> pageBookmarks = pageResponseDTOs.map(page -> bookmarkRepository.findByPage_Id(page.id())).toList();
        List<Bookmark> lineBookmarks = pageResponseDTOs.flatMap(page -> page.lines().stream())
            .map(line -> bookmarkRepository.findByLine_Id(line.id())).toList();

        return Stream.concat(pageBookmarks.stream(), lineBookmarks.stream())
            .map(bookmarkMapper::toDTO)
            .toList();
    }

}
