package com.surni.multiservices.service;

import com.surni.multiservices.model.Artisan;
import com.surni.multiservices.repository.ArtisanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import com.surni.multiservices.model.Comment;
import com.surni.multiservices.repository.CommentRepository;
import java.util.stream.Collectors;
import com.surni.multiservices.dto.ArtisanDTO;

@Service
public class ArtisanService {
    @Autowired
    private ArtisanRepository artisanRepository;

    @Autowired
    private CommentRepository commentRepository;

    public List<Artisan> findAll() {
        return artisanRepository.findAll();
    }

    public Optional<Artisan> findById(Long id) {
        return artisanRepository.findById(id);
    }

    public Artisan save(Artisan artisan) {
        return artisanRepository.save(artisan);
    }

    public void deleteById(Long id) {
        artisanRepository.deleteById(id);
    }

    public List<Artisan> findByCityAndCategory(String city, String category) {
        return artisanRepository.findAll().stream()
                .filter(a -> (city == null || a.getCity().equalsIgnoreCase(city)))
                .filter(a -> (category == null || a.getCategory().equalsIgnoreCase(category)))
                .collect(Collectors.toList());
    }

    public double getAverageRating(Artisan artisan) {
        List<Comment> comments = commentRepository.findByArtisanId(artisan.getId());
        if (comments.isEmpty())
            return 0.0;
        return comments.stream().mapToInt(Comment::getRating).average().orElse(0.0);
    }

    public List<Artisan> findTopArtisans(String city, String category, int limit) {
        return findByCityAndCategory(city, category).stream()
                .sorted((a1, a2) -> Double.compare(getAverageRating(a2), getAverageRating(a1)))
                .limit(limit)
                .collect(Collectors.toList());
    }

    public Artisan findByUserId(Long userId) {
        return artisanRepository.findByUserId(userId);
    }

    public static ArtisanDTO toDTO(Artisan artisan) {
        if (artisan == null)
            return null;
        ArtisanDTO dto = new ArtisanDTO();
        dto.setId(artisan.getId());
        dto.setPhotoUrl(artisan.getPhotoUrl());
        dto.setEmail(artisan.getEmail());
        dto.setPhone(artisan.getPhone());
        dto.setCity(artisan.getCity());
        dto.setCategory(artisan.getCategory());
        return dto;
    }
}