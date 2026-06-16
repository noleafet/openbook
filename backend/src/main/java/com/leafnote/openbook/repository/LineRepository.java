package com.leafnote.openbook.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.leafnote.openbook.model.Line;

public interface LineRepository extends JpaRepository<Line, Long> {

        List<Line> findAllByContentContaining(String content);
}
