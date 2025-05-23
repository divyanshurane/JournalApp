package com.spring.journalApp.cron;

import com.spring.journalApp.entity.JournalEntry;
import com.spring.journalApp.enums.Sentiment;
import com.spring.journalApp.model.SentimentData;
import com.spring.journalApp.repository.JournalEntryRepository;
import com.spring.journalApp.repository.UserRepository;
import com.spring.journalApp.scheduler.UserScheduler;
import com.spring.journalApp.entity.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@SpringBootTest
//@SpringBootTest
//@TestPropertySource(properties = {
//    "spring.security.oauth2.client.registration.google.client-id=dummy-client-id",
//    "spring.security.oauth2.client.registration.google.client-secret=dummy-client-secret",
//    "weather.api.key=dummy-weather-key"
//})
public class UserSchedulerTest {
    @Autowired
    private UserScheduler userScheduler;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JournalEntryRepository journalEntryRepository;

    @Test
    public void testFetchUsersAndSendSaMail(){

        User user = new User();
        JournalEntry journalEntry = new JournalEntry();
//        Sentiment sentiment = new Sentiment();
//        SentimentData sentimentData = new SentimentData();
//        sentimentData.setSentiment("HAPPY");
//        sentimentData.setEmail("divanshurane1011@gmail.com");
        // set user fields as needed
        List<JournalEntry> journalEntries = new ArrayList<>();
        journalEntry.setTitle("Happy");
        journalEntry.setContent("I am Happy");
        journalEntry.setSentiment(Sentiment.HAPPY);
        journalEntry.setDate(LocalDateTime.now());
        journalEntryRepository.save(journalEntry);
        journalEntries.add(journalEntry);
        user.setEmail("divanshurane1011@gmail.com");
        user.setSentimentAnalysis(true);

        user.setJournalEntries(journalEntries);
        userRepository.save(user);
//        userRepository.deleteAll();

        userScheduler.fetchUsersAndSendSaMail();
    }
}
