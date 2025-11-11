package com.tarento.recruitment_service.dto.ResponseDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {
    private String accessToken;
    private String refreshToken;
    private String tokenType;
    private String email;
    private String fullName;
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
}
