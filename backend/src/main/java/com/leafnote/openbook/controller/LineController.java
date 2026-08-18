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

import com.leafnote.openbook.dto.LineRequestDTO;
import com.leafnote.openbook.dto.LineResponseDTO;
import com.leafnote.openbook.response.ApiResponse;
import com.leafnote.openbook.response.ApiResponseCode;
import com.leafnote.openbook.service.LineService;
import com.leafnote.openbook.util.ResponsePayload;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/lines")
public class LineController {

    private final LineService lineService;

    public LineController(LineService lineService) {
        this.lineService = lineService;
    }

    @Operation(summary = "GET ALL LINES", description = "RETURNS LIST OF LINES")
    @GetMapping
    public ResponseEntity<ApiResponse<List<LineResponseDTO>>> getAllLines() {

        List<LineResponseDTO> line = lineService.getAllLines();

        ApiResponse<List<LineResponseDTO>> response = ResponsePayload.response(ApiResponseCode.SUCCESS, line);
        return new ResponseEntity<>(response, response.getStatus());
    }

    @Operation(summary = "ADD NEW LINE", description = "RETURNS NEW LINE CREATED")
    @PostMapping
    public ResponseEntity<ApiResponse<LineResponseDTO>> addLine(@Valid @RequestBody LineRequestDTO lineRequestDTO) {
        LineResponseDTO lineResponseDTO = lineService.addLine(lineRequestDTO);

        ApiResponse<LineResponseDTO> response = ResponsePayload.response(ApiResponseCode.CREATED, lineResponseDTO);
        return new ResponseEntity<>(response, response.getStatus());
    }


    @Operation(summary = "FIND A LINE", description = "RETURNS A LINE BY ID")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<LineResponseDTO>> getLineById(@PathVariable Long id) {

        LineResponseDTO lineDTO = lineService.getLineById(id);

        ApiResponse<LineResponseDTO> response = ResponsePayload.response(ApiResponseCode.SUCCESS, lineDTO);
        return new ResponseEntity<>(response, response.getStatus());

    }

    @Operation(summary = "UPDATE A LINE", description = "RETURNS THE UPDATED LINE")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<LineResponseDTO>> updateLine(@PathVariable Long id, @RequestBody LineRequestDTO lineRequestDTO) {

       LineResponseDTO lineResponseDTO = lineService.updateLine(id, lineRequestDTO);

        ApiResponse<LineResponseDTO> response = ResponsePayload.response(ApiResponseCode.SUCCESS, lineResponseDTO);
        return new ResponseEntity<>(response, response.getStatus());
    }

    @Operation(summary = "DELETE A LINE", description = "RETURNS NONE OR ERROR IF LINE ID NOT FOUND")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteLine(@PathVariable Long id) {

        lineService.deleteLineById(id);

        ApiResponse<Void> response = ResponsePayload.response(ApiResponseCode.DELETED);
        return new ResponseEntity<>(response, response.getStatus());
    }

}
