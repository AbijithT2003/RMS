package com.tarento.recruitment_service.model;

import jakarta.persistence.Embeddable;
import java.math.BigDecimal;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SalaryRange {
    @Column(name = "salary_min")
    private BigDecimal min;
    
    @Column(name = "salary_max")
    private BigDecimal max;
}
