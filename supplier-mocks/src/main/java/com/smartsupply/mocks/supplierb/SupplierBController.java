package com.smartsupply.mocks.supplierb;

import com.smartsupply.mocks.shared.FakeProductFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/supplier-b")
@Slf4j
public class SupplierBController {

    private static final int PRODUCT_COUNT = 15;

    @GetMapping("/products")
    public ResponseEntity<List<SupplierBProductResponse>> getProductDetails() {
        List<SupplierBProductResponse> products = new ArrayList<>();

        for (int i = 0; i < PRODUCT_COUNT; i++) {
            products.add(FakeProductFactory.buildBProductResponse());
        }

        log.info("Supplier B returning {} products", products.size());
        return ResponseEntity.ok(products);
    }
}
