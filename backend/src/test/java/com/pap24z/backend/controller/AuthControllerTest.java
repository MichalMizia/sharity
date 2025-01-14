package com.pap24z.backend.controller;

import com.pap24z.backend.controller.DTO.UserDTO;
import com.pap24z.backend.model.User;
import com.pap24z.backend.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import java.lang.reflect.Field;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.context.WebApplicationContext;

import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class AuthControllerTest {

    private MockMvc mockMvc;

    @Mock
    private UserService userService;

    @Mock
    private PasswordEncoder passwordEncoder;

    private AuthController authController;

    @BeforeEach
    public void setup() throws NoSuchFieldException, IllegalAccessException {
        MockitoAnnotations.openMocks(this);
        authController = new AuthController();

        // Ustawienie przez refleksję
        Field userServiceField = AuthController.class.getDeclaredField("userService");
        userServiceField.setAccessible(true);
        userServiceField.set(authController, userService);

        Field passwordEncoderField = AuthController.class.getDeclaredField("passwordEncoder");
        passwordEncoderField.setAccessible(true);
        passwordEncoderField.set(authController, passwordEncoder);

        mockMvc = MockMvcBuilders.standaloneSetup(authController).build();
    }

    @Test
    public void testLoginInvalidPassword() throws Exception {
        // Przygotowanie mocka użytkownika
        User user = new User();
        user.setUsername("testuser");
        user.setEmail("testuser@example.com");
        user.setPassword("encodedpassword");

        // Mockowanie UserService
        when(userService.getUserByEmail(anyString())).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(anyString(), eq("encodedpassword"))).thenReturn(false);

        // Wykonanie zapytania
        mockMvc.perform(post("/auth/login")
                        .param("email", "testuser@example.com")
                        .param("password", "wrongpassword"))
                .andExpect(status().isUnauthorized())
                .andExpect(content().string("Invalid email or password"));
    }

    @Test
    public void testLogout() throws Exception {
        // Wykonanie zapytania
        mockMvc.perform(post("/auth/logout"))
                .andExpect(status().isOk())
                .andExpect(content().string("Logout successful"));
    }

    @Test
    public void testCheckSession() throws Exception {
        // Przygotowanie mocka użytkownika w sesji
        User user = new User();
        user.setUsername("testuser");
        user.setEmail("testuser@example.com");

        // Symulowanie sesji w żądaniu
        mockMvc.perform(get("/auth/session")
                        .sessionAttr("user", user))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("testuser"))
                .andExpect(jsonPath("$.email").value("testuser@example.com"));
    }

    @Test
    public void testCheckSessionNoUser() throws Exception {
        // Symulowanie braku użytkownika w sesji
        mockMvc.perform(get("/auth/session"))
                .andExpect(status().isUnauthorized())
                .andExpect(content().string("No active session"));
    }

    @Test
    public void testGetUserBalance() throws Exception {
        // Przygotowanie mocka użytkownika w sesji
        User user = new User();
        user.setUsername("testuser");
        user.setEmail("testuser@example.com");
        user.setBalance(100.0);

        // Symulowanie sesji w żądaniu
        mockMvc.perform(get("/auth/balance")
                        .sessionAttr("user", user))
                .andExpect(status().isOk())
                .andExpect(content().string("100.0"));
    }

    @Test
    public void testGetUserBalanceNoUser() throws Exception {
        // Symulowanie braku użytkownika w sesji
        mockMvc.perform(get("/auth/balance"))
                .andExpect(status().isUnauthorized())
                .andExpect(content().string("No active session"));
    }
}
