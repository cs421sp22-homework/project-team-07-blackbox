package com.stylebox.dto.stylist;

import lombok.Data;

import java.util.List;

@Data
public class StyListsDTO {
    private List<StyDTO> data;
    private int totalPages;
}
