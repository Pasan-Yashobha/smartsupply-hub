package com.smartsupply.enrichment.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "raw_events")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RawEvent {

    @Id
    private String id;

    private String rawJson;
    private String source;
    private LocalDateTime receivedAt;
}
