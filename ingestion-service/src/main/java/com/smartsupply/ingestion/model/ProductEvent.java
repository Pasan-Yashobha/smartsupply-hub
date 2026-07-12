package com.smartsupply.ingestion.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductEvent {

    private String productId;
    private String name;
    private String category;
    private int price;
    private int stockQuantity;
    private String supplier;
    private String source;
}
