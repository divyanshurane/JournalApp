package com.spring.journalApp;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("Test")
public class Test {

    @GetMapping
    public String hello(){
        return "Ok";
    }
}
