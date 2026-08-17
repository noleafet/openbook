package com.leafnote.openbook.dto;

public record BookmarkResponseDTO(
        Long id,
        PageResponseDTO page,
        LineResponseDTO line
) {}
