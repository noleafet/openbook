package com.leafnote.openbook.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.leafnote.openbook.model.Page;

public interface PageRepository extends JpaRepository<Page, Long> {

    @Query(value = "SELECT MAX(number) FROM page WHERE chapter_id=:chapterId", nativeQuery = true)
    Optional<Long> findLatestChapterPageNumber(@Param("chapterId") Long chapterId);
}
