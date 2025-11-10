package com.tarento.recruitment_service.repository;

import com.tarento.recruitment_service.model.Job;
import com.tarento.recruitment_service.model.enums.JobStatus;
import com.tarento.recruitment_service.model.enums.JobType;
import com.tarento.recruitment_service.model.enums.WorkMode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface JobRepository extends JpaRepository<Job, UUID> {
    Page<Job> findByStatus(JobStatus status, Pageable pageable);
    Page<Job> findByOrganizationId(UUID organizationId, Pageable pageable);
    
    @Query("SELECT j FROM Job j WHERE j.status = :status " +
           "AND (:jobType IS NULL OR j.jobType = :jobType) " +
           "AND (:workMode IS NULL OR j.workMode = :workMode) " +
           "AND (:locationCity IS NULL OR j.locationCity = :locationCity)")
    Page<Job> searchJobs(@Param("status") JobStatus status,
                         @Param("jobType") JobType jobType,
                         @Param("workMode") WorkMode workMode,
                         @Param("locationCity") String locationCity,
                         Pageable pageable);
    
       List<Job> findByCreatedBy(UUID userId);
    
    @Query("SELECT j FROM Job j WHERE j.status = :status " +
           "AND (LOWER(j.title) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(j.description) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<Job> searchByKeyword(@Param("keyword") String keyword,
                              @Param("status") JobStatus status,
                              Pageable pageable);
}
