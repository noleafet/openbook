package com.leafnote.openbook.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.leafnote.openbook.dto.BookDTO;
import com.leafnote.openbook.dto.UserBookRequestDTO;
import com.leafnote.openbook.dto.UserBookResponseDTO;
import com.leafnote.openbook.mapper.BookMapper;
import com.leafnote.openbook.mapper.UserBookMapper;
import com.leafnote.openbook.model.UserBook;
import com.leafnote.openbook.repository.UserBookRepository;
import com.leafnote.openbook.service.UserBookService;

import jakarta.transaction.Transactional;

@Service
public class UserBookServiceImpl implements UserBookService {

    private final UserBookRepository userBookRepository;

    private final UserBookMapper userBookMapper;

    private final BookMapper bookMapper;

    public UserBookServiceImpl(UserBookRepository userBookRepository, UserBookMapper userBookMapper, BookMapper bookMapper) {
        this.userBookRepository = userBookRepository;
        this.userBookMapper = userBookMapper;
        this.bookMapper = bookMapper;
    }

    @Override
    public List<BookDTO> getBooksByUserId(Long userId) {

        return userBookRepository.findBooksByUser_Id(null).stream()
                .map(bookMapper::toDTO)
                .collect(Collectors.toList());

    }

    @Override
    public UserBookResponseDTO addUserBook(UserBookRequestDTO userBookDTO) {
        UserBook savedUserBook = userBookRepository.save(userBookMapper.toEntity(userBookDTO));
        return userBookMapper.toDTO(savedUserBook);
    }

    @Transactional
    @Override
    public void deleteUserBookById(Long id) {
        userBookRepository.deleteById(id);
    }

}
