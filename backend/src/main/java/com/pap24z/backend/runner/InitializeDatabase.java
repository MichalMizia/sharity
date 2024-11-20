// package com.pap24z.backend.runner;

// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;
// import org.springframework.boot.CommandLineRunner;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;

// import com.pap24z.backend.model.User;
// import com.pap24z.backend.repository.UserRepository;

// @Configuration
// class LoadDatabase {

//     private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

//     @Bean
//     CommandLineRunner initDatabase(UserRepository repository) {
//         return args -> {
//             log.info("Preloading " + repository.save(new User("admin", "admin@example.com", "adminpassword", "ADMIN")));
//             log.info("Preloading " + repository.save(new User("user", "user@example.com", "userpassword", "USER")));
//         };
//     }
// }