package com.tarento.recruitment_service.service;

import com.tarento.recruitment_service.model.*;
import com.tarento.recruitment_service.model.enums.*;
import com.tarento.recruitment_service.exception.BusinessException;
import com.tarento.recruitment_service.repository.*;
import com.tarento.recruitment_service.dto.RequestDto.*;
import com.tarento.recruitment_service.dto.ResponseDto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;    
import org.modelmapper.ModelMapper;
import java.time.LocalDateTime;
import java.util.Arrays;
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

        // Validate business rules
        validateInterviewScheduling(request, application);

        Interview interview = Interview.builder()
                .application(application)
                .interviewer(interviewer)
                .interviewRound(request.getInterviewRound())
                .interviewType(request.getInterviewType())
                .scheduledDate(request.getScheduledDate())
                .durationMinutes(request.getDurationMinutes())
                .meetingLink(request.getMeetingLink())
                .location(request.getLocation())
                .status(InterviewStatus.SCHEDULED)
                // .createdAt(LocalDateTime.now())
                // .updatedAt(LocalDateTime.now())
                .build();

        Interview saved = interviewRepository.save(interview);

        // Update application status
        application.setStatus(ApplicationStatus.INTERVIEW_SCHEDULED);
        application.setLastUpdatedAt(LocalDateTime.now());
        jobApplicationRepository.save(application);

        return mapToInterviewResponse(saved);
    }

    private void validateInterviewScheduling(CreateInterviewRequest request, JobApplication application) {
        if (request.getScheduledDate().isBefore(LocalDateTime.now())) {
            throw new BusinessException("Cannot schedule an interview in the past.");
        }

        if (!Arrays.asList(ApplicationStatus.SHORTLISTED, ApplicationStatus.UNDER_REVIEW)
                .contains(application.getStatus())) {
            throw new BusinessException("Application must be shortlisted or under review to schedule interview.");
        }

        LocalDateTime startTime = request.getScheduledDate();
        LocalDateTime endTime = startTime.plusMinutes(request.getDurationMinutes());

        List<Interview> conflicts = interviewRepository.findInterviewsByInterviewerAndDateRange(
                request.getInterviewerId(),
                startTime.minusMinutes(15),
                endTime.plusMinutes(15)
        );

        if (!conflicts.isEmpty()) {
            throw new BusinessException("Interviewer not available. Another interview is scheduled.");
        }

        int hour = request.getScheduledDate().getHour();
        if (hour < 9 || hour > 17) {
            throw new BusinessException("Interviews can only be scheduled between 9 AM and 5 PM.");
        }
    }

    public InterviewResponse updateInterview(UUID id, UpdateInterviewRequest request) {
        Interview interview = interviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Interview not found"));

        if (request.getStatus() != null) interview.setStatus(request.getStatus());
        if (request.getResult() != null) interview.setResult(request.getResult());
        if (request.getFeedback() != null) interview.setFeedback(request.getFeedback());

        interview.setUpdatedAt(LocalDateTime.now());

        Interview updated = interviewRepository.save(interview);
        return mapToInterviewResponse(updated);
    }

    public List<InterviewResponse> getInterviewsByApplication(UUID applicationId) {
        return interviewRepository.findByApplicationId(applicationId)
                .stream()
                .map(this::mapToInterviewResponse)
                .collect(Collectors.toList());
    }

    public List<InterviewResponse> getInterviewsByInterviewer(UUID interviewerId) {
        return interviewRepository.findByInterviewerId(interviewerId)
                .stream()
                .map(this::mapToInterviewResponse)
                .collect(Collectors.toList());
    }

    public List<InterviewResponse> getInterviewsByApplicant(UUID applicantId) {
        return interviewRepository.findByApplicantId(applicantId)
                .stream()
                .map(this::mapToInterviewResponse)
                .collect(Collectors.toList());
    }

    /**
     * Fully maps Interview → InterviewResponse including:
     * - Interviewer Name
     * - Applicant Name
     */
    private InterviewResponse mapToInterviewResponse(Interview interview) {
    InterviewResponse response = modelMapper.map(interview, InterviewResponse.class);

    // interviewer name from User
    if (interview.getInterviewer() != null) {
        response.setInterviewerName(interview.getInterviewer().getFullName());
    }

    // applicant full name (via User)
    if (interview.getApplication() != null &&
        interview.getApplication().getApplicant() != null &&
        interview.getApplication().getApplicant().getUser() != null) {

        String fullName = interview.getApplication()
                                   .getApplicant()
                                   .getUser()
                                   .getFullName();

        response.setFullName(fullName);
    }

    return response;
}

}
