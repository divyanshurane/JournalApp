package com.spring.journalApp.service;

import com.spring.journalApp.entity.User;
import com.spring.journalApp.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;


@Service
@Slf4j
public class UserService {
    @Autowired
    private UserRepository userRepository ;

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public boolean saveNewUser(User user){
        try{
            if (user.getUsername() == null || user.getUsername().trim().isEmpty()) {
                log.error("Username cannot be empty");
                return false;
            }
            if (user.getPassword() == null || user.getPassword().trim().isEmpty()) {
                log.error("Password cannot be empty");
                return false;
            }
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setRoles(Arrays.asList("USER"));
            user.setDate(LocalDateTime.now());
            userRepository.save(user);
            return true;
        } catch (Exception e) {
            log.error("Error saving new user: {}", e.getMessage(), e);
            return false;
        }
    }

    public void saveUser(User user){
        userRepository.save(user);
    }

    public void saveAdmin(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRoles(Arrays.asList("USER","ADMIN"));
        userRepository.save(user);
    }


    public List<User> getAll(){
        return userRepository.findAll();
    }

    public Optional<User> findById(ObjectId id){
       return userRepository.findById(id);
    }

    public void deleteById(ObjectId id){
        userRepository.deleteById(id);
    }

    public User findByUsername(String username){
        return userRepository.findByUsername(username);
    }

}
