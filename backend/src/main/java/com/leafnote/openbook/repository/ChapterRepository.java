package com.leafnote.openbook.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.leafnote.openbook.model.Chapter;

public interface ChapterRepository extends JpaRepository<Chapter, Long> {
}
