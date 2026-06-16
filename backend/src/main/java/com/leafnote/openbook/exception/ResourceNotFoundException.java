package com.leafnote.openbook.exception;

import lombok.Getter;

@Getter
public class ResourceNotFoundException extends RuntimeException {
    private String resourceName;
    private String fieldName;
    private Object fieldValue;

    public ResourceNotFoundException(Class<?> origin, String fieldName, Object fieldValue) {
        super(String.format("%s not found with %s : '%s'", origin, fieldName, fieldValue));
        this.resourceName = origin.getSimpleName();
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
    }

}