package com.stylebox.service;

import com.github.wenhao.jpa.PredicateBuilder;
import com.github.wenhao.jpa.Specifications;
import com.stylebox.dto.stylist.StyDTO;
import com.stylebox.dto.stylist.StyListsDTO;
import com.stylebox.entity.user.Style;
import com.stylebox.entity.user.StylistInformation;
import com.stylebox.entity.user.User;
import com.stylebox.repository.RoleRepository;
import com.stylebox.repository.StyleRepository;
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

    final ModelMapper modelMapper;

    public StyListsDTO getStyLists(int page, String style, String sort, String search) {
        StyListsDTO styListsDTO = new StyListsDTO();
        Specification<User> specification;
        Pageable pageable = sortUtil.sortPage(sort, page, 10, new ArrayList<>(Arrays.asList
                ("rate", "followNum")));

        PredicateBuilder<User> styAndBuilder = Specifications.<User>and();
        styAndBuilder.eq("role.id", roleRepository.findByName("Stylist").get().getId());
        if (!style.equals("")) {
            Optional<Style> byId = styleRepository.findByStyleName(style);
            if (!byId.isPresent()) {
                throw new Rest400Exception("Invalid Style");
            } else {
                styAndBuilder.eq("styleSet.id", byId.get().getId());
            }
        }

        if (!search.equals("")) {
            String pattern = "%" + search + "%";
            PredicateBuilder<User> styOrBuilder = Specifications.<User>or();
            styOrBuilder.like("nickname", pattern); // how to add username
            specification = styOrBuilder.build().and(styAndBuilder.build());
        } else {
            specification = styAndBuilder.build();
        }

        Page<User> all = userRepository.findAll(specification, pageable);
        int totalPages = all.getTotalPages();

        List<StyDTO> styDTOList = new ArrayList<>();
        List<Long> styIdList = new ArrayList<>();
        for (User user : all) {
            styIdList.add(user.getId());
        }
        List<User> byIdIn = userRepository.findByIdIn(styIdList, sortUtil.sortPage(sort, new ArrayList<>
                (Arrays.asList("rate", "followNum"))));
        for (User user : byIdIn) {
            StyDTO styDTO = modelMapper.map(user, StyDTO.class);
            styDTO.setStylistId(user.getId());
            // TODO: setFollowNum, rate
            styDTO.setFollowNum(0);
            styDTO.setRate(0);
            styDTO.setIntro(user.getStylistInformation().getIntro());
            styDTOList.add(styDTO);
        }
        styListsDTO.setTotalPages(totalPages);
        styListsDTO.setData(styDTOList);

        return styListsDTO;
    }
}
