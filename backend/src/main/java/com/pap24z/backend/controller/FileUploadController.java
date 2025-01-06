package com.pap24z.backend.controller;

import com.pap24z.backend.service.storage.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/files")
public class FileUploadController {

    private final StorageService storageService;

    @Autowired
    public FileUploadController(StorageService storageService) {
        this.storageService = storageService;
    }

    @GetMapping("/upload")
    public ResponseEntity<String> getFile() {
        System.out.println("In upload controller");
        return ResponseEntity.ok("Hello there");
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        String filePath = storageService.storeFile(file);
        return ResponseEntity.ok("File uploaded successfully: " + filePath);
    }
}