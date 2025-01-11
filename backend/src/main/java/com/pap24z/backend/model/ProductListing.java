package com.pap24z.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min; // Import adnotacji Min
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "ProductListing")
public class ProductListing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "title")
    private String title;

    private String description;

    @Min(value = 0, message = "Price full must be greater than or equal to 0") // Dodano walidację
    private int priceFull;

    @Min(value = 0, message = "Price change must be greater than or equal to 0") // Dodano walidację
    private int priceChange;

    private String category;

    @ElementCollection
    private String[] tags;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, referencedColumnName = "ID")
    @JsonBackReference
    private User user;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "product_listing_user_file", joinColumns = @JoinColumn(name = "product_listing_id", referencedColumnName = "ID"), inverseJoinColumns = @JoinColumn(name = "user_file_id", referencedColumnName = "ID"))
    @JsonManagedReference
    private List<UserFile> userFiles;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    public ProductListing() {
    }

    public ProductListing(String title, String description, String category, String[] tags, int priceFull,
            int priceChange, User user,
            List<UserFile> userFiles) {
        this.title = title;
        this.description = description;
        this.category = category;
        this.tags = tags;
        this.priceFull = priceFull;
        this.priceChange = priceChange;
        this.user = user;
        this.userFiles = userFiles;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String[] getTags() {
        return tags;
    }

    public void setTags(String[] tags) {
        this.tags = tags;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<UserFile> getUserFiles() {
        return userFiles;
    }

    public void setUserFiles(List<UserFile> userFiles) {
        this.userFiles = userFiles;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public int getPriceFull() {
        return this.priceFull;
    }

    public void setPriceFull(int new_price_full) {
        this.priceFull = new_price_full;
    }

    public int getPriceChange() {
        return this.priceChange;
    }

    public void setPriceChange(int new_price_change) {
        this.priceChange = new_price_change;
    }

    @Override
    public String toString() {
        return "ProductListing{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", tags=" + Arrays.toString(tags) +
                ", user=" + user +
                ", userFiles=" + userFiles +
                ", createdAt=" + createdAt +
                '}';
    }
}
