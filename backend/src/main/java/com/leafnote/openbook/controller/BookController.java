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

import com.leafnote.openbook.dto.BookDTO;
import com.leafnote.openbook.response.ApiResponse;
import com.leafnote.openbook.response.ApiResponseCode;
import com.leafnote.openbook.service.BookService;
import com.leafnote.openbook.util.ResponsePayload;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @Operation(summary = "GET ALL BOOKS", description = "RETURNS LIST OF BOOKS")
    @GetMapping
    public ResponseEntity<ApiResponse<List<BookDTO>>> getAllBooks() {

        List<BookDTO> book = bookService.getAllBooks();

        ApiResponse<List<BookDTO>> response = ResponsePayload.response(ApiResponseCode.SUCCESS, book);
        return new ResponseEntity<>(response, response.getStatus());
    }

    @Operation(summary = "FIND A BOOK", description = "RETURNS A BOOK BY ID")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<BookDTO>> getBookById(@PathVariable Long id) {

        BookDTO bookDTO = bookService.getBookById(id);

        ApiResponse<BookDTO> response = ResponsePayload.response(ApiResponseCode.SUCCESS, bookDTO);
        return new ResponseEntity<>(response, response.getStatus());

    }

    @Operation(summary = "ADD NEW BOOK", description = "RETURNS NEW BOOK CREATED")
    @PostMapping
    public ResponseEntity<ApiResponse<BookDTO>> addBook(@Valid @RequestBody BookDTO bookDTO) {

        bookDTO = bookService.addBook(bookDTO);

        ApiResponse<BookDTO> response = ResponsePayload.response(ApiResponseCode.CREATED, bookDTO);
        return new ResponseEntity<>(response, response.getStatus());
    }

    @Operation(summary = "UPDATE A BOOK", description = "RETURNS THE UPDATED BOOK")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<BookDTO>> updateBook(@PathVariable Long id, @Valid @RequestBody BookDTO bookDTO) {

        bookDTO = bookService.updateBook(id, bookDTO);

        ApiResponse<BookDTO> response = ResponsePayload.response(ApiResponseCode.SUCCESS, bookDTO);
        return new ResponseEntity<>(response, response.getStatus());
    }

    @Operation(summary = "DELETE A BOOK", description = "RETURNS NONE OR ERROR IF BOOK ID NOT FOUND")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteBook(@PathVariable Long id) {

        bookService.deleteBookById(id);

        ApiResponse<Void> response = ResponsePayload.response(ApiResponseCode.DELETED);
        return new ResponseEntity<>(response, response.getStatus());
    }

}
