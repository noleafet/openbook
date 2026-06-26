package com.leafnote.openbook.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.leafnote.openbook.dto.LineRequestDTO;
import com.leafnote.openbook.dto.LineResponseDTO;
import com.leafnote.openbook.exception.ResourceNotFoundException;
import com.leafnote.openbook.mapper.LineMapper;
import com.leafnote.openbook.model.Line;
import com.leafnote.openbook.repository.LineRepository;
import com.leafnote.openbook.service.LineService;

import jakarta.transaction.Transactional;

@Service
public class LineServiceImpl implements LineService {

    private final LineRepository lineRepository;

    private final LineMapper lineMapper;

    public LineServiceImpl(LineRepository lineRepository, LineMapper lineMapper) {
        this.lineRepository = lineRepository;
        this.lineMapper = lineMapper;
    }

    @Override
    public List<LineResponseDTO> getAllLines() {

        return lineRepository.findAll().stream()
                .map(lineMapper::toDTO)
                .collect(Collectors.toList());

    }

    @Override
    public LineResponseDTO addLine(LineRequestDTO lineRequestDTO) {
        Line line = lineMapper.toEntity(lineRequestDTO);

        if (lineRequestDTO.pageId() == null) {
            line.setPage(null);
        }

        if (lineRequestDTO.lineId() == null) {
            line.setLine(null);
        }
        
        Line savedLine = lineRepository.save(line);
        return lineMapper.toDTO(savedLine);
    }

    @Override
    public LineResponseDTO getLineById(Long id) {
        return lineMapper.toDTO(lineRepository.findById(id)
                .orElseThrow((() -> new ResourceNotFoundException(Line.class, "id", id))));
    }

    @Override
    public LineResponseDTO updateLine(Long id, LineRequestDTO lineRequestDTO) {

        Line existingLine = lineRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(Line.class, "id", id));

        existingLine.setContent(lineRequestDTO.content());

        lineRepository.save(existingLine);

        return lineMapper.toDTO(existingLine);

    }

    @Transactional
    @Override
    public void deleteLineById(Long id) {
        lineRepository.deleteById(id);
    }

}
