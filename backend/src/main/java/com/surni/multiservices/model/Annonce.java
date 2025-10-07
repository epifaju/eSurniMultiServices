package com.surni.multiservices.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "annonces")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Annonce {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String city;
    private String category;
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "artisan_id")
    private Artisan artisan;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private User client;

    @Builder.Default
    private Boolean active = true;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Status status = Status.PENDING;

    public enum Status {
        PENDING,
        APPROVED,
        REJECTED
    }
}