package com.stylebox.dto.user;

import lombok.Data;

@Data
public class StylistHomepageDTO {
    private StylistProfileGetDTO stylistProfileGetDTO;
    private boolean isFollow;
}
