package com.stylebox.dto;

import com.stylebox.entity.user.Style;
import lombok.Data;

import java.util.Set;

@Data
public class StylistProfileModifyDTO {
    private String nickname;
    private String photo;
    private String intro;
    private String gender;
    private Set<Style> style;
}
