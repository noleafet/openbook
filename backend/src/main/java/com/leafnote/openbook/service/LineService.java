package com.leafnote.openbook.service;

import java.util.List;

import com.leafnote.openbook.dto.LineRequestDTO;
import com.leafnote.openbook.dto.LineResponseDTO;

public interface LineService {

    public LineResponseDTO addLine(LineRequestDTO lineDTO);

    public LineResponseDTO getLineById(Long id);

    public LineResponseDTO updateLine(Long id, LineRequestDTO lineDTO);
    
    public void deleteLineById(Long id);

    public List<LineResponseDTO> getAllLines();

}
