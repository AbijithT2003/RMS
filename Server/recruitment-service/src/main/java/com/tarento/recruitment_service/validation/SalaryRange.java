package com.tarento.recruitment_service.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = SalaryRangeValidator.class)
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface SalaryRange {
    String message() default "Maximum salary must be greater than minimum salary";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}