package com.pap24z.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import java.util.List;

@Entity
public class UserFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    private String fileName;

    private String filePath;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, referencedColumnName = "ID")
    @JsonBackReference
    private User user;

    @ManyToMany(mappedBy = "userFiles")
    @JsonBackReference
    private List<ProductListing> productListings;

    public UserFile() {
    }

    public UserFile(String fileName, String filePath, User user, List<ProductListing> productListings) {
        this.fileName = fileName;
        this.filePath = filePath;
        this.user = user;
        this.productListings = productListings;
    }

    public Long getId() {
        return id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<ProductListing> getProductListings() {
        return productListings;
    }

    public void setProductListings(List<ProductListing> productListings) {
        this.productListings = productListings;
    }
}