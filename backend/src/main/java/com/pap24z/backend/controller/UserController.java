package com.pap24z.backend.controller;

import com.pap24z.backend.model.User;
import com.pap24z.backend.service.UserService;
import com.pap24z.backend.service.storage.StorageService;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private StorageService storageService;

    @Value("${img.base-url}")
    private String baseUrl;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        User user = userService.getUserById(id);
        if (user != null) {
            user.setUsername(userDetails.getUsername());
            user.setEmail(userDetails.getEmail());
            user.setPassword(userDetails.getPassword());
            User updatedUser = userService.saveUser(user);
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        User user = userService.getUserById(id);
        if (user != null) {
            userService.deleteUser(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // update profile image
    @PostMapping("/{id}/profile-image")
    public ResponseEntity<User> updateUserProfileImage(HttpServletRequest request, @PathVariable Long id,
            @RequestParam("image") MultipartFile image) {
        User user = (User) request.getSession().getAttribute("user");

        if (user != null && user.getId().equals(id)) {
            try {
                String filename = storageService.storeFile(image);
                user.setImageSrc(baseUrl + filename);
                User updatedUser = userService.saveUser(user);

                // update image in session
                request.getSession().setAttribute("user", updatedUser);
                return ResponseEntity.ok(updatedUser);
            } catch (Exception e) {
                return ResponseEntity.status(500).body(null);
            }
        } else {
            return ResponseEntity.status(403).body(null);
        }
    }
}