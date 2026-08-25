package com.smartsupply.enrichment.repository;

import com.smartsupply.enrichment.model.EnrichedProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<EnrichedProduct, Long> {
    List<EnrichedProduct> getEnrichedProductById(Long id);
}
