package com.spring.journalApp.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.*;

@SpringBootTest
public class EmailServiceTest {

    @Autowired
    private EmailService emailService;

    @Test
    void testSendMail(){
        emailService.sendEmail("sawant.shubhangi1@gmail.com",
                "Testing java mail sender functionality",
                "ANOTHER ONE - Its time to sleep Shut Down your Phone" +
                        "https://as1.ftcdn.net/v2/jpg/09/75/01/82/1000_F_975018282_RzCAUYXlF92WWpPdKUoJc8jgrIEQ1iGr.jpg");
    }



}
