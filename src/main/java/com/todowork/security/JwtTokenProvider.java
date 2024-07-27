package com.todowork.security;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTokenProvider {

    // Đọc giá trị của jwt.secret từ tệp cấu hình
    @Value("${jwt.secret}")
    private String secret;

    // Tạo JWT token = tên người dùng (username)
    public String generateToken(String username) {
        return Jwts.builder() // Bắt đầu xây dựng JWT
                .setSubject(username) // Đặt (subject) của JWT là username
                .setIssuedAt(new Date()) // Đặt thời gian phát hành JWT là thời gian hiện tại
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // Đặt thời gian hết hạn là 10 giờ từ thời điểm phát hành (giây)
                .signWith(SignatureAlgorithm.HS256, secret) // Ký JWT bằng thuật toán HS256 và khóa bí mật
                .compact(); // Hoàn thành và trả về JWT dưới dạng chuỗi
    }
    // get UserName
    public String getUserNameFromJWT(String token) {
        return Jwts.parser() // Tạo parser để phân tích JWT
                .setSigningKey(secret) // Đặt secret key để xác minh chữ ký của JWT
                .parseClaimsJws(token) // Phân tích JWT và trả về đối tượng Jws<Claims>
                .getBody() // Lấy phần body chứa các claims
                .getSubject(); // Trả về giá trị  (subject) trong claims, đó là username
    }

    //  xác thực JWT token
    public boolean validateToken(String token) {
        try {
            Jwts.parser() // Tạo parser để phân tích JWT
                    .setSigningKey(secret) // Đặt secret key để xác minh chữ ký của JWT
                    .parseClaimsJws(token); // Phân tích JWT và xác minh tính hợp lệ của nó
            return true; // JWT hợp lệ
        } catch (JwtException | IllegalArgumentException e) {
            return false; // Nếu có ngoại lệ, JWT không hợp lệ
        }
    }
}
