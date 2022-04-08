package com.stylebox.dto.stylist;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class DisplayPostDTO {
    private String[] ideas;
    private String[] deletedID;
    private MultipartFile[] images;
}
