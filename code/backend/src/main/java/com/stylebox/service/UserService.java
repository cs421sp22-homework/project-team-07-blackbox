package com.stylebox.service;

import com.stylebox.dto.*;
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
import java.util.Set;
import java.util.regex.Pattern;
import org.modelmapper.ModelMapper;

@Service
@RequiredArgsConstructor
public class UserService {
    final UserRepository userRepository;

    final UserLoginRepository userLoginRepository;

    final RoleRepository roleRepository;

    final CustomerInformationRepository customerInformationRepository;

    final StylistInformationRepository stylistInformationRepository;

    final ModelMapper modelMapper;

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
            customerInformation.setUser(user);
            customerInformationRepository.save(customerInformation);
            user.setCustomerInformation(customerInformation);
        } else {
            role = roleRepository.findByName("Stylist");
            StylistInformation stylistInformation = new StylistInformation();
            stylistInformation.setUser(user);
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

    public AccountDTO getAccount(User user){
        AccountDTO accountDTO = new AccountDTO();
        accountDTO.setEmail(user.getUserLogin().getEmail());
        accountDTO.setAddress(user.getAddress());
        accountDTO.setPayment(user.getPayment());
        accountDTO.setFacebook(user.getFacebook());
        return accountDTO;
    }

    public void modifyAccount(User user, AccountDTO accountDTO){
        user.getUserLogin().setEmail(accountDTO.getEmail());
        user.setAddress(accountDTO.getAddress());
        user.setPayment(accountDTO.getPayment());
        user.setPhone(accountDTO.getPhone());
        user.setFacebook(accountDTO.getFacebook());
        userRepository.save(user);
    }

    public CustomerProfileDTO getCustomerProfile(User user){
        CustomerProfileDTO customerProfileDTO = new CustomerProfileDTO();
        customerProfileDTO.setGender(user.getCustomerInformation().getGender());
        customerProfileDTO.setHeight(user.getCustomerInformation().getHeight());
        customerProfileDTO.setWeight(user.getCustomerInformation().getWeight());
        customerProfileDTO.setShirtSize(user.getCustomerInformation().getShirtSize());
        customerProfileDTO.setBottomSize(user.getCustomerInformation().getBottomSize());
        customerProfileDTO.setJeanSize(user.getCustomerInformation().getJeanSize());
        customerProfileDTO.setShoeSize(user.getCustomerInformation().getShoeSize());
        customerProfileDTO.setStyleSet(user.getCustomerInformation().getStyleSet());
        return customerProfileDTO;
    }

    public void createCustomerProfile(User user, CustomerProfileDTO customerProfileDTO){
        user.getCustomerInformation().setGender(customerProfileDTO.getGender());
        user.getCustomerInformation().setHeight(customerProfileDTO.getHeight());
        user.getCustomerInformation().setWeight(customerProfileDTO.getWeight());
        user.getCustomerInformation().setShirtSize(customerProfileDTO.getShirtSize());
        user.getCustomerInformation().setBottomSize(customerProfileDTO.getBottomSize());
        user.getCustomerInformation().setJeanSize(customerProfileDTO.getJeanSize());
        user.getCustomerInformation().setShoeSize(customerProfileDTO.getShoeSize());
        user.getCustomerInformation().setStyleSet(customerProfileDTO.getStyleSet());
        userRepository.save(user);
    }

    public StylistProfileGetDTO getStylistProfile(User user) {
        StylistProfileGetDTO stylistProfileGetDTO = modelMapper.map(user.getStylistInformation(), StylistProfileGetDTO.class);
        modelMapper.map(user, stylistProfileGetDTO);
        modelMapper.map(user.getUserLogin(), stylistProfileGetDTO);
        return stylistProfileGetDTO;
    }

    public void modifyStylistProfile(User user, StylistProfileModifyDTO stylistProfileModifyDTO) {
//        Set<String> styleList = stylistProfileModifyDTO.getStyle();
//        for (String s : styleList) {
//            // 从tag数据库里根据当前tag找到对应的tag
//            Optional<Tag> tagByName = tagRepository.findByName(s);
//            // 如果在数据库中存在当前tag，就保存到当前paper的tag中
//            // 如果数据库中不存在当前tag，就先新建当前tag，保存至数据库中，再把新建的tag保存到当前paper的tag里
//            if (tagByName.isPresent()) {
//                paper.addTag(tagByName.get());
//            } else {
//                Tag tag = new Tag();
//                tag.setName(s);
//                tag.setDisplayName(s);
//                //category.getPaper().add(paper);
//                tagRepository.saveAndFlush(tag);
//                paper.addTag(tagRepository.findTagByName(s));
//            }
//        }
        modelMapper.map(stylistProfileModifyDTO, user);
        userRepository.save(user);
        modelMapper.map(stylistProfileModifyDTO, user.getStylistInformation());
        stylistInformationRepository.save(user.getStylistInformation());
    }
}
