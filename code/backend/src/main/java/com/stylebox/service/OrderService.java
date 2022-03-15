package com.stylebox.service;

import com.stylebox.dto.Order.OrderCreateDTO;
import com.stylebox.dto.Order.OrderListDTO;
import com.stylebox.entity.stylist.Orders;
import com.stylebox.entity.user.CustomerInformation;
import com.stylebox.entity.user.Style;
import com.stylebox.entity.user.StylistInformation;
import com.stylebox.entity.user.User;
import com.stylebox.repository.stylist.OrderRepository;
import com.stylebox.repository.user.CustomerInformationRepository;
import com.stylebox.repository.user.StyleRepository;
import com.stylebox.repository.user.StylistInformationRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class OrderService {
    final OrderRepository orderRepository;

    final StyleRepository styleRepository;

    final CustomerInformationRepository customerInformationRepository;

    final StylistInformationRepository stylistInformationRepository;

    final ModelMapper modelMapper;

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

    public OrderListDTO getOrderList(User user) {
        return new OrderListDTO();
    }
}
