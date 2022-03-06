package com.stylebox.repository;

import com.stylebox.entity.user.Style;
import com.stylebox.entity.user.UserLogin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StyleRepository extends JpaRepository<Style, Long>{
    Optional<Style> findByStyleName(String styleName);
}
