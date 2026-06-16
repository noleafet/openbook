package com.leafnote.openbook.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.leafnote.openbook.model.Book;

public interface BookRepository extends JpaRepository<Book, Long> {
}
