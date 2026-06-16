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

import com.leafnote.openbook.dto.PageRequestDTO;
import com.leafnote.openbook.dto.PageResponseDTO;
import com.leafnote.openbook.response.ApiResponse;
import com.leafnote.openbook.response.ApiResponseCode;
import com.leafnote.openbook.service.PageService;
import com.leafnote.openbook.util.ResponsePayload;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/pages")
public class PageController {

    private final PageService pageService;

    public PageController(PageService pageService) {
        this.pageService = pageService;
    }

    @Operation(summary = "GET ALL PAGES", description = "RETURNS LIST OF PAGES")
    @GetMapping
    public ResponseEntity<ApiResponse<List<PageResponseDTO>>> getAllPages() {

        List<PageResponseDTO> page = pageService.getAllPages();

        ApiResponse<List<PageResponseDTO>> response = ResponsePayload.response(ApiResponseCode.SUCCESS, page);
        return new ResponseEntity<>(response, response.getStatus());
    }

    @Operation(summary = "ADD NEW PAGE", description = "RETURNS NEW PAGE CREATED")
    @PostMapping
    public ResponseEntity<ApiResponse<PageResponseDTO>> addPage(@Valid @RequestBody PageRequestDTO pageRequestDTO) {

        PageResponseDTO pageResponseDTO = pageService.addPage(pageRequestDTO);

        ApiResponse<PageResponseDTO> response = ResponsePayload.response(ApiResponseCode.CREATED, pageResponseDTO);
        return new ResponseEntity<>(response, response.getStatus());
    }


    @Operation(summary = "FIND A PAGE", description = "RETURNS A PAGE BY ID")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PageResponseDTO>> getPageById(@PathVariable Long id) {

        PageResponseDTO pageDTO = pageService.getPageById(id);

        ApiResponse<PageResponseDTO> response = ResponsePayload.response(ApiResponseCode.SUCCESS, pageDTO);
        return new ResponseEntity<>(response, response.getStatus());

    }

    @Operation(summary = "UPDATE A PAGE", description = "RETURNS THE UPDATED PAGE")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<PageResponseDTO>> updatePage(@PathVariable Long id, @Valid @RequestBody PageRequestDTO pageRequestDTO) {

       PageResponseDTO pageResponseDTO = pageService.updatePage(id, pageRequestDTO);

        ApiResponse<PageResponseDTO> response = ResponsePayload.response(ApiResponseCode.SUCCESS, pageResponseDTO);
        return new ResponseEntity<>(response, response.getStatus());
    }

    @Operation(summary = "DELETE A PAGE", description = "RETURNS NONE OR ERROR IF PAGE ID NOT FOUND")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deletePage(@PathVariable Long id) {

        pageService.deletePageById(id);

        ApiResponse<Void> response = ResponsePayload.response(ApiResponseCode.DELETED);
        return new ResponseEntity<>(response, response.getStatus());
    }

}
