package com.smartsupply.mocks.shared;

import com.smartsupply.mocks.suppliera.SupplierAProductResponse;
import com.smartsupply.mocks.supplierb.SupplierBProductResponse;
import lombok.experimental.UtilityClass;

import java.util.List;
import java.util.Random;

@UtilityClass
public class FakeProductFactory {

    private static final Random RANDOM = new Random();

    private static final List<Product> CATALOG = List.of(
            new Product("P-A001", "Rice 5kg",          "Dry Goods",          450, 320),
            new Product("P-A002", "Wheat Flour 1kg",   "Dry Goods",          215, 178),
            new Product("P-A003", "Coconut Oil 1L",    "Cooking Essentials", 890, 95),
            new Product("P-A004", "Sugar 2kg",          "Dry Goods",          380, 240),
            new Product("P-A005", "Lentils 500g",       "Dry Goods",          195, 310),
            new Product("P-A006", "Canned Tuna 180g",   "Canned Goods",       275, 420),
            new Product("P-A007", "Milk Powder 400g",   "Dairy",              760, 185),
            new Product("P-A008", "Green Tea 100g",     "Beverages",          340, 290),
            new Product("P-A009", "Salt 1kg",           "Cooking Essentials", 120, 510),
            new Product("P-A010", "Basmati Rice 2kg",   "Dry Goods",          680, 145),
            new Product("P-B001", "Soya Sauce 300ml",   "Condiments",         285, 220),
            new Product("P-B002", "Coconut Milk 400ml", "Cooking Essentials", 195, 380),
            new Product("P-B003", "Black Pepper 50g",   "Spices",             310, 165),
            new Product("P-B004", "Tomato Paste 200g",  "Canned Goods",       175, 295),
            new Product("P-B005", "Oats 500g",          "Dry Goods",          420, 210)
    );

    private static final record Product(
            String id, String name, String category, int price, int stock
    ) {}

    public static SupplierAProductResponse buildAProductResponse() {
        Product p = CATALOG.get(RANDOM.nextInt(CATALOG.size()));
        return SupplierAProductResponse.builder()
                .productId(p.id())
                .name(p.name())
                .category(p.category())
                .price(p.price() + RANDOM.nextInt(50) - 25)
                .stockQuantity(p.stock() + RANDOM.nextInt(20) - 10)
                .supplier("SUPPLIER_A")
                .source("SUPPLIER_A_REST")
                .build();
    }

    public static SupplierBProductResponse buildBProductResponse() {
        Product p = CATALOG.get(RANDOM.nextInt(CATALOG.size()));
        return SupplierBProductResponse.builder()
                .productCode(p.id())
                .productName(p.name())
                .productType(p.category())
                .unitPrice(p.price() + RANDOM.nextInt(50) - 25)
                .unitsAvailable(p.stock() + RANDOM.nextInt(20) - 10)
                .vendor("SUPPLIER_B")
                .build();
    }

    public static String[] buildCsvRow() {
        Product p = CATALOG.get(RANDOM.nextInt(CATALOG.size()));
        return new String[]{
                p.id(),
                p.name(),
                p.category(),
                String.valueOf(p.price() + RANDOM.nextInt(50) - 25),
                String.valueOf(p.stock() + RANDOM.nextInt(20) - 10),
                "SUPPLIER_C"
        };
    }

    public static String[] csvHeader() {
        return new String[]{
                "productId", "name", "category",
                "price", "stockQuantity", "supplier"
        };
    }
}