package com.tarento.recruitment_service.model;

import jakarta.persistence.Embeddable;

@Embeddable
public class Location {
    private String city;
    private String state;
    private String country;
}

