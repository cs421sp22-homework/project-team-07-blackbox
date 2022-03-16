package com.stylebox.entity.user;

import com.stylebox.repository.user.StyleRepository;
import exception.Rest400Exception;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.*;
import java.util.Optional;

@RequiredArgsConstructor
public class StylistSpecifications {
    //Specification: select the stylist whose intro/nickname/userLogin contains the keyword "search"
    public static Specification<StylistInformation> stylistHasSearch(String search){
        return new Specification<StylistInformation>() {
            @Override
            public Predicate toPredicate(Root<StylistInformation> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                Predicate predicate = criteriaBuilder.conjunction();
//                // join StylistInformation, role, User, UserLogin table
//                // root is StylistInformation table. Means the main target I want to SELECT is StylistInformation
//                // Join<StylistInformation, User> name = root.join("user")means join StylistInformation and User table
//                // And root point to StylistInformation table, root.join("user") means
//                // the StylistInformation table has user field that point to User table
//                Join<StylistInformation, User> joinUser = root.join("user");
//                Join<User, Role> joinRole = joinUser.join("role");
//                Join<User, UserLogin> joinUserLogin = joinUser.join("userLogin");
                if (!search.equals("")) {
                    Predicate predicateIntro = criteriaBuilder.like(root.get("intro"), "%" + search + "%");
                    Predicate predicateNick = criteriaBuilder.like(root.get("user").get("nickname"), "%" + search + "%");
                    Predicate predicateUsername = criteriaBuilder.like(root.get("user").get("userLogin").get("username"), "%" + search + "%");
                    predicate.getExpressions().add(criteriaBuilder.or(predicateIntro, predicateNick, predicateUsername));
                }
                return predicate;
            }
        };
    }

    //Specification: select the stylist who specializes "style"
    public static Specification<StylistInformation> stylistHasStyle(String style){
        return new Specification<StylistInformation>() {
            @Override
            public Predicate toPredicate(Root<StylistInformation> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                Predicate predicate = criteriaBuilder.conjunction();
                if (!style.equals("")){
                    Join<StylistInformation, User> joinUser = root.join("user");
                    Join<User, Style> joinStyle = joinUser.join("styleSet");
                    return criteriaBuilder.equal(joinStyle.get("styleName"), style);
                }

                return predicate;
            }
        };
    }

    //Specification: select the stylist who is followed by customer with customer_id "follower"
    public static Specification<StylistInformation> stylistFollowedBy(Long followerId){
        return new Specification<StylistInformation>() {
            @Override
            public Predicate toPredicate(Root<StylistInformation> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                Join<StylistInformation, FollowRecord> joinFollowRecord = root.join("followRecords");
                return criteriaBuilder.equal(joinFollowRecord.get("customerInformation").get("id"), followerId);
            }
        };
    }




}
