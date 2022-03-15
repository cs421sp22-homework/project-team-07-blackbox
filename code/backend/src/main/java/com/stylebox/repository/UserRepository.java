package com.stylebox.repository;

import com.stylebox.entity.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.Nullable;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    Page<User> findAll(@Nullable Specification<User> spec, Pageable pageable);

    @EntityGraph(value = "User.Graph", type = EntityGraph.EntityGraphType.FETCH)
    List<User> findByIdIn(List<Long> idList, Sort sort);

}
