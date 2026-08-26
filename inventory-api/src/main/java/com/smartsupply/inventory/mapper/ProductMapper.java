package com.smartsupply.inventory.mapper;

import com.smartsupply.inventory.dto.ProductResponseDto;
import com.smartsupply.inventory.model.EnrichedProduct;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    ProductResponseDto toResponse(EnrichedProduct product);

    List<ProductResponseDto> toResponseList(List<EnrichedProduct> products);
}
