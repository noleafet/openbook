package com.leafnote.openbook.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import com.leafnote.openbook.annotation.IgnoreAuditFields;
import com.leafnote.openbook.dto.PageRequestDTO;
import com.leafnote.openbook.dto.PageResponseDTO;
import com.leafnote.openbook.model.Page;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, uses = {BookMapper.class})
public interface PageMapper {
    PageResponseDTO toDTO(Page page);

    @IgnoreAuditFields
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "lines", ignore = true)
    @Mapping(target = "number", ignore = true)
    @Mapping(source = "chapterId", target = "chapter.id")
    Page toEntity(PageRequestDTO dto);
}