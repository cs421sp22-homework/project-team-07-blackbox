package com.stylebox.controller;

import com.stylebox.dto.Order.OrderConfirmDTO;
import com.stylebox.dto.Order.OrderCreateDTO;
import com.stylebox.dto.Order.OrderDetailDTO;
import com.stylebox.dto.Order.OrderListDTO;
import com.stylebox.entity.user.User;
import com.stylebox.service.OrderService;
import com.stylebox.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@CrossOrigin(origins = {"http://stylebox5.herokuapp.com", "https://stylebox5.herokuapp.com", "http://localhost:3000", "https://style-box.netlify.app", "http://style-box.netlify.app"})
@RestController
@RequiredArgsConstructor
public class OrderController {
    final OrderService orderService;

    final JwtTokenUtil jwtTokenUtil;

    @PostMapping("/order/{id}")
    public void createOrder(HttpServletRequest request, @PathVariable(name = "id") Long styid,
                            @RequestBody OrderCreateDTO orderCreateDTO) {
        User user = jwtTokenUtil.getUserFromRequest(request);
        orderService.createOrder(user, styid, orderCreateDTO);
    }

    @GetMapping("/orders")
    public OrderListDTO getOrderList(HttpServletRequest request,
                                     @RequestParam(value = "page", required = false, defaultValue = "0") int page,
                                     @RequestParam(value = "sort", required = false, defaultValue = "") String sort,
                                     @RequestParam(value = "limit", required = false, defaultValue = "3") int limit
    ) {
        User user = jwtTokenUtil.getUserFromRequest(request);
        return orderService.getOrderList(user, page, sort, limit);
    }

    @GetMapping("/orderDetail/{id}")
    public OrderDetailDTO getOrderDetail(HttpServletRequest request, @PathVariable(name = "id") Long orderId
    ) {
        User user = jwtTokenUtil.getUserFromRequest(request);
        return orderService.getOrderDetail(user, orderId);
    }

    @PostMapping("/order/action/{orderId}/{accept}")
    public void actionOrder(HttpServletRequest request,
                                    @PathVariable(name = "orderId") Long orderId,
                                    @PathVariable(name = "accept") int isAccept

    ) {
        User user = jwtTokenUtil.getUserFromRequest(request);
        orderService.actionOrder(user, orderId, isAccept);
    }

    @PostMapping("/order/payment/{orderId}")
    public void payOrder(HttpServletRequest request,
                         @PathVariable(name = "orderId") Long orderId
    ) {
        User user = jwtTokenUtil.getUserFromRequest(request);
        orderService.payOrder(user, orderId);
    }

    @PostMapping("/order/confirm/{orderId}")
    public void confirmOrder(HttpServletRequest request,
                             @PathVariable(name = "orderId") Long orderId,
                             @RequestBody OrderConfirmDTO orderConfirmDTO
    ) {
        User user = jwtTokenUtil.getUserFromRequest(request);
        orderService.confirmOrder(user,orderId, orderConfirmDTO);
    }

    @GetMapping("/notification")
    public boolean newNotification(HttpServletRequest request){
        User user = jwtTokenUtil.getUserFromRequest(request);
        return orderService.newNotification(user);
    }


}
