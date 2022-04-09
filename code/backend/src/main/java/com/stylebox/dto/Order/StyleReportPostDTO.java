package com.stylebox.dto.Order;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class StyleReportPostDTO {
    String idea;
    MultipartFile outfitImage;
    MultipartFile[] itemImage;
    String[] itemName;
    String[] link;
}
