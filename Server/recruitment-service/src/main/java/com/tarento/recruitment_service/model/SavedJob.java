package com.tarento.recruitment_service.model;
      
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*; 
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(
  name = "saved_jobs",
  uniqueConstraints = @UniqueConstraint(columnNames = {"applicant_id", "job_id"})
)

@Builder
public class SavedJob {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "applicant_id")
    private ApplicantProfile applicant;
    
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id")
    private Job job;
    
    @Column(name = "saved_at")
    private LocalDateTime savedAt;



}
