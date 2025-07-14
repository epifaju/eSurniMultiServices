package com.surni.multiservices.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "comments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int rating;
    private String content;
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "annonce_id")
    private Annonce annonce;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}