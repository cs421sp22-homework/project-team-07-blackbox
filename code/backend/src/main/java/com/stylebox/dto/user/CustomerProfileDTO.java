package com.stylebox.dto.user;

import com.stylebox.entity.user.Style;
import lombok.Data;

import java.util.Set;

@Data
public class CustomerProfileDTO {
    private String gender;
    private String ftSize;
    private String inSize;
    private String weight;
    private String shirtSize;
    private String bottomSize;
    private String jeanSize;
    private String shoeSize;
    private Set<String> styleSet;
}
