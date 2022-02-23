package com.stylebox.controller;

import com.stylebox.dto.LoginDTO;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins={"http://stylebox5.herokuapp.com","https://stylebox5.herokuapp.com"})
@RestController
public class IndexController {
    @GetMapping("/login")
    public String login(@RequestBody LoginDTO loginDTO) {
        UserLogin u = userSerivice.verify(loginDTO);
    }

}


