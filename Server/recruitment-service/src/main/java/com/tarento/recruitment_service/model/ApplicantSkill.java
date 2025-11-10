package com.tarento.recruitment_service.model;

import com.tarento.recruitment_service.model.enums.*;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;
import java.util.UUID;


@Entity
@Table(name = "applicant_skills")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApplicantSkill {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "applicant_id")
    private ApplicantProfile applicant;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "skill_id")
    private Skill skill;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "proficiency_level")
    private ProficiencyLevel proficiencyLevel;
    
    @Column(name = "years_of_experience")
    private Integer yearsOfExperience;
    
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}