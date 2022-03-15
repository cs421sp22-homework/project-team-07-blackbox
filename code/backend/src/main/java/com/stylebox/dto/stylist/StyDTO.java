package com.stylebox.dto.stylist;

import lombok.Data;

@Data
public class StyDTO {
    private String avatar;
    private int rate;
    private String intro;
    private Long stylistId;
    private String nickname;
    private int followNum;
}
