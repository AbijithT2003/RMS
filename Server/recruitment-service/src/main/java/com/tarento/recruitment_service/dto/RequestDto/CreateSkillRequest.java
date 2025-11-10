package com.tarento.recruitment_service.dto.RequestDto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateSkillRequest {
    @NotBlank(message = "Skill name is required")
    private String name;
    
    private String category;
}

