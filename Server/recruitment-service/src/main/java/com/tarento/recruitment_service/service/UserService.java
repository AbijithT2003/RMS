package com.tarento.recruitment_service.service;

import com.tarento.recruitment_service.dto.ResponseDto.*;
import com.tarento.recruitment_service.dto.RequestDto.*;
import com.tarento.recruitment_service.repository.*;
import com.tarento.recruitment_service.config.ApiResponse;

import io.swagger.v3.oas.annotations.Operation;

import com.tarento.recruitment_service.model.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;
    
    public UserResponse createUser(CreateUserRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists: " + request.getEmail());
        }
        
        User user = User.builder()
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .fullName(request.getFullName())
                .phone(request.getPhone())
                .profileImageUrl(request.getProfileImageUrl())
                .isActive(request.isActive())
                .build();
        
        User saved = userRepository.save(user);
        return modelMapper.map(saved, UserResponse.class);
    }

   public UserResponse getUserByValue(String value) {

        User user;

        if (isUUID(value)) {
            user = userRepository.findById(UUID.fromString(value))
                    .orElseThrow(() -> new RuntimeException("User not found with id: " + value));
        } else {
            user = userRepository.findByEmail(value)
                    .orElseThrow(() -> new RuntimeException("User not found with email: " + value));
        }

        return modelMapper.map(user, UserResponse.class);
    }

    // Helper to check UUID
    private boolean isUUID(String value) {
        try {
            UUID.fromString(value);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    
    
    public void updateLastLogin(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);
    }

    public List<UserResponse> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(user -> modelMapper.map(user, UserResponse.class))
                .collect(Collectors.toList());
    }
}