package com.stylebox.repository.stylist;

import com.stylebox.entity.stylist.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Orders, Long> {
}
