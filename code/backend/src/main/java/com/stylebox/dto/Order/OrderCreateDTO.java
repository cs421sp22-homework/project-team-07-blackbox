package com.stylebox.dto.Order;

import lombok.Data;

import java.util.Set;

@Data
public class OrderCreateDTO {
    private Set<OrderStyleDTO> styleSet;
    private Set<OrderStyleDTO> occasionSet;
    private String description;
    private int orderPrice;
    private int clothPriceLow;
    private int clothPriceHigh;
}
