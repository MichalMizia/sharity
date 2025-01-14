package com.pap24z.backend.service.storage;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class LocalStorageServiceTest {

    private LocalStorageService localStorageService;

    @Mock
    private MultipartFile mockFile;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        localStorageService = new LocalStorageService();
    }

    @Test
    void testStoreFileSuccess() throws IOException {
        when(mockFile.getSize()).thenReturn(5L * 1024 * 1024); // 5 MB
        when(mockFile.getContentType()).thenReturn("image/png");
        when(mockFile.getOriginalFilename()).thenReturn("example.png");

        File tempFile = File.createTempFile("example", ".png");
        tempFile.deleteOnExit();
        doAnswer(invocation -> {
            File targetFile = invocation.getArgument(0);
            tempFile.renameTo(targetFile);
            return null;
        }).when(mockFile).transferTo(any(File.class));

        String storedFileName = localStorageService.storeFile(mockFile);

        assertNotNull(storedFileName);
        assertTrue(storedFileName.endsWith("example.png"));
        verify(mockFile, times(1)).transferTo(any(File.class));
    }

    @Test
    void testStoreFileExceedsMaxSize() {
        when(mockFile.getSize()).thenReturn(15L * 1024 * 1024); // 15 MB
        when(mockFile.getContentType()).thenReturn("image/png");
        when(mockFile.getOriginalFilename()).thenReturn("example.png");

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            localStorageService.storeFile(mockFile);
        });

        assertEquals("File size exceeds the maximum limit of 10 MB", exception.getMessage());
    }

    @Test
    void testStoreFileNotAllowedType() {
        when(mockFile.getSize()).thenReturn(5L * 1024 * 1024); // 5 MB
        when(mockFile.getContentType()).thenReturn("application/unknown");
        when(mockFile.getOriginalFilename()).thenReturn("example.unknown");

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            localStorageService.storeFile(mockFile);
        });

        assertEquals("File type not allowed", exception.getMessage());
    }

    @Test
    void testStoreFileIOException() throws IOException {
        when(mockFile.getSize()).thenReturn(5L * 1024 * 1024); // 5 MB
        when(mockFile.getContentType()).thenReturn("image/png");
        when(mockFile.getOriginalFilename()).thenReturn("example.png");

        doThrow(new IOException("File transfer failed")).when(mockFile).transferTo(any(File.class));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            localStorageService.storeFile(mockFile);
        });

        assertEquals("Failed to store file", exception.getMessage());
        assertTrue(exception.getCause() instanceof IOException);
    }
}
