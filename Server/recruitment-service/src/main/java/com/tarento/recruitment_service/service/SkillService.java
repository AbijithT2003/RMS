package com.tarento.recruitment_service.service;

import com.tarento.recruitment_service.model.*;
import com.tarento.recruitment_service.repository.*;
import com.tarento.recruitment_service.dto.RequestDto.*;
import com.tarento.recruitment_service.dto.ResponseDto.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.modelmapper.ModelMapper; 




@Service
@RequiredArgsConstructor
@Transactional
public class SkillService {
    private final SkillRepository skillRepository;
    private final ApplicantSkillRepository applicantSkillRepository;
    private final JobSkillRepository jobSkillRepository;
    private final ApplicantProfileRepository applicantProfileRepository;
    private final JobRepository jobRepository;
    private final ModelMapper modelMapper;
    
    public SkillResponse createSkill(CreateSkillRequest request) {
        Skill skill = modelMapper.map(request, Skill.class);
        Skill saved = skillRepository.save(skill);
        return modelMapper.map(saved, SkillResponse.class);
    }
    
    public SkillResponse getSkillById(UUID id) {
        Skill skill = skillRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Skill not found with id: " + id));
        return modelMapper.map(skill, SkillResponse.class);
    }
    
    public List<SkillResponse> searchSkills(String keyword) {
        List<Skill> skills = skillRepository.searchByKeyword(keyword);
        return skills.stream()
                .map(skill -> modelMapper.map(skill, SkillResponse.class))
                .collect(Collectors.toList());
    }
    
    public ApplicantSkillResponse addSkillToApplicant(AddApplicantSkillRequest request) {
        ApplicantProfile applicant = applicantProfileRepository.findById(request.getApplicantId())
                .orElseThrow(() -> new RuntimeException("Applicant not found"));
        
        Skill skill = skillRepository.findById(request.getSkillId())
                .orElseThrow(() -> new RuntimeException("Skill not found"));
        
        ApplicantSkill applicantSkill = ApplicantSkill.builder()
                .applicant(applicant)
                .skill(skill)
                .proficiencyLevel(request.getProficiencyLevel())
                .yearsOfExperience(request.getYearsOfExperience())
                .build();
        
        ApplicantSkill saved = applicantSkillRepository.save(applicantSkill);
        return mapToApplicantSkillResponse(saved);
    }
    
    public JobSkillResponse addSkillToJob(AddJobSkillRequest request) {
        Job job = jobRepository.findById(request.getJobId())
                .orElseThrow(() -> new RuntimeException("Job not found"));
        
        Skill skill = skillRepository.findById(request.getSkillId())
                .orElseThrow(() -> new RuntimeException("Skill not found"));
        
        JobSkill jobSkill = JobSkill.builder()
                .job(job)
                .skill(skill)
                .isRequired(request.getIsRequired())
                .proficiencyLevel(request.getProficiencyLevel())
                .build();
        
        JobSkill saved = jobSkillRepository.save(jobSkill);
        return mapToJobSkillResponse(saved);
    }
    
    public List<ApplicantSkillResponse> getApplicantSkills(UUID applicantId) {
        List<ApplicantSkill> skills = applicantSkillRepository.findByApplicantId(applicantId);
        return skills.stream()
                .map(this::mapToApplicantSkillResponse)
                .collect(Collectors.toList());
    }
    
    public List<JobSkillResponse> getJobSkills(UUID jobId) {
        List<JobSkill> skills = jobSkillRepository.findByJobId(jobId);
        return skills.stream()
                .map(this::mapToJobSkillResponse)
                .collect(Collectors.toList());
    }
    
    private ApplicantSkillResponse mapToApplicantSkillResponse(ApplicantSkill applicantSkill) {
        ApplicantSkillResponse response = modelMapper.map(applicantSkill, ApplicantSkillResponse.class);
        if (applicantSkill.getSkill() != null) {
            response.setSkillName(applicantSkill.getSkill().getName());
        }
        return response;
    }
    
    private JobSkillResponse mapToJobSkillResponse(JobSkill jobSkill) {
        JobSkillResponse response = modelMapper.map(jobSkill, JobSkillResponse.class);
        if (jobSkill.getSkill() != null) {
            response.setSkillName(jobSkill.getSkill().getName());
        }
        return response;
    }
}