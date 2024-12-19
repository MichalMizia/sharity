package com.pap24z.backend.repository;

import com.pap24z.backend.model.ProductListing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductListingRepository extends JpaRepository<ProductListing, Long> {
    List<ProductListing> findByUserId(Long userId);
}