package com.smartsupply.enrichment.repository;

import com.smartsupply.enrichment.model.RawEvent;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RawEventRepository extends MongoRepository<RawEvent, String> {
}
