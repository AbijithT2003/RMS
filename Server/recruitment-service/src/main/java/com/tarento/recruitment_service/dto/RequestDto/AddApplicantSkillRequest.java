package com.tarento.recruitment_service.dto.RequestDto;

import com.tarento.recruitment_service.model.enums.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddApplicantSkillRequest {
    @NotNull(message = "Applicant ID is required")
    private UUID applicantId;
    
    @NotNull(message = "Skill ID is required")
    private UUID skillId;
    
    @NotNull(message = "Proficiency level is required")
    private ProficiencyLevel proficiencyLevel;
    
    @Min(value = 0, message = "Years of experience must be non-negative")
    private Integer yearsOfExperience;
}
