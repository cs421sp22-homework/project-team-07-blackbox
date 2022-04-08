package com.stylebox.repository.stylist;

import com.stylebox.entity.stylist.Displays;
import com.stylebox.entity.user.FollowRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Repository
public interface DisplayRepository extends JpaRepository<Displays, Long>{

    @Query(value="SELECT d FROM Displays d WHERE d.image = :image")
    Optional<Displays> findByImage(String image);

    @Transactional
    @Modifying
    @Query(value="DELETE FROM Displays d WHERE d.image = :imageURL")
    void deleteByImage(String imageURL);
}
