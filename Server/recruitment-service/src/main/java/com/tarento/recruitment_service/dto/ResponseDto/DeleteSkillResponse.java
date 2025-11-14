package com.tarento.recruitment_service.dto.ResponseDto;

import java.util.UUID;
import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class DeleteSkillResponse {
    private UUID skillId;
    private String skillName;
    private String message;
}
