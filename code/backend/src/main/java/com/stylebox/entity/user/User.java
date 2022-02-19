package com.stylebox.entity.user;


import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(targetEntity = Role.class, cascade = CascadeType.DETACH)
    @JoinColumn(name = "role_id", referencedColumnName = "id")
    @JsonBackReference
    private Role role;


}
