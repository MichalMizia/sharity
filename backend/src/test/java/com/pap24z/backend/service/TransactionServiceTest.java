package com.pap24z.backend.service;

import com.pap24z.backend.model.Transaction;
import com.pap24z.backend.repository.TransactionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TransactionServiceTest {

    @Mock
    private TransactionRepository transactionRepository;

    @InjectMocks
    private TransactionService transactionService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllTransactions() {
        List<Transaction> transactions = new ArrayList<>();
        transactions.add(new Transaction());
        transactions.add(new Transaction());
        when(transactionRepository.findAll()).thenReturn(transactions);

        List<Transaction> result = transactionService.getAllTransactions();
        assertNotNull(result);
        assertEquals(2, result.size());
        verify(transactionRepository, times(1)).findAll();
    }

    @Test
    void testGetTransactionById() {
        Transaction transaction = new Transaction();
        when(transactionRepository.findById(1L)).thenReturn(Optional.of(transaction));

        Optional<Transaction> result = transactionService.getTransactionById(1L);
        assertTrue(result.isPresent());
        assertEquals(transaction, result.get());
        verify(transactionRepository, times(1)).findById(1L);
    }

    @Test
    void testGetTransactionByIdNotFound() {
        when(transactionRepository.findById(1L)).thenReturn(Optional.empty());

        Optional<Transaction> result = transactionService.getTransactionById(1L);
        assertFalse(result.isPresent());
        verify(transactionRepository, times(1)).findById(1L);
    }

    @Test
    void testGetTransactionsByUserId() {
        List<Transaction> transactions = new ArrayList<>();
        transactions.add(new Transaction());
        when(transactionRepository.findByUserId(1L)).thenReturn(transactions);

        List<Transaction> result = transactionService.getTransactionsByUserId(1L);
        assertNotNull(result);
        assertEquals(1, result.size());
        verify(transactionRepository, times(1)).findByUserId(1L);
    }

    @Test
    void testSaveTransaction() {
        Transaction transaction = new Transaction();
        when(transactionRepository.save(transaction)).thenReturn(transaction);

        Transaction result = transactionService.saveTransaction(transaction);
        assertNotNull(result);
        assertEquals(transaction, result);
        verify(transactionRepository, times(1)).save(transaction);
    }

    @Test
    void testDeleteTransaction() {
        transactionService.deleteTransaction(1L);
        verify(transactionRepository, times(1)).deleteById(1L);
    }
}
