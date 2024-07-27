package com.todowork.model;

import lombok.AllArgsConstructor;
import lombok.Getter;


// Jwt trả lại phía client

@Getter
public class JwtResponse {
    private final String jwtToken;

    public JwtResponse(String jwtToken) {
        this.jwtToken = jwtToken;
    }

}
