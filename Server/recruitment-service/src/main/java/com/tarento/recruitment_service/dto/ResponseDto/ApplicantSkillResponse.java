package com.tarento.recruitment_service.dto.ResponseDto;    

import com.tarento.recruitment_service.model.enums.ProficiencyLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.UUID;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApplicantSkillResponse {
    private UUID id;
    private UUID applicantId;
    private UUID skillId;
    private String skillName;
    private ProficiencyLevel proficiencyLevel;
    private Integer yearsOfExperience;
    private LocalDateTime createdAt;
}


