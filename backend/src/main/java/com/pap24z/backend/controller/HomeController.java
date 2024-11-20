package com.pap24z.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/home")
public class HomeController {

    @GetMapping("")
    public ResponseEntity<Map<String, String>> getHome() {
        Map<String, String> response = new HashMap<>();
        response.put("Hello", "siema");
        response.put("Hotel", "Trivago");
        return ResponseEntity.ok(response);
    }
}