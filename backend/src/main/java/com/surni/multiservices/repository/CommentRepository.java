package com.surni.multiservices.repository;

import com.surni.multiservices.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByArtisanId(Long artisanId);
}