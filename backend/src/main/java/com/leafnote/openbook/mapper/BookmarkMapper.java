package com.leafnote.openbook.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import com.leafnote.openbook.annotation.IgnoreAuditFields;
import com.leafnote.openbook.dto.BookmarkRequestDTO;
import com.leafnote.openbook.dto.BookmarkResponseDTO;
import com.leafnote.openbook.model.Bookmark;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, uses = {PageMapper.class, LineMapper.class})
public interface BookmarkMapper {
    BookmarkResponseDTO toDTO(Bookmark bookmark);

    @IgnoreAuditFields
    @Mapping(target = "id", ignore = true)
    @Mapping(source = "pageId", target = "page.id")
    @Mapping(source = "lineId", target = "line.id")
    Bookmark toEntity(BookmarkRequestDTO dto);
}