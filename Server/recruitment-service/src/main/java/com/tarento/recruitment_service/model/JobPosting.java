package com.tarento.recruitment_service.model;

import com.tarento.recruitment_service.model.enums.*;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;
import java.util.UUID;  

@Entity
@Table(name = "job_postings")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobPosting {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id")
    private Job job;
    
    private String platform;
    
    @Column(name = "external_job_id")
    private String externalJobId;
    
    @Column(name = "posted_url")
    private String postedUrl;
    
    @Enumerated(EnumType.STRING)
    private PostingStatus status;
    
    @Column(name = "posted_at")
    private LocalDateTime postedAt;
    
    @Column(name = "last_synced")
    private LocalDateTime lastSynced;
    
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}