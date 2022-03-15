package com.stylebox.dto;

import lombok.Data;

@Data
public class FollowListGetDTO {
    private String avatar;
    private String rate;
    private String intro;
    private Long stylistId;
    private String nickname;
    private Integer followNum;
}
