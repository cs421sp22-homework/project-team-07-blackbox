package com.stylebox.entity.stylist;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.stylebox.entity.user.CustomerInformation;
import com.stylebox.entity.user.Style;
import com.stylebox.entity.user.StylistInformation;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@NamedEntityGraph(name = "Orders.Graph", attributeNodes = {
        @NamedAttributeNode("customer"),
        @NamedAttributeNode("stylist"),
})
public class Orders {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name = "created_datetime")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDatetime = new Date();

    @Column(name = "last_edit_datetime")
    @Temporal(TemporalType.TIMESTAMP)
    private Date lastEditDatetime = new Date();

    @ManyToMany(targetEntity = Style.class, cascade = CascadeType.MERGE)
    @JoinTable(name = "order_style",
            joinColumns = {@JoinColumn(name = "order_id", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "style_id", referencedColumnName = "id")})
    @JsonManagedReference
    private Set<Style> styleSet = new HashSet<>();

    @Column(name = "occasions")
    private String occasions;

    @Column(name = "description")
    private String description;

    @Column(name = "order_price")
    private int orderPrice;

    @Column(name = "cloth_price_low")
    private int clothPriceLow;

    @Column(name = "cloth_price_high")
    private int clothPriceHigh;

    @Column(name = "stylist_read")
    private boolean stylistRead = false;

    @Column(name = "customer_read")
    private boolean customerRead = false;

    @Column(name = "order status")
    private int orderStatus;

    @Column(name = "is accept")
    private int isAccept;

    @Column(name = "rate")
    private int rate;

    @Column(name = "comment")
    private String comment;


    @ManyToOne(targetEntity = CustomerInformation.class, cascade = CascadeType.MERGE)
    @JoinColumn(name = "customer_info_id", referencedColumnName = "id")
    @JsonBackReference
    private CustomerInformation customer;

    @ManyToOne(targetEntity = StylistInformation.class, cascade = CascadeType.MERGE)
    @JoinColumn(name = "stylist_info_id", referencedColumnName = "id")
    @JsonBackReference
    private StylistInformation stylist;
}
