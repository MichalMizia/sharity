package com.pap24z.backend.controller;

import com.pap24z.backend.controller.DTO.TransactionDTO;
import com.pap24z.backend.controller.DTO.UserFileInfoDTO;
import com.pap24z.backend.model.Transaction;
import com.pap24z.backend.model.User;
import com.pap24z.backend.model.UserFile;
import com.pap24z.backend.model.ProductListing;
import com.pap24z.backend.service.TransactionService;
import com.pap24z.backend.service.UserService;
import com.pap24z.backend.service.ProductListingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private UserService userService;

    @Autowired
    private ProductListingService productListingService;

    @PostMapping("/users/check-access")
    public ResponseEntity<Map<Long, UserFileInfoDTO>> checkUserFileAccess(HttpServletRequest request,
            @RequestBody List<Long> userFileIds) {
        User user = (User) request.getSession().getAttribute("user");
        if (user == null) {
            return ResponseEntity.status(403).build();
        }

        List<Transaction> userTransactions = transactionService.getTransactionsByUserId(user.getId());
        Map<Long, UserFileInfoDTO> accessibleFiles = userTransactions.stream()
                .flatMap(t -> t.getProductListing().getUserFiles().stream())
                .filter(uf -> userFileIds.contains(uf.getId()))
                .collect(Collectors.toMap(UserFile::getId,
                        uf -> new UserFileInfoDTO(uf.getFileName(), uf.getFilePath())));

        // Check if all requested files are accessible
        boolean allFilesAccessible = userFileIds.stream().allMatch(accessibleFiles::containsKey);
        if (!allFilesAccessible) {
            return ResponseEntity.status(403).build();
        }

        return ResponseEntity.ok(accessibleFiles);
    }

    @GetMapping
    public List<TransactionDTO> getAllTransactions() {
        return transactionService.getAllTransactions().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransactionDTO> getTransactionById(@PathVariable Long id) {
        Optional<Transaction> transaction = transactionService.getTransactionById(id);
        return transaction.map(t -> ResponseEntity.ok(convertToDTO(t)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public List<TransactionDTO> getTransactionsByUserId(@PathVariable Long userId) {
        return transactionService.getTransactionsByUserId(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<TransactionDTO> createTransaction(HttpServletRequest request,
            @RequestBody TransactionDTO transactionDTO) {
        User user = (User) request.getSession().getAttribute("user");
        if (user == null || !user.getId().equals(transactionDTO.getUserId())) {
            return ResponseEntity.status(403).build();
        }

        List<Transaction> existingTransactions = transactionService.getTransactionsByUserId(user.getId());
        boolean transactionExists = existingTransactions.stream()
                .anyMatch(t -> t.getProductListing().getId().equals(transactionDTO.getProductListingId()));
        if (transactionExists) {
            return ResponseEntity.status(409).body(null); // Conflict
        }

        Optional<ProductListing> productListingOptional = productListingService
                .getProductListingById(transactionDTO.getProductListingId());
        if (!productListingOptional.isPresent()) {
            return ResponseEntity.status(404).body(null); // Not Found
        }
        ProductListing productListing = productListingOptional.get();
        System.out.println("Prices: " + productListing.getPriceFull() + " " + productListing.getPriceChange() + " / "
                + transactionDTO.getAmount());
        if (!transactionDTO.getAmount()
                .equals(productListing.getPriceFull() + productListing.getPriceChange() * 0.01)) {
            return ResponseEntity.status(400).body(null); // Bad Request
        }

        if (user.getId().equals(productListing.getUser().getId())) {
            return ResponseEntity.status(400).body(null); // Bad Request
        }

        Transaction transaction = convertToEntity(transactionDTO);
        Transaction savedTransaction = transactionService.saveTransaction(transaction);
        return ResponseEntity.ok(convertToDTO(savedTransaction));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable Long id) {
        transactionService.deleteTransaction(id);
        return ResponseEntity.noContent().build();
    }

    private TransactionDTO convertToDTO(Transaction transaction) {
        return new TransactionDTO(
                transaction.getId(),
                transaction.getTransactionDate(),
                transaction.getAmount(),
                transaction.getStatus(),
                transaction.getProductListing().getId(),
                transaction.getUser().getId());
    }

    private Transaction convertToEntity(TransactionDTO transactionDTO) {
        User user = userService.getUserById(transactionDTO.getUserId());
        ProductListing productListing = productListingService
                .getProductListingById(transactionDTO.getProductListingId()).orElse(null);

        return new Transaction(
                transactionDTO.getTransactionDate(),
                transactionDTO.getAmount(),
                transactionDTO.getStatus(),
                productListing,
                user);
    }
}