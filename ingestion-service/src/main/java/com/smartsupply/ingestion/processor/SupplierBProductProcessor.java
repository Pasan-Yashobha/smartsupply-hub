package com.smartsupply.ingestion.processor;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.smartsupply.ingestion.model.ProductEvent;
import com.smartsupply.ingestion.model.SupplierBProductResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.camel.Exchange;
import org.apache.camel.Processor;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class SupplierBProductProcessor implements Processor {

    private final ObjectMapper objectMapper;

    @Override
    public void process(Exchange exchange) throws Exception {

        String json = exchange.getIn().getBody(String.class);

        if (json == null || json.isBlank()) {
            log.warn("Received empty body, skipping");
            exchange.setRouteStop(true);
            return;
        }

        SupplierBProductResponse productResponse = objectMapper.readValue(json, SupplierBProductResponse.class);

        ProductEvent event = ProductEvent.builder()
                .productId(productResponse.getProductCode())
                .name(productResponse.getProductName())
                .category(productResponse.getProductType())
                .price(productResponse.getUnitPrice())
                .stockQuantity(productResponse.getUnitsAvailable())
                .supplier(productResponse.getVendor())
                .source("SUPPLIER_B_REST")
                .build();

        exchange.getIn().setBody(event);

        log.debug("Processed product: {} - {}", event.getProductId(), event.getName());
    }
}
