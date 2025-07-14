package com.surni.multiservices.controller;

import com.surni.multiservices.model.Artisan;
import com.surni.multiservices.service.ArtisanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/artisans")
public class ArtisanController {
    @Autowired
    private ArtisanService artisanService;

    @GetMapping
    public List<Artisan> getAllArtisans() {
        return artisanService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Artisan> getArtisanById(@PathVariable Long id) {
        return artisanService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Artisan> getArtisanByUserId(@PathVariable Long userId) {
        Artisan artisan = artisanService.findByUserId(userId);
        if (artisan != null) {
            return ResponseEntity.ok(artisan);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Artisan createArtisan(@RequestBody Artisan artisan) {
        return artisanService.save(artisan);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Artisan> updateArtisan(@PathVariable Long id, @RequestBody Artisan artisan) {
        return artisanService.findById(id)
                .map(existing -> {
                    artisan.setId(id);
                    return ResponseEntity.ok(artisanService.save(artisan));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArtisan(@PathVariable Long id) {
        artisanService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}