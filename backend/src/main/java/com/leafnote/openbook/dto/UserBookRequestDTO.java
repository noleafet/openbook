package com.leafnote.openbook.dto;

public record UserBookRequestDTO(
        Long id,
        Long userId,
        Long bookId
) {}
