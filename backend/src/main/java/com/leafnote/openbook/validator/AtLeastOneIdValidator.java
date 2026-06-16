package com.leafnote.openbook.validator;

import com.leafnote.openbook.annotation.AtLeastOneId;
import com.leafnote.openbook.dto.LineRequestDTO;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class AtLeastOneIdValidator implements ConstraintValidator<AtLeastOneId, LineRequestDTO> {
    @Override
    public boolean isValid(LineRequestDTO dto, ConstraintValidatorContext context) {
        return dto.pageId() != null || dto.lineId() != null;
    }
}
