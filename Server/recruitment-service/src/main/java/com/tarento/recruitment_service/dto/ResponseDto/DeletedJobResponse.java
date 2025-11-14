package com.tarento.recruitment_service.dto.ResponseDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.UUID;

@Data
@AllArgsConstructor
public class DeletedJobResponse {
    private UUID id;
    private String title;
}
