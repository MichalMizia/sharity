package com.pap24z.backend.service.storage;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class LocalStorageService implements StorageService {
    private final String uploadDir = "/public/uploads";

    @Override
    public String storeFile(MultipartFile file) {
        try {
            String hash = UUID.randomUUID().toString();
            String filePath = uploadDir + "/" + hash + file.getOriginalFilename();
            File dest = new File(filePath);
            file.transferTo(dest);
            return filePath;
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file", e);
        }
    }

}
