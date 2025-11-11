package com.tarento.recruitment_service.config;

import org.springframework.data.domain.AuditorAware;
import org.springframework.lang.NonNull;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component("auditorAware")
public class AuditorAwareImpl implements AuditorAware<String> {

    @Override
    @SuppressWarnings("null")
    @NonNull
    public Optional<String> getCurrentAuditor() {
        // Get current authenticated user from SecurityContext
        return Optional.ofNullable(SecurityContextHolder.getContext().getAuthentication())
                .map(auth -> auth.getName());
    }
}

