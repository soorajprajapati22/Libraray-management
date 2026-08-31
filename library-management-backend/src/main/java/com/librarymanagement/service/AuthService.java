package com.librarymanagement.service;

import com.librarymanagement.dto.req.LoginRequest;
import com.librarymanagement.dto.req.RegisterRequest;
import com.librarymanagement.dto.resp.AuthResponse;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);
}
