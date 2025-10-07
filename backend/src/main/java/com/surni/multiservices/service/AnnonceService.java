package com.surni.multiservices.service;

import com.surni.multiservices.model.Annonce;
import com.surni.multiservices.repository.AnnonceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class AnnonceService {
    @Autowired
    private AnnonceRepository annonceRepository;

    public List<Annonce> findAll() {
        return annonceRepository.findAll();
    }

    public Optional<Annonce> findById(Long id) {
        return annonceRepository.findById(id);
    }

    public List<Annonce> findByArtisanId(Long artisanId) {
        return annonceRepository.findByArtisanId(artisanId);
    }

    public Annonce save(Annonce annonce) {
        return annonceRepository.save(annonce);
    }

    public void deleteById(Long id) {
        annonceRepository.deleteById(id);
    }

    public List<Annonce> findByCityAndCategory(String city, String category) {
        return findAll().stream()
                .filter(a -> (city == null || city.isEmpty()
                        || (a.getCity() != null && city.equalsIgnoreCase(a.getCity()))))
                .filter(a -> (category == null || category.isEmpty()
                        || (a.getCategory() != null && category.equalsIgnoreCase(a.getCategory()))))
                .collect(java.util.stream.Collectors.toList());
    }

    public List<Annonce> findByClientId(Long clientId) {
        return annonceRepository.findByClientId(clientId);
    }

    public Annonce updateActiveStatus(Long id, boolean active) {
        Annonce annonce = annonceRepository.findById(id).orElseThrow();
        annonce.setActive(active);
        return annonceRepository.save(annonce);
    }

    public List<Annonce> findByStatus(Annonce.Status status) {
        return annonceRepository.findByStatus(status);
    }

    public Annonce updateStatus(Long id, Annonce.Status status) {
        Annonce annonce = annonceRepository.findById(id).orElseThrow();
        annonce.setStatus(status);
        return annonceRepository.save(annonce);
    }
}