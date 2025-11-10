package com.tarento.recruitment_service.repository;

import com.tarento.recruitment_service.model.ApplicantProfile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.UUID;


@Repository
public interface ApplicantProfileRepository extends JpaRepository<ApplicantProfile, UUID> {
    Optional<ApplicantProfile> findByUserId(UUID userId);
    Page<ApplicantProfile> findByLocationCity(String city, Pageable pageable);
    
    @Query("SELECT ap FROM ApplicantProfile ap WHERE ap.experienceYears >= :minYears")
    Page<ApplicantProfile> findByMinimumExperience(@Param("minYears") Integer minYears, 
                                                    Pageable pageable);
}