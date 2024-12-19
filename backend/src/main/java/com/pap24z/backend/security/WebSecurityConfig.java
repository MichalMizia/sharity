package com.pap24z.backend.security;

import lombok.RequiredArgsConstructor;

import java.util.function.Supplier;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authorization.AuthorizationDecision;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.intercept.RequestAuthorizationContext;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                return http
                                .authorizeHttpRequests(authorizeHttpRequests -> authorizeHttpRequests
                                                .requestMatchers("/public/**", "/auth/**", "/users/**",
                                                                "/v3/api-docs/**", "/product-listings/**")
                                                .permitAll()
                                                .anyRequest().access(this::customAccessDecision))
                                .sessionManagement(sessionManagement -> sessionManagement
                                                .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))
                                .csrf((csrf) -> csrf
                                                .disable())
                                .build();
        }

        private AuthorizationDecision customAccessDecision(Supplier<Authentication> authentication,
                        RequestAuthorizationContext context) {
                Authentication auth = authentication.get();

                if (auth == null || !auth.isAuthenticated()) {
                        // return new AuthorizationDecision(false);
                        return new AuthorizationDecision(true);
                }

                System.out.println("Authentication: " + auth.isAuthenticated() + " " + auth.getCredentials());
                // System.out.println(auth.getAuthorities());

                return new AuthorizationDecision(true);
                // String requestUrl = context.getRequest().getRequestURI();
                // for (GrantedAuthority authority : auth.getAuthorities()) {
                // if (requestUrl.startsWith("/files") &&
                // authority.getAuthority().equals("USER")) {
                // return new AuthorizationDecision(true);
                // }
                // }

                // return new AuthorizationDecision(false);
        }

        @Bean
        public PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }

        @Bean
        public WebMvcConfigurer corsConfigurer() {
                return new WebMvcConfigurer() {
                        @Override
                        public void addCorsMappings(CorsRegistry registry) {
                                registry.addMapping("/**")
                                                .allowedOrigins("http://localhost:3000", "http://localhost:5173")
                                                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                                                .allowedHeaders("*")
                                                .allowCredentials(true);
                        }
                };
        }

        public static final String ADMIN = "ADMIN";
        public static final String USER = "USER";
}