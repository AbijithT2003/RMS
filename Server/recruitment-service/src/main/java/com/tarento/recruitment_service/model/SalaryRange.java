package com.tarento.recruitment_service.model;

import jakarta.persistence.Embeddable;
import java.math.BigDecimal;

@Embeddable
public class SalaryRange {
    private BigDecimal min;
    private BigDecimal max;
}
