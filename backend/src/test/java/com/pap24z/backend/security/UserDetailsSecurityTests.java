package com.pap24z.backend.security;

import com.pap24z.backend.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserDetailsServiceImplTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserDetailsServiceImpl userDetailsService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testLoadUserByUsername_UserNotFound() {
        // Przygotowanie danych testowych
        when(userService.getUserByEmail("nonexistent@example.com")).thenReturn(Optional.empty());

        // Weryfikacja wyjątku
        UsernameNotFoundException exception = assertThrows(UsernameNotFoundException.class, () -> {
            userDetailsService.loadUserByUsername("nonexistent@example.com");
        });

        assertEquals("Username nonexistent@example.com not found", exception.getMessage());

        // Weryfikacja interakcji
        verify(userService, times(1)).getUserByEmail("nonexistent@example.com");
    }
}
