package com.leafnote.openbook.dto;

public record AuthRequest (
    String username, 
    String password
) {}