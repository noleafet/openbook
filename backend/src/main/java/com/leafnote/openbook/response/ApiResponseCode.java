package com.leafnote.openbook.response;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public enum ApiResponseCode {

    BOOK_NOT_FOUND(HttpStatus.OK, "Book not found"),
    CHAPTER_NOT_FOUND(HttpStatus.OK, "Chapter not found"),
    PAGE_NOT_FOUND(HttpStatus.OK, "Page not found"),
    LINE_NOT_FOUND(HttpStatus.OK, "Line not found"),

    SUCCESS(HttpStatus.OK, "success"),
    CREATED(HttpStatus.CREATED, "success"),
    DELETED(HttpStatus.NO_CONTENT, "success"),
    ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "error"),
    BAD_REQUEST(HttpStatus.BAD_REQUEST, "Please check your inputs."),

    AUTH_FAILED_USER_NOT_FOUND(HttpStatus.UNAUTHORIZED, "User not found"),
    AUTH_FAILED_BAD_CREDENTIALS(HttpStatus.UNAUTHORIZED, "Invalid username or password");


    private HttpStatus status;
    private String message;

    ApiResponseCode(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }

}
