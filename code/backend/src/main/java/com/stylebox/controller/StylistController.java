package com.stylebox.controller;

import com.stylebox.dto.stylist.StyListsDTO;
import com.stylebox.service.StylistService;
import com.stylebox.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.stylebox.entity.user.User;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@CrossOrigin(origins={"http://stylebox5.herokuapp.com","https://stylebox5.herokuapp.com","http://localhost:3000","https://style-box.netlify.app","http://style-box.netlify.app"})
@RestController
@RequiredArgsConstructor
public class StylistController {
    final StylistService stylistService;

    final JwtTokenUtil jwtTokenUtil;

    @GetMapping("/stylists")
    public StyListsDTO getStyLists(
        @RequestParam(value = "page", defaultValue = "0") int page,
        @RequestParam(value = "style", required = false, defaultValue = "") String style,
        @RequestParam(value = "sort", required = false, defaultValue = "") String sort,
        @RequestParam(value = "search", required = false, defaultValue = "") String search,
        @RequestParam(value = "limit", defaultValue = "3") int limit)
    {
        return stylistService.getStyLists(page, style, sort, search, limit);
    }


    @PostMapping("/follow/{id}")
    public void addFollower(HttpServletRequest request, @PathVariable Long id) {
        User user = jwtTokenUtil.getUserFromRequest(request);
        stylistService.addFollowRecord(user, id);
    }

    @DeleteMapping("/unfollow/{id}")
    public void deleteFollower(HttpServletRequest request, @PathVariable Long id){
        User user = jwtTokenUtil.getUserFromRequest(request);
        stylistService.deleteFollowRecord(user, id);
    }

    @GetMapping("/followStylist")
    public StyListsDTO getFollowStylist(HttpServletRequest request,
        @RequestParam(value = "page", required = false, defaultValue = "0") int page,
        @RequestParam(value = "style", required = false, defaultValue = "") String style,
        @RequestParam(value = "sort", required = false, defaultValue = "") String sort,
        @RequestParam(value = "search", required = false, defaultValue = "") String search,
        @RequestParam(value = "limit", required = false, defaultValue = "3") int limit)
    {
        Long followerId = jwtTokenUtil.getUserFromRequest(request).getId();
        return stylistService.getFollowStylist(followerId, page, style, sort, search, limit);
    }
}
