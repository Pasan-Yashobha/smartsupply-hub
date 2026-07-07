package com.smartsupply.mocks.shared;

import lombok.experimental.UtilityClass;

import java.util.List;
import java.util.Random;
import java.util.UUID;

@UtilityClass
public class FakeProductFactory {

    private static final Random RANDOM = new Random();

    private static final List<String> NAMES = List.of(
      "Rice 5kg", "Wheat Flour 1kg", "Coconut Oil 1L",
      "Sugar 2kg", "Lentilis 500g", "Canned Tuna 180g",
      "Milk Powder 400g", "Green Tea 100g", "Salt 1kg",
      "Basmati Rice 2kg"
    );

    private static final List<String> CATEGORIES = List.of(
            "Dry Goods", "Cooking Essentials", "Beverages",
            "Canned Goods", "Dairy"
    );

    public  static String[] buildCsvRow() {
        return new String[]{
                "P-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase(),
                NAMES.get(RANDOM.nextInt(NAMES.size())),
                CATEGORIES.get(RANDOM.nextInt(CATEGORIES.size())),
                String.valueOf(RANDOM.nextInt(901) + 100),
                String.valueOf(RANDOM.nextInt(491) + 10),
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
