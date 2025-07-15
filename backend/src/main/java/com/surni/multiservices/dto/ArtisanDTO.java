package com.surni.multiservices.dto;

import lombok.Data;

@Data
public class ArtisanDTO {
    private Long id;
    private String photoUrl;
    private String email;
    private String phone;
    private String city;
    private String category;
}