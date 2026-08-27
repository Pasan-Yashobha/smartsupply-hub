package com.smartsupply.inventory.controller;

import com.smartsupply.inventory.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final JwtUtil jwtUtil;

    @PostMapping("/token")
    public ResponseEntity<Map<String, String>> getToken(
            @RequestBody Map<String, String> credentials) {

        String username = credentials.get("username");
        String password = credentials.get("password");

        if ("admin".equals(username) && "smartsupply123".equals(password)) {
            String token = jwtUtil.generateToken(username);
            log.info("Token generated for user: {}", username);
            return ResponseEntity.ok(Map.of("token", token));
        }

        log.warn("Invalid login attempt for username: {}", username);
        return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
    }
}