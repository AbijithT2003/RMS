package com.tarento.recruitment_service.repository;

import com.tarento.recruitment_service.model.JobApplication;
import com.tarento.recruitment_service.model.enums.ApplicationStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;   
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, UUID> {
    Page<JobApplication> findByJobId(UUID jobId, Pageable pageable);
    Page<JobApplication> findByApplicantId(UUID applicantId, Pageable pageable);
    Page<JobApplication> findByStatus(ApplicationStatus status, Pageable pageable);
    Page<JobApplication> findByOrganizationId(UUID organizationId, Pageable pageable);
    List<JobApplication> findByAssignedToId(UUID userId);
    
    @Query("SELECT ja FROM JobApplication ja WHERE ja.job.id = :jobId AND ja.status = :status")
    Page<JobApplication> findByJobIdAndStatus(@Param("jobId") UUID jobId,
                                               @Param("status") ApplicationStatus status,
                                               Pageable pageable);
    
    boolean existsByJobIdAndApplicantId(UUID jobId, UUID applicantId);
    
    @Query("SELECT COUNT(ja) FROM JobApplication ja WHERE ja.job.id = :jobId")
    long countApplicationsByJobId(@Param("jobId") UUID jobId);
}

