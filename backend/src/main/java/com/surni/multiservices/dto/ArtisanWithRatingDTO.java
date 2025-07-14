package com.surni.multiservices.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArtisanWithRatingDTO {
    private Long id;
    private String name;
    private String photoUrl;
    private String email;
    private String phone;
    private String city;
    private String category;
    private double averageRating;
}