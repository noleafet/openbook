package com.leafnote.openbook.annotation;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

import org.mapstruct.Mapping;

@Retention(RetentionPolicy.CLASS)
@Mapping(target = "createdAt", ignore = true)
@Mapping(target = "modifiedAt", ignore = true)
public @interface IgnoreAuditFields {}