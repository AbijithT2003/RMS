package com.tarento.recruitment_service.controller;

import com.tarento.recruitment_service.dto.RequestDto.*;
import com.tarento.recruitment_service.dto.ResponseDto.*;
import com.tarento.recruitment_service.service.*;   
import com.tarento.recruitment_service.config.*;    
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Tag(name = "Users", description = "User management APIs")
public class UserController {
    private final UserService userService;
    
    @PostMapping
    @Operation(summary = "Create a new user", description = "Registers a new user in the system")
    public ResponseEntity<ApiResponse<UserResponse>> createUser(
            @Valid @RequestBody CreateUserRequest request) {
        UserResponse response = userService.createUser(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("User created successfully", response));
    }
    
    @GetMapping("/{value}")
    @Operation(
            summary = "Get user by ID or Email",
            description = "Retrieves a user by UUID or Email. Automatically detects the type."
    )
    public ResponseEntity<ApiResponse<UserResponse>> getUser(@PathVariable String value) {

        UserResponse response = userService.getUserByValue(value);
        return ResponseEntity.ok(ApiResponse.success(response));
    }
    
    @GetMapping
    @Operation(summary = "Get all users", description = "Retrieves all users in the system")
    public ResponseEntity<ApiResponse<List<UserResponse>>> getAllUsers() {
        List<UserResponse> response = userService.getAllUsers();
        return ResponseEntity.ok(ApiResponse.success(response));
    }
}
