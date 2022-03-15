package com.stylebox.entity.user;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.stylebox.repository.FollowRepository;
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

    @OneToMany(mappedBy = "stylistInformation", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<FollowRecord> followRecords = new ArrayList<>();
//    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
//    @JoinColumn(name = "followee_id", referencedColumnName = "id")
//    private List<FollowRecord> followRecords = new ArrayList<>();

    @Column(name = "follow_num")
    private String followNum;

    @Column(name = "intro")
    private String intro;

    @Column(name = "rate")
    private String rate;

    @Column(name = "gender")
    private String gender;

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

    public void addFollowRecord(FollowRecord followRecord){
        if(!followRecords.contains(followRecord)) {
            followRecords.add(followRecord);
            followRecord.setStylistInformation(this);
        }
    }

    public void deleteFollowRecord(FollowRecord followRecord){
        if(followRecords.contains(followRecord)) {
            followRecords.remove(followRecord);
            followRecord.setStylistInformation(null);
        }
    }

}