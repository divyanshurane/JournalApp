package com.spring.journalApp.controller;

import com.spring.journalApp.dto.UserDTO;
import com.spring.journalApp.entity.User;
import com.spring.journalApp.service.UserDetailsServiceImpl;
import com.spring.journalApp.service.UserService;
import com.spring.journalApp.util.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/public")
@Slf4j
public class Public {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/healthcheck")
    public String healthCheck(){
        return "Ok";
    }

    @PostMapping("/signup")
    public ResponseEntity<?> createUser(@RequestBody UserDTO user){
        try {
            User newUser = new User();
            newUser.setEmail(user.getEmail());
            newUser.setUsername(user.getUsername());
            newUser.setPassword(user.getPassword());
            newUser.setSentimentAnalysis(user.isSentimentAnalysis());
            boolean saved = userService.saveNewUser(newUser);
            if (saved) {
                return ResponseEntity.ok().body("User created successfully");
            } else {
                return ResponseEntity.badRequest().body("Failed to create user");
            }
        } catch (Exception e) {
            log.error("Error creating user", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("An error occurred while creating the user");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserDTO user){
        try{
            log.info("Attempting login for user: {}", user.getUsername());
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(),user.getPassword()));
            UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());
            String jwt = jwtUtil.generateToken(userDetails.getUsername());
            log.info("Login successful for user: {}", user.getUsername());
            return new ResponseEntity<>(jwt, HttpStatus.OK);
        }catch (Exception e){
            log.error("Login failed for user: {}. Error: {}", user.getUsername(), e.getMessage());
            return new ResponseEntity<>("Incorrect username or password",HttpStatus.BAD_REQUEST);
        }
    }


}
