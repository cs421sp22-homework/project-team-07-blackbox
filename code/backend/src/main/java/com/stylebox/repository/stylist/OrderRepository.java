package com.stylebox.repository.stylist;

import com.stylebox.entity.stylist.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
