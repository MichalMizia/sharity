package com.pap24z.backend.controller.DTO;

import java.util.List;

public class ProductListingDTO {

    private Long id;
    private String title;
    private String description;
    private int priceFull;
    private int priceChange;
    private String category;
    private String[] tags;
    private Long userId;
    private List<Long> userFileIds;

    public ProductListingDTO() {
    }

    public ProductListingDTO(Long id, String title, String description, int priceFull, int priceChange, String category,
            String[] tags, Long userId, List<Long> userFileIds) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.priceFull = priceFull;
        this.priceChange = priceChange;
        this.category = category;
        this.tags = tags;
        this.userId = userId;
        this.userFileIds = userFileIds;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public int getPriceFull() {
        return priceFull;
    }

    public void setPriceFull(int priceFull) {
        this.priceFull = priceFull;
    }

    public int getPriceChange() {
        return priceChange;
    }

    public void setPriceChange(int priceChange) {
        this.priceChange = priceChange;
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

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public List<Long> getUserFileIds() {
        return userFileIds;
    }

    public void setUserFileIds(List<Long> userFileIds) {
        this.userFileIds = userFileIds;
    }
}