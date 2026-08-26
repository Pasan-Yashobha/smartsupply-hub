package com.smartsupply.inventory.repository;

import com.smartsupply.inventory.model.EnrichedProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<EnrichedProduct, Long> {
    List<EnrichedProduct> findBySupplier(String supplier);
}
