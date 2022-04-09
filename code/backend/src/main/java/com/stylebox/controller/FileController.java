package com.stylebox.controller;


import com.stylebox.dto.Order.StyleReportDTO;
import com.stylebox.dto.Order.StyleReportPostDTO;
import com.stylebox.dto.stylist.DisplayPostDTO;
import com.stylebox.dto.user.AvatarDTO;
import com.stylebox.entity.user.User;
import com.stylebox.repository.user.UserRepository;
import com.stylebox.service.FileService;
import com.stylebox.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.apache.commons.io.FileUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;

@CrossOrigin(origins = {"http://stylebox5.herokuapp.com", "https://stylebox5.herokuapp.com",
        "http://localhost:3000", "https://style-box.netlify.app", "http://style-box.netlify.app",
        "http://121.41.106.214"})
@RestController
@RequiredArgsConstructor
public class FileController {
    private static final String FILE_PATH_ROOT = Paths.get(".").toAbsolutePath().normalize().toString()+"/src/main/resources/images/";
    final JwtTokenUtil jwtTokenUtil;
    final UserRepository userRepository;
    final FileService fileService;

//    @PostMapping(value="/test", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    public void test(@ModelAttribute TestDTO data){
//       // System.out.println(a);
//        String[] array = data.getArray();
//        List<ItemDTO> items = data.getItems();
//
//    }

    @DeleteMapping("/images/{filename}")
    public void deleteImage(@PathVariable("filename") String filename){
        fileService.deleteImage(filename);
    }

    @GetMapping("/images/{filename}")
    public ResponseEntity<byte[]> getImage(@PathVariable("filename") String filename) {
        byte[] image = new byte[0];
        try {
            image = FileUtils.readFileToByteArray(new File(FILE_PATH_ROOT+filename));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(image);
    }

    @PostMapping("/avatar")
    public String UploadAvatar(HttpServletRequest request, AvatarDTO avatarDTO){

        User user = jwtTokenUtil.getUserFromRequest(request);

        return fileService.UploadAvatar(user, avatarDTO.getImg());

    }

    @PostMapping("/stylist/display")
    public void UploadDisplay(HttpServletRequest request, DisplayPostDTO displays){
        User user = jwtTokenUtil.getUserFromRequest(request);
        fileService.UpdateDisplay(user, displays);
    }

    @PostMapping("/stylist/styleReport/{orderId}")
    public void UploadStyleReport(HttpServletRequest request, @PathVariable("orderId") Long orderId, StyleReportPostDTO report){
        User user = jwtTokenUtil.getUserFromRequest(request);
        fileService.UploadReport(user, report, orderId);
    }

    @GetMapping("/order/styleReport/{orderId}")
    public StyleReportDTO getStyleReport(HttpServletRequest request, @PathVariable("orderId") Long orderId){
        User user = jwtTokenUtil.getUserFromRequest(request);
        return fileService.getReport(user, orderId);
    }

}
