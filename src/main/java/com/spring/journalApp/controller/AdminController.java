package com.spring.journalApp.controller;

import com.spring.journalApp.cache.AppCache;
import com.spring.journalApp.entity.User;
import com.spring.journalApp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AppCache appCache;

    @Autowired
    private UserService userService;

    @GetMapping("/get-all")
    public ResponseEntity<?> getallUsers(){
        List<User> all = userService.getAll();
        if(!all.isEmpty() && all!=null){
            return new ResponseEntity<>(all,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/create-admin-user")
    public User createAdminUser(@RequestBody User user){
        user.setDate(LocalDateTime.now());
        userService.saveAdmin(user);
        return user;
    }

    @GetMapping("clear-app-cache")
    public void clearAppCache(){
        appCache.init();
    }

}
