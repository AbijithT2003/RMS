package com.tarento.recruitment_service.dto.RequestDto;

import jakarta.validation.constraints.*;
import lombok.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateOrganizationRequest {
    @NotBlank(message = "Organization name is required")
    private String name;
    
    private String website;
    private String industry;
    private String headquartersLocation;
    private String description;
    
    @NotNull(message = "Status is required")
    private boolean isActive;
}