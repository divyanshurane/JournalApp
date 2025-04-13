package com.spring.journalApp.controller;


import com.spring.journalApp.api.WeatherResponse;
import com.spring.journalApp.entity.User;
import com.spring.journalApp.repository.UserRepository;
import com.spring.journalApp.service.UserService;
import com.spring.journalApp.service.WeatherService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private WeatherService weatherService;

//    @GetMapping
//    public List<User> getAll(){
//        List<User> all = userService.getAll();
//        if(all!=null){
//            return all;
//        }
//        return null;
//    }

    @GetMapping
    public ResponseEntity<?> greeting(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        WeatherResponse weatherResponse = weatherService.getWeather("Mumbai");
        String greeting = "";
        if(weatherResponse!=null){
            greeting = ",Weather feels like "+weatherResponse.getCurrent().getFeelslike();
        }
        return new  ResponseEntity<>("Hi "+authentication.getName() + greeting ,HttpStatus.OK);
    }


//    @GetMapping("/id/{myId}")
//    public Optional<User> findUserById(ObjectId myId){
//        return userService.findById(myId);
//    }

    @PutMapping
    public ResponseEntity<?> updateUserByUsername(@RequestBody User newUser){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        User olduser = userService.findByUsername(username);
        if(olduser!=null){
            olduser.setUsername(newUser.getUsername());
            olduser.setPassword(newUser.getPassword());
            userService.saveNewUser(olduser);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteUserByUsername(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        userRepository.deleteByUsername(username);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
