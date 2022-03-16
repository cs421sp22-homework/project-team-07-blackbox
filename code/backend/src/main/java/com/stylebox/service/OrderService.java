package com.stylebox.service;

import com.stylebox.dto.Order.OrderBrowseDTO;
import com.stylebox.dto.Order.OrderCreateDTO;
import com.stylebox.dto.Order.OrderDetailDTO;
import com.stylebox.dto.Order.OrderListDTO;
import com.stylebox.dto.stylist.StyDTO;
import com.stylebox.entity.stylist.Orders;
import com.stylebox.entity.user.*;
import com.stylebox.repository.stylist.OrderRepository;
import com.stylebox.repository.user.CustomerInformationRepository;
import com.stylebox.repository.user.StyleRepository;
import com.stylebox.repository.user.StylistInformationRepository;
import com.stylebox.util.SortUtil;
import exception.Rest400Exception;
import exception.Rest401Exception;
import exception.Rest404Exception;
import lombok.RequiredArgsConstructor;
import org.aspectj.weaver.ast.Or;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.*;
import java.util.*;

@Service
@RequiredArgsConstructor
public class OrderService {
    final OrderRepository orderRepository;

    final StyleRepository styleRepository;

    final CustomerInformationRepository customerInformationRepository;

    final StylistInformationRepository stylistInformationRepository;

    final ModelMapper modelMapper;

    final SortUtil sortUtil;

    public void createOrder(User user, Long styid, OrderCreateDTO orderCreateDTO) {
        Orders orders = new Orders();
        modelMapper.map(orderCreateDTO, orders);

        // save styleSet
        Set<Style> newStyleSet = new HashSet<>();
        for (String s : orderCreateDTO.getStyleSet()) {
            Optional<Style> styleByName = styleRepository.findByStyleName(s);
            // if exist current style, save
            // else, create
            if (styleByName.isPresent()) {
                newStyleSet.add(styleByName.get());
            } else {
                Style style = new Style();
                style.setStyleName(s);
                styleRepository.saveAndFlush(style);
                newStyleSet.add(styleRepository.findByStyleName(s).get());
            }
        }
        orders.setStyleSet(newStyleSet);

        // save occasions
        orders.setOccasions(String.join(",", orderCreateDTO.getOccasionSet()));

        //customer, stylist
        orders.setCustomer(user.getCustomerInformation());
        orders.setStylist(stylistInformationRepository.getById(styid));

        orderRepository.save(orders);
    }

    public OrderListDTO getOrderList(User user, int page, String sort, int limit) {
        OrderListDTO orderListDTO = new OrderListDTO();
        if (sort.equals("time")) {
            sort = "createdDatetime";
        } else if (sort.equals("-time")) {
            sort = "-createdDatetime";
        }
        Pageable pageable = sortUtil.sortPage(sort, page, limit, new ArrayList<>(Arrays.asList
                ("createdDatetime", "isRead")));

        Specification<Orders> specification = new Specification<Orders>() {
            @Override
            public Predicate toPredicate(Root<Orders> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                Predicate predicate = criteriaBuilder.conjunction();
                // condition: check user id
                if (user.getRole().getName().equals("Customer")) {
                    Join<Orders, CustomerInformation> joinCust = root.join("customer");
                    predicate.getExpressions().add(criteriaBuilder
                            .equal(joinCust.get("id"), user.getCustomerInformation().getId()));
                } else if (user.getRole().getName().equals("Stylist")){
                    Join<Orders, StylistInformation> joinSty = root.join("stylist");
                    predicate.getExpressions().add(criteriaBuilder
                            .equal(joinSty.get("id"), user.getStylistInformation().getId()));
                } else {
                    throw new Rest400Exception("Incorrect role");
                }
                return predicate;
            }
        };

        Page<Orders> all = orderRepository.findAll(specification, pageable);
        int totalPages = all.getTotalPages();

        List<OrderBrowseDTO> orderBrowseDTOS = new ArrayList<>();
        for (Orders o : all) {
            OrderBrowseDTO orderBrowseDTO = modelMapper.map(o, OrderBrowseDTO.class);
            //nickname
            if (user.getRole().getName().equals("Customer")) {
                orderBrowseDTO.setNickname(o.getStylist().getUser().getNickname());
            } else {
                orderBrowseDTO.setNickname(o.getCustomer().getUser().getNickname());
            }
            //styleSet
            Set<String> styles = new HashSet<>();
            for (Style s : o.getStyleSet()) {
                styles.add(s.getStyleName());
            }
            orderBrowseDTO.setStyleSet(styles);
            //occasionSet
            Set<String> occs = new HashSet<>(Arrays.asList(o.getOccasions().split(",")));
            orderBrowseDTO.setOccasionSet(occs);
            //lastEditDatetime -- time
            orderBrowseDTO.setTime(o.getLastEditDatetime());
            //orderid
            orderBrowseDTO.setOrderId(o.getId());
            orderBrowseDTOS.add(orderBrowseDTO);
        }
        orderListDTO.setTotalPages(totalPages);
        orderListDTO.setData(orderBrowseDTOS);

        return orderListDTO;
    }

    public OrderDetailDTO getOrderDetail(User user, Long orderId) {
        Optional<Orders> op = orderRepository.findById(orderId);
        if (!op.isPresent()) {
            throw new Rest404Exception("Not found the order");
        }
        Orders o = op.get();
        //check user identity
        if (!o.getCustomer().getUser().getId().equals(user.getId())
                && !o.getStylist().getUser().getId().equals(user.getId())) {
            throw new Rest401Exception("Cannot view other users' orders");
        }

        OrderDetailDTO orderDetailDTO = modelMapper.map(o.getCustomer(), OrderDetailDTO.class);
        modelMapper.map(o.getCustomer().getUser(), orderDetailDTO);
        modelMapper.map(o, orderDetailDTO);
        orderDetailDTO.setCusNickname(o.getCustomer().getUser().getNickname());
        orderDetailDTO.setTime(o.getCreatedDatetime());
        //styleSet
        Set<String> styles = new HashSet<>();
        for (Style s : o.getStyleSet()) {
            styles.add(s.getStyleName());
        }
        orderDetailDTO.setStyleSet(styles);
        //occasionSet
        Set<String> occs = new HashSet<>(Arrays.asList(o.getOccasions().split(",")));
        orderDetailDTO.setOccasionSet(occs);
        return orderDetailDTO;
    }
}