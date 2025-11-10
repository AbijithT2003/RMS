package com.tarento.recruitment_service.repository;

import com.tarento.recruitment_service.model.Interview;
import com.tarento.recruitment_service.model.enums.InterviewStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface InterviewRepository extends JpaRepository<Interview, UUID> {
    List<Interview> findByApplicationId(UUID applicationId);
    List<Interview> findByInterviewerId(UUID interviewerId);
    List<Interview> findByStatus(InterviewStatus status);
    
    @Query("SELECT i FROM Interview i WHERE i.interviewer.id = :interviewerId " +
           "AND i.scheduledDate BETWEEN :startDate AND :endDate")
    List<Interview> findInterviewsByInterviewerAndDateRange(
        @Param("interviewerId") UUID interviewerId,
        @Param("startDate") java.time.LocalDateTime startDate,
        @Param("endDate") java.time.LocalDateTime endDate);
}