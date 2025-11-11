package com.tarento.recruitment_service.config;

import org.springframework.data.domain.AuditorAware;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@Component("auditorAware")
public class AuditorAwareImpl implements AuditorAware<UUID> {

    @Override
    @SuppressWarnings("null")
    @NonNull
    public Optional<UUID> getCurrentAuditor() {
        // Return empty for now since we're manually setting createdBy in services
        return Optional.empty();
    }
}

