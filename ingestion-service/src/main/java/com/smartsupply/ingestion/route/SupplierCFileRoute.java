package com.smartsupply.ingestion.route;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.smartsupply.ingestion.model.ProductEvent;
import com.smartsupply.ingestion.processor.CsvRowProcessor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.dataformat.csv.CsvDataFormat;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class SupplierCFileRoute extends RouteBuilder {

    private final CsvRowProcessor csvRowProcessor;
    private final ObjectMapper objectMapper;

    @Value("${supplier.c.drop-dir}")
    private String dropDir;

    @Value("${kafka.topic.product-updates}")
    private String kafkaTopic;

    @Value("${kafka.bootstrap-servers}")
    private String kafkaBootsrapServers;

    @Override
    public void configure() throws Exception {

        onException(Exception.class)
                .log("Error processing file: ${exception.message}")
                .handled(true);

        from("file://" + dropDir + "?noop=true&include=.*\\.csv&delay=5000")
                .routeId("supplier-c-csv-route")
                .log("Picked up file: ${header.CamelFileName}")
                .unmarshal(new CsvDataFormat())
                .split(body())
                .process(csvRowProcessor)
                .filter(simple("${body} != null && ${body.class.simpleName} == 'ProductEvent' "))
                .process(exchange -> {
                    ProductEvent event = exchange.getIn().getBody(ProductEvent.class);
                    String json = objectMapper.writeValueAsString(event);
                    exchange.getIn().setBody(json);
                })
                .to("kafka:" + kafkaTopic +
                        "?brokers=" + kafkaBootsrapServers +
                        "&valueSerializer=org.apache.kafka.common.serialization.StringSerializer"
                )
                .log("Published product to kafka: ${body}");

    }
}
