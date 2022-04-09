package com.stylebox.service;


import com.stylebox.dto.Order.StyleReportDTO;
import com.stylebox.dto.Order.StyleReportPostDTO;
import com.stylebox.dto.stylist.DisplayPostDTO;
import com.stylebox.entity.shopping.Item;
import com.stylebox.entity.stylist.Displays;
import com.stylebox.entity.stylist.Orders;
import com.stylebox.entity.stylist.StyleReport;
import com.stylebox.entity.user.User;
import com.stylebox.repository.shopping.ItemRepository;
import com.stylebox.repository.stylist.DisplayRepository;
import com.stylebox.repository.stylist.OrderRepository;
import com.stylebox.repository.stylist.StyleReportRepository;
import com.stylebox.repository.user.UserRepository;
import exception.Rest404Exception;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileService {
    private static final String FILE_PATH_ROOT = Paths.get(".").toAbsolutePath().normalize().toString()+"/src/main/resources/images/";
    private static final String FILE_PATH_ROOT_DELETE = Paths.get(".").toAbsolutePath().normalize().toString() + "/src/main/resources";

    final ModelMapper modelMapper;

    final UserRepository userRepository;
    final DisplayRepository displayRepository;
    final OrderRepository orderRepository;
    final ItemRepository itemRepository;
    final StyleReportRepository reportRepository;

    public String UploadAvatar(User user, MultipartFile image){
        String newName = "avatar-" + user.getRole().getName() + "-" + user.getId().toString() + "-" + UUID.randomUUID();
        String avatarUrl = "/images/" + newName;

        File dest = new File(FILE_PATH_ROOT+newName);

        if(!dest.getParentFile().exists()){
            dest.getParentFile().mkdirs();
        }
        try{
            image.transferTo(dest);
        } catch(IOException e){
            e.printStackTrace();
        }
        if(!user.getAvatar().equals("/images/default-avatar.jpeg")) {
            deleteImage(user.getAvatar());
        }
        user.setAvatar(avatarUrl);
        userRepository.save(user);

        return avatarUrl;
    }



    public String UploadDisplayImage(User user, MultipartFile image){
        String newName = "design-" + user.getRole().getName() + "-" + user.getId().toString() + "-" + UUID.randomUUID();
        String designURL = "/images/" + newName;

        File dest = new File(FILE_PATH_ROOT+newName);

        if(!dest.getParentFile().exists()){
            dest.getParentFile().mkdirs();
        }
        try{
            image.transferTo(dest);
        } catch(IOException e){
            e.printStackTrace();
        }

        return designURL;
    }

    public String UploadItemImage(MultipartFile image){
        String newName = "item-" + "-" + UUID.randomUUID();
        String itemURL = "/images/" + newName;

        File dest = new File(FILE_PATH_ROOT+newName);

        if(!dest.getParentFile().exists()){
            dest.getParentFile().mkdirs();
        }
        try{
            image.transferTo(dest);
        } catch(IOException e){
            e.printStackTrace();
        }

        return itemURL;
    }


    public void UpdateDisplay(User user, DisplayPostDTO displays){
        if(!user.getRole().getName().equals("Stylist")){
            throw new Rest404Exception("This user is not a stylist.");
        }

        String[] ideas = displays.getIdeas();
        MultipartFile[] images = displays.getImages();
        String[] deletedIds = displays.getDeletedID();

        if(!(deletedIds == null)) {
            for (String deleteId : deletedIds) {
                System.out.println(deleteId);
                Optional<Displays> display = displayRepository.findByImage(deleteId);
                if (display.isPresent()) {
                    deleteImage(display.get().getImage());
                    user.getStylistInformation().deleteDisplay(display.get());
                    displayRepository.deleteByImage(deleteId);
                }
            }
        }

        for(int i = 0; i < images.length; i++){
            if(images[i].isEmpty())
                continue;
            Displays display = new Displays();
            String designURL = UploadDisplayImage(user, images[i]);
            display.setIdea(ideas[i]);
            display.setImage(designURL);
            displayRepository.save(display);
            user.getStylistInformation().addDisplay(display);
        }
        userRepository.save(user);

    }


    @SneakyThrows
    public void deleteImage(String imageURL){
        Path path = Paths.get(FILE_PATH_ROOT_DELETE+ imageURL);
        boolean success = Files.deleteIfExists(path);
        if(!success){
            System.out.println("File does not exist.");
        }
    }

    public void UploadReport(User user, StyleReportPostDTO reportInfo, Long orderId){
        if(!user.getRole().getName().equals("Stylist")){
            throw new Rest404Exception("This user is not a stylist.");
        }
        Orders order = orderRepository.getById(orderId);
        if(!user.getStylistInformation().getOrderSet().contains(order)){
            throw new Rest404Exception("This stylist does not own the order.");
        }

        StyleReport newReport = new StyleReport();
        newReport.setIdea(reportInfo.getIdea());

        String outfitURL = UploadDisplayImage(user, reportInfo.getOutfitImage());
        newReport.setOutfitImage(outfitURL);

        String[] itemName = reportInfo.getItemName();
        String[] link = reportInfo.getLink();
        MultipartFile[] images = reportInfo.getItemImage();

        for(int i = 0; i < itemName.length; i++){
            Item newItem = new Item();
            newItem.setItemName(itemName[i]);
            newItem.setLink(link[i]);
            String itemURL = UploadItemImage(images[i]);
            newItem.setItemImage(itemURL);
            itemRepository.save(newItem);
            newReport.getItems().add(newItem);
        }
        order.setOrderStatus(5);
        reportRepository.save(newReport);
        order.setStyleReport(newReport);
        orderRepository.save(order);
    }

    public StyleReportDTO getReport(User user, Long orderId){
        Optional<Orders> order = orderRepository.findById(orderId);
        if (!order.isPresent()) {
            throw new Rest404Exception("Not found the order");
        }
        if(user.getRole().getName().equals("Stylist") && !user.getStylistInformation().getOrderSet().contains(order.get())
        || user.getRole().getName().equals("Customer") && !user.getCustomerInformation().getOrderSet().contains(order.get())){
            throw new Rest404Exception("You have no right to view this styleReport.");
        }
        if(order.get().getStyleReport()==null){
            throw new Rest404Exception("The style report is not ready for review.");
        }
        StyleReportDTO report = modelMapper.map(order.get().getStyleReport(), StyleReportDTO.class);
        report.setStylistId(order.get().getStylist().getId());
        report.setStylistName(order.get().getStylist().getUser().getNickname());
        return report;
    }

}
