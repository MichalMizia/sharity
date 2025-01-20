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
    private UserDTO user;
    private List<Long> userFileIds;
    private Long previewFileId;
    private String previewFileUrl;

    public ProductListingDTO() {
    }

    public ProductListingDTO(Long id, String title, String description, int priceFull, int priceChange, String category,
            String[] tags, UserDTO user, List<Long> userFileIds, Long previewFileId) { // Dodajemy previewFileId
        this.id = id;
        this.title = title;
        this.description = description;
        this.priceFull = priceFull;
        this.priceChange = priceChange;
        this.category = category;
        this.tags = tags;
        this.user = user;
        this.userFileIds = userFileIds;
        this.previewFileId = previewFileId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPreviewFileUrl() {
        return previewFileUrl;
    }

    public void setPreviewFileUrl(String previewFileUrl) {
        this.previewFileUrl = previewFileUrl;
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

    public Long getPreviewFileId() {
        return previewFileId;
    }

    public void setPreviewFileId(Long previewFileId) {
        this.previewFileId = previewFileId;
    }
}