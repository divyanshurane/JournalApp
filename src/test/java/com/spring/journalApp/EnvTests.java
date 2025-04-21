package com.spring.journalApp;

import jakarta.annotation.PostConstruct;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class EnvTests {


    @Value("${DEV_TYPE}")
    private String devtype;

    @Test
    @PostConstruct
    public void testEnv(){
        System.out.println(devtype);
    }
}
