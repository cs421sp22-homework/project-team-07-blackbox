package com.stylebox.repository;

import com.stylebox.entity.user.UserLogin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserLoginRepository extends JpaRepository<UserLogin, Long> {
    Optional<UserLogin> findByUsername(String username);

    Optional<UserLogin> findByEmail(String email);

    Boolean existsByUsername(String username);

    List<UserLogin> findByUserId(long id);
}
