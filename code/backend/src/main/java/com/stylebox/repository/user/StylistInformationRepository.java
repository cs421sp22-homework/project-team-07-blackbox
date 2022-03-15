package com.stylebox.repository.user;

import com.stylebox.entity.user.StylistInformation;
import com.stylebox.entity.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.lang.Nullable;

import java.util.List;
import java.util.Optional;

public interface StylistInformationRepository extends JpaRepository<StylistInformation, Long>, JpaSpecificationExecutor<StylistInformation> {
    Page<StylistInformation> findAll(@Nullable Specification<StylistInformation> spec, Pageable pageable);

    Optional<StylistInformation> findById(Long id);
}
