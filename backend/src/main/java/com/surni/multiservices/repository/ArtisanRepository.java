package com.surni.multiservices.repository;

import com.surni.multiservices.model.Artisan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtisanRepository extends JpaRepository<Artisan, Long> {
    Artisan findByUserId(Long userId);
}