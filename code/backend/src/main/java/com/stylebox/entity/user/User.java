package com.stylebox.entity.user;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@NamedEntityGraph(name = "User.Graph", attributeNodes = {
        @NamedAttributeNode("styleSet"),
        @NamedAttributeNode("role"),
        @NamedAttributeNode("customerInformation"),
        @NamedAttributeNode("stylistInformation"),
})
public class User {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(targetEntity = Role.class, cascade = CascadeType.DETACH)
    @JoinColumn(name = "role_id", referencedColumnName = "id")
    @JsonBackReference
    private Role role;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonManagedReference
    private UserLogin userLogin;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonManagedReference
    private CustomerInformation customerInformation;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonManagedReference
    private StylistInformation stylistInformation;

    @Column(name="avatar")
    private String avatar;

    @Column(name="phone")
    private String phone;

    @Column(name="address")
    private String address;

    @Column(name="payment")
    private String payment;

    @Column(name="facebook")
    private String facebook;

    @Column(name="nickname")
    private String nickname;

    @Column(name="avartar")
    private String avartar="/images/default-avatar.jpeg";

    @Column(name = "gender")
    private String gender;

    @ManyToMany(targetEntity = Style.class, cascade = CascadeType.MERGE)
    @JoinTable(name = "user_style",
            joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "style_id", referencedColumnName = "id")})
    @JsonManagedReference
    private Set<Style> styleSet = new HashSet<>();

//    public void addStyle(Style style) {
//        this.styleSet.add(style);
//    }
}
