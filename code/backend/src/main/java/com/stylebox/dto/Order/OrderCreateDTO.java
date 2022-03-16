package com.stylebox.dto.Order;

import lombok.Data;

import java.util.Set;

@Data
public class OrderCreateDTO {
    private Set<String> styleSet;
    private Set<String> occasionSet;
    private String description;
    private int orderPrice;
    private int clothPriceLow;
    private int clothPriceHigh;
}
