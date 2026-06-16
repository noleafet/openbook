package com.leafnote.openbook.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.leafnote.openbook.model.Book;
import com.leafnote.openbook.model.UserBook;


public interface UserBookRepository extends JpaRepository<UserBook, Long> {

    List<Book> findBooksByUser_Id(Long userId);
}
