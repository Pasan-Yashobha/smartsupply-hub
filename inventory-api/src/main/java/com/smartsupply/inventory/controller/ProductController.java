package com.smartsupply.inventory.controller;

import com.smartsupply.inventory.dto.ProductResponseDto;
import com.smartsupply.inventory.service.ProductService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
@Slf4j
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<Page<ProductResponseDto>> getAllProducts(Pageable pageable) {
        log.info("GET /api/v1/products - page: {}, size: {}",
                pageable.getPageNumber(), pageable.getPageSize());
        return ResponseEntity.ok(productService.getAllProducts(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDto> getProductById(@PathVariable Long id) {
        log.info("GET /api/v1/products/{}", id);
        return productService.getProductById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/supplier/{supplier}")
    public ResponseEntity<List<ProductResponseDto>> getProductsBySupplier(@PathVariable String supplier) {
        log.info("GET /api/v1/products/supplier/{}", supplier);
        return ResponseEntity.ok(productService.getProductsBySupplier(supplier));
    }

}
