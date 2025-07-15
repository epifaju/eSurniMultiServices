package com.surni.multiservices.dto;

import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private String role;
    private ArtisanDTO artisanProfile;
}