package com.smartsupply.mocks.supplierc;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Slf4j
@Component
@EnableScheduling
@RequiredArgsConstructor
public class CsvDropsScheduler {

    private final CsvProductWriter csvProductWriter;

    @Scheduled(fixedRateString = "${supplier.c.schedule}")
    public void dropCsvFile() {
        log.info("Supplier C scheduler triggered - dropping CSV file");
        csvProductWriter.writeProductFile();
    }
}
