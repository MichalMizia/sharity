package com.pap24z.backend.service;

import com.pap24z.backend.model.UserFile;
import com.pap24z.backend.repository.UserFileRepository;
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

class UserFileServiceTest {

    @Mock
    private UserFileRepository userFileRepository;

    @InjectMocks
    private UserFileService userFileService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllUserFiles() {
        List<UserFile> userFiles = new ArrayList<>();
        userFiles.add(new UserFile());
        userFiles.add(new UserFile());
        when(userFileRepository.findAll()).thenReturn(userFiles);

        List<UserFile> result = userFileService.getAllUserFiles();
        assertNotNull(result);
        assertEquals(2, result.size());
        verify(userFileRepository, times(1)).findAll();
    }

    @Test
    void testGetUserFileByIdNotFound() {
        when(userFileRepository.findById(1L)).thenReturn(Optional.empty());

        Optional<UserFile> result = userFileService.getUserFileById(1L);
        assertFalse(result.isPresent());
        verify(userFileRepository, times(1)).findById(1L);
    }

    @Test
    void testGetUserFilesByUserId() {
        List<UserFile> userFiles = new ArrayList<>();
        userFiles.add(new UserFile());
        when(userFileRepository.findByUserId(1L)).thenReturn(userFiles);

        List<UserFile> result = userFileService.getUserFilesByUserId(1L);
        assertNotNull(result);
        assertEquals(1, result.size());
        verify(userFileRepository, times(1)).findByUserId(1L);
    }

    @Test
    void testSaveUserFile() {
        UserFile userFile = new UserFile();
        when(userFileRepository.save(userFile)).thenReturn(userFile);

        UserFile result = userFileService.saveUserFile(userFile);
        assertNotNull(result);
        verify(userFileRepository, times(1)).save(userFile);
    }

    @Test
    void testDeleteUserFile() {
        userFileService.deleteUserFile(1L);
        verify(userFileRepository, times(1)).deleteById(1L);
    }
}
