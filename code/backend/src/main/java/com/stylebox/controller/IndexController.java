package com.stylebox.controller;

import com.stylebox.dto.LoginDTO;
import com.stylebox.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins={"http://stylebox5.herokuapp.com","https://stylebox5.herokuapp.com"})
@RestController
@RequiredArgsConstructor
public class IndexController {

    final UserService userService;

    @GetMapping("/login")
    public Boolean login(@RequestBody LoginDTO loginDTO) {
        return userService.verify(loginDTO);
    }

    @GetMapping("/index")
    public String getHelloWorld() {
        return "Hello World";
    }


}


