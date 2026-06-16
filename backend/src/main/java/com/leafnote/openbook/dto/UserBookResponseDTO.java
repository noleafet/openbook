package com.leafnote.openbook.dto;

import com.leafnote.openbook.model.Book;
import com.leafnote.openbook.model.User;

public record UserBookResponseDTO(
        User user,
        Book book
) {}
