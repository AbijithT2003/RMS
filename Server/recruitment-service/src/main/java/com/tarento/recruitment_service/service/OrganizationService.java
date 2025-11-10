package com.tarento.recruitment_service.service;

import com.tarento.recruitment_service.dto.RequestDto.*;
import com.tarento.recruitment_service.dto.ResponseDto.*;
import com.tarento.recruitment_service.model.*;
import com.tarento.recruitment_service.repository.*; 
import com.tarento.recruitment_service.config.*;


import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class OrganizationService {
    private final OrganizationRepository organizationRepository;
    private final ModelMapper modelMapper;
    
    public OrganizationResponse createOrganization(CreateOrganizationRequest request) {
        Organization organization = modelMapper.map(request, Organization.class);
        Organization saved = organizationRepository.save(organization);
        return modelMapper.map(saved, OrganizationResponse.class);
    }
    
    public OrganizationResponse getOrganizationById(UUID id) {
        Organization organization = organizationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Organization not found with id: " + id));
        return modelMapper.map(organization, OrganizationResponse.class);
    }
    
    public PageResponse<OrganizationResponse> getAllOrganizations(Pageable pageable) {
        Page<Organization> organizations = organizationRepository.findAll(pageable);
        Page<OrganizationResponse> responsePage = organizations.map(org -> 
            modelMapper.map(org, OrganizationResponse.class));
        return PageResponse.of(responsePage);
    }
    
    public OrganizationResponse updateOrganization(UUID id, CreateOrganizationRequest request) {
        Organization organization = organizationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Organization not found with id: " + id));
        
        modelMapper.map(request, organization);
        Organization updated = organizationRepository.save(organization);
        return modelMapper.map(updated, OrganizationResponse.class);
    }
    
    public void deleteOrganization(UUID id) {
        if (!organizationRepository.existsById(id)) {
            throw new RuntimeException("Organization not found with id: " + id);
        }
        organizationRepository.deleteById(id);
    }
}
