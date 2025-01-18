// package com.pap24z.backend.controller;

// import com.pap24z.backend.controller.DTO.ProductListingDTO;
// import com.pap24z.backend.controller.DTO.UserDTO;
// import com.pap24z.backend.model.ProductListing;
// import com.pap24z.backend.service.ProductListingService;
// import com.pap24z.backend.service.UserService;
// import com.pap24z.backend.service.UserFileService;
// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.http.MediaType;
// import org.springframework.test.web.servlet.MockMvc;
// import org.springframework.test.web.servlet.MvcResult;
// import org.springframework.test.web.servlet.setup.MockMvcBuilders;
// import org.springframework.web.context.WebApplicationContext;

// import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

// import java.util.List;

// @SpringBootTest
// public class ProductListingControllerTest {

//     @Autowired
//     private WebApplicationContext webApplicationContext;

//     @Autowired
//     private ProductListingService productListingService;

//     @Autowired
//     private UserService userService;

//     @Autowired
//     private UserFileService userFileService;

//     private MockMvc mockMvc;

//     @BeforeEach
//     public void setup() {
//         mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
//     }

//     @Test
//     public void testGetProductListingById() throws Exception {
//         Long productListingId = 1L; // Zamień na istniejący ID produktu
//         mockMvc.perform(get("/product-listings/{id}", productListingId))
//                 .andExpect(status().isOk())
//                 .andExpect(jsonPath("$.id").value(productListingId));
//     }

//     @Test
//     public void testGetProductListingByIdNotFound() throws Exception {
//         Long productListingId = 999L; // ID produktu, który nie istnieje
//         mockMvc.perform(get("/product-listings/{id}", productListingId))
//                 .andExpect(status().isNotFound());
//     }


//     @Test
//     public void testDeleteProductListingNotFound() throws Exception {
//         Long productListingId = 999L; // ID produktu, który nie istnieje

//         mockMvc.perform(delete("/product-listings/{id}", productListingId))
//                 .andExpect(status().isNotFound());
//     }
// }
