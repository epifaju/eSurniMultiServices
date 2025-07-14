package com.surni.multiservices.controller;

import com.surni.multiservices.model.Comment;
import com.surni.multiservices.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/comments")
public class CommentController {
    @Autowired
    private CommentService commentService;

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

    @GetMapping("/annonce/{annonceId}")
    public List<Comment> getCommentsByAnnonce(@PathVariable Long annonceId) {
        return commentService.findByAnnonceId(annonceId);
    }

    @PostMapping
    public Comment createComment(@RequestBody Comment comment) {
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