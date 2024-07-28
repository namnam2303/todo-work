package com.todowork.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


// Jwt trả lại phía client

@Setter
@Getter
public class JwtResponse {
    private  String jwtToken;

    public JwtResponse(String jwtToken) {
        this.jwtToken = jwtToken;
    }

}
