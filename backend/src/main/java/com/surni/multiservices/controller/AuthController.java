package com.surni.multiservices.controller;

import com.surni.multiservices.model.Role;
import com.surni.multiservices.model.User;
import com.surni.multiservices.repository.UserRepository;
import com.surni.multiservices.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    // Réponse d'erreur structurée pour JSON
    public static class ErrorResponse {
        public String error;

        public ErrorResponse(String error) {
            this.error = error;
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody Map<String, String> loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.get("email"),
                        loginRequest.get("password")));
        User user = userRepository.findByEmail(loginRequest.get("email")).orElseThrow();
        String token = jwtTokenProvider.generateToken(user.getEmail(), user.getRole().name());
        return ResponseEntity.ok(Map.of(
                "token", token,
                "role", user.getRole().name(),
                "userId", user.getId()));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Map<String, String> signUpRequest) {
        if (userRepository.findByEmail(signUpRequest.get("email")).isPresent()) {
            return ResponseEntity
                    .badRequest()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(new ErrorResponse("Email déjà utilisé"));
        }
        User user = User.builder()
                .name(signUpRequest.get("name"))
                .email(signUpRequest.get("email"))
                .password(passwordEncoder.encode(signUpRequest.get("password")))
                .role(Role.valueOf(signUpRequest.getOrDefault("role", "USER")))
                .build();
        userRepository.save(user);
        String token = jwtTokenProvider.generateToken(user.getEmail(), user.getRole().name());
        return ResponseEntity.ok(Map.of(
                "token", token,
                "role", user.getRole().name(),
                "userId", user.getId()));
    }

    @GetMapping("/test-json")
    public ErrorResponse testJson() {
        return new ErrorResponse("Ceci est un test JSON");
    }
}