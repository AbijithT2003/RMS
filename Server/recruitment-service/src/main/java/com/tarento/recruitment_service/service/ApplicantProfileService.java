package com.tarento.recruitment_service.service;

import com.tarento.recruitment_service.model.ApplicantProfile;
import com.tarento.recruitment_service.repository.ApplicantProfileRepository;
import com.tarento.recruitment_service.dto.ResponseDto.ApplicantProfileResponse;
import com.tarento.recruitment_service.config.PageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class ApplicantProfileService {
    private final ApplicantProfileRepository applicantProfileRepository;
    private final ModelMapper modelMapper;
    
    public ApplicantProfileResponse getApplicantById(UUID id) {
        ApplicantProfile applicant = applicantProfileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Applicant not found with id: " + id));
        return modelMapper.map(applicant, ApplicantProfileResponse.class);
    }
    
    public PageResponse<ApplicantProfileResponse> getAllApplicants(Pageable pageable) {
        Page<ApplicantProfile> applicants = applicantProfileRepository.findAll(pageable);
        Page<ApplicantProfileResponse> responsePage = applicants.map(applicant -> 
                modelMapper.map(applicant, ApplicantProfileResponse.class));
        return PageResponse.of(responsePage);
    }

    
}