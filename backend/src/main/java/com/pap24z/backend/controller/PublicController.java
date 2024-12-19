package com.pap24z.backend.controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/public")
public class PublicController {

    private final String uploadDir = Paths.get(System.getProperty("user.dir"), "public", "uploads").toString();

    @GetMapping("/files/{filename:.+}")
    public ResponseEntity<Resource> serveFile(@PathVariable String filename,
            @RequestParam(defaultValue = "false") boolean download, HttpServletRequest request) {
        try {
            Path filePath = Paths.get(uploadDir).resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() && resource.isReadable()) {
                // Determine the file's content type
                String contentType = request.getServletContext().getMimeType(filePath.toString());
                if (contentType == null) {
                    contentType = "application/octet-stream";
                }

                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.parseMediaType(contentType));
                if (download) {
                    headers.setContentDispositionFormData("attachment", resource.getFilename());
                } else {
                    headers.setContentDispositionFormData("inline", resource.getFilename());
                }

                return ResponseEntity.ok()
                        .headers(headers)
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IOException e) {
            return ResponseEntity.status(500).build();
        }
    }
}