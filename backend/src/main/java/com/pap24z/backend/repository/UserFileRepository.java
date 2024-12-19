package com.pap24z.backend.repository;

import com.pap24z.backend.model.UserFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserFileRepository extends JpaRepository<UserFile, Long> {
    List<UserFile> findByUserId(Long userId);
}