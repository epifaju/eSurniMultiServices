package com.surni.multiservices.repository;

import com.surni.multiservices.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    long countByRole(com.surni.multiservices.model.Role role);
}