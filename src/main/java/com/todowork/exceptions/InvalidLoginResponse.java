package com.todowork.exceptions;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class InvalidLoginResponse {
    private String username;
    private String password;

    public InvalidLoginResponse() {
        this.username = "Invalid Username";
        this.password = "Invalid Password";
    }

}