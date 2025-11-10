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
public class JobSkillResponse {
    private UUID id;
    private UUID jobId;
    private UUID skillId;
    private String skillName;
    private Boolean isRequired;
    private ProficiencyLevel proficiencyLevel;
    private LocalDateTime createdAt;
}
