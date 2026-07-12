package com.smartsupply.ingestion.processor;

import com.smartsupply.ingestion.model.ProductEvent;
import lombok.extern.slf4j.Slf4j;
import org.apache.camel.Exchange;
import org.apache.camel.Processor;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class CsvRowProcessor implements Processor {

    @Override
    public void process(Exchange exchange) throws Exception {
        String[] row = exchange.getIn().getBody(String[].class);

        if (row == null || row.length < 6) {
            log.warn("Skipping invalid CSV row: {}", (Object) row);
            return;
        }

        if ("productId".equals(row[0])) {
            log.debug("Skipping header row");
            return;
        }

        try {
            ProductEvent event = ProductEvent.builder()
                    .productId(row[0].trim())
                    .name(row[1].trim())
                    .category(row[2].trim())
                    .price(Integer.parseInt(row[3].trim()))
                    .stockQuantity(Integer.parseInt(row[4].trim()))
                    .supplier(row[5].trim())
                    .source("SUPPLIER_C_CSV")
                    .build();

            exchange.getIn().setBody(event);
            log.debug("Processed product: {} - {}", event.getProductId(), event.getName());

        } catch (NumberFormatException e) {
            log.error("Failed to parse numeric fields in row: {}", (Object) row);
            exchange.setProperty(Exchange.ROUTE_STOP, Boolean.TRUE);
        }
    }
}
