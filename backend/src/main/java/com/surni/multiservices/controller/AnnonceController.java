package com.surni.multiservices.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.surni.multiservices.model.Annonce;
import com.surni.multiservices.service.AnnonceService;

@RestController
@RequestMapping("/api/annonces")
public class AnnonceController {
    @Autowired
    private AnnonceService annonceService;

    @GetMapping
    public List<Annonce> getAllAnnonces() {
        return annonceService.findByStatus(Annonce.Status.APPROVED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Annonce> getAnnonceById(@PathVariable Long id) {
        return annonceService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/artisan/{artisanId}")
    public List<Annonce> getAnnoncesByArtisan(@PathVariable Long artisanId) {
        return annonceService.findByArtisanId(artisanId).stream()
                .filter(a -> a.getStatus() == Annonce.Status.APPROVED)
                .collect(Collectors.toList());
    }

    @GetMapping("/client/{clientId}")
    public List<Annonce> getAnnoncesByClient(@PathVariable Long clientId) {
        return annonceService.findByClientId(clientId).stream()
                .filter(a -> a.getStatus() == Annonce.Status.APPROVED)
                .collect(Collectors.toList());
    }

    @PostMapping
    public Annonce createAnnonce(@RequestBody Annonce annonce) {
        return annonceService.save(annonce);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Annonce> updateAnnonce(@PathVariable Long id, @RequestBody Annonce annonce) {
        return annonceService.findById(id)
                .map(existing -> {
                    annonce.setId(id);
                    return ResponseEntity.ok(annonceService.save(annonce));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnnonce(@PathVariable Long id) {
        annonceService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}