package com.stylebox.service;

import com.stylebox.dto.FollowListGetDTO;
import com.stylebox.dto.StylistListSearchDTO;
import com.stylebox.entity.user.CustomerInformation;
import com.stylebox.entity.user.FollowRecord;
import com.stylebox.entity.user.StylistInformation;
import com.stylebox.repository.CustomerInformationRepository;
import com.stylebox.repository.FollowRepository;
import com.stylebox.repository.StylistInformationRepository;
import exception.Rest404Exception;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StylistService {
    final ModelMapper modelMapper;

    final FollowRepository followRepository;
    final CustomerInformationRepository customerInformationRepository;
    final StylistInformationRepository stylistInformationRepository;

    public void addFollowRecord(Long followerId, Long followeeId){
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

        stylistInformationById.get().addFollowRecord(followRecord);
        customerInformationById.get().addFollowRecord(followRecord);

        followRepository.save(followRecord);
    }

    public List<FollowListGetDTO> getFollowStylist(Long followerId, StylistListSearchDTO filter){


        List<FollowRecord> followRecords = followRepository.findByCustomerInformationId(followerId);
        List<FollowListGetDTO> followListGetDTOS = new ArrayList<>();

        for(FollowRecord record : followRecords){
            FollowListGetDTO followListGetDTO = new FollowListGetDTO();
            followListGetDTO.setAvatar(record.getStylistInformation().getUser().getAvatar());
            followListGetDTO.setAvatar(record.getStylistInformation().getUser().getNickname());
            followListGetDTO.setStylistId(record.getStylistInformation().getId());
            modelMapper.map(record.getStylistInformation(), followListGetDTO);
            followListGetDTOS.add(followListGetDTO);
        }
        return followListGetDTOS;
    }
}
