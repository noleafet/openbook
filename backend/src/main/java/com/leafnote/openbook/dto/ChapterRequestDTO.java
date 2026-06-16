package com.leafnote.openbook.dto;

import jakarta.validation.constraints.NotBlank;

public record ChapterRequestDTO(
    Long bookId, 
    @NotBlank(message = "Title is required")
    String title) {

}
