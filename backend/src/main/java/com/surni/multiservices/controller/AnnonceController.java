package com.surni.multiservices.controller;

import com.surni.multiservices.model.Annonce;
import com.surni.multiservices.service.AnnonceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/annonces")
public class AnnonceController {
    @Autowired
    private AnnonceService annonceService;

    @GetMapping
    public List<Annonce> getAllAnnonces() {
        return annonceService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Annonce> getAnnonceById(@PathVariable Long id) {
        return annonceService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/artisan/{artisanId}")
    public List<Annonce> getAnnoncesByArtisan(@PathVariable Long artisanId) {
        return annonceService.findByArtisanId(artisanId);
    }

    @GetMapping("/client/{clientId}")
    public List<Annonce> getAnnoncesByClient(@PathVariable Long clientId) {
        return annonceService.findByClientId(clientId);
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