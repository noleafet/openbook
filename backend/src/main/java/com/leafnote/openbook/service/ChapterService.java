package com.leafnote.openbook.service;

import java.util.List;

import com.leafnote.openbook.dto.ChapterRequestDTO;
import com.leafnote.openbook.dto.ChapterResponseDTO;

public interface ChapterService {

    public ChapterResponseDTO addChapter(ChapterRequestDTO chapterDTO);

    public ChapterResponseDTO getChapterById(Long id);

    public ChapterResponseDTO updateChapter(Long id, ChapterRequestDTO chapterDTO);
    
    public void deleteChapterById(Long id);

    public List<ChapterResponseDTO> getAllChapters();

}
