package com.smartsupply.enrichment.repository;

import com.smartsupply.enrichment.model.EnrichedProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<EnrichedProduct, Long> {
    Optional<EnrichedProduct> findByProductId(String productId);
}
