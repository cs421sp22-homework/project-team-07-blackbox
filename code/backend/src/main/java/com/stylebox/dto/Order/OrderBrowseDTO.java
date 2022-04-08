package com.stylebox.dto.Order;

import lombok.Data;

import java.util.Date;
import java.util.Set;

@Data
public class OrderBrowseDTO {
    private boolean isRead;
    private String nickname;
    private int orderPrice;
    private Set<String> styleSet;
    private Set<String> occasionSet;
    private String description;
    private int clothPriceLow;
    private int clothPriceHigh;
    private Date time;
    private Long orderId;
    private int orderStatus;
}
