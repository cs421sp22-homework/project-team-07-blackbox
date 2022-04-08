package com.stylebox.dto.Order;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;
import java.util.Set;

@Data
public class ReportCreateDTO{
    private MultipartFile outfitImage;
    private String idea;
    private Set<String> itemsId;
    private Set<String> itemName;
    private Set<String> link;
    private Set<MultipartFile> itemImage;
}
