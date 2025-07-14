package com.surni.multiservices.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "artisans")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Artisan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String photoUrl;
    private String email;
    private String phone;
    private String city;
    private String category;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "artisan", cascade = CascadeType.ALL)
    private List<Annonce> annonces;
}