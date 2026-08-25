package com.smartsupply.enrichment.consumer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.smartsupply.enrichment.model.ProductEvent;
import com.smartsupply.enrichment.service.EnrichmentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class ProductEventConsumer {

    private final ObjectMapper objectMapper;
    private final EnrichmentService enrichmentService;

    @KafkaListener(
            topics = "${kafka.topic.product-updates}",
            groupId = "enrichment-group"
    )
    public void consume(@Payload String rawJson) {
        log.info("Received product event from Kafka: {}", rawJson);

        try {
            ProductEvent event = objectMapper.readValue(rawJson, ProductEvent.class);
            enrichmentService.enrich(event, rawJson);
        } catch (JsonProcessingException e) {
            log.error("Failed to process raw event: {}", rawJson, e);
        }
    }
}
