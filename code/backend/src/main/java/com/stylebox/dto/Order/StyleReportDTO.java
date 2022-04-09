package com.stylebox.dto.Order;

import com.stylebox.dto.shopping.ItemDTO;
import lombok.Data;

import java.util.List;

@Data
public class StyleReportDTO {
    Long stylistId;
    String stylistName;
    String idea;
    List<ItemDTO> items;
    String outfitImage;

}
