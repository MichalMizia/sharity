package com.pap24z.backend.controller;

import com.pap24z.backend.controller.DTO.ProductListingDTO;
import com.pap24z.backend.model.ProductListing;
import com.pap24z.backend.model.User;
import com.pap24z.backend.model.UserFile;
import com.pap24z.backend.service.ProductListingService;
import com.pap24z.backend.service.UserFileService;
import com.pap24z.backend.service.UserService;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/product-listings")
public class ProductListingController {

    @Autowired
    private ProductListingService productListingService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserFileService userFileService;

    @GetMapping
    public List<ProductListing> getAllProductListings(
            @RequestParam(defaultValue = "false") boolean sortByTime,
            @RequestParam(defaultValue = "10") int limit) {
        if (sortByTime) {
            return productListingService
                    .getAllProductListings(PageRequest.of(0, limit, Sort.by(Sort.Direction.DESC, "createdAt")));
        } else {
            return productListingService.getAllProductListings(PageRequest.of(0, limit));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductListing> getProductListingById(@PathVariable Long id) {
        Optional<ProductListing> productListing = productListingService.getProductListingById(id);
        return productListing.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ProductListingDTO>> getProductListingsByUserId(HttpServletRequest request,
            @PathVariable Long userId) {
        User user = (User) request.getSession().getAttribute("user");

        if (user == null || !user.getId().equals(userId)) {
            return ResponseEntity.status(403).build();
        }

        List<ProductListing> productListings = productListingService.getProductListingsByUserId(userId);
        List<ProductListingDTO> productListingDTOs = productListings.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(productListingDTOs);
    }

    @PostMapping
    public ResponseEntity<ProductListingDTO> createProductListing(HttpServletRequest request,
            @RequestBody ProductListingDTO productListingDTO) {
        User user = (User) request.getSession().getAttribute("user");
        System.out.println(user);
        if (user == null || !user.getId().equals(productListingDTO.getUserId())) {
            return ResponseEntity.status(403).build();
        }

        ProductListing productListing = convertToEntity(productListingDTO);
        ProductListing savedProductListing = productListingService.saveProductListing(productListing);
        return ResponseEntity.ok(convertToDTO(savedProductListing));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductListingDTO> updateProductListing(HttpServletRequest request, @PathVariable Long id,
            @RequestBody ProductListingDTO productListingDTO) {
        User user = (User) request.getSession().getAttribute("user");
        if (user == null || !user.getId().equals(productListingDTO.getUserId())) {
            return ResponseEntity.status(403).build();
        }

        Optional<ProductListing> productListingOptional = productListingService.getProductListingById(id);
        if (productListingOptional.isPresent()) {
            ProductListing productListing = productListingOptional.get();
            if (!productListing.getUser().getId().equals(user.getId())) {
                return ResponseEntity.status(403).build();
            }

            productListing.setTitle(productListingDTO.getTitle());
            productListing.setDescription(productListingDTO.getDescription());
            productListing.setTags(productListingDTO.getTags());
            productListing.setUserFiles(productListingDTO.getUserFileIds().stream()
                    .map(userFileService::getUserFileById)
                    .filter(Optional::isPresent)
                    .map(Optional::get)
                    .collect(Collectors.toList()));
            ProductListing updatedProductListing = productListingService.saveProductListing(productListing);
            return ResponseEntity.ok(convertToDTO(updatedProductListing));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductListing(HttpServletRequest request, @PathVariable Long id) {
        User user = (User) request.getSession().getAttribute("user");

        Optional<ProductListing> productListingOptional = productListingService.getProductListingById(id);
        if (productListingOptional.isPresent()) {
            ProductListing productListing = productListingOptional.get();
            if (!productListing.getUser().getId().equals(user.getId())) {
                return ResponseEntity.status(403).build();
            }
            productListingService.deleteProductListing(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    private ProductListingDTO convertToDTO(ProductListing productListing) {
        return new ProductListingDTO(
                productListing.getId(),
                productListing.getTitle(),
                productListing.getDescription(),
                productListing.getPriceFull(),
                productListing.getPriceChange(),
                productListing.getCategory(),
                productListing.getTags(),
                productListing.getUser().getId(),
                productListing.getUserFiles().stream()
                        .map(UserFile::getId)
                        .collect(Collectors.toList()));
    }

    private ProductListing convertToEntity(ProductListingDTO productListingDTO) {
        User user = userService.getUserById(productListingDTO.getUserId());
        List<UserFile> userFiles = productListingDTO.getUserFileIds().stream()
                .map(userFileService::getUserFileById)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toList());

        return new ProductListing(
                productListingDTO.getTitle(),
                productListingDTO.getDescription(),
                productListingDTO.getCategory(),
                productListingDTO.getTags(),
                productListingDTO.getPriceFull(),
                productListingDTO.getPriceChange(),
                user,
                userFiles);
    }
}