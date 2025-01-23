package com.pap24z.backend.service;

import com.pap24z.backend.model.ProductListing;
import com.pap24z.backend.repository.ProductListingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductListingService {

    @Autowired
    private ProductListingRepository productListingRepository;

    public List<ProductListing> getAllProductListings(PageRequest pageRequest) {
        return productListingRepository.findAll(pageRequest).getContent();
    }

    public Optional<ProductListing> getProductListingById(Long id) {
        return productListingRepository.findById(id);
    }

    public List<ProductListing> getProductListingsByUserId(Long userId) {
        return productListingRepository.findByUserId(userId);
    }

    public List<ProductListing> searchProductListings(String keyword, Pageable pageable) {
        return productListingRepository.searchByKeyword(keyword.toLowerCase(), pageable);
    }

    public ProductListing saveProductListing(ProductListing productListing) {
        return productListingRepository.save(productListing);
    }

    public void deleteProductListing(Long id) {
        productListingRepository.deleteById(id);
    }

    public boolean existsByTitleAndUserId(String title, Long userId) {
        return productListingRepository.existsByTitleAndUserId(title, userId);
    }

    public boolean existsByUserFilesAndUserId(List<Long> userFileIds, Long userId) {
        return productListingRepository.existsByUserFilesAndUserId(userFileIds, userId);
    }
}