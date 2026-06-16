package com.leafnote.openbook.service;

import java.util.List;

import com.leafnote.openbook.dto.BookDTO;
import com.leafnote.openbook.dto.UserBookRequestDTO;
import com.leafnote.openbook.dto.UserBookResponseDTO;

public interface UserBookService {

    public UserBookResponseDTO addUserBook(UserBookRequestDTO userBookDTO);
    
    public void deleteUserBookById(Long id);

    public List<BookDTO> getBooksByUserId(Long userId);

}
