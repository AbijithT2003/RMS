package com.tarento.recruitment_service.model;

import com.tarento.recruitment_service.model.enums.*;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;  


@Entity
@Table(name = "interviews")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Interview extends AuditableEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id")
    private JobApplication application;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "interviewer_id")
    private User interviewer;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "interview_type")
    private InterviewType interviewType;
    
    @Column(name = "scheduled_date")
    private LocalDateTime scheduledDate;
    
    @Column(name = "duration_minutes")
    private Integer durationMinutes;
    
    @Column(name = "meeting_link")
    private String meetingLink;
    
    private String location;
    
    @Enumerated(EnumType.STRING)
    private InterviewStatus status;
    
    @Enumerated(EnumType.STRING)
    private InterviewResult result;
    
    @Column(columnDefinition = "TEXT")
    private String feedback;
    
}