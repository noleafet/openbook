package com.leafnote.openbook.validator;

import com.leafnote.openbook.annotation.AtLeastOneId;
import com.leafnote.openbook.dto.IdCheckable;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class AtLeastOneIdValidator implements ConstraintValidator<AtLeastOneId, IdCheckable> {
    @Override
    public boolean isValid(IdCheckable dto, ConstraintValidatorContext context) {
        return dto.pageId() != null || dto.lineId() != null;
    }
}
