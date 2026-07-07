package com.smartsupply.mocks;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SupplierMocksApplication {

	public static void main(String[] args) {
		SpringApplication.run(SupplierMocksApplication.class, args);
	}

}
