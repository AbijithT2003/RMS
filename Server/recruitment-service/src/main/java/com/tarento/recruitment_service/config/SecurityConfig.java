package com.tarento.recruitment_service.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Arrays;
import org.springframework.http.HttpMethod;

@Configuration
@RequiredArgsConstructor
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter; //injected automatically

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

    http
        .cors(cors -> cors.configurationSource(corsConfigurationSource()))
        .csrf(csrf -> csrf.disable())
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(auth -> auth

            // ===== PUBLIC ENDPOINTS =====
            .requestMatchers(
                "/v3/api-docs/**",
                "/swagger-ui/**",
                "/swagger-ui.html"
            ).permitAll()

            // Auth APIs
            .requestMatchers(HttpMethod.POST, "/api/auth/login").permitAll()

            .requestMatchers(HttpMethod.POST, "/api/auth/register").permitAll()
            .requestMatchers("/api/auth/**").permitAll()

            // Public READ Jobs
            .requestMatchers(HttpMethod.GET, "/api/jobs/**").permitAll()

            // Allow candidates to save jobs
            .requestMatchers(HttpMethod.POST, "/api/jobs/*/save").hasAnyRole("CANDIDATE")
            .requestMatchers(HttpMethod.POST, "/api/jobs/*/unsave").hasAnyRole("CANDIDATE")


            // Restricted job management
            .requestMatchers(HttpMethod.POST, "/api/jobs/**").hasAnyRole("RECRUITER", "ADMIN")
            .requestMatchers(HttpMethod.PUT, "/api/jobs/**").hasAnyRole("RECRUITER", "ADMIN")
            .requestMatchers(HttpMethod.DELETE, "/api/jobs/**").hasAnyRole("RECRUITER", "ADMIN")

            // Applications
            .requestMatchers("/api/applications/**")
                .hasAnyRole("CANDIDATE", "RECRUITER", "ADMIN")

            // Interviews
            .requestMatchers("/api/interviews/**")
                .hasAnyRole("CANDIDATE", "RECRUITER", "ADMIN")

            // Skills (public)
            .requestMatchers("/api/skills/**").permitAll()

            // Applicants
            .requestMatchers("/api/applicants/**")
                .hasAnyRole("RECRUITER", "ADMIN")

            // Any other request must be authenticated
            .anyRequest().authenticated()
        )
        .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
}


    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    
    configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
    configuration.setAllowCredentials(true);  // Required for cookies / JWT in headers
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
    configuration.setAllowedHeaders(Arrays.asList("*"));
    configuration.setExposedHeaders(Arrays.asList("Authorization")); // Optional but useful

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);

    return source;
}

}
