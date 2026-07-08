package com.smartsupply.mocks.supplierc;

import com.opencsv.CSVWriter;
import com.smartsupply.mocks.shared.FakeProductFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
public class CsvProductWriter {

    @Value("${supplier.c.output-dir}")
    private String outputDir;

    private static final int PRODUCT_COUNT = 20;
    private static final DateTimeFormatter FORMATTER =
            DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss");

    public void writeProductFile() {
        try {
            Path dirPath = Paths.get(outputDir);
            Files.createDirectories(dirPath);

            String fileName = "supplier_c_" +
                    LocalDateTime.now().format(FORMATTER) + ".csv";
            Path filePath = dirPath.resolve(fileName);

            List<String[]> rows = new ArrayList<>();
            rows.add(FakeProductFactory.csvHeader());

            for (int i = 0; i < PRODUCT_COUNT; i++) {
                rows.add(FakeProductFactory.buildCsvRow());
            }

            try (CSVWriter writer = new CSVWriter(new FileWriter(filePath.toFile()))) {
                writer.writeAll(rows);
            }

            log.info("Dropped CSV file: {} with {} products",
                    filePath.getFileName(), PRODUCT_COUNT);

        } catch (IOException e) {
            log.error("Failed to write CSV file to {}: {}", outputDir, e.getMessage());
        }
    }
}
