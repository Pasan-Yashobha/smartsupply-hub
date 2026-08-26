package com.smartsupply.inventory.service;

import com.smartsupply.inventory.dto.ProductResponseDto;
import com.smartsupply.inventory.mapper.ProductMapper;
import com.smartsupply.inventory.model.EnrichedProduct;
import com.smartsupply.inventory.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    public Page<ProductResponseDto> getAllProducts(Pageable pageable) {
        Page<EnrichedProduct> enrichedProduct = productRepository.findAll(pageable);
        return enrichedProduct.map(productMapper::toResponse);
    }

    public Optional<ProductResponseDto> getProductById(Long id) {
        return productRepository.findById(id)
                .map(productMapper::toResponse);
    }

    public List<ProductResponseDto> getProductsBySupplier(String supplier) {
        List<EnrichedProduct> enrichedProducts = productRepository.findBySupplier(supplier);
        log.info("Found {} enriched products for supplier: {}", enrichedProducts.size(), supplier);
        return productMapper.toResponseList(enrichedProducts);
    }
}
