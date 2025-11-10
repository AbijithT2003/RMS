package com.tarento.recruitment_service.repository;

import com.tarento.recruitment_service.model.JobSkill;
import org.springframework.data.jpa.repository.JpaRepository;   
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface JobSkillRepository extends JpaRepository<JobSkill, UUID> {
    List<JobSkill> findByJobId(UUID jobId);
    List<JobSkill> findBySkillId(UUID skillId);
    List<JobSkill> findByJobIdAndIsRequired(UUID jobId, Boolean isRequired);
    Optional<JobSkill> findByJobIdAndSkillId(UUID jobId, UUID skillId);
}