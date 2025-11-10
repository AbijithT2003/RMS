package com.tarento.recruitment_service.service;

import com.tarento.recruitment_service.model.*;
import com.tarento.recruitment_service.model.enums.*;
import com.tarento.recruitment_service.repository.*;
import com.tarento.recruitment_service.dto.RequestDto.*;
import com.tarento.recruitment_service.dto.ResponseDto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;    
import org.modelmapper.ModelMapper;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class InterviewService {
    private final InterviewRepository interviewRepository;
    private final JobApplicationRepository jobApplicationRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    
    public InterviewResponse scheduleInterview(CreateInterviewRequest request) {
        JobApplication application = jobApplicationRepository.findById(request.getApplicationId())
                .orElseThrow(() -> new RuntimeException("Application not found"));
        
        User interviewer = userRepository.findById(request.getInterviewerId())
                .orElseThrow(() -> new RuntimeException("Interviewer not found"));
        
        Interview interview = Interview.builder()
                .application(application)
                .interviewer(interviewer)
                .interviewType(request.getInterviewType())
                .scheduledDate(request.getScheduledDate())
                .durationMinutes(request.getDurationMinutes())
                .meetingLink(request.getMeetingLink())
                .location(request.getLocation())
                .status(InterviewStatus.SCHEDULED)
                .build();
        
        Interview saved = interviewRepository.save(interview);
        
        // Update application status
        application.setStatus(ApplicationStatus.INTERVIEW_SCHEDULED);
        application.setLastUpdatedAt(LocalDateTime.now());
        jobApplicationRepository.save(application);
        
        return mapToInterviewResponse(saved);
    }
    
    public InterviewResponse updateInterview(UUID id, UpdateInterviewRequest request) {
        Interview interview = interviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Interview not found"));
        
        if (request.getStatus() != null) {
            interview.setStatus(request.getStatus());
        }
        if (request.getResult() != null) {
            interview.setResult(request.getResult());
        }
        if (request.getFeedback() != null) {
            interview.setFeedback(request.getFeedback());
        }
        
        Interview updated = interviewRepository.save(interview);
        return mapToInterviewResponse(updated);
    }
    
    public List<InterviewResponse> getInterviewsByApplication(UUID applicationId) {
        List<Interview> interviews = interviewRepository.findByApplicationId(applicationId);
        return interviews.stream()
                .map(this::mapToInterviewResponse)
                .collect(Collectors.toList());
    }
    
    public List<InterviewResponse> getInterviewsByInterviewer(UUID interviewerId) {
        List<Interview> interviews = interviewRepository.findByInterviewerId(interviewerId);
        return interviews.stream()
                .map(this::mapToInterviewResponse)
                .collect(Collectors.toList());
    }
    
    private InterviewResponse mapToInterviewResponse(Interview interview) {
        InterviewResponse response = modelMapper.map(interview, InterviewResponse.class);
        if (interview.getInterviewer() != null) {
            response.setInterviewerName(interview.getInterviewer().getFullName());
        }
        return response;
    }
}