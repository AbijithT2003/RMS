package com.tarento.recruitment_service.dto.RequestDto;

import com.tarento.recruitment_service.model.enums.*;
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
public class AddJobSkillRequest {
    @NotNull(message = "Job ID is required")
    private UUID jobId;
    
    @NotNull(message = "Skill ID is required")
    private UUID skillId;
    
    @NotNull(message = "Is required field is mandatory")
    private Boolean isRequired;
    
    private ProficiencyLevel proficiencyLevel;
}
