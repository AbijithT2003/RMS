package com.tarento.recruitment_service.dto.RequestDto;

import com.tarento.recruitment_service.model.enums.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Data;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateInterviewRequest {

    @NotNull(message = "Application ID is required")
    private UUID applicationId;
    
    private InterviewStatus status;
    private InterviewResult result;
    
    @Size(max = 5000, message = "Feedback must not exceed 5000 characters")
    private String feedback;
    
    @Min(value = 1, message = "Rating must be between 1 and 5")
    @Max(value = 5, message = "Rating must be between 1 and 5")
    private Integer rating;
}
