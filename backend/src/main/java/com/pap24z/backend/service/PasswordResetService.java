package com.pap24z.backend.service;

import com.pap24z.backend.model.PasswordResetToken;
import com.pap24z.backend.model.User;
import com.pap24z.backend.repository.PasswordResetTokenRepository;
import com.pap24z.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PasswordResetService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    public String createPasswordResetTokenForUser(User user) {
        String token = UUID.randomUUID().toString();
        PasswordResetToken myToken = new PasswordResetToken();
        myToken.setToken(token);
        myToken.setUser(user);
        myToken.setExpiryDate(new Date(System.currentTimeMillis() + 3600000)); // 1 hour expiry
        tokenRepository.save(myToken);
        return token;
    }

    public User getUserByPasswordResetToken(String token) {
        Optional<PasswordResetToken> userToken = tokenRepository.findByToken(token);
        if (userToken.isPresent()) {
            return userToken.get().getUser();
        } else {
            return null;
        }
    }

    public void changeUserPassword(User user, String password) {
        user.setPassword(password);
        userRepository.save(user);
    }

    public List<PasswordResetToken> getAllTokens() {
        return tokenRepository.findAll();
    }

    public void deleteToken(PasswordResetToken token) {
        tokenRepository.delete(token);
    }
}