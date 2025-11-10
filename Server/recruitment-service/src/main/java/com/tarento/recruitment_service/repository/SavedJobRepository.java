package com.tarento.recruitment_service.repository;

import com.tarento.recruitment_service.model.SavedJob;      
import org.springframework.data.jpa.repository.JpaRepository;   
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.stereotype.Repository;

@Repository
public interface SavedJobRepository extends JpaRepository<SavedJob, UUID> {
    List<SavedJob> findByApplicantId(UUID applicantId);
    Optional<SavedJob> findByApplicantIdAndJobId(UUID applicantId, UUID jobId);
    boolean existsByApplicantIdAndJobId(UUID applicantId, UUID jobId);
    void deleteByApplicantIdAndJobId(UUID applicantId, UUID jobId);
}
