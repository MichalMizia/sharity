package com.pap24z.backend.service;

import com.pap24z.backend.model.User;
import com.pap24z.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllUsers() {
        userService.getAllUsers();
        verify(userRepository, times(1)).findAll();
    }

    @Test
    void testGetUserById() {
        User user = new User("testuser", "test@example.com", "password");
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        User foundUser = userService.getUserById(1L);
        assertNotNull(foundUser);
        assertEquals("testuser", foundUser.getUsername());
    }

    @Test
    void testGetUserByEmail() {
        User user = new User("testuser", "test@example.com", "password");
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));

        Optional<User> foundUser = userService.getUserByEmail("test@example.com");
        assertTrue(foundUser.isPresent());
        assertEquals("testuser", foundUser.get().getUsername());
    }

    @Test
    void testSaveUser() {
        User user = new User("testuser", "test@example.com", "password");
        when(userRepository.save(user)).thenReturn(user);

        User savedUser = userService.saveUser(user);
        assertNotNull(savedUser);
        assertEquals("testuser", savedUser.getUsername());
    }

    @Test
    void testDeleteUser() {
        userService.deleteUser(1L);
        verify(userRepository, times(1)).deleteById(1L);
    }

    @Test
    void testVerifyUserPasswordById() {
        User user = new User("testuser", "test@example.com", "password");
        user.setPassword("password");
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        boolean isPasswordCorrect = userService.verifyUserPassword(1L, "password");
        assertTrue(isPasswordCorrect);
    }

    @Test
    void testVerifyUserPasswordByEmail() {
        User user = new User("testuser", "test@example.com", "password");
        user.setPassword("password");
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));

        boolean isPasswordCorrect = userService.verifyUserPassword("test@example.com", "password");
        assertTrue(isPasswordCorrect);
    }

    @Test
    void testLoadUserByUsername() {
        User user = new User("testuser", "test@example.com", "password");
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));

        UserDetails userDetails = userService.loadUserByUsername("test@example.com");
        assertNotNull(userDetails);
        assertEquals("test@example.com", userDetails.getUsername());
    }

    @Test
    void testLoadUserByUsernameNotFound() {
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class, () -> {
            userService.loadUserByUsername("test@example.com");
        });
    }
}