package com.tarento.recruitment_service.service;

import com.tarento.recruitment_service.dto.RequestDto.LoginRequest;
import com.tarento.recruitment_service.dto.RequestDto.RegisterRequest;
import com.tarento.recruitment_service.dto.ResponseDto.AuthResponse;
import com.tarento.recruitment_service.exception.BusinessException;
import com.tarento.recruitment_service.exception.DuplicateResourceException;
import com.tarento.recruitment_service.exception.ResourceNotFoundException;
import com.tarento.recruitment_service.model.User;
import com.tarento.recruitment_service.model.ApplicantProfile;
import com.tarento.recruitment_service.repository.UserRepository;
import com.tarento.recruitment_service.repository.ApplicantProfileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.List;
import java.util.stream.Collectors;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class AuthenticationService {
    
    private final UserRepository userRepository;
    private final ApplicantProfileRepository applicantProfileRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final RoleService roleService;
    
    /**
     * Register a new user
     */
    public AuthResponse register(RegisterRequest request) {
        log.info("Registering new user with email: {}", request.getEmail());
        
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            log.warn("Registration failed: Email already exists {}", request.getEmail());
            throw new DuplicateResourceException("Email already registered");
        }
        
        try {
        // Pick role from request, or default if missing
        String roleCode = (request.getRole() != null && !request.getRole().isBlank())
                ? request.getRole().toUpperCase()
                : "CANDIDATE";

        var role = roleService.getRoleByCode(roleCode);
        if (role == null) {
            log.warn("Invalid role code: {}", roleCode);
            throw new BusinessException("Invalid role: " + roleCode);
        }

        // Create and save user
        User user = User.builder()
                .email(request.getEmail())
                .fullName(request.getFullName())
                .phone(request.getPhone())
                .roles(Set.of(role))
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .isActive(true)
                .build();
            
            User savedUser = userRepository.save(user);
            log.info("User registered successfully: {}", savedUser.getId());
            
            // Get user roles
            List<String> roles = savedUser.getRoles().stream()
                    .map(r -> r.getCode())
                    .collect(Collectors.toList());
            
            // Create profiles based on role
            UUID applicantId = null;
            UUID recruiterId = null;
            
            if (roles.contains("CANDIDATE")) {
                ApplicantProfile applicantProfile = ApplicantProfile.builder()
                        .user(savedUser)
                        .isPublicProfile(true)
                        .build();
                ApplicantProfile savedProfile = applicantProfileRepository.save(applicantProfile);
                applicantId = savedProfile.getId();
            }
            
            if (roles.contains("RECRUITER") || roles.contains("ADMIN")) {
                recruiterId = savedUser.getId();
            }
            
            // Generate JWT token with roles
            String jwtToken = jwtService.generateToken(savedUser);
            long expiresIn = jwtService.getExpirationTime();
            
            return AuthResponse.of(jwtToken, savedUser.getId(), savedUser.getEmail(), 
                                 savedUser.getFullName(), applicantId, recruiterId, 
                                 roles, expiresIn);
        } catch (Exception e) {
            log.error("Error during user registration", e);
            throw new BusinessException("Failed to register user: " + e.getMessage());
        }
    }
    
    /**
     * Login user with email and password
     */
    public AuthResponse login(LoginRequest request) {
        log.info("Login attempt for email: {}", request.getEmail());
        
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> {
                    log.warn("Login failed: User not found with email {}", request.getEmail());
                    return new ResourceNotFoundException("User not found with email: " + request.getEmail());
                });
        
        // Verify password
        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            log.warn("Login failed: Invalid password for user {}", request.getEmail());
            throw new BusinessException("Invalid email or password");
        }
        
        // Check if user is active
        if (!user.isActive()) {
            log.warn("Login failed: User account is inactive {}", request.getEmail());
            throw new BusinessException("User account is inactive");
        }
        
        try {
            // Update last login time
            user.setLastLogin(LocalDateTime.now());
            userRepository.save(user);
            
            // Get user roles
            List<String> roles = user.getRoles().stream()
                    .map(role -> role.getCode())
                    .collect(Collectors.toList());
            
            // Generate JWT token with roles
            String jwtToken = jwtService.generateToken(user);
            long expiresIn = jwtService.getExpirationTime();
            
            // Get profile IDs based on role
            UUID applicantId = null;
            UUID recruiterId = null;
            
            if (roles.contains("CANDIDATE")) {
                applicantId = applicantProfileRepository.findByUserId(user.getId())
                        .map(ApplicantProfile::getId)
                        .orElse(null);
            }
            
            if (roles.contains("RECRUITER") || roles.contains("ADMIN")) {
                recruiterId = user.getId();
            }
            
            log.info("User logged in successfully: {}", user.getEmail());
            return AuthResponse.of(jwtToken, user.getId(), user.getEmail(), 
                                 user.getFullName(), applicantId, recruiterId, 
                                 roles, expiresIn);
        } catch (Exception e) {
            log.error("Error during login", e);
            throw new BusinessException("Login failed: " + e.getMessage());
        }
    }
    
    /**
     * Get user by email
     */
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
    }
}
