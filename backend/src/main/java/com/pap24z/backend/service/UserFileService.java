package com.pap24z.backend.service;

import com.pap24z.backend.model.UserFile;
import com.pap24z.backend.repository.UserFileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserFileService {

    @Autowired
    private UserFileRepository userFileRepository;

    public List<UserFile> getAllUserFiles() {
        return userFileRepository.findAll();
    }

    public Optional<UserFile> getUserFileById(Long id) {
        return userFileRepository.findById(id);
    }

    public List<UserFile> getUserFilesByUserId(Long userId) {
        return userFileRepository.findByUserId(userId);
    }

    public UserFile saveUserFile(UserFile userFile) {
        return userFileRepository.save(userFile);
    }

    public void deleteUserFile(Long id) {
        userFileRepository.deleteById(id);
    }
}