package com.tarento.recruitment_service.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.annotation.Isolation;
import com.tarento.recruitment_service.repository.JobApplicationRepository;
import com.tarento.recruitment_service.exception.BusinessException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ConcurrencyService {
    
    private final JobApplicationRepository jobApplicationRepository;
    
    @Transactional(isolation = Isolation.SERIALIZABLE)
    public void preventDuplicateApplication(UUID jobId, UUID applicantId) {
        if (jobApplicationRepository.existsByJobIdAndApplicantId(jobId, applicantId)) {
            throw new BusinessException("Application already exists for this job");
        }
    }
    
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public long getApplicationCount(UUID jobId) {
        return jobApplicationRepository.countApplicationsByJobId(jobId);
    }
}