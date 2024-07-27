package com.todowork.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
// Nhận thông tin đăng nhập từ người dùng
public class JwtRequest {
    private String userName;
    private String password;
}
