package com.leafnote.openbook.dto;

public record AuthResponse (
    String token,
    UserDTO user
) {}
