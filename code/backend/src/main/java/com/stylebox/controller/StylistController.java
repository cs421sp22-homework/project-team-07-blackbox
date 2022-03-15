package com.stylebox.controller;

import com.stylebox.dto.stylist.StyListsDTO;
import com.stylebox.service.StylistService;
import com.stylebox.service.UserService;
import com.stylebox.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins={"http://stylebox5.herokuapp.com","https://stylebox5.herokuapp.com","http://localhost:3000","https://style-box.netlify.app","http://style-box.netlify.app"})
@RestController
@RequiredArgsConstructor
public class StylistController {
    final StylistService stylistService;

    final JwtTokenUtil jwtTokenUtil;

    @GetMapping("/stylists")
    public StyListsDTO getStyLists(
        @RequestParam(value = "page", required = false, defaultValue = "0") int page,
        @RequestParam(value = "style", required = false, defaultValue = "") String style,
        @RequestParam(value = "sort", required = false, defaultValue = "") String sort,
        @RequestParam(value = "search", required = false, defaultValue = "") String search
    ) {
        return stylistService.getStyLists(page, style, sort, search);
    }
}
