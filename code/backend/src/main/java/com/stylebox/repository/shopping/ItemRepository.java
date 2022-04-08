package com.stylebox.repository.shopping;

import com.stylebox.entity.shopping.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {
}
