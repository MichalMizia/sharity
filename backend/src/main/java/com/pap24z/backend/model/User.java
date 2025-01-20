package com.pap24z.backend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.util.List;

@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = "username"),
        @UniqueConstraint(columnNames = "email")
})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @NotBlank
    @Size(max = 20)
    private String username;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    @NotBlank
    private String password;

    
    @Pattern(
        regexp = "^(\\d{26}|\\d{2} (\\d{4} ){5}\\d{4})$",
        message = "Invalid bank account number format"
    )
    private String account_number;

    private String role;

    private String imageSrc;

    @Size(max = 255)
    private String description;

    private double balance = 0.0;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<UserFile> userFiles;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<ProductListing> productListings;

    public User() {
    }

    public User(String username, String email, String password, String account_number) {
    // public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.setPassword(password);
        // this.account_number = null;
        this.role = "USER";
        this.balance = 0.0;
    }

    public User(String username, String email, String password, String account_number, String role) {
    // public User(String username, String email, String password, String role) {
        this.username = username;
        this.email = email;
        this.setPassword(password);
        // this.account_number = null;
        this.role = role;
        this.balance = 0.0;
    }

    public Long getId() {
        return id;
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

    public void setPassword(String password) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        this.password = passwordEncoder.encode(password);
    }

    public String getAccountNumber() {
        return account_number;
    }

    public void setAcountNumber(String account_number) {
        this.account_number = account_number;
    }

    public String getPassword() {
        return this.password;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getRole() {
        return this.role;
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

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public List<UserFile> getUserFiles() {
        return userFiles;
    }

    public void setUserFiles(List<UserFile> userFiles) {
        this.userFiles = userFiles;
    }

    public List<ProductListing> getProductListings() {
        return productListings;
    }

    public void setProductListings(List<ProductListing> productListings) {
        this.productListings = productListings;
    }

    public boolean verifyPassword(String password) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return passwordEncoder.matches(password, this.password);
    }
}