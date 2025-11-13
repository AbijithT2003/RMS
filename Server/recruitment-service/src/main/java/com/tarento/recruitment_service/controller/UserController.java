package com.tarento.recruitment_service.controller;

import com.tarento.recruitment_service.config.Apiresponse;
import com.tarento.recruitment_service.dto.RequestDto.*;
import com.tarento.recruitment_service.dto.ResponseDto.*;
import com.tarento.recruitment_service.service.*;   
import com.tarento.recruitment_service.config.*;    
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
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "User created successfully",
            content = @Content(schema = @Schema(implementation = UserResponse.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input or email already exists",
            content = @Content(schema = @Schema(implementation = ApiResponse.class)))
    })
    public ResponseEntity<Apiresponse<UserResponse>> createUser(
            @RequestBody(description = "User creation details", required = true,
                content = @Content(schema = @Schema(implementation = CreateUserRequest.class)))
            @Valid @org.springframework.web.bind.annotation.RequestBody CreateUserRequest request) {
        UserResponse response = userService.createUser(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Apiresponse.success("User created successfully", response));
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get user by ID", description = "Retrieves a user by their unique identifier")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "User found",
            content = @Content(schema = @Schema(implementation = UserResponse.class))),
        @ApiResponse(responseCode = "404", description = "User not found",
            content = @Content(schema = @Schema(implementation = ApiResponse.class)))
    })
    public ResponseEntity<Apiresponse<UserResponse>> getUser(@PathVariable UUID id) {
        UserResponse response = userService.getUserById(id);
        return ResponseEntity.ok(Apiresponse.success(response));
    }
    
    @GetMapping("/email/{email}")
    @Operation(summary = "Get user by email", description = "Retrieves a user by their email address")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "User found",
            content = @Content(schema = @Schema(implementation = UserResponse.class))),
        @ApiResponse(responseCode = "404", description = "User not found",
            content = @Content(schema = @Schema(implementation = ApiResponse.class)))
    })
    public ResponseEntity<Apiresponse<UserResponse>> getUserByEmail(@PathVariable String email) {
        UserResponse response = userService.getUserByEmail(email);
        return ResponseEntity.ok(Apiresponse.success(response));
    }
    
    @GetMapping
    @Operation(summary = "Get all users", description = "Retrieves all users in the system")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Users retrieved successfully",
            content = @Content(schema = @Schema(implementation = List.class)))
    })
    public ResponseEntity<Apiresponse<List<UserResponse>>> getAllUsers() {
        List<UserResponse> response = userService.getAllUsers();
        return ResponseEntity.ok(Apiresponse.success(response));
    }
}
