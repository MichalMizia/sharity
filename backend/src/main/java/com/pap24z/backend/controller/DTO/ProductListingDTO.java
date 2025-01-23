package com.pap24z.backend.controller.DTO;

import java.util.ArrayList;
import java.util.List;

public class ProductListingDTO {

    private Long id;
    private String title;
    private String description;
    private int priceFull;
    private int priceChange;
    private String category;
    private String[] tags;
    private UserDTO user;
    private List<Long> userFileIds;
    private List<Long> previewFileIds;
    private List<String> previewFileUrls;

    public ProductListingDTO() {
    }

    public ProductListingDTO(Long id, String title, String description, int priceFull, int priceChange, String category,
            String[] tags, UserDTO user, List<Long> userFileIds, List<Long> previewFileIds) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.priceFull = priceFull;
        this.priceChange = priceChange;
        this.category = category;
        this.tags = tags;
        this.user = user;
        this.userFileIds = (userFileIds != null && userFileIds.isEmpty() == false) ? userFileIds : new ArrayList<>();
        this.previewFileIds = (previewFileIds != null && previewFileIds.isEmpty() == false) ? previewFileIds
                : new ArrayList<>();
        this.previewFileUrls = new ArrayList<>();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<String> getPreviewFileUrls() {
        return previewFileUrls;
    }

    public void setPreviewFileUrls(List<String> previewFileUrls) {
        this.previewFileUrls = previewFileUrls;
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

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public List<Long> getUserFileIds() {
        return userFileIds;
    }

    public void setUserFileIds(List<Long> userFileIds) {
        this.userFileIds = userFileIds;
    }

    public List<Long> getPreviewFileIds() {
        return previewFileIds;
    }

    public void setPreviewFileIds(List<Long> previewFileIds) {
        this.previewFileIds = previewFileIds;
    }
}