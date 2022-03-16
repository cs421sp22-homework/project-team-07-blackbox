package com.stylebox.repository.user;

import com.stylebox.entity.user.CustomerInformation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerInformationRepository extends JpaRepository<CustomerInformation, Long> {

}
