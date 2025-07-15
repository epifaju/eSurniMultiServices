package com.surni.multiservices.controller;

import com.surni.multiservices.model.Artisan;
import com.surni.multiservices.model.Annonce;
import com.surni.multiservices.service.ArtisanService;
import com.surni.multiservices.service.AnnonceService;
import com.surni.multiservices.dto.ArtisanWithRatingDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

@RestController
@RequestMapping("/api/search")
public class SearchController {
        @Autowired
        private ArtisanService artisanService;
        @Autowired
        private AnnonceService annonceService;

        @GetMapping("/artisans")
        public Page<ArtisanWithRatingDTO> searchArtisans(
                        @RequestParam(required = false) String city,
                        @RequestParam(required = false) String category,
                        @RequestParam(required = false, defaultValue = "false") boolean top,
                        @RequestParam(required = false, defaultValue = "5") int limit,
                        @RequestParam(required = false, defaultValue = "") String q,
                        @RequestParam(defaultValue = "0") int page,
                        @RequestParam(defaultValue = "10") int size) {
                List<Artisan> artisans = top ? artisanService.findTopArtisans(city, category, limit)
                                : artisanService.findByCityAndCategory(city, category);
                // Recherche par mot-clé sur nom, ville, catégorie
                if (!q.isEmpty()) {
                        artisans = artisans.stream()
                                        .filter(a -> (a.getUser() != null && a.getUser().getName() != null
                                                        && a.getUser().getName().toLowerCase()
                                                                        .contains(q.toLowerCase()))
                                                        ||
                                                        (a.getCity() != null && a.getCity().toLowerCase()
                                                                        .contains(q.toLowerCase()))
                                                        ||
                                                        (a.getCategory() != null && a.getCategory().toLowerCase()
                                                                        .contains(q.toLowerCase())))
                                        .collect(Collectors.toList());
                }
                // Pagination
                int start = Math.min(page * size, artisans.size());
                int end = Math.min(start + size, artisans.size());
                List<ArtisanWithRatingDTO> content = artisans.subList(start, end).stream()
                                .map(a -> new ArtisanWithRatingDTO(
                                                a.getId(),
                                                a.getUser() != null ? a.getUser().getName() : null,
                                                a.getPhotoUrl(),
                                                a.getEmail(),
                                                a.getPhone(),
                                                a.getCity(),
                                                a.getCategory(),
                                                artisanService.getAverageRating(a)))
                                .collect(Collectors.toList());
                return new PageImpl<>(content, PageRequest.of(page, size), artisans.size());
        }

        @GetMapping("/annonces")
        public Page<Annonce> searchAnnonces(
                        @RequestParam(required = false) String city,
                        @RequestParam(required = false) String category,
                        @RequestParam(required = false, defaultValue = "") String q,
                        @RequestParam(defaultValue = "0") int page,
                        @RequestParam(defaultValue = "10") int size) {
                List<Annonce> annonces = annonceService.findByCityAndCategory(city, category).stream()
                                .filter(a -> a.getStatus() == Annonce.Status.APPROVED)
                                .collect(Collectors.toList());
                // Recherche par mot-clé sur titre, description, ville, catégorie, nom de
                // l'artisan, email de l'artisan, nom du client
                if (!q.isEmpty()) {
                        String qLower = q.toLowerCase();
                        annonces = annonces.stream()
                                        .filter(a -> (a.getTitle() != null
                                                        && a.getTitle().toLowerCase().contains(qLower))
                                                        || (a.getDescription() != null && a.getDescription()
                                                                        .toLowerCase().contains(qLower))
                                                        || (a.getArtisan() != null && ((a.getArtisan().getCity() != null
                                                                        && a.getArtisan().getCity().toLowerCase()
                                                                                        .contains(qLower))
                                                                        || (a.getArtisan().getCategory() != null && a
                                                                                        .getArtisan().getCategory()
                                                                                        .toLowerCase().contains(qLower))
                                                                        || (a.getArtisan().getUser() != null && a
                                                                                        .getArtisan().getUser()
                                                                                        .getName() != null
                                                                                        && a.getArtisan().getUser()
                                                                                                        .getName()
                                                                                                        .toLowerCase()
                                                                                                        .contains(qLower))
                                                                        || (a.getArtisan().getEmail() != null && a
                                                                                        .getArtisan().getEmail()
                                                                                        .toLowerCase()
                                                                                        .contains(qLower))))
                                                        || (a.getClient() != null && a.getClient().getName() != null
                                                                        && a.getClient().getName().toLowerCase()
                                                                                        .contains(qLower)))
                                        .collect(Collectors.toList());
                }
                // Pagination
                int start = Math.min(page * size, annonces.size());
                int end = Math.min(start + size, annonces.size());
                List<Annonce> content = annonces.subList(start, end);
                return new PageImpl<>(content, PageRequest.of(page, size), annonces.size());
        }

        // Pour top artisans, il faudrait une méthode pour trier par note moyenne
}