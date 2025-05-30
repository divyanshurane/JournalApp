package com.spring.journalApp.cache;

import com.spring.journalApp.entity.ConfigJournalApp;
import com.spring.journalApp.repository.ConfigJournalAppRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.List;

@Component
public class AppCache {

    public enum keys{
        WEATHER_API;
    }

    @Autowired
    private ConfigJournalAppRepository configJournalAppRepository;

    public Map<String,String> appCache;

    @PostConstruct
    public void init(){
        appCache = new HashMap<>();
        List<ConfigJournalApp> all = configJournalAppRepository.findAll();
        for(ConfigJournalApp configJournalApp : all){
            appCache.put(configJournalApp.getKey(),configJournalApp.getValue());
        }
    }
}
