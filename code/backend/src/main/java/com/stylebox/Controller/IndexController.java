package com.stylebox.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

@CrossOrigin(origins="http://localhost:3000")
@RestController
public class IndexController {
    @GetMapping("/index")
    public String index() {
        return "Hello World";
    }
}
