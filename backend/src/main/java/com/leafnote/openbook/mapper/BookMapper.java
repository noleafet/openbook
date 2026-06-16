package com.leafnote.openbook.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import com.leafnote.openbook.annotation.IgnoreAuditFields;
import com.leafnote.openbook.dto.BookDTO;
import com.leafnote.openbook.model.Book;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface BookMapper {
    BookDTO toDTO(Book book);

    @IgnoreAuditFields
    @Mapping(target = "chapters", ignore = true)
    Book toEntity(BookDTO dto);
}