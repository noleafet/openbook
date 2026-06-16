package com.leafnote.openbook.response;

import org.springframework.http.HttpStatus;

import lombok.Builder;
import lombok.Data;
import lombok.extern.java.Log;

@Data
@Builder
@Log
public class ApiResponse<T> {
    private HttpStatus status;
    private String message;
    private T data;

    public static class ApiResponseBuilder<T> {
        // Manually override the setter to ignore nulls
        public ApiResponseBuilder<T> data(T data) {
            if (data != null) {
                this.data = data;
            }
            return this;
        }
    }

}
