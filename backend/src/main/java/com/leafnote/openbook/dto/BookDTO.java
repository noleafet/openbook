package com.leafnote.openbook.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;

public record BookDTO(
        @JsonProperty(access = JsonProperty.Access.READ_ONLY) Long id,
        @NotBlank(message = "Title is required")
        String title,
        String author,
        @JsonProperty(access = JsonProperty.Access.READ_ONLY) List<ChapterResponseDTO> chapters) {

}
