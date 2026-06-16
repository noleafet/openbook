package com.leafnote.openbook.dto;

import com.leafnote.openbook.annotation.AtLeastOneId;
import com.leafnote.openbook.model.Line;
import com.leafnote.openbook.model.Page;

@AtLeastOneId
public record BookmarkResponseDTO(
        Page page,
        Line line
) {}
