package com.pap24z.backend.service;

import com.pap24z.backend.repository.UserRepository;
import com.pap24z.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User.UserBuilder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public boolean verifyUserPassword(Long userId, String password) {
        Optional<User> user = userRepository.findById(userId);
        return user.isPresent() && user.get().verifyPassword(password);
    }

    public boolean verifyUserPassword(String userEmail, String password) {
        Optional<User> user = userRepository.findByEmail(userEmail);
        return user.isPresent() && user.get().verifyPassword(password);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        UserBuilder builder = org.springframework.security.core.userdetails.User.withUsername(email);
        builder.password(user.getPassword());
        builder.roles(user.getRole());
        return builder.build();
    }
}