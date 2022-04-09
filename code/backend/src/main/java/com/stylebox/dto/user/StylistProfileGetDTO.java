package com.stylebox.dto.user;

import com.stylebox.dto.stylist.DisplayDTO;
import com.stylebox.entity.stylist.Displays;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
public class StylistProfileGetDTO {
    private String nickname;
    private String photo;
    private String intro;
    private String gender;
    private Integer age;
    private Set<String> style;
    private String username;
    private String email;
    private String facebook;
    private Integer rate;
    private Integer followerNum;
    private Integer likeNum;
    private List<Displays> display;
}
