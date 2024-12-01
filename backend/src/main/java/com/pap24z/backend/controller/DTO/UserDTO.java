package com.pap24z.backend.controller.DTO;

public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private String role;
    private String imageSrc;

    public UserDTO(Long id, String username, String email, String role, String imageSrc) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
        this.imageSrc = imageSrc;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getImageSrc() {
        return imageSrc;
    }

    public void setImageSrc(String imageSrc) {
        this.imageSrc = imageSrc;
    }
}