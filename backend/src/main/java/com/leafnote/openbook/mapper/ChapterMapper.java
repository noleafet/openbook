package com.leafnote.openbook.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import com.leafnote.openbook.annotation.IgnoreAuditFields;
import com.leafnote.openbook.dto.ChapterRequestDTO;
import com.leafnote.openbook.dto.ChapterResponseDTO;
import com.leafnote.openbook.model.Chapter;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, uses = {BookMapper.class})
public interface ChapterMapper {
    ChapterResponseDTO toDTO(Chapter chapter);

    @IgnoreAuditFields
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "pages", ignore = true)
    @Mapping(source = "bookId", target = "book.id")
    Chapter toEntity(ChapterRequestDTO dto);
}