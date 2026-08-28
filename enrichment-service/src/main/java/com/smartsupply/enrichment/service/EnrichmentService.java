package com.smartsupply.enrichment.service;

import com.smartsupply.enrichment.model.EnrichedProduct;
import com.smartsupply.enrichment.model.ProductEvent;
import com.smartsupply.enrichment.model.RawEvent;
import com.smartsupply.enrichment.repository.ProductRepository;
import com.smartsupply.enrichment.repository.RawEventRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class EnrichmentService {

    private final ProductRepository productRepository;
    private final RawEventRepository rawEventRepository;

    public void enrich(ProductEvent event, String rawJson) {

        double margin = event.getPrice() * 0.2;

        Optional<EnrichedProduct> existing = productRepository.findByProductId(event.getProductId());

        EnrichedProduct enrichedProduct;

        if (existing.isPresent()) {
            enrichedProduct = existing.get();
            enrichedProduct.setName(event.getName());
            enrichedProduct.setCategory(event.getCategory());
            enrichedProduct.setPrice(event.getPrice());
            enrichedProduct.setStockQuantity(event.getStockQuantity());
            enrichedProduct.setSupplier(event.getSupplier());
            enrichedProduct.setSource(event.getSource());
            enrichedProduct.setMargin(margin);
        } else {
            enrichedProduct = EnrichedProduct.builder()
                    .productId(event.getProductId())
                    .name(event.getName())
                    .category(event.getCategory())
                    .price(event.getPrice())
                    .stockQuantity(event.getStockQuantity())
                    .supplier(event.getSupplier())
                    .source(event.getSource())
                    .margin(margin)
                    .build();
        }

        productRepository.save(enrichedProduct);
        log.info("Saved enriched product: {} - {}", enrichedProduct.getProductId(), enrichedProduct.getName());

        RawEvent rawEvent = RawEvent.builder()
                .rawJson(rawJson)
                .source(event.getSource())
                .receivedAt(LocalDateTime.now())
                .build();

        rawEventRepository.save(rawEvent);
        log.info("Saved raw event for source: {}", rawEvent.getSource());
    }


}
