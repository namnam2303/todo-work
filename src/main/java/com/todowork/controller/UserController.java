package com.todowork.controller;

import com.todowork.domain.User;
import com.todowork.security.JwtResponse;
import com.todowork.security.JwtTokenProvider;
import com.todowork.services.CustomUserDetailsService;
import com.todowork.services.MapValidationErrorService;
import com.todowork.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class UserController {
    private final CustomUserDetailsService userDetailsService;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final MapValidationErrorService mapValidationErrorService;

    @Autowired
    public UserController(CustomUserDetailsService userDetailsService,
                          JwtTokenProvider jwtTokenProvider, UserService userService, PasswordEncoder passwordEncoder, MapValidationErrorService mapValidationErrorService) {
        this.userDetailsService = userDetailsService;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userService = userService;
        this.mapValidationErrorService = mapValidationErrorService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@Valid  @RequestBody User user, BindingResult result) throws Exception {
        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationError(result);
        if (errorMap != null) return errorMap;
        System.out.println("Received login request: " + user);

        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());
        if (!passwordEncoder.matches(user.getPassword(), userDetails.getPassword())) {
            throw new Exception("INVALID_CREDENTIALS");
        }

        // Xác thực thành công, tạo JWT
        String jwt = jwtTokenProvider.generateToken(userDetails.getUsername());

        System.out.println("Login successful, generated JWT: " + jwt);
        JwtResponse jwtResponse = new JwtResponse(jwt, user.getUsername());
        return ResponseEntity.ok(jwtResponse);

    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationError(result);
        if (errorMap != null) return errorMap;
        userService.saveUser(user);
        return ResponseEntity.ok("User registered successfully");
    }
}
