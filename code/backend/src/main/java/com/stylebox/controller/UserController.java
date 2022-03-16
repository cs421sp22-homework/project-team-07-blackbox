package com.stylebox.controller;

import com.stylebox.dto.user.*;
import com.stylebox.entity.user.User;
import com.stylebox.entity.user.UserLogin;
import com.stylebox.service.UserService;
import com.stylebox.util.JwtTokenUtil;
import exception.Rest400Exception;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import javax.persistence.NamedAttributeNode;
import javax.persistence.NamedEntityGraph;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.websocket.server.PathParam;
import java.time.Duration;

@CrossOrigin(origins = {"http://stylebox5.herokuapp.com", "https://stylebox5.herokuapp.com",
        "http://localhost:3000", "https://style-box.netlify.app", "http://style-box.netlify.app",
        "http://121.41.106.214"})
@RestController
@RequiredArgsConstructor
public class UserController {

    final UserService userService;

    final JwtTokenUtil jwtTokenUtil;

//    @PostMapping("/login")
//    public Boolean login(@RequestBody LoginDTO loginDTO) {
//        return userService.verify(loginDTO);
//    }

    @GetMapping("/index")
    public String getHelloWorld() {
        return "Hello World";
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO, HttpServletRequest request, HttpServletResponse response) {
        UserLogin userByLogin = userService.getUserByLogin(loginDTO);//通过用户名获取用户
        userService.verifyUser(loginDTO.getPassword(), userByLogin);//验证
        String token = jwtTokenUtil.generateToken(userByLogin.getUsername());//生成token
        jwtTokenUtil.addJWTToResponse(request, response, token);//token写入cookie
        ResponseCookie roleCookie = jwtTokenUtil.generateCookie(response, "role", userByLogin.getUser().getRole().getName(), Duration.ofDays(30));
        jwtTokenUtil.addCookieToResponse(response, roleCookie);
        return ResponseEntity.ok(new JwtTokenDTO(token));
    }

    @PostMapping("/register/{role}")
    public ResponseEntity<?> register(@RequestBody RegisterDTO registerDTO,
                         @PathVariable int role,
                         HttpServletRequest request, HttpServletResponse response) {
        User user = userService.createUser(registerDTO, role);
        String token = jwtTokenUtil.generateToken(registerDTO.getUsername());
        jwtTokenUtil.addJWTToResponse(request, response, token);
        ResponseCookie roleCookie = jwtTokenUtil.generateCookie(response, "role", user.getRole().getName(), Duration.ofDays(30));
        jwtTokenUtil.addCookieToResponse(response, roleCookie);
        return ResponseEntity.ok(new JwtTokenDTO(token));
    }

    @GetMapping("/user/logout")
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        jwtTokenUtil.addJWTToResponse(request, response, "", Duration.ofSeconds(0));
    }

    @ExceptionHandler({ AuthenticationException.class })
    public ResponseEntity<String> handleAuthenticationException(AuthenticationException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    }

    @GetMapping("/account")
    public AccountDTO getAccount(HttpServletRequest request){
        User user = jwtTokenUtil.getUserFromRequest(request);
        return userService.getAccount(user);
    }

    @PostMapping("/account")
    public void modifyAccount(HttpServletRequest request, @RequestBody AccountDTO accountDTO){
        User user = jwtTokenUtil.getUserFromRequest(request);
        userService.modifyAccount(user, accountDTO);
    }

    @GetMapping("/customer/profile")
    public CustomerProfileDTO getCustomerProfile(HttpServletRequest request){
        User user = jwtTokenUtil.getUserFromRequest(request);
        if (!user.getRole().getName().equals("Customer")) {
            throw new Rest400Exception("Incorrect role");
        }
        return userService.getCustomerProfile(user);
    }

    @PostMapping("/customer/profile")
    public void createCustomerProfile(HttpServletRequest request, @RequestBody CustomerProfileDTO customerProfileDTO){
        User user = jwtTokenUtil.getUserFromRequest(request);
        if (!user.getRole().getName().equals("Customer")) {
            throw new Rest400Exception("Incorrect role");
        }
        userService.createCustomerProfile(user, customerProfileDTO);
    }

    @GetMapping("/stylist/profile")
    public StylistProfileGetDTO getStylistProfile(HttpServletRequest request) {
        User user = jwtTokenUtil.getUserFromRequest(request);
        if (!user.getRole().getName().equals("Stylist")) {
            throw new Rest400Exception("Incorrect role");
        }
        return userService.getStylistProfile(user);
    }

    @PostMapping("/stylist/profile")
    public void modifyStylistProfile(HttpServletRequest request, @RequestBody StylistProfileModifyDTO stylistProfileModifyDTO) {
        User user = jwtTokenUtil.getUserFromRequest(request);
        if (!user.getRole().getName().equals("Stylist")) {
            throw new Rest400Exception("Incorrect role");
        }
        userService.modifyStylistProfile(user, stylistProfileModifyDTO);
    }

}


