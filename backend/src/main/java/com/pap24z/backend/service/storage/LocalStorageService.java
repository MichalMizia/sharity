package com.pap24z.backend.service.storage;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class LocalStorageService implements StorageService {
    private final String uploadDir = Paths.get(System.getProperty("user.dir"), "public", "uploads").toString();

    private final long MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
    private final List<String> ALLOWED_FILE_TYPES = List.of(
            // images
            "image/jpeg", "image/png", "image/gif", "image/bmp", "image/webp",
            // documents
            "application/pdf", "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/vnd.ms-powerpoint",
            "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            // archives
            "application/rtf", "text/plain", "application/zip", "application/x-rar-compressed",
            "application/x-7z-compressed", "application/x-tar");

    @Override
    public String storeFile(MultipartFile file) {
        try {
            if (file.getSize() > MAX_FILE_SIZE) {
                throw new RuntimeException("File size exceeds the maximum limit of 10 MB");
            }

            String contentType = file.getContentType();
            if (!ALLOWED_FILE_TYPES.contains(contentType)) {
                throw new RuntimeException("File type not allowed");
            }

            String hash = UUID.randomUUID().toString();
            String filePath = uploadDir + "/" + hash + file.getOriginalFilename();
            file.transferTo(new File(filePath));
            return hash + file.getOriginalFilename();
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file", e);
        }
    }

}
