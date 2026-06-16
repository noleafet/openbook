package com.leafnote.openbook.service;

import java.util.List;

import com.leafnote.openbook.dto.PageRequestDTO;
import com.leafnote.openbook.dto.PageResponseDTO;

public interface PageService {

    public PageResponseDTO addPage(PageRequestDTO pageDTO);

    public PageResponseDTO getPageById(Long id);

    public PageResponseDTO updatePage(Long id, PageRequestDTO pageDTO);
    
    public void deletePageById(Long id);

    public List<PageResponseDTO> getAllPages();

}
