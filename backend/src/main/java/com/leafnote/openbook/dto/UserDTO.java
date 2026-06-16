package com.leafnote.openbook.dto;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.leafnote.openbook.model.Role;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UserDTO(
        @JsonProperty(access = JsonProperty.Access.READ_ONLY) Long id,
        @NotBlank(message = "Name is required") 
        String name,
        @NotBlank(message = "Email is required") 
        @Email(message = "Please provide a valid email address", 
                regexp = "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^-]+(?:\\.[a-zA-Z0-9_!#$%&'*+/=?`{|}~^-]+)*@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$") 
        String email,
        @NotBlank(message = "Username is required") 
        String username,
        @JsonProperty(access = JsonProperty.Access.WRITE_ONLY) 
        @NotBlank(message = "Password is required") 
        String password,
        Set<Role> roles
) {}
