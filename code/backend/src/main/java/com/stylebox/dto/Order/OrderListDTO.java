package com.stylebox.dto.Order;
import lombok.Data;

import java.util.List;

@Data
public class OrderListDTO {
    private List<OrderBrowseDTO> data;
    private int totalPages;
}
