package com.leafnote.openbook.util;

import com.leafnote.openbook.model.Role;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import java.util.Arrays;
import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

@Converter
public class RoleCollectionConverter implements AttributeConverter<Set<Role>, String> {

    // Converts Java Set to Comma-Delimited String for Database
    @Override
    public String convertToDatabaseColumn(Set<Role> attribute) {
        if (attribute == null || attribute.isEmpty()) {
            return "";
        }
        return attribute.stream()
                .map(Role::name)
                .collect(Collectors.joining(","));
    }

    // Converts Comma-Delimited String from Database to Java Set
    @Override
    public Set<Role> convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.isBlank()) {
            return Collections.emptySet();
        }
        return Arrays.stream(dbData.split(","))
                .map(Role::valueOf)
                .collect(Collectors.toSet());
    }
}

