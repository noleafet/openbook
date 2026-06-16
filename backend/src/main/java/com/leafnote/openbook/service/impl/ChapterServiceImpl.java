package com.leafnote.openbook.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.leafnote.openbook.dto.ChapterRequestDTO;
import com.leafnote.openbook.dto.ChapterResponseDTO;
import com.leafnote.openbook.exception.ResourceNotFoundException;
import com.leafnote.openbook.mapper.ChapterMapper;
import com.leafnote.openbook.model.Chapter;
import com.leafnote.openbook.repository.ChapterRepository;
import com.leafnote.openbook.service.ChapterService;

import jakarta.transaction.Transactional;

@Service
public class ChapterServiceImpl implements ChapterService {

    private final ChapterRepository chapterRepository;

    private final ChapterMapper chapterMapper;

    public ChapterServiceImpl(ChapterRepository chapterRepository, ChapterMapper chapterMapper) {
        this.chapterRepository = chapterRepository;
        this.chapterMapper = chapterMapper;
    }

    @Override
    public List<ChapterResponseDTO> getAllChapters() {

        return chapterRepository.findAll().stream()
                .map(chapterMapper::toDTO)
                .collect(Collectors.toList());

    }

    @Override
    public ChapterResponseDTO addChapter(ChapterRequestDTO chapterRequestDTO) {
        Chapter savedChapter = chapterRepository.save(chapterMapper.toEntity(chapterRequestDTO));
        return chapterMapper.toDTO(savedChapter);
    }

    @Override
    public ChapterResponseDTO getChapterById(Long id) {
        return chapterMapper.toDTO(chapterRepository.findById(id)
                .orElseThrow((() -> new ResourceNotFoundException(Chapter.class, "id", id))));
    }

    @Override
    public ChapterResponseDTO updateChapter(Long id, ChapterRequestDTO chapterRequestDTO) {

        Chapter existingChapter = chapterRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(Chapter.class, "id", id));

        existingChapter.setTitle(chapterRequestDTO.title());

        chapterRepository.save(existingChapter);

        return chapterMapper.toDTO(existingChapter);

    }

    @Transactional
    @Override
    public void deleteChapterById(Long id) {
        chapterRepository.deleteById(id);
    }

}
