package com.stylebox.entity.user;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.stylebox.entity.stylist.Order;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class CustomerInformation {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long id;

    @OneToOne(targetEntity = User.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonBackReference
    private User user;

    @Column(name="ftSize")
    private String ftSize;

    @Column(name="inSize")
    private String inSize;

    @Column(name="weight")
    private String weight;

    @Column(name="shirtSize")
    private String shirtSize;

    @Column(name="bottomSize")
    private String bottomSize;

    @Column(name="jeanSize")
    private String jeanSize;

    @Column(name="shoeSize")
    private String shoeSize;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private Set<Order> orderSet = new HashSet<>();
}
