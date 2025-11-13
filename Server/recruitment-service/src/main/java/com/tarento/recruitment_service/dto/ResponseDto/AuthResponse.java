package com.tarento.recruitment_service.dto.ResponseDto;

import java.util.List;
import java.util.UUID;

import com.tarento.recruitment_service.model.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse{
    private String accessToken;
    private String tokenType;
    private UUID userId;
    private String email;
    private String fullName;
    private UUID applicantId;  // Add this
    private UUID recruiterId;  // Add this
    private List<String> roles; // Add this
    private long expiresIn;
    
    public static AuthResponse of(String accessToken, String email, String fullName, long expiresIn) {
        return AuthResponse.builder()
                .accessToken(accessToken)
                .tokenType("Bearer")
                .email(email)
                .fullName(fullName)
                .expiresIn(expiresIn)
                .build();
    }
    
    public static AuthResponse of(String accessToken, UUID userId, String email, 
                                String fullName, UUID applicantId, UUID recruiterId, 
                                List<String> roles, long expiresIn) {
        return AuthResponse.builder()
                .accessToken(accessToken)
                .tokenType("Bearer")
                .userId(userId)
                .email(email)
                .fullName(fullName)
                .applicantId(applicantId)
                .recruiterId(recruiterId)
                .roles(roles)
                .expiresIn(expiresIn)
                .build();
    }
}

