package com.tarento.recruitment_service.model;
      
import jakarta.persistence.*;
import lombok.*; 
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "saved_jobs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SavedJob {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "applicant_id")
    private ApplicantProfile applicant;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id")
    private Job job;
    
    @Column(name = "saved_at")
    private LocalDateTime savedAt;
}
