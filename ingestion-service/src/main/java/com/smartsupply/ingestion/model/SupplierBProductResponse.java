package com.smartsupply.ingestion.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SupplierBProductResponse {
    private String productCode;
    private String productName;
    private String productType;
    private int unitPrice;
    private int unitsAvailable;
    private String vendor;
}
