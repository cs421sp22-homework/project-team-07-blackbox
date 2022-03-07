package com.stylebox.dto;

import com.stylebox.entity.user.Style;
import lombok.Data;

import java.util.Set;

@Data
public class StylistProfileModifyDTO {
    private String photo;
    private String intro;
    private String gender;
    private Set<String> style;
    private Integer age;
    private String token;
}
