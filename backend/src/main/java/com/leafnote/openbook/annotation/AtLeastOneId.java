package com.leafnote.openbook.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import com.leafnote.openbook.validator.AtLeastOneIdValidator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = AtLeastOneIdValidator.class)
public @interface AtLeastOneId {
    String message() default "Either page id or line id must be provided";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
