package com.stylebox.dto.shopping;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ItemDTO {
    Long itemId;
    String link;
    String itemImage;
    String itemName;
}
