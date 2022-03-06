package com.stylebox.repository;

import com.stylebox.entity.user.StylistInformation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StylistInformationRepository extends JpaRepository<StylistInformation, Long> {
}
