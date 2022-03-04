package com.stylebox.controller;

import com.stylebox.dto.*;
import com.stylebox.entity.user.User;
import com.stylebox.entity.user.UserLogin;
//import com.stylebox.jwt.JwtTokenUtil;
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

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.time.Duration;

@CrossOrigin(origins={"http://stylebox5.herokuapp.com","https://stylebox5.herokuapp.com","http://localhost:3000"})
@RestController
@RequiredArgsConstructor
public class UserController {

    final UserService userService;

    final JwtTokenUtil jwtTokenUtil;

//    @PostMapping("/login")
//    public Boolean login(@RequestBody LoginDTO loginDTO) {
//        return userService.verify(loginDTO);
//    }
    /**
     * 添加 jwt 到响应中
     *
     * @param request  请求
     * @param response 响应
     * @param token    jwt token
     * @param maxAge   过期时间
     */
    public static void addJWTToResponse(HttpServletRequest request, HttpServletResponse response, String token, Duration maxAge) {
        String origin = request.getHeader("Origin");
        ResponseCookie cookie;
        if (null != origin && origin.contains("davidz.cn")) {
            cookie = ResponseCookie.from("jwt", token)
                    .httpOnly(true)
                    .secure(false)
                    .path("/")
                    .maxAge(maxAge)
//                    .domain(".davidz.cn") // The domain name of the Cookie can be accessed
                    .sameSite("Lax")
                    .build();
        } else {
            cookie = ResponseCookie.from("jwt", token)
                    .httpOnly(true)
                    .secure(false)
                    .path("/")
                    .maxAge(maxAge)
                    .sameSite("Lax")
                    .build();
        }
        response.setHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

    public static void addJWTToResponse(HttpServletRequest request, HttpServletResponse response, String token) {
        addJWTToResponse(request, response, token, Duration.ofDays(30));
    }

    @GetMapping("/index")
    public String getHelloWorld() {

        return "Hello World";
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO, HttpServletRequest request, HttpServletResponse response) {
        UserLogin userByLogin = userService.getUserByLogin(loginDTO);//通过用户名获取用户
        userService.verifyUser(loginDTO.getPassword(), userByLogin);//验证
        String token = jwtTokenUtil.generateToken(userByLogin.getUsername());//生成token
        addJWTToResponse(request, response, token);//token写入cookie
        return ResponseEntity.ok(new JwtTokenDTO(token));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDTO registerDTO,
                         @RequestParam(value = "role") int roleid,
                         HttpServletRequest request, HttpServletResponse response) {
        User user = userService.createUser(registerDTO, roleid);
        String token = jwtTokenUtil.generateToken(registerDTO.getUsername());
        addJWTToResponse(request, response, token);
        return ResponseEntity.ok(new JwtTokenDTO(token));
    }

    @GetMapping("/user/logout")
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        addJWTToResponse(request, response, "", Duration.ofSeconds(0));
    }

    @ExceptionHandler({ AuthenticationException.class })
    public ResponseEntity<String> handleAuthenticationException(AuthenticationException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    }

    @GetMapping("/account")
    public AccountDTO getAccount(HttpServletRequest request){
        User user = jwtTokenUtil.getUserFromRequest(request);
        AccountDTO accountDTO = userService.getAccount(user);
        return accountDTO;
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


