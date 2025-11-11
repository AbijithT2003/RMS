package com.tarento.recruitment_service.dto.ResponseDto;

import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;      
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {
    private UUID id;

    private String email;
    private String fullName;
    private String phone;
    private String profileImageUrl;
    private boolean isActive;
    private LocalDateTime lastLogin;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}