package com.surni.multiservices.controller;

import com.surni.multiservices.dto.ArtisanDTO;
import com.surni.multiservices.dto.UserDTO;
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
    public List<UserDTO> getAllUsers() {
        return userService.findAll().stream().map(UserService::toDTO).toList();
    }

    @GetMapping("/artisans")
    public List<ArtisanDTO> getAllArtisans() {
        return artisanService.findAll().stream().map(ArtisanService::toDTO).toList();
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

    @GetMapping("/annonces")
    public List<Annonce> getAllAnnonces(@RequestParam(value = "status", required = false) String status) {
        if (status != null) {
            try {
                return annonceService.findByStatus(Annonce.Status.valueOf(status));
            } catch (IllegalArgumentException e) {
                return List.of();
            }
        }
        return annonceService.findAll();
    }

    @PutMapping("/annonces/{id}/status")
    public ResponseEntity<Annonce> updateAnnonceStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        if (!body.containsKey("status")) {
            return ResponseEntity.badRequest().build();
        }
        try {
            Annonce.Status status = Annonce.Status.valueOf(body.get("status"));
            Annonce updated = annonceService.updateStatus(id, status);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        User user = userService.findById(id).orElse(null);
        if (user == null)
            return ResponseEntity.notFound().build();
        if (user.getRole() == com.surni.multiservices.model.Role.ADMIN && userService.countAdmins() <= 1) {
            return ResponseEntity.status(403).build(); // Interdit de supprimer le dernier admin
        }
        userService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/users/{id}/role")
    public ResponseEntity<User> updateUserRole(@PathVariable Long id, @RequestBody Map<String, String> body) {
        if (!body.containsKey("role"))
            return ResponseEntity.badRequest().build();
        User user = userService.findById(id).orElse(null);
        if (user == null)
            return ResponseEntity.notFound().build();
        com.surni.multiservices.model.Role newRole;
        try {
            newRole = com.surni.multiservices.model.Role.valueOf(body.get("role"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
        // Empêche l'auto-downgrade du dernier admin
        if (user.getRole() == com.surni.multiservices.model.Role.ADMIN
                && newRole != com.surni.multiservices.model.Role.ADMIN && userService.countAdmins() <= 1) {
            return ResponseEntity.status(403).build();
        }
        user.setRole(newRole);
        userService.save(user);
        return ResponseEntity.ok(user);
    }

    // Pour activer/désactiver un artisan ou une annonce, il faudrait ajouter un
    // champ "active" ou "status" dans les entités
}