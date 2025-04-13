package com.spring.journalApp.service;

import com.spring.journalApp.entity.User;
import com.spring.journalApp.repository.UserRepository;
import org.junit.jupiter.api.*;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ArgumentsSource;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class UserServiceTests {
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Disabled
    @ParameterizedTest
    @CsvSource({
            "2,1,1",
            "2,11,12"
    })
    public void Prac(int expected ,int a , int b){
        assertEquals(expected , a+b);
    }

    @Disabled
    @ParameterizedTest
    @CsvSource({"ram","shyam","Ghanashyam"})
    public void testFindByUsername(String username){
        assertNotNull(userRepository.findByUsername(username));
    }

    @Disabled
    @Test
    public void testGetAll(){
        assertNotNull(userService.getAll());
    }

}
