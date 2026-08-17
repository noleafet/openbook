package com.leafnote.openbook.dto;

import com.leafnote.openbook.annotation.AtLeastOneId;

import jakarta.validation.constraints.NotBlank;

@AtLeastOneId
public record LineRequestDTO(
    Long pageId,
    Long lineId,
    @NotBlank(message = "Content is required") String content
) implements IdCheckable {}
