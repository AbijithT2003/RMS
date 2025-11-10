package com.tarento.recruitment_service.validation;

import com.tarento.recruitment_service.dto.RequestDto.CreateJobRequest;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class SalaryRangeValidator implements ConstraintValidator<SalaryRange, CreateJobRequest> {
    @Override
    public void initialize(SalaryRange constraintAnnotation) {
    }

    @Override
    public boolean isValid(CreateJobRequest request, ConstraintValidatorContext context) {
        if (request.getSalaryMin() == null || request.getSalaryMax() == null) {
            return true; // Let @NotNull handle null validation
        }
        return request.getSalaryMax().compareTo(request.getSalaryMin()) >= 0;
    }
}