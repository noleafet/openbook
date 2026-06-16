package com.leafnote.openbook.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.leafnote.openbook.response.ApiResponse;
import com.leafnote.openbook.response.ApiResponseCode;
import com.leafnote.openbook.util.ResponsePayload;

import lombok.extern.java.Log;

@Log
@RestControllerAdvice
public class GlobalExceptionHandler {

    // Handle specific custom exception
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleNotFound(ResourceNotFoundException ex) {
        ApiResponseCode code = switch (ex.getResourceName()) {
            case "Book" -> ApiResponseCode.BOOK_NOT_FOUND;
            case "Chapter" -> ApiResponseCode.CHAPTER_NOT_FOUND;
            case "Page" -> ApiResponseCode.PAGE_NOT_FOUND;
            case "Line" -> ApiResponseCode.LINE_NOT_FOUND;
            default -> ApiResponseCode.ERROR;
        };
        ApiResponse<Void> response = ResponsePayload.response(code);
        return new ResponseEntity<>(response, response.getStatus());
    }

    // Handle validator errors
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Void>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        ApiResponse<Void> response = ResponsePayload.response(ApiResponseCode.BAD_REQUEST);
        // Display first validation failure
        response.setMessage(String.format("%s %s.", 
            response.getMessage(), 
            ex.getBindingResult().getAllErrors().get(0).getDefaultMessage()));
        return new ResponseEntity<>(response, response.getStatus());
    }

    // Handle generic exceptions
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleGlobalException(Exception ex) {
        ApiResponse<Void> response = ResponsePayload.response(ApiResponseCode.ERROR);
        return new ResponseEntity<>(response, response.getStatus());
    }
}