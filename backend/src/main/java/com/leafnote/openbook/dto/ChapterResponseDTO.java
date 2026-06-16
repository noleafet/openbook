package com.leafnote.openbook.dto;

import java.util.List;

public record ChapterResponseDTO(
    Long id, 
    String title,
    List<PageResponseDTO> pages) {

}
