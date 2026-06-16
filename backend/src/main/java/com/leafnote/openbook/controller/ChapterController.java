package com.leafnote.openbook.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.leafnote.openbook.dto.ChapterRequestDTO;
import com.leafnote.openbook.dto.ChapterResponseDTO;
import com.leafnote.openbook.response.ApiResponse;
import com.leafnote.openbook.response.ApiResponseCode;
import com.leafnote.openbook.service.ChapterService;
import com.leafnote.openbook.util.ResponsePayload;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/chapters")
public class ChapterController {

    private final ChapterService chapterService;

    public ChapterController(ChapterService chapterService) {
        this.chapterService = chapterService;
    }

    @Operation(summary = "GET ALL CHAPTERS", description = "RETURNS LIST OF CHAPTERS")
    @GetMapping
    public ResponseEntity<ApiResponse<List<ChapterResponseDTO>>> getAllChapters() {

        List<ChapterResponseDTO> chapter = chapterService.getAllChapters();

        ApiResponse<List<ChapterResponseDTO>> response = ResponsePayload.response(ApiResponseCode.SUCCESS, chapter);
        return new ResponseEntity<>(response, response.getStatus());
    }

    @Operation(summary = "ADD NEW CHAPTER", description = "RETURNS NEW CHAPTER CREATED")
    @PostMapping
    public ResponseEntity<ApiResponse<ChapterResponseDTO>> addChapter(@Valid @RequestBody ChapterRequestDTO chapterRequestDTO) {

        ChapterResponseDTO chapterResponseDTO = chapterService.addChapter(chapterRequestDTO);

        ApiResponse<ChapterResponseDTO> response = ResponsePayload.response(ApiResponseCode.CREATED, chapterResponseDTO);
        return new ResponseEntity<>(response, response.getStatus());
    }


    @Operation(summary = "FIND A CHAPTER", description = "RETURNS A CHAPTER BY ID")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ChapterResponseDTO>> getChapterById(@PathVariable Long id) {

        ChapterResponseDTO chapterDTO = chapterService.getChapterById(id);

        ApiResponse<ChapterResponseDTO> response = ResponsePayload.response(ApiResponseCode.SUCCESS, chapterDTO);
        return new ResponseEntity<>(response, response.getStatus());

    }

    @Operation(summary = "UPDATE A CHAPTER", description = "RETURNS THE UPDATED CHAPTER")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ChapterResponseDTO>> updateChapter(@PathVariable Long id, @Valid @RequestBody ChapterRequestDTO chapterRequestDTO) {

       ChapterResponseDTO chapterResponseDTO = chapterService.updateChapter(id, chapterRequestDTO);

        ApiResponse<ChapterResponseDTO> response = ResponsePayload.response(ApiResponseCode.SUCCESS, chapterResponseDTO);
        return new ResponseEntity<>(response, response.getStatus());
    }

    @Operation(summary = "DELETE A CHAPTER", description = "RETURNS NONE OR ERROR IF CHAPTER ID NOT FOUND")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteChapter(@PathVariable Long id) {

        chapterService.deleteChapterById(id);

        ApiResponse<Void> response = ResponsePayload.response(ApiResponseCode.DELETED);
        return new ResponseEntity<>(response, response.getStatus());
    }

}
