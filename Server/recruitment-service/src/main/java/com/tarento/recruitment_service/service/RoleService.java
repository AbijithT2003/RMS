package com.tarento.recruitment_service.service;

import com.tarento.recruitment_service.exception.ResourceNotFoundException;
import com.tarento.recruitment_service.model.Role;
import com.tarento.recruitment_service.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class RoleService {
    
    private final RoleRepository roleRepository;
    
    public Optional<Role> findByName(String name) {
        return roleRepository.findByNameIgnoreCase(name);
    }
    
    public Optional<Role> findByCode(String code) {
        return roleRepository.findByCode(code);
    }
    
    public Role getDefaultRole() {
        return findByCode("CANDIDATE").orElseThrow(() -> 
            new RuntimeException("Default CANDIDATE role not found"));
    }

     public Role getRoleByCode(String code) {
        return findByCode(code)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found: " + code));
    }



}