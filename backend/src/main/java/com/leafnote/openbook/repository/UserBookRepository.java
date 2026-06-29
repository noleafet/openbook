package com.leafnote.openbook.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.leafnote.openbook.model.UserBook;


public interface UserBookRepository extends JpaRepository<UserBook, Long> {

    List<UserBook> findByUser_Id(Long userId);
}
