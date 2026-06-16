package com.leafnote.openbook.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.leafnote.openbook.dto.BookmarkRequestDTO;
import com.leafnote.openbook.dto.BookmarkResponseDTO;
import com.leafnote.openbook.response.ApiResponse;
import com.leafnote.openbook.response.ApiResponseCode;
import com.leafnote.openbook.service.BookmarkService;
import com.leafnote.openbook.util.ResponsePayload;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/bookmarks")
public class BookmarkController {

    private final BookmarkService bookmarkService;

    public BookmarkController(BookmarkService bookmarkService) {
        this.bookmarkService = bookmarkService;
    }

    @Operation(summary = "GET ALL BOOKMARKS", description = "RETURNS LIST OF BOOKMARKS")
    @GetMapping
    public ResponseEntity<ApiResponse<List<BookmarkResponseDTO>>> getAllBookmarks() {

        List<BookmarkResponseDTO> bookmark = bookmarkService.getAllBookmarks();

        ApiResponse<List<BookmarkResponseDTO>> response = ResponsePayload.response(ApiResponseCode.SUCCESS, bookmark);
        return new ResponseEntity<>(response, response.getStatus());
    }

    @Operation(summary = "ADD NEW BOOKMARK", description = "RETURNS NEW BOOKMARK CREATED")
    @PostMapping
    public ResponseEntity<ApiResponse<BookmarkResponseDTO>> addBookmark(@Valid @RequestBody BookmarkRequestDTO bookmarkDTO) {

        BookmarkResponseDTO bookmarkResponseDTO = bookmarkService.addBookmark(bookmarkDTO);

        ApiResponse<BookmarkResponseDTO> response = ResponsePayload.response(ApiResponseCode.CREATED, bookmarkResponseDTO);
        return new ResponseEntity<>(response, response.getStatus());
    }

    @Operation(summary = "DELETE A BOOKMARK", description = "RETURNS NONE OR ERROR IF BOOKMARK ID NOT FOUND")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteBookmark(@PathVariable Long id) {

        bookmarkService.deleteBookmarkById(id);

        ApiResponse<Void> response = ResponsePayload.response(ApiResponseCode.DELETED);
        return new ResponseEntity<>(response, response.getStatus());
    }

}
