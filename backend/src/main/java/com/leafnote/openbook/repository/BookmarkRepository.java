package com.leafnote.openbook.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.leafnote.openbook.model.Bookmark;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
}
