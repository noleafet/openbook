package com.leafnote.openbook.dto;

import java.util.List;

public record PageResponseDTO(
    Long id,
    Long number,
    String note,
    List<LineResponseDTO> lines) {

}
