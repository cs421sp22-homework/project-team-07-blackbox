package com.stylebox.entity.user;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@NamedEntityGraph(name = "StylistInformation.Graph", attributeNodes = {
        @NamedAttributeNode("user"),
})
public class StylistInformation {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long id;

    @OneToOne(targetEntity = User.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonBackReference
    private User user;

    @Column(name = "intro")
    private String intro;

//    @ManyToMany(targetEntity = Style.class, cascade = CascadeType.MERGE)
//    @JoinTable(name = "stylist_style",
//            joinColumns = {@JoinColumn(name = "stylist_id", referencedColumnName = "id")},
//            inverseJoinColumns = {@JoinColumn(name = "style_id", referencedColumnName = "id")})
//    @JsonManagedReference
//    private Set<Style> styleSet = new HashSet<>();

    @Column(name = "age")
    private Integer age;

//    public void addStyle(Style style) {
//        this.styleSet.add(style);
//    }

    @Column(name = "rate")
    private Integer rate;

    @Column(name = "followNum")
    private Integer followNum;

}