package com.leafnote.openbook.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.leafnote.openbook.dto.PageRequestDTO;
import com.leafnote.openbook.dto.PageResponseDTO;
import com.leafnote.openbook.exception.ResourceNotFoundException;
import com.leafnote.openbook.mapper.PageMapper;
import com.leafnote.openbook.model.Page;
import com.leafnote.openbook.repository.PageRepository;
import com.leafnote.openbook.service.PageService;

import jakarta.transaction.Transactional;

@Service
public class PageServiceImpl implements PageService {

    private final PageRepository pageRepository;

    private final PageMapper pageMapper;

    public PageServiceImpl(PageRepository pageRepository, PageMapper pageMapper) {
        this.pageRepository = pageRepository;
        this.pageMapper = pageMapper;
    }

    @Override
    public List<PageResponseDTO> getAllPages() {

        return pageRepository.findAll(Sort.by("note")).stream()
                .map(pageMapper::toDTO)
                .collect(Collectors.toList());

    }

    @Override
    public PageResponseDTO addPage(PageRequestDTO pageRequestDTO) {

        Page page = pageMapper.toEntity(pageRequestDTO);

        Long pageNumber = pageRepository.findLatestChapterPageNumber(pageRequestDTO.chapterId())
                .orElse(Long.valueOf(0));
        
                page.setNumber(++pageNumber);

        Page savedPage = pageRepository.save(page);
        

        return pageMapper.toDTO(savedPage);
    }

    @Override
    public PageResponseDTO getPageById(Long id) {
        return pageMapper.toDTO(pageRepository.findById(id)
                .orElseThrow((() -> new ResourceNotFoundException(Page.class, "id", id))));
    }

    @Override
    public PageResponseDTO updatePage(Long id, PageRequestDTO pageRequestDTO) {

        Page existingPage = pageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(Page.class, "id", id));

        existingPage.setNote(pageRequestDTO.note());
        pageRepository.save(existingPage);

        return pageMapper.toDTO(existingPage);

    }

    @Transactional
    @Override
    public void deletePageById(Long id) {
        pageRepository.deleteById(id);
    }

}
