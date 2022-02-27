package com.stylebox.entity.user;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
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

    @Column(name="phone")
    private String phone;

    @Column(name="address")
    private String address;

    @Column(name="payment")
    private String payment;

    @Column(name="facebook")
    private String facebook;
}
