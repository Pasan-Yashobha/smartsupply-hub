package com.smartsupply.mocks.suppliera;

import com.smartsupply.mocks.shared.FakeProductFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/supplier-a")
@Slf4j
public class SupplierAController {

    private static final int PRODUCT_COUNT = 15;

    @GetMapping("/products")
    public ResponseEntity<List<ProductResponse>> getProductDetails() {
        List<ProductResponse> products = new ArrayList<>();

        for (int i = 0; i < PRODUCT_COUNT; i++) {
            products.add(FakeProductFactory.buildProductResponse());
        }

        log.info("Supplier A returning {} products", products.size());
        return ResponseEntity.ok(products);
    }

}
