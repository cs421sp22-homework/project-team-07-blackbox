package com.stylebox.entity.user;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class FollowRecord {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name= "follower_id", referencedColumnName = "id")
    private CustomerInformation customerInformation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name= "followee_id", referencedColumnName = "id")
    private StylistInformation stylistInformation;

//    @Column(name="follower_id")
//    private Long followerId;
//
//    @Column(name="followee_Id")
//    private Long followeeId;

}
