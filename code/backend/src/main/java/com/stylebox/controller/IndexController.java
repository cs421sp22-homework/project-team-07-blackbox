package com.stylebox.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins="https://stylebox5.herokuapp.com/")
@RestController
public class IndexController {
    @GetMapping("/index")
    public String index() {
        return "Hello World";
    }
}
