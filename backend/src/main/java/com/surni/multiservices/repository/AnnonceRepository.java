package com.surni.multiservices.repository;

import com.surni.multiservices.model.Annonce;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AnnonceRepository extends JpaRepository<Annonce, Long> {
    List<Annonce> findByArtisanId(Long artisanId);

    List<Annonce> findByClientId(Long clientId);

    List<Annonce> findByStatus(Annonce.Status status);
}