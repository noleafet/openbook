package com.leafnote.openbook.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import com.leafnote.openbook.annotation.IgnoreAuditFields;
import com.leafnote.openbook.dto.LineRequestDTO;
import com.leafnote.openbook.dto.LineResponseDTO;
import com.leafnote.openbook.model.Line;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, uses = {PageMapper.class})
public interface LineMapper {
    LineResponseDTO toDTO(Line line);

    @IgnoreAuditFields
    @Mapping(target = "id", ignore = true)
    @Mapping(source = "pageId", target = "page.id")
    @Mapping(source = "lineId", target = "line.id")
    @Mapping(target = "lines", ignore = true)
    Line toEntity(LineRequestDTO dto);
}