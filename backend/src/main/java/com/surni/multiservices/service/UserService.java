package com.surni.multiservices.service;

import com.surni.multiservices.model.User;
import com.surni.multiservices.repository.UserRepository;
import com.surni.multiservices.dto.UserDTO;
import com.surni.multiservices.dto.ArtisanDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public long countAdmins() {
        return userRepository.countByRole(com.surni.multiservices.model.Role.ADMIN);
    }

    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    public static UserDTO toDTO(User user) {
        if (user == null)
            return null;
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole().name());
        if (user.getArtisanProfile() != null) {
            ArtisanDTO artisanDTO = new ArtisanDTO();
            artisanDTO.setId(user.getArtisanProfile().getId());
            artisanDTO.setPhotoUrl(user.getArtisanProfile().getPhotoUrl());
            artisanDTO.setEmail(user.getArtisanProfile().getEmail());
            artisanDTO.setPhone(user.getArtisanProfile().getPhone());
            artisanDTO.setCity(user.getArtisanProfile().getCity());
            artisanDTO.setCategory(user.getArtisanProfile().getCategory());
            dto.setArtisanProfile(artisanDTO);
        }
        return dto;
    }
}