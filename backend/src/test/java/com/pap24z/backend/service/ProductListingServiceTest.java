package com.pap24z.backend.service;

import com.pap24z.backend.model.ProductListing;
import com.pap24z.backend.repository.ProductListingRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProductListingServiceTest {

    @Mock
    private ProductListingRepository productListingRepository;

    @InjectMocks
    private ProductListingService productListingService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllProductListings() {
        List<ProductListing> productListings = new ArrayList<>();
        productListings.add(new ProductListing());
        productListings.add(new ProductListing());
        Page<ProductListing> page = new PageImpl<>(productListings);
        PageRequest pageRequest = PageRequest.of(0, 10);

        when(productListingRepository.findAll(pageRequest)).thenReturn(page);

        List<ProductListing> result = productListingService.getAllProductListings(pageRequest);
        assertNotNull(result);
        assertEquals(2, result.size());
        verify(productListingRepository, times(1)).findAll(pageRequest);
    }

    @Test
    void testGetProductListingByIdNotFound() {
        when(productListingRepository.findById(1L)).thenReturn(Optional.empty());

        Optional<ProductListing> result = productListingService.getProductListingById(1L);
        assertFalse(result.isPresent());
        verify(productListingRepository, times(1)).findById(1L);
    }

    @Test
    void testGetProductListingsByUserId() {
        List<ProductListing> productListings = new ArrayList<>();
        productListings.add(new ProductListing());
        when(productListingRepository.findByUserId(1L)).thenReturn(productListings);

        List<ProductListing> result = productListingService.getProductListingsByUserId(1L);
        assertNotNull(result);
        assertEquals(1, result.size());
        verify(productListingRepository, times(1)).findByUserId(1L);
    }

    @Test
    void testSearchProductListings() {
        List<ProductListing> productListings = new ArrayList<>();
        productListings.add(new ProductListing());
        Pageable pageable = PageRequest.of(0, 10);
        when(productListingRepository.searchByKeyword("keyword", pageable)).thenReturn(productListings);

        List<ProductListing> result = productListingService.searchProductListings("keyword", pageable);
        assertNotNull(result);
        assertEquals(1, result.size());
        verify(productListingRepository, times(1)).searchByKeyword("keyword", pageable);
    }

    @Test
    void testSaveProductListing() {
        ProductListing productListing = new ProductListing();
        when(productListingRepository.save(productListing)).thenReturn(productListing);

        ProductListing result = productListingService.saveProductListing(productListing);
        assertNotNull(result);
        verify(productListingRepository, times(1)).save(productListing);
    }

    @Test
    void testDeleteProductListing() {
        productListingService.deleteProductListing(1L);
        verify(productListingRepository, times(1)).deleteById(1L);
    }
}
