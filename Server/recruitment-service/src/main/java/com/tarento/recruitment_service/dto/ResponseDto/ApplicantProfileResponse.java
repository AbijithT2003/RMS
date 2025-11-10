package com.tarento.recruitment_service.dto.ResponseDto;

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
public class ApplicantProfileResponse {
    private UUID id;
    private UUID userId;
    private String resumeUrl;
    private String currentTitle;
    private Integer experienceYears;
    private String locationCity;
    private String locationState;
    private String locationCountry;
    private String bio;
    private LocalDateTime createdAt;
}
