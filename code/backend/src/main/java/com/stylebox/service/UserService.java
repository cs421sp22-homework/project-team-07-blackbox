package com.stylebox.service;

import com.stylebox.dto.LoginDTO;
import com.stylebox.dto.RegisterDTO;
import com.stylebox.entity.user.*;
import com.stylebox.repository.*;
import exception.Rest400Exception;
import exception.Rest401Exception;
import exception.Rest404Exception;
import exception.Rest500Exception;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class UserService {
    final UserRepository userRepository;

    final UserLoginRepository userLoginRepository;

    final RoleRepository roleRepository;

    final CustomerInformationRepository customerInformationRepository;

    final StylistInformationRepository stylistInformationRepository;

//    static Pattern usernamePattern = Pattern.compile("^[a-zA-Z][a-zA-Z0-9_-]{5,15}$");

//    static Pattern passwordPattern = Pattern.compile("^(?=(?=.*[0-9])(?=.*[a-z])|(?=.*[0-9])(?=.*[A-Z])|(?=.*[0-9])(?=.*[`~!@#$%^&*()\\-=_+])|(?=.*[a-z])(?=.*[A-Z])|(?=.*[a-z])(?=.*[`~!@#$%^&*()\\-=_+])|(?=.*[A-Z])(?=.*[`~!@#$%^&*()\\-=_+])).{6,16}$");

//    static Pattern phonePattern = Pattern.compile("^(?:(?:\\+|00)86)?1(?:(?:3[\\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\\d])|(?:9[189]))\\d{8}$");

    static Pattern emailPattern = Pattern.compile("^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$");

//    public Boolean verify(LoginDTO loginDTO) {
//        User user = userRepository.findUserByUsername(loginDTO.getUsername());
//        if (user == null) {
//            return false;
//        }
//        return user.getPassword().equals(loginDTO.getPassword());
//    }

    public UserLogin getUserByLogin(LoginDTO loginDTO) {
        String login = loginDTO.getUsername();
        Optional<UserLogin> userLogin;
        if (emailPattern.matcher(login).matches()) {
            userLogin = userLoginRepository.findByEmail(login);
        } else {
            userLogin = userLoginRepository.findByUsername(login);
        }
        if (!userLogin.isPresent()) {
            throw new Rest404Exception("Username does not exist");
        }
        return userLogin.get();
    }

    public void verifyUser(String password, UserLogin userLogin) {

        // 验证密码
        BCryptPasswordEncoder bcryptpasswordencoder = new BCryptPasswordEncoder();
        if (!bcryptpasswordencoder.matches(password, userLogin.getPassword())) {
                throw new Rest400Exception("Incorrect password");
        }

//        User user = userLogin.getUser();
//        // 验证用户状态
//        if (user.isDisabled()) {
//            throw new Rest401Exception("用户被锁定，" + user.getDisabledDescription());
//        }
    }

    public User createUser(RegisterDTO registerDTO, int roleid) {
        String username = registerDTO.getUsername();
//        if (!usernamePattern.matcher(username).matches() || emailPattern.matcher(username).matches()
//                || phonePattern.matcher(username).matches()) {
//            throw new Rest400Exception("Incorrect username format");
//        }
        if (userLoginRepository.existsByUsername(username)) {
            throw new Rest400Exception("Username repeat");
        }

        String password = registerDTO.getPassword();
//        if (!passwordPattern.matcher(password).matches()) {
//            throw new Rest400Exception("Incorrect password format");
//        }

        User user = new User();

        // set role
        Optional<Role> role;
        if (roleid == 0) {
            role = roleRepository.findByName("Customer");
            CustomerInformation customerInformation = new CustomerInformation();
            customerInformationRepository.save(customerInformation);
            user.setCustomerInformation(customerInformation);
        } else {
            role = roleRepository.findByName("Stylist");
            StylistInformation stylistInformation = new StylistInformation();
            stylistInformationRepository.save(stylistInformation);
            user.setStylistInformation(stylistInformation);
        }
        if (!role.isPresent()) {
            throw new Rest400Exception("Incorrect role");
        }
        user.setRole(role.get());

        // save userLogin
        UserLogin userLogin = new UserLogin();
        userLogin.setUser(user);
        user.setUserLogin(userLogin);
        userLogin.setUsername(username);
        BCryptPasswordEncoder bcryptpasswordencoder = new BCryptPasswordEncoder();
        String encode = bcryptpasswordencoder.encode(password);
        userLogin.setPassword(encode);
        if(registerDTO.getEmail() != null) {
            userLogin.setEmail(registerDTO.getEmail());
        }
        userLoginRepository.save(userLogin);

        userRepository.save(user);
        return user;
    }
}
