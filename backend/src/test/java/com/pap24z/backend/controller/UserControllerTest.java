package com.pap24z.backend.controller;

import org.springframework.mock.web.MockHttpSession;
import com.pap24z.backend.controller.DTO.UserFileDTO;
import com.pap24z.backend.model.User;
import com.pap24z.backend.model.UserFile;
import com.pap24z.backend.service.UserFileService;
import com.pap24z.backend.service.UserService;
import com.pap24z.backend.service.storage.StorageService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.Map;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class UserControllerTest {

    @Mock
    private UserService userService;

    @Mock
    private UserFileService userFileService;

    @Mock
    private StorageService storageService;

    @InjectMocks
    private UserController userController;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    @Test
    void testGetAllUsers() throws Exception {
        mockMvc.perform(get("/users"))
                .andExpect(status().isOk());
        verify(userService, times(1)).getAllUsers();
    }

    @Test
    void testGetUserById() throws Exception {
        User user = new User("testuser", "test@example.com", "password", "01234567890123456789012345");
        when(userService.getUserById(1L)).thenReturn(user);

        mockMvc.perform(get("/users/{id}", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("testuser"));

        verify(userService, times(1)).getUserById(1L);
    }

    @Test
    void testGetUserByIdNotFound() throws Exception {
        when(userService.getUserById(1L)).thenReturn(null);

        mockMvc.perform(get("/users/{id}", 1L))
                .andExpect(status().isNotFound());

        verify(userService, times(1)).getUserById(1L);
    }

    @Test
    void testDeleteUser() throws Exception {
        User user = new User("testuser", "test@example.com", "password", "01234567890123456789012345");
        when(userService.getUserById(1L)).thenReturn(user);

        mockMvc.perform(delete("/users/{id}", 1L))
                .andExpect(status().isNoContent());

        verify(userService, times(1)).deleteUser(1L);
    }

    @Test
    void testDeleteUserNotFound() throws Exception {
        when(userService.getUserById(1L)).thenReturn(null);

        mockMvc.perform(delete("/users/{id}", 1L))
                .andExpect(status().isNotFound());

        verify(userService, times(1)).getUserById(1L);
    }


    @Test
    void testGetUserFiles() throws Exception {
        User user = new User("testuser", "test@example.com", "password", "01234567890123456789012345");
        UserFile userFile = new UserFile("file1", "path/to/file", user, null);
        when(userFileService.getUserFilesByUserId(1L)).thenReturn(List.of(userFile));

        mockMvc.perform(get("/users/{id}/files", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].fileName").value("file1"));

        verify(userFileService, times(1)).getUserFilesByUserId(1L);
    }

    @Test
    void testGetUserDescription() throws Exception {
        User user = new User("testuser", "test@example.com", "password", "01234567890123456789012345");
        user.setDescription("This is a test description.");
        when(userService.getUserById(1L)).thenReturn(user);

        mockMvc.perform(get("/users/{id}/description", 1L))
                .andExpect(status().isOk())
                .andExpect(content().string("This is a test description."));

        verify(userService, times(1)).getUserById(1L);
    }

    @Test
    void testUpdateUserDescription() throws Exception {
        User user = new User("testuser", "test@example.com", "password", "01234567890123456789012345");
        when(userService.getUserById(1L)).thenReturn(user);
        when(userService.saveUser(any(User.class))).thenReturn(user);

        mockMvc.perform(put("/users/{id}/description", 1L)
                        .contentType("application/json")
                        .content("{\"description\":\"New description\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.description").value("New description"));

        verify(userService, times(1)).getUserById(1L);
        verify(userService, times(1)).saveUser(any(User.class));
    }
}
