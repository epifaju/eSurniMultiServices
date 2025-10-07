package com.surni.multiservices.controller;

import com.surni.multiservices.model.Comment;
import com.surni.multiservices.model.Artisan;
import com.surni.multiservices.model.User;
import com.surni.multiservices.service.CommentService;
import com.surni.multiservices.service.ArtisanService;
import com.surni.multiservices.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/comments")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @Autowired
    private ArtisanService artisanService;

    @Autowired
    private UserService userService;

    @GetMapping
    public List<Comment> getAllComments() {
        return commentService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Comment> getCommentById(@PathVariable Long id) {
        return commentService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/artisan/{artisanId}")
    public List<Comment> getCommentsByArtisan(@PathVariable Long artisanId) {
        return commentService.findByArtisanId(artisanId);
    }

    @PostMapping("/artisan/{artisanId}")
    public ResponseEntity<?> createCommentForArtisan(
            @PathVariable Long artisanId,
            @RequestBody Map<String, Object> commentData) {
        try {
            Artisan artisan = artisanService.findById(artisanId)
                    .orElseThrow(() -> new RuntimeException("Artisan non trouvé"));

            Long userId = Long.parseLong(commentData.get("userId").toString());
            User user = userService.findById(userId)
                    .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

            int rating = Integer.parseInt(commentData.get("rating").toString());
            String content = commentData.get("content").toString();

            Comment comment = Comment.builder()
                    .artisan(artisan)
                    .user(user)
                    .rating(rating)
                    .content(content)
                    .createdAt(LocalDateTime.now())
                    .build();

            Comment savedComment = commentService.save(comment);
            return ResponseEntity.ok(savedComment);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping
    public Comment createComment(@RequestBody Comment comment) {
        if (comment.getCreatedAt() == null) {
            comment.setCreatedAt(LocalDateTime.now());
        }
        return commentService.save(comment);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Comment> updateComment(@PathVariable Long id, @RequestBody Comment comment) {
        return commentService.findById(id)
                .map(existing -> {
                    comment.setId(id);
                    return ResponseEntity.ok(commentService.save(comment));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
        commentService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}