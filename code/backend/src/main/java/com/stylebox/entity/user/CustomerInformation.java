package com.stylebox.entity.user;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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

    @Column(name="gender")
    private String gender;

    @Column(name="height")
    private String height;

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

    @ManyToMany(targetEntity = Style.class, cascade = CascadeType.MERGE)
    @JoinTable(name = "customer_style",
            joinColumns = {@JoinColumn(name = "customer_id", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "style_id", referencedColumnName = "id")})
    @JsonManagedReference
    private Set<Style> styleSet = new HashSet<>();
}
