package com.pap24z.backend.controller.DTO;

public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private String account_number;
    private String role;
    private String imageSrc;
    private String description;
    private String password;

    public UserDTO(Long id, String username, String email, String account_number, String role, String imageSrc, String description,
            String password) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.account_number = account_number;
        this.role = role;
        this.imageSrc = imageSrc;
        this.description = description;
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

    public String getAccountNumber() {
        return account_number;
    }

    public void setAcountNumber(String account_number) {
        this.account_number = account_number;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getImageSrc() {
        return imageSrc;
    }

    public void setImageSrc(String imageSrc) {
        this.imageSrc = imageSrc;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}