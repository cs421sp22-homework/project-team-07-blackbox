package com.stylebox.service;

import com.github.wenhao.jpa.PredicateBuilder;
import com.github.wenhao.jpa.Specifications;
import com.stylebox.dto.stylist.StyDTO;
import com.stylebox.dto.stylist.StyListsDTO;
import com.stylebox.entity.user.*;
import com.stylebox.repository.RoleRepository;
import com.stylebox.repository.StyleRepository;
import com.stylebox.repository.StylistInformationRepository;
import com.stylebox.repository.UserRepository;
import com.stylebox.util.SortUtil;
import com.sun.xml.bind.v2.TODO;
import exception.Rest400Exception;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StylistService {
    final SortUtil sortUtil;

    final StyleRepository styleRepository;

    final RoleRepository roleRepository;

    final UserRepository userRepository;

    final StylistInformationRepository stylistInformationRepository;

    final ModelMapper modelMapper;

    public StyListsDTO getStyLists(int page, String style, String sort, String search, int limit) {
        StyListsDTO styListsDTO = new StyListsDTO();
        Pageable pageable = sortUtil.sortPage(sort, page, limit, new ArrayList<>(Arrays.asList
                ("rate", "followNum")));

//        PredicateBuilder<User> styAndBuilder = Specifications.<User>and();
//        styAndBuilder.eq("role.id", roleRepository.findByName("Stylist").get().getId());
//        if (!style.equals("")) {
//            Optional<Style> byId = styleRepository.findByStyleName(style);
//            if (!byId.isPresent()) {
//                throw new Rest400Exception("Invalid Style");
//            } else {
//                styAndBuilder.eq("styleSet.id", byId.get().getId());
//            }
//        }
//
//        if (!search.equals("")) {
//            String pattern = "%" + search + "%";
//            PredicateBuilder<User> styOrBuilder = Specifications.<User>or();
//            styOrBuilder.like("nickname", pattern); // TODO: how to add username
//            specification = styOrBuilder.build().and(styAndBuilder.build());
//        } else {
//            specification = styAndBuilder.build();
//        }

        Specification<StylistInformation> specification = new Specification<StylistInformation>() {
            @Override
            public Predicate toPredicate(Root<StylistInformation> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                Predicate predicate = criteriaBuilder.conjunction();
                // join StylistInformation, User, UserLogin
                Join<StylistInformation, User> joinUser = root.join("user");
                Join<User, Role> joinRole = joinUser.join("role");
                Join<User, UserLogin> joinUserLogin = joinUser.join("userLogin");

                predicate.getExpressions().add(criteriaBuilder.equal(joinRole.get("name"), "Stylist"));
                // 1. first condition: style
                if (!style.equals("")) {
                    // TODO: mutiple style
                    Optional<Style> byId = styleRepository.findByStyleName(style);
                    if (byId.isPresent()) {
                        Join<User, Style> joinStyle = joinUser.join("styleSet");
                        predicate.getExpressions().add(criteriaBuilder.equal(joinStyle.get("styleName"), style));
                    } else {
                        throw new Rest400Exception("Style doesn't exist");
                    }
                }
                // 2. search
                if (!search.equals("")) {
                    Predicate predicateIntro = criteriaBuilder.like(root.get("intro"), "%" + search + "%");
                    Predicate predicateNick = criteriaBuilder.like(joinUser.get("nickname"), "%" + search + "%");
                    Predicate predicateUsername = criteriaBuilder.like(joinUserLogin.get("username"), "%" + search + "%");
                    predicate.getExpressions().add(criteriaBuilder.or(predicateIntro, predicateNick, predicateUsername));
                }
                return predicate;
            }
        };

        Page<StylistInformation> all = stylistInformationRepository.findAll(specification, pageable);
        int totalPages = all.getTotalPages();

        List<StyDTO> styDTOList = new ArrayList<>();
        for (StylistInformation sty : all) {
            StyDTO styDTO = modelMapper.map(sty, StyDTO.class);
            styDTO.setStylistId(sty.getUser().getId());
            modelMapper.map(sty.getUser(), styDTO);
            styDTOList.add(styDTO);
        }
        styListsDTO.setTotalPages(totalPages);
        styListsDTO.setData(styDTOList);

        return styListsDTO;
    }
}
