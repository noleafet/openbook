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

import com.leafnote.openbook.dto.BookDTO;
import com.leafnote.openbook.dto.UserBookRequestDTO;
import com.leafnote.openbook.dto.UserBookResponseDTO;
import com.leafnote.openbook.response.ApiResponse;
import com.leafnote.openbook.response.ApiResponseCode;
import com.leafnote.openbook.service.UserBookService;
import com.leafnote.openbook.util.ResponsePayload;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/userbooks")
public class UserBookController {

    private final UserBookService userBookService;

    public UserBookController(UserBookService userBookService) {
        this.userBookService = userBookService;
    }

    @Operation(summary = "GET BOOKS BY USER ID", description = "RETURNS LIST OF BOOKS")
    @GetMapping("/users/{userId}/books")
    public ResponseEntity<ApiResponse<List<BookDTO>>> getAllUserBooks(@PathVariable Long userId) {

        List<BookDTO> books = userBookService.getBooksByUserId(userId);

        ApiResponse<List<BookDTO>> response = ResponsePayload.response(ApiResponseCode.SUCCESS, books);
        return new ResponseEntity<>(response, response.getStatus());
    }

    @Operation(summary = "ADD NEW USERBOOK", description = "RETURNS NEW USERBOOK CREATED")
    @PostMapping
    public ResponseEntity<ApiResponse<UserBookResponseDTO>> addUserBook(@Valid @RequestBody UserBookRequestDTO userBookDTO) {

        UserBookResponseDTO userBookResponseDTO = userBookService.addUserBook(userBookDTO);

        ApiResponse<UserBookResponseDTO> response = ResponsePayload.response(ApiResponseCode.CREATED, userBookResponseDTO);
        return new ResponseEntity<>(response, response.getStatus());
    }

    @Operation(summary = "DELETE A USERBOOK", description = "RETURNS NONE OR ERROR IF USERBOOK ID NOT FOUND")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteUserBook(@PathVariable Long id) {

        userBookService.deleteUserBookById(id);

        ApiResponse<Void> response = ResponsePayload.response(ApiResponseCode.DELETED);
        return new ResponseEntity<>(response, response.getStatus());
    }

}
