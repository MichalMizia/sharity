package com.pap24z.backend.security;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(WebSecurityConfig.class)
class WebSecurityConfigTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void testCorsConfigurationRejectsUnauthorizedOrigins() throws Exception {
        mockMvc.perform(get("/public/test")
                .header("Origin", "http://unauthorized-origin.com")
                .with(csrf()))
                .andExpect(status().isForbidden());
    }
}
