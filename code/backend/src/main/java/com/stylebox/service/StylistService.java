package com.stylebox.service;

import com.stylebox.dto.stylist.StyDTO;
import com.stylebox.dto.stylist.StyListsDTO;
import com.stylebox.entity.user.*;
import com.stylebox.repository.RoleRepository;
import com.stylebox.repository.StyleRepository;
import com.stylebox.repository.StylistInformationRepository;
import com.stylebox.repository.UserRepository;
import com.stylebox.util.SortUtil;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;

import com.stylebox.entity.user.CustomerInformation;
import com.stylebox.entity.user.FollowRecord;
import com.stylebox.entity.user.StylistInformation;
import com.stylebox.repository.CustomerInformationRepository;
import com.stylebox.repository.FollowRepository;
import exception.Rest404Exception;

import java.util.List;
import java.util.Optional;

import static org.springframework.data.jpa.domain.Specification.where;

@Service
@RequiredArgsConstructor
public class StylistService {
    final ModelMapper modelMapper;

    final FollowRepository followRepository;
    final CustomerInformationRepository customerInformationRepository;
    final StylistInformationRepository stylistInformationRepository;

    final SortUtil sortUtil;

    final StyleRepository styleRepository;

    final RoleRepository roleRepository;

    final UserRepository userRepository;


    //add a follow record
    public void addFollowRecord(Long followerId, Long followeeId){
        FollowRecord followRecord = getValidFollowRecord(followerId, followeeId);
        //If record is not in the repository, add
        Optional<FollowRecord> followRecordToBeAdd = followRepository.findByFollowerIdAndFolloweeId(followerId, followeeId);
        if(!followRecordToBeAdd.isPresent()) {
            followRecord.getStylistInformation().addFollowRecord(followRecord);
            followRecord.getCustomerInformation().addFollowRecord(followRecord);
            followRepository.save(followRecord);
        }
    }
    //delete a follow record
    public void deleteFollowRecord(Long followerId, Long followeeId){
        //Detemine if the followRecord is valid (followerId is a customer_id, followeeId is a stylistId)
        getValidFollowRecord(followerId, followeeId);

        Optional<FollowRecord> followRecordToBeDelete = followRepository.findByFollowerIdAndFolloweeId(followerId, followeeId);
        if(followRecordToBeDelete.isPresent()) {
            followRepository.deleteById(followRecordToBeDelete.get().getId());
        }else{
            throw new Rest404Exception("followRecord does not exist");
        }
    }

    //get all searched follow stylists
    public StyListsDTO getFollowStylist(Long followerId, int page, String style, String sort, String search, int limit) {
        Pageable pageable = sortUtil.sortPage(sort, page, limit, new ArrayList<>(Arrays.asList
                ("rate", "followNum")));

        //query: stylistHasSearch & stylistHasStyle & pageable & followedByCurrentUser
        Page<StylistInformation> all = stylistInformationRepository.findAll(
                        where(StylistSpecifications.stylistHasSearch(search))
                        .and(StylistSpecifications.stylistHasStyle(style))
                        .and(StylistSpecifications.stylistFollowedBy(followerId)), pageable);

        int totalPages = all.getTotalPages();


        return MapToStyListsDTO(all, totalPages);
    }


    //Get all searched stylists
    public StyListsDTO getStyLists(int page, String style, String sort, String search, int limit) {
        Pageable pageable = sortUtil.sortPage(sort, page, limit, new ArrayList<>(Arrays.asList
                ("rate", "followNum")));

        //query: stylistHasSearch & stylistHasStyle & pageable
        Page<StylistInformation> all = stylistInformationRepository.findAll(
                where(StylistSpecifications.stylistHasSearch(search))
                        .and(StylistSpecifications.stylistHasStyle(style)), pageable);

        int totalPages = all.getTotalPages();

        StyListsDTO styListsDTO = MapToStyListsDTO(all, totalPages);

        return styListsDTO;
    }

    private StyListsDTO MapToStyListsDTO(Page<StylistInformation> all, int totalPages) {
        StyListsDTO styListsDTO = new StyListsDTO();
        List<StyDTO> styDTOList = new ArrayList<>();
        for (StylistInformation sty : all) {
            StyDTO styDTO = modelMapper.map(sty, StyDTO.class);
            styDTO.setStylistId(sty.getUser().getId());
            modelMapper.map(sty.getUser(), styDTO);
            styDTOList.add(styDTO);
        }
        styListsDTO.setTotalPages(totalPages);
        styListsDTO.setData(styDTOList);
        return styListsDTO;
    }

    private FollowRecord getValidFollowRecord(Long followerId, Long followeeId){
        FollowRecord followRecord = new FollowRecord();
        //set customerInformation of followRecord
        Optional<CustomerInformation> customerInformationById = customerInformationRepository.findById(followerId);
        if(customerInformationById.isPresent()) {
            followRecord.setCustomerInformation(customerInformationById.get());
        }else{
            throw new Rest404Exception("FollowerId does not exist");
        }
        //set stylistInformation of followRecord
        Optional<StylistInformation> stylistInformationById = stylistInformationRepository.findById(followeeId);
        if(stylistInformationById.isPresent()){
            followRecord.setStylistInformation(stylistInformationById.get());
        }else{
            throw new Rest404Exception("FolloweeId does not exist");
        }

        return followRecord;
    }

}

