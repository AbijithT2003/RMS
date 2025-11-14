package com.tarento.recruitment_service.service;

import com.tarento.recruitment_service.exception.ForbiddenException;
import com.tarento.recruitment_service.exception.UnauthorizedException;
import com.tarento.recruitment_service.model.User;
import com.tarento.recruitment_service.repository.UserRepository;
import com.tarento.recruitment_service.repository.JobApplicationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthorizationService {
    
    private final UserRepository userRepository;
    private final JobApplicationRepository jobApplicationRepository;
    
    public void checkApplicationOwnership(UUID applicationId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        
        if (auth == null || !auth.isAuthenticated()) {
            throw new UnauthorizedException("User must be authenticated");
        }
        
        String email = auth.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UnauthorizedException("Invalid user"));
        
        boolean isOwner = jobApplicationRepository.findById(applicationId)
                .map(app -> app.getApplicant().getUser().getId().equals(user.getId()))
                .orElse(false);
        
        boolean isRecruiter = user.getRoles().stream()
                .anyMatch(role -> role.getCode().equals("RECRUITER") || role.getCode().equals("ADMIN"));
        
        if (!isOwner && !isRecruiter) {
            throw new ForbiddenException("You can only access your own applications");
        }
    }
    
    public void checkRecruiterRole() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        
        if (auth == null || !auth.isAuthenticated()) {
            throw new UnauthorizedException("Authentication required");
        }
        
        boolean hasRecruiterRole = auth.getAuthorities().stream()
                .anyMatch(authority -> 
                    authority.getAuthority().equals("ROLE_RECRUITER") || 
                    authority.getAuthority().equals("ROLE_ADMIN"));
        
        if (!hasRecruiterRole) {
            throw new ForbiddenException("Recruiter or Admin role required");
        }
    }
}