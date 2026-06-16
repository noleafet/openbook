package com.leafnote.openbook.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import com.leafnote.openbook.annotation.IgnoreAuditFields;
import com.leafnote.openbook.dto.UserDTO;
import com.leafnote.openbook.model.User;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserMapper {
    UserDTO toDTO(User user);

    @IgnoreAuditFields
    User toEntity(UserDTO dto);
}