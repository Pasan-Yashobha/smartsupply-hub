package com.smartsupply.enrichment.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "enriched_products", indexes = {
        @Index(name = "index_product_id", columnList = "product_id"),
        @Index(name = "index_supplier", columnList = "supplier")
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EnrichedProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "product_id", nullable = false, length = 20)
    private String productId;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "category", nullable = false, length = 50)
    private String category;

    @Column(name = "price", nullable = false)
    private int price;

    @Column(name = "stock_quantity", nullable = false)
    private int stockQuantity;

    @Column(name = "supplier", nullable = false, length = 50)
    private String supplier;

    @Column(name = "source", nullable = false, length = 50)
    private String source;

    @Column(name = "margin", nullable = false)
    private double margin;
}