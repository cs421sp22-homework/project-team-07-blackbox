package com.stylebox.service;

import com.stylebox.dto.LoginDTO;
import com.stylebox.entity.user.User;
import com.stylebox.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    final UserRepository userRepository;

    public Boolean verify(LoginDTO loginDTO){
        User user = userRepository.findUserByUsername(loginDTO.getUsername());
        if (user == null) {
            return  false;
        }
        return user.getPassword().equals(loginDTO.getPassword());
    }
}
