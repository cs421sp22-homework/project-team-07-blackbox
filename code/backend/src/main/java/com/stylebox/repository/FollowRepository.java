package com.stylebox.repository;

import com.stylebox.dto.FollowListGetDTO;
import com.stylebox.entity.user.FollowRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FollowRepository extends JpaRepository<FollowRecord, Long> {
//    List<FollowRecord> findByCustomerInformationId(Long followerId);
//    @Query(value="SELECT f.avatar, f.rate, f.intro, f.id, f.nickname, f.followNum FROM customer_information JOIN follow_record JOIN stylist_information AS f WHERE f.followerId=:followerId",
//    nativeQuery = true)
    List<FollowRecord> findByCustomerInformationId(Long followerId);

}
