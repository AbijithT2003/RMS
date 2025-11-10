package com.tarento.recruitment_service.repository;

import com.tarento.recruitment_service.model.JobPosting;
import com.tarento.recruitment_service.model.enums.PostingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
@Repository
public interface JobPostingRepository extends JpaRepository<JobPosting, UUID> {
    List<JobPosting> findByJobId(UUID jobId);
    List<JobPosting> findByPlatform(String platform);
    Optional<JobPosting> findByExternalJobId(String externalJobId);
    List<JobPosting> findByStatus(PostingStatus status);
}