package com.stylebox.dto.user;

import com.stylebox.entity.user.Style;
import lombok.Data;

import java.util.Set;

@Data
public class StylistProfileModifyDTO {
    private String photo;
    private String intro;
    private String gender;
    private Set<String> styleSet;
    private Integer age;
}
