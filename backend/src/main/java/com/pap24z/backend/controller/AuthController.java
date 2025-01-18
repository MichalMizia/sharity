package com.pap24z.backend.controller;

import com.pap24z.backend.controller.DTO.UserDTO;
import com.pap24z.backend.model.User;
import com.pap24z.backend.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetailsService;
import com.pap24z.backend.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserDTO userDTO) {
        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setAcountNumber(userDTO.getAccountNumber());
        user.setPassword(userDTO.getPassword());
        user.setRole("USER");
        userService.saveUser(user);
        System.out.println("Received user: " + user.getUsername() + " " + user.getEmail() + " " + user.getPassword()
                + " " + user.getAccountNumber() + " " + user.getRole());
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String email, @RequestParam String password,
            HttpServletRequest request) {
        Optional<User> user = userService.getUserByEmail(email);
        if (user.isEmpty()) {
            throw new UsernameNotFoundException("User not found");
        }

        if (passwordEncoder.matches(password, user.get().getPassword())) {
            request.getSession().setAttribute("user", user.get());
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request,
            HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            new SecurityContextLogoutHandler().logout(request, response, auth);
            request.getSession().invalidate();
        }
        return ResponseEntity.ok("Logout successful");
    }

    @GetMapping("/session")
    public ResponseEntity<?> checkSession(HttpServletRequest request) {
        User user = (User) request.getSession().getAttribute("user");
        System.out.println("Session in session: " + user);
        if (user != null) {
            UserDTO userDTO = new UserDTO(user.getId(), user.getUsername(), user.getEmail(), user.getAccountNumber(), user.getRole(),
                    user.getImageSrc(), user.getDescription(), "");
            return ResponseEntity.ok(userDTO);
        } else {
            return ResponseEntity.status(401).body("No active session");
        }
    }

    @GetMapping("/balance")
    public ResponseEntity<?> getUserBalance(HttpServletRequest request) {
        User user = (User) request.getSession().getAttribute("user");
        if (user != null) {
            return ResponseEntity.ok(user.getBalance());
        } else {
            return ResponseEntity.status(401).body("No active session");
        }
    }

    @PostMapping("/balance")
    public ResponseEntity<?> resetBalance(HttpServletRequest request) {
        User user = (User) request.getSession().getAttribute("user");

        user.setBalance(0);
        userService.saveUser(user);
        // transfer money to user's account
        if (user != null) {
            return ResponseEntity.ok("Balance reset to 0");
        } else {
            return ResponseEntity.status(401).body("No active session");
        }
    }
}