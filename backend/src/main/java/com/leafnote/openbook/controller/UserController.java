package com.leafnote.openbook.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.leafnote.openbook.dto.AuthRequest;
import com.leafnote.openbook.dto.AuthResponse;
import com.leafnote.openbook.dto.UserDTO;
import com.leafnote.openbook.exception.ResourceNotFoundException;
import com.leafnote.openbook.response.ApiResponse;
import com.leafnote.openbook.response.ApiResponseCode;
import com.leafnote.openbook.service.JwtService;
import com.leafnote.openbook.service.UserService;
import com.leafnote.openbook.util.ResponsePayload;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    private JwtService jwtService;

    private AuthenticationManager authenticationManager;

    public UserController(UserService userService, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    @Operation(summary = "GET ALL USERS", description = "RETURNS LIST OF USERS")
    @GetMapping
    public ResponseEntity<ApiResponse<List<UserDTO>>> getAllUsers() {

        List<UserDTO> user = userService.getAllUsers();

        ApiResponse<List<UserDTO>> response = ResponsePayload.response(ApiResponseCode.SUCCESS, user);
        return new ResponseEntity<>(response, response.getStatus());
    }

    @Operation(summary = "FIND A USER BY ID", description = "RETURNS A USER")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserDTO>> getUserById(@PathVariable Long id) {

        UserDTO userDTO = userService.getUserById(id);

        ApiResponse<UserDTO> response = ResponsePayload.response(ApiResponseCode.SUCCESS, userDTO);
        return new ResponseEntity<>(response, response.getStatus());

    }

    @Operation(summary = "FIND A USER BY USERNAME", description = "RETURNS A USER")
    public ResponseEntity<ApiResponse<UserDTO>> getUserByUsername(@RequestParam String username) {

        UserDTO userDTO = userService.getUserByUsername(username);

        ApiResponse<UserDTO> response = ResponsePayload.response(ApiResponseCode.SUCCESS, userDTO);
        return new ResponseEntity<>(response, response.getStatus());

    }

    @Operation(summary = "ADD NEW USER", description = "RETURNS NEW USER CREATED")
    @PostMapping
    public ResponseEntity<ApiResponse<UserDTO>> addUser(@Valid @RequestBody UserDTO userDTO) {

        userDTO = userService.addUser(userDTO);

        ApiResponse<UserDTO> response = ResponsePayload.response(ApiResponseCode.CREATED, userDTO);
        return new ResponseEntity<>(response, response.getStatus());
    }

    @Operation(summary = "UPDATE A USER", description = "RETURNS THE UPDATED USER")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<UserDTO>> updateUser(@PathVariable Long id, @Valid @RequestBody UserDTO userDTO) {

        userDTO = userService.updateUser(id, userDTO);

        ApiResponse<UserDTO> response = ResponsePayload.response(ApiResponseCode.SUCCESS, userDTO);
        return new ResponseEntity<>(response, response.getStatus());
    }

    // this should be disable user instead - phase 3
    @Operation(summary = "DELETE A USER", description = "RETURNS NONE OR ERROR IF USER ID NOT FOUND")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable Long id) {

        userService.deleteUserById(id);

        ApiResponse<Void> response = ResponsePayload.response(ApiResponseCode.DELETED);
        return new ResponseEntity<>(response, response.getStatus());
    }

    @Operation(summary = "AUTHENTICATE USER CREDENTIALS", description = "RETURNS TOKEN AND USER OR ERROR IF USERNAME NOT FOUND")
    @PostMapping("/authenticate")
    public ResponseEntity<ApiResponse<AuthResponse>> authenticateAndGetToken(@RequestBody AuthRequest authRequest) {

        ApiResponse<AuthResponse> response = null;
        try {
            UserDTO userDTO = userService.getUserByUsername(authRequest.username());
            
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.username(), authRequest.password()));

            if (authentication.isAuthenticated()) {
                String token = jwtService.generateToken(authRequest.username());

                response = ResponsePayload.response(ApiResponseCode.SUCCESS, new AuthResponse(token, userDTO));
                return new ResponseEntity<>(response, response.getStatus());
            } else {
                response = ResponsePayload.response(ApiResponseCode.AUTH_FAILED_USER_NOT_FOUND);
            }
        } catch (BadCredentialsException bce) {
            response = ResponsePayload.response(ApiResponseCode.AUTH_FAILED_BAD_CREDENTIALS);
        } catch (ResourceNotFoundException rne){
            response = ResponsePayload.response(ApiResponseCode.AUTH_FAILED_USER_NOT_FOUND);
        }

        return new ResponseEntity<>(response, response.getStatus());
    }

}
