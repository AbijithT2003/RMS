package com.tarento.recruitment_service.dto.RequestDto;

import lombok.Data;

@Data
public class UpdateUserRequest {
    private String fullName;
    private String phone;
    private String profileImageUrl;
    private Boolean isActive;
}
