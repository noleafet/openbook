package com.leafnote.openbook.dto;

import com.leafnote.openbook.annotation.AtLeastOneId;

@AtLeastOneId
public record BookmarkRequestDTO(
        Long id,
        Long pageId,
        Long lineId
) {}
