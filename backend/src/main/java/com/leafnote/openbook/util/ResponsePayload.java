package com.leafnote.openbook.util;

import com.leafnote.openbook.response.ApiResponse;
import com.leafnote.openbook.response.ApiResponseCode;

public class ResponsePayload {

    public static <T> ApiResponse<T> response(ApiResponseCode code) {

        return response(code, null, null);
    }

    public static <T> ApiResponse<T> response(ApiResponseCode code, T data) {

        return response(code, data, null);
    }

    public static <T> ApiResponse<T> response(ApiResponseCode code, T data, String message) {

        return ApiResponse.<T>builder()
                .status(code.getStatus())
                .message(code.getMessage())
                .data(data)
                .build();
    }

}
