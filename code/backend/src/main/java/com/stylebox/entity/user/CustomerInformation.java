package com.stylebox.entity.user;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.stylebox.entity.stylist.Orders;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
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

    @OneToMany(mappedBy = "customerInformation", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<FollowRecord> followRecords = new ArrayList<>();
  
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

    public void addFollowRecord(FollowRecord followRecord){
        followRecords.add(followRecord);
        followRecord.setCustomerInformation(this);
    }

    public void deleteFollowRecord(FollowRecord followRecord){
        followRecords.remove(followRecord);
        followRecord.setCustomerInformation(null);
    }

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private Set<Orders> orderSet = new HashSet<>();
}
