package com.pap24z.backend.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
public class HomeControllerTest {

    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @Test
    public void testGetHome() throws Exception {
        mockMvc.perform(get("/home"))
                .andExpect(status().isOk()) // Oczekuj statusu 200 OK
                .andExpect(jsonPath("$.App").value("SPRING BOOT")) // Oczekuj, że klucz "App" ma wartość "SPRING BOOT"
                .andExpect(jsonPath("$.Running").value("True")) // Oczekuj, że klucz "Running" ma wartość "True"
                .andExpect(jsonPath("$.Name").value("Pap-Backend")) // Oczekuj, że klucz "Name" ma wartość "Pap-Backend"
                .andExpect(jsonPath("$.Hotel").value("Trivago")); // Oczekuj, że klucz "Hotel" ma wartość "Trivago"
    }
}
