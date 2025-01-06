package com.pap24z.backend.controller.DTO;

import java.util.Date;

public class TransactionDTO {

    private Long id;
    private Date transactionDate;
    private Double amount;
    private String status;
    private Long productListingId;
    private Long userId;

    public TransactionDTO() {
    }

    public TransactionDTO(Long id, Date transactionDate, Double amount, String status, Long productListingId,
            Long userId) {
        this.id = id;
        this.transactionDate = transactionDate;
        this.amount = amount;
        this.status = status;
        this.productListingId = productListingId;
        this.userId = userId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(Date transactionDate) {
        this.transactionDate = transactionDate;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getProductListingId() {
        return productListingId;
    }

    public void setProductListingId(Long productListingId) {
        this.productListingId = productListingId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}