package com.pap24z.backend.security;

import lombok.RequiredArgsConstructor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

        private static final Logger logger = LoggerFactory.getLogger(WebSecurityConfig.class);

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                return http
                                .authorizeHttpRequests(authorizeHttpRequests -> authorizeHttpRequests
                                                .requestMatchers("/files/**",
                                                                "/files")
                                                .hasAuthority(USER)
                                                .requestMatchers("/public/**", "/auth/**", "/users/**").permitAll()
                                                .requestMatchers("/", "/error", "/csrf", "/home/**")
                                                .permitAll()
                                                .anyRequest().authenticated())
                                .sessionManagement(sessionManagement -> sessionManagement
                                                .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))
                                .csrf((csrf) -> csrf
                                                .disable())
                                .build();
        }

        @Bean
        public PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }

        public static final String ADMIN = "ADMIN";
        public static final String USER = "USER";
}