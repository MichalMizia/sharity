package com.pap24z.backend.controller;

import com.pap24z.backend.model.PasswordResetToken;
import com.pap24z.backend.model.User;
import com.pap24z.backend.service.PasswordResetService;
import com.pap24z.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/password")
public class PasswordResetController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordResetService passwordResetService;

    @Autowired
    private JavaMailSender mailSender;

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestParam("email") String userEmail) {
        Optional<User> user = userService.getUserByEmail(userEmail);
        if (!user.isPresent()) {
            return ResponseEntity.status(404).body("User not found");
        }

        String token = passwordResetService.createPasswordResetTokenForUser(user.get());
        sendPasswordResetEmail(user.get().getEmail(), token);
        return ResponseEntity.ok("Password reset token sent to email");
    }

    @PostMapping("/change-password")
    public ResponseEntity<String> changePassword(@RequestParam("token") String token,
            @RequestParam("password") String password) {
        User user = passwordResetService.getUserByPasswordResetToken(token);
        if (user == null) {
            return ResponseEntity.status(404).body("Invalid token");
        }

        List<PasswordResetToken> tokens = passwordResetService.getAllTokens();
        for (PasswordResetToken print_token : tokens) {
            if (print_token.getToken().equals(token)) {
                passwordResetService.deleteToken(print_token);
            }
        }
        passwordResetService.changeUserPassword(user, password);
        return ResponseEntity.ok("Password changed successfully");
    }

    @GetMapping("/tokens")
    public ResponseEntity<List<PasswordResetToken>> getAllTokens() {
        List<PasswordResetToken> tokens = passwordResetService.getAllTokens();
        // remove all tokens
        for (PasswordResetToken token : tokens) {
            passwordResetService.deleteToken(token);
        }
        return ResponseEntity.ok(tokens);
    }

    private void sendPasswordResetEmail(String email, String token) {
        String subject = "Password Reset Request";
        String resetUrl = "http://localhost:5173/change-password?token=" + token;
        String message = "To reset your password, click the link below:\n" + resetUrl;

        SimpleMailMessage emailMessage = new SimpleMailMessage();
        emailMessage.setTo(email);
        emailMessage.setSubject(subject);
        emailMessage.setText(message);

        mailSender.send(emailMessage);
    }
}