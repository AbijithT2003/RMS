package com.tarento.recruitment_service.repository;

import com.tarento.recruitment_service.model.Organization;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

@Repository
public interface OrganizationRepository extends JpaRepository<Organization, UUID> {
    Optional<Organization> findByNameIgnoreCase(String name);
    Page<Organization> findByIndustryIgnoreCase(String industry, Pageable pageable);
}
