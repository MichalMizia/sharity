package com.pap24z.backend.controller;

import com.pap24z.backend.controller.DTO.UserFileDTO;
import com.pap24z.backend.model.User;
import com.pap24z.backend.model.UserFile;
import com.pap24z.backend.service.UserFileService;
import com.pap24z.backend.service.UserService;
import com.pap24z.backend.service.storage.StorageService;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserFileService userFileService;

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
            user.setDescription(userDetails.getDescription());
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

    @GetMapping("/{id}/files")
    public ResponseEntity<List<UserFileDTO>> getUserFiles(@PathVariable Long id) {
        List<UserFile> userFiles = userFileService.getUserFilesByUserId(id);
        if (userFiles != null && !userFiles.isEmpty()) {
            List<UserFileDTO> userFileDTOs = userFiles.stream()
                    .map(userFile -> new UserFileDTO(userFile.getId(), userFile.getFileName(), userFile.getFilePath()))
                    .collect(Collectors.toList());
            return ResponseEntity.ok(userFileDTOs);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // post user file
    @PostMapping("/{id}/files")
    public ResponseEntity<UserFile> uploadUserFile(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        User user = userService.getUserById(id);

        if (user != null) {
            try {
                String filePath = storageService.storeFile(file);
                UserFile userFile = new UserFile(file.getOriginalFilename(), filePath, user, null);
                UserFile savedUserFile = userFileService.saveUserFile(userFile);
                return ResponseEntity.ok(savedUserFile);
            } catch (Exception e) {
                return ResponseEntity.status(500).body(null);
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
