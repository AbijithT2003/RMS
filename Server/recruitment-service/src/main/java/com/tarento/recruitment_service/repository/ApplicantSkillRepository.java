package com.tarento.recruitment_service.repository;

import com.tarento.recruitment_service.model.ApplicantSkill;
import com.tarento.recruitment_service.model.Interview;
import com.tarento.recruitment_service.model.enums.ProficiencyLevel;    
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;       
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ApplicantSkillRepository extends JpaRepository<ApplicantSkill, UUID> {
    List<ApplicantSkill> findByApplicantId(UUID applicantId);
    List<ApplicantSkill> findBySkillId(UUID skillId);
    Optional<ApplicantSkill> findByApplicantIdAndSkillId(UUID applicantId, UUID skillId);
    
    @Query("SELECT ask FROM ApplicantSkill ask WHERE ask.applicant.id = :applicantId " +
           "AND ask.proficiencyLevel IN :levels")
    List<ApplicantSkill> findByApplicantAndProficiencyLevels(
        @Param("applicantId") UUID applicantId,
        @Param("levels") List<ProficiencyLevel> levels);

        @Query("SELECT i FROM Interview i WHERE i.application.id = :applicationId ORDER BY i.scheduledDate DESC")
    List<Interview> findLatestInterviewsByApplication(@Param("applicationId") UUID applicationId);

}
