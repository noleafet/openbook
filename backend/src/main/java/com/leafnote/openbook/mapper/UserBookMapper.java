package com.leafnote.openbook.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import com.leafnote.openbook.annotation.IgnoreAuditFields;
import com.leafnote.openbook.dto.UserBookRequestDTO;
import com.leafnote.openbook.dto.UserBookResponseDTO;
import com.leafnote.openbook.model.UserBook;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, uses = {UserMapper.class, BookMapper.class})
public interface UserBookMapper {
    UserBookResponseDTO toDTO(UserBook userBook);

    @IgnoreAuditFields
    @Mapping(target = "id", ignore = true)
    @Mapping(source = "userId", target = "user.id")
    @Mapping(source = "bookId", target = "book.id")
    UserBook toEntity(UserBookRequestDTO dto);
}