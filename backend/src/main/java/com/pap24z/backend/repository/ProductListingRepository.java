package com.pap24z.backend.repository;

import com.pap24z.backend.model.ProductListing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Repository
public interface ProductListingRepository extends JpaRepository<ProductListing, Long> {
    List<ProductListing> findByUserId(Long userId);

    @Query("SELECT p FROM ProductListing p " +
            "LEFT JOIN p.tags t " +
            "WHERE (LOWER(p.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.category) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(t) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<ProductListing> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);

    @Query("SELECT CASE WHEN COUNT(pl) > 0 THEN true ELSE false END FROM ProductListing pl WHERE pl.title = :title AND pl.user.id = :userId")
    boolean existsByTitleAndUserId(@Param("title") String title, @Param("userId") Long userId);

    @Query("SELECT CASE WHEN COUNT(pl) > 0 THEN true ELSE false END FROM ProductListing pl JOIN pl.userFiles uf WHERE uf.id IN :userFileIds AND pl.user.id = :userId")
    boolean existsByUserFilesAndUserId(@Param("userFileIds") List<Long> userFileIds, @Param("userId") Long userId);
}