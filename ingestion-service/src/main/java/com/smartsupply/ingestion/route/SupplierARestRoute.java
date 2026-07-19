package com.smartsupply.ingestion.route;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.smartsupply.ingestion.model.ProductEvent;
import com.smartsupply.ingestion.processor.RestProductProcessor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.model.dataformat.JsonLibrary;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class SupplierARestRoute extends RouteBuilder {

    private final RestProductProcessor restProductProcessor;
    private final ObjectMapper objectMapper;

    @Value("${supplier.a.rest.api}")
    private String apiUrl;

    @Value("${kafka.topic.product-updates}")
    private String kafkaTopic;

    @Value("${kafka.bootstrap-servers}")
    private String kafkaBootstrapServers;

    @Override
    public void configure() throws Exception {

        onException(Exception.class)
                .log("Error processing Supplier A response: ${exception.message}")
                .handled(true);

        from("timer://supplier-a-timer?period=120000")
                .routeId("supplier-a-rest-api-route")
                .log("Polling Supplier A REST API")
                .to(apiUrl)
                .unmarshal().json(JsonLibrary.Jackson, java.util.List.class)
                .split(body())
                .marshal().json(JsonLibrary.Jackson)
                .process(restProductProcessor)
                .filter(simple("${body} != null && ${body.class.simpleName} == 'ProductEvent'"))
                .process(exchange -> {
                    ProductEvent event = exchange.getIn().getBody(ProductEvent.class);
                    String json = objectMapper.writeValueAsString(event);
                    exchange.getIn().setBody(json);
                })
                .to("kafka:" + kafkaTopic +
                        "?brokers=" + kafkaBootstrapServers +
                        "&valueSerializer=org.apache.kafka.common.serialization.StringSerializer"
                )
                .log("Published Supplier A product to Kafka: ${body}");

    }
}
