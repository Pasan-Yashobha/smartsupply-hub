package com.smartsupply.ingestion.route;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.smartsupply.ingestion.model.ProductEvent;
import com.smartsupply.ingestion.processor.SupplierBProductProcessor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.model.dataformat.JsonLibrary;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class SupplierBRestRoute extends RouteBuilder {

    private final SupplierBProductProcessor supplierBProductProcessor;
    private final ObjectMapper objectMapper;

    @Value("${supplier.b.rest.api}")
    private String apiUrl;

    @Value("${kafka.topic.product-updates}")
    private String kafkaTopic;

    @Value("${kafka.bootstrap-servers}")
    private String kafkaBootstrapServers;

    @Override
    public void configure() throws Exception {

        onException(Exception.class)
                .log("Error processing Supplier B response: ${exception.message}")
                .handled(true);

        from("timer://supplier-b-timer?period=120000")
                .routeId("supplier-b-rest-api-route")
                .log("Polling Supplier B REST API")
                .to(apiUrl)
                .unmarshal().json(JsonLibrary.Jackson, java.util.List.class)
                .split(body())
                .marshal().json(JsonLibrary.Jackson)
                .process(supplierBProductProcessor)
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
                .log("Published Supplier B product to Kafka: ${body}");
    }
}
