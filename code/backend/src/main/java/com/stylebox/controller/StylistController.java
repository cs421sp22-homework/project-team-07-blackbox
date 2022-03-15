package com.stylebox.controller;

import com.stylebox.dto.FollowListGetDTO;
import com.stylebox.dto.StylistListSearchDTO;
import com.stylebox.entity.user.FollowRecord;
import com.stylebox.entity.user.User;
import com.stylebox.repository.FollowRepository;
import com.stylebox.service.StylistService;
import com.stylebox.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins={"http://stylebox5.herokuapp.com","https://stylebox5.herokuapp.com","http://localhost:3000","https://style-box.netlify.app","http://style-box.netlify.app"})
@RestController
@RequiredArgsConstructor
public class StylistController {
    final JwtTokenUtil jwtTokenUtil;

    final StylistService stylistService;

    @PostMapping("/follow/{id}")
    public void addFollower(HttpServletRequest request, @PathVariable Long id) {
        User user = jwtTokenUtil.getUserFromRequest(request);
        Long followerId = user.getId();
        stylistService.addFollowRecord(followerId, id);
    }

    @GetMapping("/followStylist")
    public List<FollowListGetDTO> getFollowStylist(HttpServletRequest request, @RequestBody StylistListSearchDTO filter){
        Long followerId = jwtTokenUtil.getUserFromRequest(request).getId();
        return stylistService.getFollowStylist(followerId, filter);
    }
}
