package com.stylebox.controller;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins={"http://stylebox5.herokuapp.com","https://stylebox5.herokuapp.com", "http://localhost:3000"})
@RestController
public class IndexController {
    @GetMapping("/index")
    public String index() {
        return "Hello World";
    }
}
