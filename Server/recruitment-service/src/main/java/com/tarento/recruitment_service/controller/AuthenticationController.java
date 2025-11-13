package com.tarento.recruitment_service.controller;

import com.tarento.recruitment_service.config.Apiresponse;
import com.tarento.recruitment_service.dto.RequestDto.LoginRequest;
import com.tarento.recruitment_service.dto.RequestDto.RegisterRequest;
import com.tarento.recruitment_service.dto.ResponseDto.AuthResponse;
import com.tarento.recruitment_service.service.AuthenticationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "User authentication and authorization APIs")
public class AuthenticationController {
    
    private final AuthenticationService authenticationService;
    
    @PostMapping("/register")
    @Operation(summary = "Register a new user", description = "Creates a new user account and returns JWT token")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "User registered successfully",
            content = @Content(schema = @Schema(implementation = AuthResponse.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input or email already exists",
            content = @Content(schema = @Schema(implementation = Apiresponse.class))),
        @ApiResponse(responseCode = "500", description = "Internal server error",
            content = @Content(schema = @Schema(implementation = Apiresponse.class)))
    })
    public ResponseEntity<Apiresponse<AuthResponse>> register(
            @RequestBody(description = "User registration details", required = true,
                content = @Content(schema = @Schema(implementation = RegisterRequest.class)))
            @Valid @org.springframework.web.bind.annotation.RequestBody RegisterRequest request) {
        AuthResponse response = authenticationService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Apiresponse.success("User registered successfully", response));
    }
    
    @PostMapping("/login")
    @Operation(summary = "Login user", description = "Authenticates user with email and password, returns JWT token")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Login successful",
            content = @Content(schema = @Schema(implementation = AuthResponse.class))),
        @ApiResponse(responseCode = "400", description = "Invalid credentials",
            content = @Content(schema = @Schema(implementation = Apiresponse.class))),
        @ApiResponse(responseCode = "401", description = "Authentication failed",
            content = @Content(schema = @Schema(implementation = Apiresponse.class)))
    })
    public ResponseEntity<Apiresponse<AuthResponse>> login(
            @RequestBody(description = "User login credentials", required = true,
                content = @Content(schema = @Schema(implementation = LoginRequest.class)))
            @Valid @org.springframework.web.bind.annotation.RequestBody LoginRequest request) {
        AuthResponse response = authenticationService.login(request);
        return ResponseEntity.ok(Apiresponse.success("Login successful", response));
    }

    @PostMapping("/logout")
    @Operation(summary = "Logout user", description = "Logs out the user by invalidating the client-side JWT")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "User logged out successfully"),
        @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    public ResponseEntity<Apiresponse<Void>> logout() {
        return ResponseEntity.ok(Apiresponse.success("User logged out successfully", null));
    }

}
