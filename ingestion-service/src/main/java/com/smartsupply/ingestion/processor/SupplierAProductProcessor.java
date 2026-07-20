package com.smartsupply.ingestion.processor;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.smartsupply.ingestion.model.ProductEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.camel.Exchange;
import org.apache.camel.Processor;
import org.springframework.stereotype.Component;


@Slf4j
@Component
@RequiredArgsConstructor
public class SupplierAProductProcessor implements Processor {

    private final ObjectMapper objectMapper;

    @Override
    public void process(Exchange exchange) throws Exception {

        String json = exchange.getIn().getBody(String.class);

        if (json == null || json.isBlank()) {
            log.warn("Received empty body, skipping");
            // exchange.setProperty(ExchangePropertyKey.ROUTE_STOP, Boolean.TRUE);
            exchange.setRouteStop(true);
            return;
        }

        ProductEvent event = objectMapper.readValue(json, ProductEvent.class);

        exchange.getIn().setBody(event);

        log.debug("Processed product: {} - {}", event.getProductId(), event.getName());

    }
}
