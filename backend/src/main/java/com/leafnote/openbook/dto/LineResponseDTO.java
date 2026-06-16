package com.leafnote.openbook.dto;

import java.util.List;

public record LineResponseDTO(
    Long id,
    String content,
    List<LineResponseDTO> lines) {

}
