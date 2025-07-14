package com.surni.multiservices.controller;

import com.surni.multiservices.model.Artisan;
import com.surni.multiservices.model.Annonce;
import com.surni.multiservices.model.User;
import com.surni.multiservices.service.ArtisanService;
import com.surni.multiservices.service.AnnonceService;
import com.surni.multiservices.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private ArtisanService artisanService;
    @Autowired
    private AnnonceService annonceService;
    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        // À adapter selon besoins (masquer mot de passe, etc.)
        return userService.findAll();
    }

    @GetMapping("/artisans")
    public List<Artisan> getAllArtisans() {
        return artisanService.findAll();
    }

    @DeleteMapping("/artisans/{id}")
    public ResponseEntity<Void> deleteArtisan(@PathVariable Long id) {
        artisanService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/annonces/{id}")
    public ResponseEntity<Void> deleteAnnonce(@PathVariable Long id) {
        annonceService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/annonces/{id}/active")
    public ResponseEntity<Annonce> updateAnnonceActiveStatus(@PathVariable Long id,
            @RequestBody Map<String, Boolean> body) {
        if (!body.containsKey("active")) {
            return ResponseEntity.badRequest().build();
        }
        Annonce updated = annonceService.updateActiveStatus(id, body.get("active"));
        return ResponseEntity.ok(updated);
    }

    // Pour activer/désactiver un artisan ou une annonce, il faudrait ajouter un
    // champ "active" ou "status" dans les entités
}