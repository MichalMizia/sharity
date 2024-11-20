package com.pap24z.backend.service.storage;

import org.springframework.web.multipart.MultipartFile;

public interface StorageService {
    String storeFile(MultipartFile file);
}